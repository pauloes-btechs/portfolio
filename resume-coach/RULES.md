# RULES — hand-maintained doctrine for resumes built from the pool

These are the standing rules that the generated registry cannot express. They were set by
Pauloes across Aug–Sep 2026 and each one traces to a real correction he made.

## Titles, dates, order (never re-sequence for emphasis)
- BTechs — Founder & Technical Lead — Dec 2025 – Present — New York charitable nonprofit; 501(c)(3)
  federal incorporation **in progress**, never rendered as current status.
- Bitcoin Innovation Hub — Co Founder & CEO — Mar 2024 – Jul 2026 — Kampala, Uganda · Remote
  (New York, NY). The Dec 2025–Jul 2026 overlap with BTechs is real; never "fix" it.
- Bloomberg LP — Senior Technical Product Manager — Jun 2022 – Feb 2024.
- City University of Seattle — Technical Product Manager & Senior Systems Engineer — Mar 2014 – Jul 2023.
- Google Cloud fellowship and UW PM fellowship are fellowships, never employment roles. They earn a
  role block only at Relevance 3; otherwise they compress to the Certifications line.

## Scoring
Placement = 2·Impact + Relevance. Impact ≥ 4 ships unless Relevance = 0. Cut from the bottom of
the score ranking, never the top. Ties break toward the bullet whose vocabulary matches the JD.

## Must-haves (Pauloes, 2026-09-04) — on every resume in product-management language
- H1 settlement product (0-to-1, BTCPayServer, >90% fees cut)
- H6 1,000+ refugees graduated (0-to-1 program, scaled)
- H7 Makerere developer workshops (developer go-to-market / ecosystem growth; 125+ students,
  100+ Blockstream Jade wallets, two miners, four flagship student builds)
