// ============================================================
// Single source of truth for site content.
// Every fact here traces to Pauloes' resume anchor registry —
// nothing invented. Bracketed TODOs mark numbers he can add later.
// ============================================================

export const site = {
  name: "Pauloes Berhe",
  tagline: "Technical Product Manager · Founder",
  location: "New York, NY",
  email: "pauloes@btechs.io",
  linkedin: "https://linkedin.com/in/pauloes",
  github: "https://github.com/pauloes-btechs",
  org: "https://btechs.io",
  url: "https://pauloes.com",
  summary:
    "Technical product manager with 11+ years experience shipping platform products at an enterprise scale. For the past two years, founded mission-driven Bitcoin startups backed by Jack Dorsey's #startsmall initiative and MIT's Digital Currency Initiative — owning the entire product lifecycle, from customer discovery with universities, merchants, and policymakers through roadmap, build, launch, and adoption. Founder scope sharpened the product judgment behind an already deep technical track record. Comfortable owning both the product roadmap and the infrastructure underneath it.",
};

export const stats = [
  { n: ">90%", l: "Transaction fees cut by settlement product" },
  { n: "1M+", l: "Monthly users on 20+ Bloomberg properties" },
  { n: "$2.8M", l: "Infrastructure program uncovered & led" },
  { n: "100%", l: "Audit pass rate across privacy & security" },
];

