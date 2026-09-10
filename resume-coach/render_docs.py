#!/usr/bin/env python3
"""Render an ATS-safe resume or cover letter to DOCX (+ PDF).

Usage:
    python3 render_docs.py spec.yaml [--out-dir DIR] [--pdf] [--font Calibri]

DOCX is the deliverable. PDF is opt-in via --pdf, because PDFs reflow badly
when a recruiter opens them in Word, Google Docs or Pages.

The spec is YAML (or JSON). Two document kinds:

    kind: resume
    kind: cover_letter

See assets/resume.example.yaml and assets/cover_letter.example.yaml.

Enforced by construction, per references/resume-build.md:
  - no tables, text boxes, images, columns, headers or footers
  - contact block on page one only
  - single font family throughout
  - standard section headings and plain bullets
  - US Letter, 0.7in margins
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

BANNED = [
    "leveraged", "spearheaded", "synergies", "synergy", "results-driven",
    "results driven", "dynamic leader", "transformative", "passionate about",
    "proven track record", "uniquely positioned", "thought leader in",
    "seasoned professional", "wheelhouse", "go-getter", "team player",
]

DASH = "–"  # en dash


# ---------------------------------------------------------------- spec loading

def load_spec(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() in (".yaml", ".yml"):
        if yaml is None:
            sys.exit("PyYAML not installed: pip install pyyaml --break-system-packages")
        return yaml.safe_load(text)
    return json.loads(text)


# ------------------------------------------------------------------- doc setup

def new_document(font: str, size: float, line_spacing: float = 1.0) -> Document:
    doc = Document()
    sec = doc.sections[0]
    sec.page_width = Inches(8.5)
    sec.page_height = Inches(11)
    for side in ("top", "bottom", "left", "right"):
        setattr(sec, f"{side}_margin", Inches(0.7))
    # No headers/footers: leave them empty (python-docx creates them lazily).

    style = doc.styles["Normal"]
    style.font.name = font
    style.font.size = Pt(size)
    style.element.rPr.rFonts.set(qn("w:eastAsia"), font)
    pf = style.paragraph_format
    pf.space_before = Pt(0)
    pf.space_after = Pt(0)
    pf.line_spacing = line_spacing
    return doc


def para(doc, text="", *, size=None, bold=False, italic=False, align=None,
         space_before=0, space_after=0, color=None, caps=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    if align is not None:
        p.alignment = align
    if text:
        if LINK_RE.search(text):
            write_runs(p, text, size=size, bold=bold, italic=italic)
        else:
            run = p.add_run(text)
            run.bold = bold
            run.italic = italic
            if size:
                run.font.size = Pt(size)
            if color:
                run.font.color.rgb = RGBColor(*color)
            if caps:
                run.font.all_caps = True
    return p


LINK_RE = re.compile(r"(\^?)\[([^\]]+)\]\((https?://[^)\s]+|mailto:[^)\s]+)\)")


def add_hyperlink(p, text, url, *, size=None, superscript=False):
    """A real w:hyperlink run. Word, Google Docs and Pages all honour it, and
    ATS parsers read the anchor text as plain text, so nothing is lost."""
    part = p.part
    r_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True)
    link = OxmlElement("w:hyperlink")
    link.set(qn("r:id"), r_id)
    run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")
    for tag, val in (("w:color", "0563C1"), ("w:u", "single")):
        el = OxmlElement(tag)
        el.set(qn("w:val"), "single" if tag == "w:u" else val)
        rPr.append(el)
    if superscript:
        va = OxmlElement("w:vertAlign")
        va.set(qn("w:val"), "superscript")
        rPr.append(va)
    if size:
        sz = OxmlElement("w:sz")
        sz.set(qn("w:val"), str(int(size * 2)))
        rPr.append(sz)
    run.append(rPr)
    t_el = OxmlElement("w:t")
    t_el.set(qn("xml:space"), "preserve")
    t_el.text = text
    run.append(t_el)
    link.append(run)
    p._p.append(link)


def write_runs(p, text, *, size=None, bold=False, italic=False):
    """Write text into a paragraph, turning [anchor](url) into live links and
    ^[n](url) into a superscript citation marker. Plain text passes through."""
    pos = 0
    for m in LINK_RE.finditer(text):
        if m.start() > pos:
            r = p.add_run(text[pos:m.start()])
            r.bold, r.italic = bold, italic
            if size:
                r.font.size = Pt(size)
        add_hyperlink(p, m.group(2), m.group(3), size=size,
                      superscript=bool(m.group(1)))
        pos = m.end()
    if pos < len(text):
        r = p.add_run(text[pos:])
        r.bold, r.italic = bold, italic
        if size:
            r.font.size = Pt(size)
    return p


def strip_links(text: str) -> str:
    """The plain-text form, for linting and word counts."""
    return LINK_RE.sub(lambda m: m.group(2), text)


# ------------------------------------------------------ canonical autolinking
# Doctrine §16.5: the same experience carries the same link everywhere it appears.
# These are applied automatically to every document so a spec author never has to
# remember them, and so a resume and its cover letter never disagree.

L_TALK    = "https://www.youtube.com/watch?v=NubSrCXgmdk&t=1280s"
L_CREDLY  = "https://www.credly.com/badges/8e32c0cd-84fb-44c1-9241-fb418efe4f04/public_url"
L_VERTEX  = "https://www.skills.google/public_profiles/ccb30325-832f-410b-aee2-3a0c5391c294/badges/22453656"
L_MLAPIS  = "https://www.skills.google/public_profiles/ccb30325-832f-410b-aee2-3a0c5391c294/badges/22319519"
L_DCIPOST = "https://www.dci.mit.edu/posts/new-research-network"
L_DCIGLOB = "https://www.dci.mit.edu/global"

# Longest phrase first so a shorter one never steals a span from a longer one.
AUTOLINKS = [
    (r"Empowering Through Education: Bitcoin's Role in Awareness and Adoption", L_TALK),
    (r"Machine Learning Engineer track", L_CREDLY),
    (r"Machine Learning APIs", L_MLAPIS),
    (r"DCI Global Research Network", L_DCIGLOB),
    (r"Global Mapping committee", L_DCIGLOB),
    (r"Vertex AI", L_VERTEX),
    (r"MIT(?:'s|\u2019s)? Digital Currency Initiative", L_DCIPOST),
    (r"MIT DCI-backed", L_DCIPOST),
]

# The Bitcoin Innovation Hub context line carries superscript citations to the two
# sources that substantiate the MIT DCI backing. His own convention, §16.5.
# BIH context line citations (retired the MIT-DCI pair 2026-08-25): the company's
# own about page and the public #startsmall tracker row that lists the grant.
L_BTCHUB  = "https://btchubafrica.com/about-us/"
L_TRACKER = "https://docs.google.com/spreadsheets/d/1-ycOLoA496Qj37IHJvrXO3Vg2ETvMphtRGjyv2FNn8c/edit?gid=0#gid=0&range=C104"
BIH_CITATIONS = [L_BTCHUB, L_TRACKER]

EXISTING_LINK_RE = re.compile(r"\^?\[[^\]]+\]\((?:https?://|mailto:)[^)\s]+\)")


def autolink(text: str, used: set) -> str:
    """Link the first unlinked occurrence of each canonical phrase, once per doc."""
    if not text:
        return text
    # Spans already inside an explicit link are off limits.
    protected = [(m.start(), m.end()) for m in EXISTING_LINK_RE.finditer(text)]
    for url in (m.group(0) for m in EXISTING_LINK_RE.finditer(text)):
        for _, u in AUTOLINKS:
            if u in url:
                used.add(u)
    for pattern, url in AUTOLINKS:
        if url in used:
            continue
        for m in re.finditer(pattern, text):
            if any(s <= m.start() < e for s, e in protected):
                continue
            text = f"{text[:m.start()]}[{m.group(0)}]({url}){text[m.end():]}"
            used.add(url)
            protected = [(x.start(), x.end())
                         for x in EXISTING_LINK_RE.finditer(text)]
            break
    return text


def apply_autolinks(spec: dict) -> dict:
    """Mutate a spec in place so every canonical experience carries its link."""
    used = set()

    def walk(s):
        return autolink(s, used)

    if spec.get("summary"):
        spec["summary"] = walk(spec["summary"])
    for role in spec.get("experience") or []:
        company = (role.get("company") or "")
        if role.get("context"):
            ctx = role["context"]
            if "BTechs" in company and "^[" not in ctx:
                ctx = ctx.rstrip() + "^[1](https://btechs.io)"
            if "Bitcoin Innovation Hub" in company and "^[" not in ctx:
                marks = "".join(f"^[{i}]({u})"
                                for i, u in enumerate(BIH_CITATIONS, start=2))
                ctx = ctx.rstrip() + marks
                used.update(BIH_CITATIONS)
            role["context"] = walk(ctx)
        role["bullets"] = [walk(b) for b in (role.get("bullets") or [])]
    for sec in spec.get("additional_sections") or []:
        sec["items"] = [walk(i) for i in (sec.get("items") or [])]
    spec["body"] = [walk(b) for b in (spec.get("body") or [])] or spec.get("body")
    return spec


# ------------------------------------------------------------------- palette
# Added 2026-08-27 at Pauloes' request: color-code headings and role lines so a
# human reader can navigate the page faster. Restrained: one navy accent family
# plus a neutral gray. ATS-safe: color never changes the text a parser extracts.
# Set "color: false" in a spec to render fully monochrome.
ACCENT = (0x1F, 0x4E, 0x79)     # deep navy: name, section headings, role titles
META_GRAY = (0x59, 0x59, 0x59)  # location/dates tails and context lines
RULE_ACCENT = "8EAADB"          # light navy for section rules
COLOR_ON = True                 # set per-render from the spec in main()


def rule(p, color="808080"):
    """Bottom border on a paragraph — the only safe horizontal rule."""
    pPr = p._p.get_or_add_pPr()
    borders = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), color)
    borders.append(bottom)
    pPr.append(borders)


def section_heading(doc, text):
    p = para(doc, text.upper(), bold=True, size=11, space_before=10, space_after=3,
             color=ACCENT if COLOR_ON else None)
    rule(p, RULE_ACCENT if COLOR_ON else "808080")
    return p


def bullet(doc, text, size=None):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.left_indent = Inches(0.18)
    pf.first_line_indent = Inches(-0.18)
    # The glyph is followed by a TAB to a stop at the indent width, so the first
    # line's text and every wrapped line align at exactly the same x (fixed
    # 2026-08-28: glyph+two-spaces left line 1 a sliver shallower than the rest).
    pf.tab_stops.add_tab_stop(Inches(0.18))
    pf.space_before = Pt(0)
    pf.space_after = Pt(2)
    lead = p.add_run("•\t")
    if size:
        lead.font.size = Pt(size)
    write_runs(p, text, size=size)
    return p


def keep_together(p):
    """Discourage a page break immediately after this paragraph."""
    pPr = p._p.get_or_add_pPr()
    el = OxmlElement("w:keepNext")
    pPr.append(el)


# ------------------------------------------------------------------- rendering

GITHUB_DEFAULT = "github.com/pauloes-btechs"
PORTFOLIO_DEFAULT = "pauloes.com"   # header "Portfolio" link, default-on since 2026-09-04


def contact_line(c: dict) -> str:
    """Contact block, with the linkable parts emitted as [anchor](url) so
    write_runs turns them into real hyperlinks.

    Per Pauloes 2026-08-20: the email shows its full address, but LinkedIn, GitHub
    and Portfolio render as clean word anchors, each linking to its URL. GitHub and
    Portfolio are included by default; pass github: false / portfolio: false in the
    spec to drop either. Separators are single-spaced middots (2026-08-28)."""
    parts = [c.get("location"), c.get("phone")]
    if c.get("email"):
        parts.append(f"[{c['email']}](mailto:{c['email']})")
    if c.get("linkedin"):
        li = str(c["linkedin"]).replace("https://", "").replace("http://", "")
        parts.append(f"[LinkedIn](https://{li})")
    gh = c.get("github", GITHUB_DEFAULT)
    if gh:
        gh = str(gh).replace("https://", "").replace("http://", "")
        parts.append(f"[GitHub](https://{gh})")
    pf = c.get("portfolio", PORTFOLIO_DEFAULT)
    if pf:
        pf = str(pf).replace("https://", "").replace("http://", "")
        parts.append(f"[Portfolio](https://{pf})")
    if c.get("website"):
        w = str(c["website"]).replace("https://", "")
        parts.append(f"[{w}](https://{w})")
    return " · ".join(p for p in parts if p)


def render_header(doc, contact, font_size):
    para(doc, contact.get("name", "").upper(), bold=True, size=17,
         align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2,
         color=ACCENT if COLOR_ON else None)
    p = para(doc, contact_line(contact), size=font_size - 0.5,
             align=WD_ALIGN_PARAGRAPH.CENTER, space_after=6)
    rule(p, RULE_ACCENT if COLOR_ON else "808080")


def render_resume(doc, spec, font_size):
    render_header(doc, spec["contact"], font_size)

    if spec.get("summary"):
        section_heading(doc, spec.get("summary_heading", "Summary"))
        para(doc, " ".join(spec["summary"].split()), space_after=2)

    skills = spec.get("skills") or []
    if skills:
        section_heading(doc, spec.get("skills_heading", "Areas of Expertise"))
        para(doc, " · ".join(skills), space_after=2)

    if spec.get("experience"):
        section_heading(doc, "Professional Experience")
        for i, role in enumerate(spec["experience"]):
            loc, dates = role.get("location", ""), role.get("dates", "")
            tail = " | ".join(x for x in (loc, dates) if x)
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(0 if i == 0 else 7)
            p.paragraph_format.space_after = Pt(0)
            rt = p.add_run(role["title"])
            rt.bold = True
            if COLOR_ON:
                rt.font.color.rgb = RGBColor(*ACCENT)
            rc = p.add_run(" | " + role["company"])
            rc.bold = True
            if tail:
                r2 = p.add_run(" | " + tail)
                r2.bold = False
                if COLOR_ON:
                    r2.font.color.rgb = RGBColor(*META_GRAY)
            keep_together(p)
            if role.get("context"):
                cp = para(doc, role["context"], italic=True, size=font_size - 1,
                          space_after=2,
                          color=META_GRAY if COLOR_ON else None)
                keep_together(cp)
            for b in role.get("bullets", []):
                bullet(doc, " ".join(b.split()))

    if spec.get("education"):
        section_heading(doc, "Education")
        for e in spec["education"]:
            if isinstance(e, str):
                para(doc, e, space_after=1)
            else:
                bits = [e.get("degree"), e.get("institution"), e.get("location"),
                        str(e.get("year", "")) or None]
                para(doc, ", ".join(b for b in bits if b), space_after=1)

    for extra in spec.get("additional_sections", []):
        section_heading(doc, extra["heading"])
        for item in extra.get("items", []):
            bullet(doc, item)


def render_cover_letter(doc, spec, font_size):
    render_header(doc, spec["contact"], font_size)

    para(doc, spec.get("date", ""), space_before=8, space_after=8)

    for line in spec.get("recipient", []):
        if line:
            para(doc, line, space_after=0)

    para(doc, spec.get("salutation", "Dear Hiring Team,"),
         space_before=10, space_after=8)

    for block in spec.get("body", []):
        para(doc, " ".join(block.split()), space_after=8)

    para(doc, spec.get("closing", "Sincerely,"), space_before=4, space_after=14)
    para(doc, spec["contact"].get("name", ""))


# --------------------------------------------------------------------- checks

def _prose_fields(spec: dict):
    """Yield (label, text) for prose the house style rules apply to.

    Skips structural fields like dates, where an en/em dash is legitimate.
    """
    if spec.get("summary"):
        yield "summary", strip_links(spec["summary"])
    for i, role in enumerate(spec.get("experience") or []):
        if role.get("context"):
            yield f"experience[{i}].context", strip_links(role["context"])
        for j, b in enumerate(role.get("bullets") or []):
            yield f"experience[{i}].bullet[{j}]", strip_links(b)
    for i, b in enumerate(spec.get("body") or []):
        yield f"body[{i}]", strip_links(b)


def lint(spec: dict) -> list:
    warn = []
    kind = spec.get("kind", "resume")

    haystack = strip_links(json.dumps(spec)).lower()
    for term in BANNED:
        if term in haystack:
            warn.append(f"banned phrase present: '{term}' (doctrine §11)")

    # House rule: commas, not mid-sentence em dashes. En dashes in date ranges are ok.
    for field, text in _prose_fields(spec):
        if "—" in text or re.search(r"\w\s+--\s+\w", text):
            warn.append(f"mid-sentence em dash in {field}; house rule is commas "
                        "(doctrine §11)")

    if kind == "resume":
        skills = spec.get("skills") or []
        if not 8 <= len(skills) <= 12:
            warn.append(f"skills block has {len(skills)} items; doctrine §5 wants 8-12")

        summary = spec.get("summary") or ""
        if len(summary.split()) < 40:
            warn.append("summary is thin (<40 words); doctrine §4 calls this out "
                        "as a standing defect")

        exp = spec.get("experience") or []
        if exp:
            first = exp[0].get("bullets", [])
            unquantified = [b for b in first if not re.search(r"[\d%$]", b)]
            if unquantified:
                warn.append(f"{len(unquantified)}/{len(first)} bullets in the current "
                            "role carry no figure — confirm each states an explicit "
                            "business consequence")

            verbs = {}
            for role in exp:
                for b in role.get("bullets", []):
                    v = b.strip().split(" ")[0].lower().rstrip(",")
                    verbs[v] = verbs.get(v, 0) + 1
            for v, n in sorted(verbs.items(), key=lambda x: -x[1]):
                if n > 1:
                    warn.append(f"verb '{v}' opens {n} bullets; doctrine §6 flags "
                                "Led/Managed/Implemented repetition")

            # every listed skill should be evidenced in the body
            body = " ".join(
                b for role in exp for b in role.get("bullets", [])
            ).lower() + " " + (spec.get("summary") or "").lower()
            for s in skills:
                words = [w for w in re.findall(r"[a-z]{4,}", s.lower())
                         if w not in ("with", "using", "management", "experience")]
                if words and not any(w in body for w in words):
                    warn.append(f"skill '{s}' is not evidenced in the work history "
                                "(doctrine §5)")

    if kind == "cover_letter":
        words = sum(len(b.split()) for b in spec.get("body", []))
        if words > 350:
            warn.append(f"cover letter is {words} words; target 250-350")
        if words < 200:
            warn.append(f"cover letter is {words} words; likely too thin")
        if len(spec.get("body", [])) != 4:
            warn.append(f"{len(spec.get('body', []))} paragraphs; the shape is 4 "
                        "(hook / proof / bridge / close)")

    return warn


def to_pdf(docx_path: Path, out_dir: Path):
    soffice = shutil.which("soffice") or shutil.which("libreoffice")
    if not soffice:
        print("  ! soffice not found; skipping PDF", file=sys.stderr)
        return None
    subprocess.run(
        [soffice, "--headless", "--convert-to", "pdf", "--outdir",
         str(out_dir), str(docx_path)],
        check=True, capture_output=True, timeout=180,
    )
    pdf = out_dir / (docx_path.stem + ".pdf")
    return pdf if pdf.exists() else None


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("spec")
    ap.add_argument("--out-dir", default=".")
    ap.add_argument("--basename", help="output filename stem; defaults to spec.filename or the spec's own stem")
    # CareerOS house style (Blockstream DES pattern): Arial 11pt, 1.15 spacing.
    ap.add_argument("--font", default="Arial")
    ap.add_argument("--size", type=float, default=11)
    ap.add_argument("--line-spacing", type=float, default=1.15)
    ap.add_argument("--pdf", action="store_true",
                    help="also emit a PDF. DOCX is the deliverable by default: PDFs "
                         "reflow badly when opened in Word, Google Docs or Pages.")
    ap.add_argument("--no-pdf", action="store_true",
                    help="deprecated, kept so old callers do not break; DOCX-only is now the default")
    ap.add_argument("--strict", action="store_true", help="exit nonzero if lint warns")
    args = ap.parse_args()

    spec_path = Path(args.spec)
    spec = load_spec(spec_path)
    spec = apply_autolinks(spec)   # doctrine §16.5, canonical links on every doc
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    warnings = lint(spec)
    if warnings:
        print("Pre-render audit:", file=sys.stderr)
        for w in warnings:
            print(f"  ! {w}", file=sys.stderr)
    else:
        print("Pre-render audit: clean", file=sys.stderr)

    global COLOR_ON
    COLOR_ON = spec.get("color", True) is not False

    doc = new_document(args.font, args.size, args.line_spacing)
    kind = spec.get("kind", "resume")
    if kind == "cover_letter":
        render_cover_letter(doc, spec, args.size)
    elif kind == "resume":
        render_resume(doc, spec, args.size)
    else:
        sys.exit(f"unknown kind: {kind}")

    stem = args.basename or spec.get("filename") or spec_path.stem
    docx_path = out_dir / f"{stem}.docx"
    doc.save(docx_path)
    print(f"wrote {docx_path}")

    if args.pdf:
        pdf = to_pdf(docx_path, out_dir)
        if pdf:
            print(f"wrote {pdf}")

    if warnings and args.strict:
        sys.exit(1)


if __name__ == "__main__":
    main()