- H8 fundraising + public speaking ($300K #startsmall raise; the recorded talk, which autolinks)
- T1a DCI Global Research Map discovery seat (committee of PhD researchers and professors;
  29 institutions / 25 researchers / 200% QoQ — a moving figure, re-confirm quarterly)
- T1b stack (React and TypeScript, Supabase/PostgreSQL, Vercel, GitHub CI/CD)
- Every Bloomberg and City University number: 20+/1,000+/1M+, 200+ features, six audits with the
  six frameworks, 17% YoY / 25% CTR, 2.5x YoY, $2.8M, $125K (half the spend), 80%, McKinsey audits.

## Scope rules — what each figure attaches to
- Every figure on a resume traces to the site or to a dated note here; bullets without a figure
  ship without one.
- The 1M+ monthly users figure attaches only to the 20+ properties bullet (B1), not to the SFMC /
  SalesWings pipeline bullet (removed there 2026-09-04).
- Webflow result is **2.5x faster year over year**, never month over month.
- Bloomberg CORE: the 50% figure was added to the site 2026-09-05 [reported]; never sharpen it.
- BTechs Bitcoin education is **co-lead**; T5 always says "co-lead".
- Clouds on file: Azure and Google Cloud. MDM on file: Intune. SAML SSO and SCIM: on file (CityU R9).
- Fundraising on file: the #startsmall grant.
- Colleagues are not named on resumes.

## Redundancy rules (one idea per bullet)
- When H6 ships, cut BTechs T5. When H8 ships, cut T6. When T1a ships, cut BIH H5 and, on a tight
  page, BIH H3 (same committee seat: H3 = origin story, T1a = requirements work).
- When B2 and B7 both ship, B7 carries the legal/procurement/security-review fact and the Webflow
  result; B2 carries the 17%/25% result.
- Never ship an S-series systems bullet and its product-track ancestor in the same resume.

## Tracks
- `systems` bullets (CityU R3, R8–R11, R13, R14, R16 and the whole Microsoft 365 Security &
  Compliance panel) ship on infrastructure, IT, security, and compliance JDs only — with one
  exception: S7/S9/S10/S16 spike to Relevance 3 on any detection, screening, fraud, sanctions/AML,
  trust-and-safety, or compliance-product JD (the transferable story is classifier + threshold +
  quarantine/hold + allow/block lists + automated remediation + human review).
- Technical Stack section is OFF by default; ON only for true infra/sysadmin JDs.

## Canonical summary (Pauloes-authored 2026-08-27, verbatim; only the em dash became a comma)
> Technical product manager with 11+ years experience shipping platform products at an enterprise
> scale. For the past two years, founded mission-driven Bitcoin startups backed by Jack Dorsey's
> #startsmall initiative and MIT's Digital Currency Initiative. Oversaw the entire product
> lifecycle, from customer discovery with universities, merchants, and policymakers to roadmap
> development, product building, launching, and adoption. Successfully launched a settlement
> product that reduced transaction fees by over 90% and developed a research platform for the
> global Bitcoin research community. Founder scope sharpened the product judgment behind an
> already deep technical track record that includes managing over 20 Bloomberg digital properties
> with more than 1 million monthly users. Comfortable managing both the product roadmap and the
> supporting infrastructure.

## Voice
Contractions, no AI-sounding phrasing ("is a feature not an obstacle", "the part I would not want
to give up"), no mid-sentence em dashes in cover letters, "instead of" / "not" over "rather than".
Two pages for resumes. DOCX is the deliverable; PDF only when a form demands it.

## Header
`New York, NY · 206-306-3615 · pauloes@btechs.io · LinkedIn · GitHub · Portfolio` — Portfolio
links to pauloes.com and is on by default (`portfolio: false` in a spec drops it).

## Leadership Principles layer (added 2026-09-11, Pauloes' instruction)

Pauloes supplied Amazon's Leadership Principles and asked that they shape how experiences are
weighted, written, and prioritized on every resume, not only Amazon ones, because the same
words recur across companies as their leadership vocabulary. They are a lens for framing on-file
experience; every LP story points at an anchor in the registry.

**The sixteen, in Amazon's canonical order** (his PDF said fourteen; Amazon added the last two in
2021 and lists all sixteen in this fixed order, which is not a ranking): Customer Obsession ·
Ownership · Invent and Simplify · Are Right, A Lot · Learn and Be Curious · Hire and Develop the
Best · Insist on the Highest Standards · Think Big · Bias for Action · Frugality · Earn Trust ·
Dive Deep · Have Backbone; Disagree and Commit · Deliver Results · Strive to be Earth's Best
Employer · Success and Scale Bring Broad Responsibility.

**How it changes the math.** Every anchor in `anchor-weights.json` carries 1–3 LP tags. When a JD
or a company's stated values name a principle or one of its synonyms below, each anchor tagged
with it gets **+1 Relevance (cap 3)**. Impact weights do not change; the LP layer only moves
Relevance, so a $2.8M program still outranks a perfectly-on-principle bullet with no number.

**Synonym map** (what other companies call the same thing; match any of these in a JD):
- Customer Obsession — customer-centric, user-first, customer empathy, voice of customer, working backwards, customer success
- Ownership — end-to-end ownership, accountability, extreme ownership, owner's mindset, "acts like an owner," cross-team
- Invent and Simplify — innovation, simplification, first principles, automation, removing toil, platform leverage, reuse
- Are Right, A Lot — judgment, data-informed decisions, seeks disconfirming evidence, diverse perspectives
- Learn and Be Curious — growth mindset, continuous learning, thirst for learning, "go broad and deep," certifications in progress
- Hire and Develop the Best — mentoring, coaching, developing talent, raising the bar on hiring, player-coach, enablement
- Insist on the Highest Standards — quality, operational excellence, zero-defect, compliance, audits passed, standards readiness
- Think Big — vision, bold direction, strategy, 0-to-1, mission-driven, global scale
- Bias for Action — speed, urgency, decisiveness, calculated risk, reversible decisions, shipping cadence
- Frugality — resourcefulness, cost optimization, do more with less, no added headcount, no-cost hosting
- Earn Trust — candor, transparency, integrity, executive presence, stakeholder trust, vocally self-critical
- Dive Deep — data-driven, detail-oriented, hands-on, audits frequently, metrics vs. anecdote, root cause
- Have Backbone; Disagree and Commit — influence without authority, respectful challenge, conviction, commits after decision
- Deliver Results — execution, outcomes, on time and on budget, key inputs, never settles
- Strive to be Earth's Best Employer — empathy, psychological safety, people growth, inclusive practice
- Success and Scale Bring Broad Responsibility — community impact, second-order effects, leaves things better, mission

**Writing rules.**
1. Every bullet evidences at least one principle through its verb and its outcome; the principle
   is never named on the resume. "Worked backwards from small businesses priced out of card
   rails" says Customer Obsession; the words "customer obsession" say nothing.
2. Prefer LP-signaling verbs where the fact supports them: worked backwards, owned end to end,
   simplified, raised the bar, dove into, earned, committed, delivered, scaled, mentored.
3. Frugality is under-told and on file: no-cost hosting for robotswillcry.com, $250K→$125K, Bloomberg
   CORE's 50%, 80% deployment-time cut. Surface one Frugality bullet on any Amazon or startup JD.
4. Have Backbone and Strive to be Earth's Best Employer have no tagged anchor yet; add one when a
   story is logged on the site. The refugee and Makerere programs map to Broad Responsibility.
5. Summaries may carry one LP-shaped sentence ("Comfortable building the business case and the
   infrastructure it pays for" is Ownership + Frugality); never a list of principles.
6. Cover letters and interview answers use the LP evidence index in `anchor-registry.md` as the
   story bank: pick the anchor, tell it as Situation → Action → Result with the on-file number.

**LP-framed phrasings for the top anchors** (wording flexes; facts do not):
- H1 (Customer Obsession + Invent and Simplify): "Worked backwards from small businesses priced
  out of card rails to design and launch a 0-to-1 Bitcoinized inventory and settlement product on
  BTCPayServer, cutting transaction fees by more than 90%."
- C1 (Dive Deep + Think Big + Ownership): "Diagrammed the infrastructure until the inefficiencies
  had nowhere to hide, then built the business case for a $2.8M modernization program and led it
  across three vendors, five teams, and ten network products."
- C2 (Frugality + Are Right): "Halved annual datacenter spend, $250K to $125K, by consolidating
  onto VMware with Nimble storage, seven racks to two, and moving colocation to a cheaper facility."
- B11 (Frugality + Are Right + Dive Deep): "Gated what entered the backlog on ROI, sizing engineering
  and design cost against expected return before committing work, and weighing tech-debt
  reduction alongside the customer needs carrying the highest return."
- B4 (Highest Standards + Earn Trust): "Treated compliance as a product requirement, not a review at
  the end: partnered with legal and compliance to a 100% pass rate across six audits."
- B10 (Earn Trust + Dive Deep + Deliver Results): "Prioritized against OKRs and reported through
  monthly and quarterly business reviews with executives: what shipped, what was in flight, what
  came next."
- H6 (Think Big + Broad Responsibility + Deliver Results): "Took a financial-literacy and Bitcoin
  education program from 0 to 1 and scaled it to 1,000+ refugee graduates."
- H7 (Hire and Develop + Think Big): "Developed the next builders: two-day workshops for 125+
  Makerere CS students, 100+ hardware wallets granted, four student-led flagship builds."
- T1a (Customer Obsession + Dive Deep + Are Right): "Ran customer interviews with a committee of PhD
  researchers and professors to define features, attestation processes, and requirements."
- T7 (Frugality + Invent and Simplify): "Shipped a Bitcoin-settled music and merch platform hosted at
  no cost, on a stack chosen so the artist pays no platform fee."