export const roles = [
  {
    slug: "btechs",
    company: "BTechs",
    badge: { mark: "BT", hue: "green" },
    logo: { src: "/logos/btechs.png", wide: true, dark: true },
    title: "Founder & Technical Lead",
    kind: "founder",
    dates: "Dec 2025 – Present",
    location: "New York, NY",
    context:
      "New York charitable nonprofit building resilient, self-sovereign digital and financial infrastructure and delivering security- and privacy-focused, equitable AI/ML education.",
    card:
      "Product Owner and Technical Lead of the DCI Global Research Map — the public platform mapping MIT DCI's global Bitcoin research network — plus security- and privacy-focused AI/ML education on Google Cloud.",
    lede:
      "BTechs is a New York charitable nonprofit delivering public-interest technology: resilient, self-sovereign digital and financial infrastructure for individuals, community organizations, and nonprofits — and security- and privacy-focused, equitable AI/ML education.",
    responsibilities: [
      "Product Owner and Technical Lead for the DCI Global Research Map, the public platform mapping MIT DCI's global Bitcoin research network — owned from concept through launch.",
      "Architect and operate the full production stack: PostgreSQL/Supabase database, Vercel hosting and deployments, and GitHub-based source control and CI/CD, from local development through production.",
      "Lead product and technical consulting engagements for individual and nonprofit clients — web platforms, cloud environments, and development workflows from requirements through launch.",
      "Design and teach applied AI/ML workshops on Google Cloud: Introduction to AI and Machine Learning, Preparing Data for ML APIs, Creating and Evaluating ML Models with BigQuery ML (classification and forecasting), and Dialogflow conversational agents.",
      "Co-lead BTechs' global Bitcoin education program — workshops building community capacity for self-custody and sovereign financial tooling.",
      "Represent BTechs at industry events and speaking engagements; cultivate relationships with leading Bitcoin researchers worldwide.",
    ],
    skills: [
      "Zero-to-one product ownership", "Full-stack architecture", "PostgreSQL / Supabase",
      "Vercel", "GitHub CI/CD", "Google Cloud AI/ML", "BigQuery ML", "Curriculum design",
      "Community & research partnerships", "Nonprofit leadership",
    ],
    vendorsHeading: "The Global Mapping Committee",
    vendorsSub:
      "The committee I lead on the DCI Global Research Map — PhD researchers and professors hailing from these institutions, spanning computer science, mathematics, environmental science, law and government banking, philosophy, and electrical engineering. Coordinated as MIT DCI Global Research Network Global Mapping committee lead.",
    vendors: [
      { name: "MIT Media Lab", logo: "/logos/unis/mitmedialab.png" },
      { name: "Georgia Tech", logo: "/logos/unis/georgiatech.png" },
      { name: "Reed College" },
      { name: "CU Boulder", logo: "/logos/unis/boulder.png" },
      { name: "McMaster University", logo: "/logos/unis/mcmaster.png" },
      { name: "University of Central Florida", logo: "/logos/unis/ucf.png" },
      { name: "Old Dominion University · VMASC", logo: "/logos/unis/odu.png" },
      { name: "SUNY Nassau", logo: "/logos/unis/nassau.png" },
      { name: "University of Wyoming", logo: "/logos/unis/wyoming.png" },
    ],
    links: [
      { label: "DCI Global Research Map (live)", href: "https://dci-global-research-map.vercel.app/" },
      { label: "Repository — Btechs-org/DCI-Global-Research-Map", href: "https://github.com/Btechs-org/DCI-Global-Research-Map" },
      { label: "btechs.io", href: "https://btechs.io" },
    ],
  },
  {
    slug: "bitcoin-innovation-hub",
    company: "Bitcoin Innovation Hub",
    badge: { mark: "₿", hue: "orange" },
    logo: { src: "/logos/bitcoin.svg" },
    title: "Co-Founder & CEO",
    kind: "founder",
    dates: "Mar 2024 – Jul 2026",
    location: "Kampala, Uganda · Remote (New York, NY)",
    context:
      "Bitcoin technology and financial-inclusion firm backed by a three-year, $300K grant from Jack Dorsey's #startsmall (fiscal sponsor: Human Rights Foundation).",
    card:
      "Backed by a three-year, $300K #startsmall grant. Designed and shipped a Bitcoinized settlement product on BTCPayServer that cut transaction fees by more than 90% for small businesses.",
    lede:
      "The Bitcoin Innovation Hub was a Kampala-based Bitcoin technology and financial-inclusion firm, backed by a three-year $300,000 grant from Jack Dorsey's #startsmall initiative, empowering individuals, businesses, and communities — with a focus on refugee economic opportunity — to harness Bitcoin.",
    responsibilities: [
      "Designed and shipped a Bitcoinized inventory and settlement product, implemented on BTCPayServer, that cut transaction fees by more than 90% — improving liquidity and bringing modern asset management within reach of small businesses.",
      "Worked with vendors to implement point-of-sale systems and bespoke payment integrations, including stablecoin acceptance and Stripe on client digital platforms.",
      "Built and delivered the Hub's financial-literacy and Bitcoin education program, graduating more than 1,000 refugees with diplomas covering practical financial skills and peer-to-peer Bitcoin transactions.",
      "Ran intensive two-day developer workshops for 125+ third- and fourth-year computer science students — granting 100+ Blockstream Jade hardware wallets to students and two Bitcoin miners to the university — from which student teams went on to lead four flagship builds: Bitcoin-powered savings and micro-investment apps, remittance platforms, point-of-sale solutions, and real-world-asset tokenization.",
      "Validated product direction and prioritized roadmap investments through customer research and stakeholder interviews with universities, merchants, developers, and policymakers.",
      "Authored product documentation, implementation guides, and deployment automation enabling client engineering teams to stand up and operate their own infrastructure independently.",
      "Joined the MIT DCI Global Research Network as an Africa lead focused on growing the network across the continent — going on to lead its global growth initiative as Global Mapping committee lead, serving on the Global Workshops committee and coordinating researchers and institutions across jurisdictions.",
    ],
    skills: [
      "Payments product design", "BTCPayServer", "Settlement models", "Stablecoin & Stripe integrations",
      "Customer discovery", "Stakeholder research", "Developer enablement", "Grant-funded delivery",
      "Financial inclusion", "Research-network leadership",
    ],
    vendorsHeading: "Partners, Donors & Sponsors",
    vendorsSub:
      "The network behind the Hub — grant funders, technology partners, and research institutions, from the three-year #startsmall grant to the MIT and Kampala ends of the mission.",
    vendors: [
      { name: "#startsmall", logo: "/logos/hub/startsmall.png" },
      { name: "Human Rights Foundation", logo: "/logos/hub/hrf.png" },
      { name: "HRF Bitcoin Development Fund", logo: "/logos/hub/hrf-bdf.png" },
      { name: "Blockstream", logo: "/logos/hub/blockstream.png" },
      { name: "MIT Digital Currency Initiative", logo: "/logos/hub/mitdci.png" },
      { name: "MIT Media Lab", logo: "/logos/unis/mitmedialab.png" },
      { name: "Sphinx Chat", logo: "/logos/hub/sphinx.png" },
      { name: "Stakwork", logo: "/logos/hub/stakwork.png" },
      { name: "Makerere University", logo: "/logos/hub/makerere.png" },
    ],
    links: [
      { label: "#startsmall grant tracker (public record)", href: "https://docs.google.com/spreadsheets/d/1-ycOLoA496Qj37IHJvrXO3Vg2ETvMphtRGjyv2FNn8c/edit?gid=0#gid=0&range=C104" },
      { label: "btchubafrica.com (archive)", href: "https://btchubafrica.com/about-us/" },
    ],
  },
  {
    slug: "bloomberg",
    company: "Bloomberg LP",
    badge: { mark: "BL", hue: "blue" },
    logo: { src: "/logos/bloomberg.svg", wide: true },
    title: "Senior Technical Product Manager",
    kind: "enterprise",
    dates: "Jun 2022 – Feb 2024",
    location: "New York, NY",
    context: "Digital platform ownership across Bloomberg's Law, Tax, and Government verticals.",
    card:
      "Owned 20+ digital properties and 1,000+ pages serving 1M+ monthly users; delivered over 200 features with a 100% pass rate across six GDPR/CCPA audits.",
    lede:
      "At Bloomberg I owned the full lifecycle of the company's digital platform across its financial verticals — 20+ properties and more than 1,000 pages serving over a million monthly users — where compliance was treated as part of the product, not a review at the end.",
    responsibilities: [
      "Built and managed over 20 company websites and 1,000+ pages serving 1M+ monthly users — defining product requirements, maintaining documentation, prioritizing delivery, and executing against strategic roadmaps.",
      "Drove the Salesforce Marketing Cloud integration across the Law, Tax, and Government verticals — lead scoring, segmentation, forecasting, and automation feeding 1M+ monthly visitors into vertical pipelines.",
      "Owned architecture, UX optimization, accessibility compliance, privacy and policy, and technical SEO across the estate — sustaining a 100% pass rate across six GDPR/CCPA audits.",
      "Orchestrated Agile delivery of over 200 features, coordinating engineering teams across time zones and communicating priorities and milestones to technical and executive stakeholders.",
      "Interviewed customers, Customer Support, and Sales across Bloomberg Law, Tax, and Government to surface product gaps — translating validated needs into roadmap priorities.",
    ],
    skills: [
      "Enterprise platform ownership", "Roadmap strategy", "Agile at scale", "Privacy-by-design",
      "GDPR / CCPA", "Salesforce Marketing Cloud", "Technical SEO", "Accessibility",
      "Executive communication", "Customer discovery",
    ],
    vendorsHeading: "Vendors Onboarded",
    vendorsSub:
      "New vendors brought through legal, procurement, and security review — with onboarding supported or led end to end.",
    vendorsPlacement: "sidebar",
    vendors: [
      { name: "Salesforce Marketing Cloud", logo: "/logos/vendors/salesforce.png" },
      { name: "Webflow", logo: "/logos/vendors/webflow.png" },
      { name: "Asana", logo: "/logos/vendors/asana.png" },
      { name: "SalesWings", logo: "/logos/vendors/saleswings.png" },
    ],
    links: [],
  },
  {
    slug: "city-university",
    company: "City University of Seattle",
    badge: { mark: "CU", hue: "blue" },
    logo: { src: "/logos/cityu.png", wide: true },
    title: "Technical Product Manager & Senior Systems Engineer",
    kind: "enterprise",
    dates: "Mar 2014 – Jul 2023",
    location: "Seattle, WA",
    context: "Nine years owning enterprise infrastructure and its product roadmap end to end.",
    card:
      "Directed the enterprise migration to Azure; uncovered and led a $2.8M infrastructure program; cut $125K in annual datacenter costs — half the department's infrastructure spend.",
    lede:
      "Nine years owning the university's technology estate end to end — from diagramming infrastructure inefficiencies that became a $2.8M modernization program to directing the migration to Microsoft Azure with secure hybrid connectivity and redundant failover.",
    responsibilities: [
      "Diagrammed and uncovered infrastructure inefficiencies, leading to a one-year $2.8M project coordinating three vendors, five teams, and ten network products — the anchor of a two-year network infrastructure upgrade delivered through the first U.S.–China tariff war's hardware delays and cost escalations.",
      "Directed the migration to Microsoft Azure Cloud, delivering secure hybrid connectivity via a site-to-site VPN gateway and a redundant tertiary failover environment.",
      "Ran core network and infrastructure services — Active Directory, DNS, DHCP, switches, firewalls, and wireless — across a hybrid environment of over 100 servers with redundant failover.",
      "Deployed a collaboration platform on Azure DevOps with PowerShell-scripted automation to improve repeatability and scalability, reducing time spent on infrastructure projects by 80%.",
      "Cut an estimated $125K in annual datacenter and maintenance costs through consolidation, improved resource management, and optimized licensing.",
      "Implemented and administered Azure Active Directory (Entra ID) — SSO, conditional access, dynamic groups, and MFA including FIDO2/YubiKey policies — automating identity provisioning and enforcing security standards.",
      "Owned annual third-party security audits of the Active Directory estate — assessed by McKinsey against ISO 27001, the NIST Cybersecurity Framework (NIST CSF), and SOC 2 — passing every audit, with year-round standards readiness as a core part of the role.",
      "Administered the Microsoft 365 estate end to end — tenant administration across Exchange, Teams, and SharePoint — migrating 65K email accounts to the cloud and owning Office 365 adoption.",
      "Managed the endpoint fleet through Intune (MDM/MAM) and Autopilot provisioning across Windows, macOS, and mobile devices, enforcing device security and compliance policies.",
      "Ran a two-year enterprise application sunset and migration as solutions architect and technical product manager — modernizing legacy ERP and re-architecting structured data stores.",
      "Oversaw managed service providers and vendors — scoping, escalation, and delivery oversight — while providing direct support to executives and end users.",
    ],
    vendorsHeading: "Vendors & Partners Coordinated",
    vendorsSub:
      "Vendor and partner relations managed across nine years of operations — procurement, managed services, consulting, and audit engagements, sixteen-plus relationships in all. A separate, broader surface than the three-vendor $2.8M program above.",
    vendors: [
      { name: "Microsoft", logo: "/logos/vendors/microsoft.png" },
      { name: "VMware", logo: "/logos/vendors/vmware.png" },
      { name: "CDW", logo: "/logos/vendors/cdw.png" },
      { name: "Symantec", logo: "/logos/vendors/symantec.png" },
      { name: "GFI LanGuard" },
      { name: "DocImage" },
      { name: "Iron Mountain" },
      { name: "Zoom", logo: "/logos/vendors/zoom.png" },
      { name: "Citrix", logo: "/logos/vendors/citrix.png" },
      { name: "Google", logo: "/logos/vendors/google.png" },
      { name: "McKinsey & Company", logo: "/logos/vendors/mckinsey.png" },
      { name: "Cloudflare", logo: "/logos/vendors/cloudflare.png" },
      { name: "Sabey" },
      { name: "Cisco", logo: "/logos/vendors/cisco.png" },
      { name: "Juniper Networks", logo: "/logos/vendors/juniper.png" },
      { name: "HP", logo: "/logos/vendors/hp.png" },
      { name: "Dell", logo: "/logos/vendors/dell.png" },
    ],
    skills: [
      "Solutions architecture", "Azure cloud migration", "Cost optimization", "Vendor management",
      "Azure DevOps & CI/CD", "PowerShell automation", "Identity & access management",
      "ERP modernization", "Microsoft 365 administration", "Intune & Autopilot", "Security audits (ISO 27001 · NIST CSF · SOC 2)", "Data governance", "Stakeholder alignment",
    ],
    links: [],
  },
  {
    slug: "google-cloud-fellow",
    company: "Google",
    title: "Cloud Fellow, Cloud Engineer",
    kind: "fellowship",
    badge: { mark: "G", hue: "aqua" },
    logo: { src: "/logos/google.svg" },
    dates: "Oct 2021 – Oct 2022",
    location: "Remote",
    context: "Selective 12-week Cloud Career Jump Start fellowship — not an employment role, and never dressed up as one.",
    card:
      "Selected for Google Cloud's Cloud Career Jump Start fellowship — 12 weeks of hands-on GCP aligned to the Associate Cloud Engineer curriculum, with Google Cloud engineers.",
    lede:
      "A selective 12-week Google Cloud fellowship that turned cloud fluency into hands-on GCP practice — compute, storage, networking, IAM, and databases — working directly with Google Cloud practitioners. It's the foundation the BTechs Google Cloud AI/ML teaching practice stands on today.",
    responsibilities: [
      "Selected for Google Cloud's 12-week Cloud Career Jump Start fellowship, completing training aligned with the Associate Cloud Engineer curriculum.",
      "Practiced deploying and managing GCP compute, storage, networking, IAM, and databases through hands-on labs and sessions with Google Cloud engineers.",
      "Applied cloud architecture, security, monitoring, operations, and troubleshooting patterns with Google Cloud practitioners.",
    ],
    skills: [
      "Google Cloud Platform", "Compute & storage", "Cloud networking", "IAM",
      "Cloud databases", "Architecture patterns", "Monitoring & operations", "Troubleshooting",
    ],
    links: [],
  },
  {
    slug: "uw-pm-fellow",
    company: "University of Washington — Foster School of Business",
    title: "Inclusive Product Management Fellow",
    kind: "fellowship",
    badge: { mark: "UW", hue: "violet" },
    logo: { src: "/logos/uw.svg" },
    dates: "Oct 2021 – Dec 2021",
    location: "Seattle, WA",
    context: "Ten-week program at the UW Product Management Center — one of fifty selected nationally.",
    card:
      "One of fifty selected nationally for the UW Product Management Center's Inclusive PM program — selection that led to a coaching role on business and product frameworks.",
    lede:
      "One of fifty fellows selected nationally for the UW Product Management Center's Inclusive Product Management program — a ten-week deep dive into product frameworks that turned into a coaching seat, working with participants on roadmaps, value propositions, and business cases.",
    responsibilities: [
      "Selected as one of fifty fellows nationally for the UW Product Management Center's Inclusive Product Management program.",
      "Coached participants on business and product frameworks, roadmaps, and value propositions after selection led to a coaching role.",
    ],
    skills: [
      "Product frameworks", "Roadmapping", "Value propositions", "Business cases",
      "Coaching & mentorship", "Inclusive product practice",
    ],
    links: [],
  },
];

export const timeline = [
  { label: "City University of Seattle", start: 2014.2, end: 2023.5, color: "blue" },
  { label: "Google Cloud fellowship", start: 2021.75, end: 2022.75, color: "aqua" },
  { label: "UW Inclusive PM fellowship", start: 2021.75, end: 2021.95, color: "aqua" },
  { label: "Bloomberg LP", start: 2022.42, end: 2024.1, color: "blue" },
  { label: "Bitcoin Innovation Hub", start: 2024.17, end: 2026.5, color: "green" },
  { label: "BTechs", start: 2025.92, end: null, color: "green" }, // null = present
];

export const credentials = [
  "MIT DCI Global Research Network — Global Mapping committee lead",
  "Google Machine Learning Engineer track (expected 2026)",
  "Google Cloud Career Jump Start fellowship (2022)",
  "Advanced Certified Scrum Product Owner (CSPO), CSM (2023)",
  "Microsoft: Azure Fundamentals, Azure DevOps, Office 365 Fundamentals (2022)",
  "UW Certificate in Data Modeling & Warehousing",
];

// ============================================================
// The Story — scroll-journey chapters, chronological.
// Each chapter maps to a role page; `era` themes its backdrop.
// ============================================================
export const story = [
  {
    slug: "city-university",
    era: "foundation",
    year: "2014",
    heading: "The foundation: nine years inside the machine",
    text:
      "It starts in Seattle, inside a university's entire technology estate. Nine years as Technical Product Manager & Senior Systems Engineer — diagramming infrastructure until the inefficiencies had nowhere to hide. That diagramming became a one-year, $2.8M modernization program coordinating three vendors — Sabey, Cisco, and Juniper — five teams, and ten network products, with hardware procured straight through the first U.S.–China tariff war's delays and price shocks. Then the cloud: a directed migration to Azure with hybrid connectivity and redundant failover, $125K cut from annual costs — half the department's spend — and 80% off every infrastructure project through automation.",
    stat: { n: "$2.8M", l: "program uncovered by his own diagrams" },
  },
  {
    slug: "google-cloud-fellow",
    era: "fellowship",
    year: "2021",
    heading: "The sharpening: two fellowships, one year",
    text:
      "2021 was deliberate sharpening. Selected for Google Cloud's 12-week Cloud Career Jump Start fellowship — hands-on GCP with Google's own engineers, aligned to the Associate Cloud Engineer curriculum. And in the same season, chosen as one of fifty nationally for the University of Washington's Inclusive Product Management fellowship, where selection turned into a coaching seat. Infrastructure depth on one hand, product craft on the other — the two tracks this whole story braids together.",
    stat: { n: "1 of 50", l: "selected nationally — UW Inclusive PM" },
  },
  {
    slug: "bloomberg",
    era: "enterprise",
    year: "2022",
    heading: "The proving ground: Bloomberg scale",
    text:
      "Then the biggest stage in financial information. Senior Technical Product Manager owning 20+ digital properties and over 1,000 pages serving more than a million monthly users across Bloomberg's Law, Tax, and Government verticals. Over 200 features shipped through distributed teams across time zones — and a 100% pass rate across six GDPR/CCPA audits, because compliance was built into the product rather than inspected at the end.",
    stat: { n: "1M+", l: "monthly users across the estate" },
  },
  {
    slug: "bitcoin-innovation-hub",
    era: "founder",
    year: "2024",
    heading: "The leap: Kampala, a grant from Jack Dorsey",
    text:
      "Then the leap founders talk about. Co-founding the Bitcoin Innovation Hub in Kampala, Uganda — a financial-inclusion firm backed by a three-year, $300K grant from Jack Dorsey's #startsmall — run remotely from New York. The flagship: a Bitcoinized inventory and settlement product on BTCPayServer that cut transaction fees by more than 90%, putting modern asset management within reach of small businesses and refugee communities the traditional rails had priced out.",
    stat: { n: ">90%", l: "transaction fees cut for small businesses" },
  },
  {
    slug: "btechs",
    era: "founder",
    year: "2025",
    heading: "Now: BTechs, and the map of a global movement",
    text:
      "Which brings the story to now. BTechs — a New York charitable nonprofit building resilient, self-sovereign digital and financial infrastructure, and teaching security- and privacy-focused, equitable AI/ML on Google Cloud. Its flagship is the DCI Global Research Map: the public platform charting MIT DCI's worldwide Bitcoin research network, owned as Product Owner and Technical Lead from concept through production — PostgreSQL/Supabase, Vercel, GitHub CI/CD. The founder chapter isn't a detour from the enterprise track record. It's what that track record was for.",
    stat: { n: "Live", l: "dci-global-research-map.vercel.app" },
  },
];

// ============================================================
// Future sections — fill these in and they render automatically
// on the home page (same card format as the others).
// kind: "nonprofit" and kind: "freelance" are already styled.
// Example:
// export const extraWork = [
//   {
//     slug: "my-nonprofit-project",   // give it a unique slug
//     company: "Org Name",
//     title: "Role Title",
//     kind: "nonprofit",              // or "freelance"
//     badge: { mark: "XX", hue: "green" },
//     dates: "2024 – Present",
//     location: "New York, NY",
//     card: "One-sentence card summary.",
//     lede: "Longer intro paragraph for the detail page.",
//     responsibilities: ["...", "..."],
//     skills: ["...", "..."],
//     links: [],
//   },
// ];
export const extraWork = [];

// ============================================================
// Portfolio — sites built or owned, grouped by arena.
// Screenshots live in /public/portfolio/. Feature lines trace to
// the resume anchor registry + each site's own presentation —
// edit freely, the /portfolio page renders whatever is here.
// ============================================================
export const portfolio = {
  kicker: "// portfolio · sites shipped, 2022 → now",
  heading: "Portfolio",
  sub: "Sixteen properties across four arenas — founder builds owned end to end, and Bloomberg estates owned as Senior Technical Product Manager. Each entry shows the site and the features released on it.",
  groups: [
    {
      id: "bitcoin-ai",
      label: "Bitcoin & AI/ML",
      hue: "green",
      blurb: "The founder chapter — designed, built, and operated end to end: product, design, code, and infrastructure in one seat.",
      sites: [
        {
          name: "DCI Global Research Map",
          url: "https://dci-global-research-map.vercel.app/",
          shot: "/portfolio/dci-map.webp",
          role: "Product Owner & Technical Lead — concept through production",
          features: [
            "Public platform mapping MIT DCI's global research network — universities, institutions, and nonprofits working on Bitcoin, stablecoins, and financial sovereignty",
            "Interactive world map plus a browsable entity database with live updates",
            "Full production stack owned end to end: PostgreSQL/Supabase, Vercel deployments, GitHub CI/CD",
            "Community submission flow and admin review pipeline",
          ],
        },
        {
          name: "Btechs",
          url: "https://btechs.io",
          shot: "/portfolio/btechs.webp",
          role: "Founder & Technical Lead — product, design, build, ops",
          features: [
            "Interactive node-map homepage — drag to explore, scroll to zoom, the org as a living network",
            "Live ops strip: uptime, node count, latency, and Bitcoin payments status on the hero",
            "Workshop tracks productized — Bitcoin & cryptography, AI/ML platform on Google Cloud",
            "Engagement funnel from explore → scope → schedule a call",
          ],
        },
        {
          name: "Robots Will Cry",
          url: "https://robotswillcry.com",
          shot: "/portfolio/robotswillcry.webp",
          role: "Product, design & build — EP microsite for Udoka Malachi",
          features: [
            "Scroll-driven EP experience — kinetic type, film section, running order",
            "Merch shop where every order settles in Bitcoin over Lightning or on-chain",
            "Streaming hub routing to Spotify, Apple Music, YouTube Music, and Tidal",
            "Track-by-track video rollout wired to an email 'signal' list",
          ],
        },
        {
          name: "The 7eventh Foundation",
          url: "https://www.7eventhfoundation.org",
          shot: "/portfolio/7eventh.webp",
          role: "Product, design & build — 501(c)(3) nonprofit platform",
          features: [
            "Blockchain-motif hero chaining the foundation's three programs into one story",
            "Impact counters: students equipped, schools supported, counties reached, Bitcoin/TradFi sessions",
            "Donation and partner funnels with tax-deductible giving flows",
            "Program pages for equitable education, economic empowerment, and T7F Talks",
          ],
        },
      ],
    },
    {
      id: "bloomberg-legal",
      label: "Bloomberg Industry Group",
      hue: "blue",
      blurb: "The Law, Tax, and Government verticals — part of the 20+ property, 1,000+ page estate owned as Senior Technical Product Manager, serving 1M+ monthly users.",
      sites: [
        {
          name: "Bloomberg Law",
          url: "https://pro.bloomberglaw.com",
          shot: "/portfolio/bloomberg-law.webp",
          role: "Sr. Technical Product Manager — platform owner, Law vertical",
          features: [
            "Feature delivery across the legal research marketing estate — part of 200+ features shipped via Agile",
            "Salesforce Marketing Cloud integration: lead scoring, segmentation, and automation into the Law pipeline",
            "Technical SEO, accessibility, and GDPR/CCPA privacy flows — 100% pass rate across six audits",
            "Demo-request and pricing conversion funnels tuned against 1M+ monthly visitors",
          ],
        },
        {
          name: "Bloomberg Tax",
          url: "https://pro.bloombergtax.com",
          shot: "/portfolio/bloomberg-tax.webp",
          role: "Sr. Technical Product Manager — platform owner, Tax vertical",
          features: [
            "Product marketing platform for tax research and Bloomberg Tax software suites",
            "SFMC lead scoring and vertical segmentation feeding the Tax pipeline",
            "Roadmap-driven releases coordinated across engineering teams in multiple time zones",
            "Privacy-by-design page architecture sustained through every GDPR/CCPA audit",
          ],
        },
        {
          name: "Bloomberg Government",
          url: "https://about.bgov.com",
          shot: "/portfolio/bgov.webp",
          role: "Sr. Technical Product Manager — platform owner, Government vertical",
          features: [
            "Marketing estate for the AI-enabled policy intelligence platform",
            "Demo funnels connecting policy professionals to the BGOV product",
            "Insights and events architecture for the Government audience",
            "Accessibility and technical SEO ownership across the property",
          ],
        },
      ],
    },
    {
      id: "bloomberg-professional",
      label: "Bloomberg Professional Services",
      hue: "blue",
      blurb: "The professional-products estate — Terminal and enterprise product pages within the portfolio of properties owned and optimized at Bloomberg.",
      sites: [
        {
          name: "Bloomberg Professional",
          url: "https://www.bloomberg.com/professional",
          shot: "/portfolio/bprof-home.webp",
          role: "Sr. Technical Product Manager — professional estate",
          features: [
            "Flagship gateway for Bloomberg's professional products and the Terminal",
            "UX optimization and information architecture across the product family",
            "Conversion paths from content to demo request and Terminal subscription",
          ],
        },
        {
          name: "Bloomberg Terminal",
          url: "https://professional.bloomberg.com/products/bloomberg-terminal/",
          shot: "/portfolio/bprof-terminal.webp",
          role: "Sr. Technical Product Manager — product page owner",
          features: [
            "Product page for the Terminal — the financial world in full focus",
            "Feature releases and content updates shipped through the Agile roadmap",
            "Technical SEO keeping the page discoverable for high-intent queries",
          ],
        },
        {
          name: "Data Solutions",
          url: "https://professional.bloomberg.com/products/data/",
          shot: "/portfolio/bprof-data.webp",
          role: "Sr. Technical Product Manager — product page owner",
          features: [
            "Enterprise data product pages — reference, regulatory, pricing, ESG, alternative data",
            "Contact and qualification funnels for enterprise data buyers",
            "Page architecture aligned to Bloomberg's enterprise data taxonomy",
          ],
        },
        {
          name: "Trading Solutions",
          url: "https://professional.bloomberg.com/products/trading/",
          shot: "/portfolio/bprof-trading.webp",
          role: "Sr. Technical Product Manager — product page owner",
          features: [
            "Trading solutions product family pages across the buy side and sell side",
            "Roadmap delivery coordinated with distributed engineering teams",
            "Compliance-clean page patterns reused across the product estate",
          ],
        },
        {
          name: "Risk Solutions",
          url: "https://professional.bloomberg.com/products/risk/",
          shot: "/portfolio/bprof-risk.webp",
          role: "Sr. Technical Product Manager — product page owner",
          features: [
            "Risk management product pages for evolving market and regulatory risk",
            "Content and release management through the same estate-wide roadmap",
            "Accessibility compliance held across every release",
          ],
        },
        {
          name: "Compliance Solutions",
          url: "https://professional.bloomberg.com/products/compliance/",
          shot: "/portfolio/bprof-compliance.webp",
          role: "Sr. Technical Product Manager — product page owner",
          features: [
            "Compliance solutions pages integrated across trading and investment workflows",
            "Privacy and policy ownership — the vertical where compliance was the product",
            "Part of the estate that passed six consecutive GDPR/CCPA audits",
          ],
        },
      ],
    },
    {
      id: "bloomberg-climate",
      label: "Bloomberg Climate Initiatives",
      hue: "aqua",
      blurb: "Climate-finance properties supported within the Bloomberg digital portfolio — global initiatives with publication-heavy, high-visibility launches.",
      sites: [
        {
          name: "GFANZ",
          url: "https://www.gfanzero.com",
          shot: "/portfolio/gfanz.webp",
          role: "Sr. Technical Product Manager — digital platform support",
          features: [
            "Glasgow Financial Alliance for Net Zero — mobilizing transition finance",
            "Publication and resource hubs for high-visibility global reports",
            "Launch support for a property under intense public and press attention",
          ],
        },
        {
          name: "CFLI",
          url: "https://www.bloomberg.org/environment/",
          shot: "/portfolio/cfli.webp",
          role: "Sr. Technical Product Manager — digital platform support",
          features: [
            "Climate Finance Leadership Initiative — private capital for climate solutions",
            "Initiative pages now folded into Bloomberg Philanthropies' environment program",
            "Campaign-driven content launches on the Bloomberg digital estate",
          ],
        },
        {
          name: "BloombergNEF",
          url: "https://about.bnef.com",
          shot: "/portfolio/bnef.webp",
          role: "Sr. Technical Product Manager — digital platform support",
          features: [
            "Strategic research platform for the energy transition and commodity markets",
            "Insights, events, and subscription funnels for the BNEF research product",
            "Estate-standard SEO, accessibility, and privacy patterns",
          ],
        },
      ],
    },
  ],
};
