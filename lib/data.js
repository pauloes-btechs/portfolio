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
  { n: "6/6", l: "GDPR / CCPA audits passed, 100% rate" },
];

export const roles = [
  {
    slug: "btechs",
    company: "BTechs",
    badge: { mark: "BT", hue: "green" },
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
      "Validated product direction and prioritized roadmap investments through customer research and stakeholder interviews with universities, merchants, developers, and policymakers.",
      "Authored product documentation, implementation guides, and deployment automation enabling client engineering teams to stand up and operate their own infrastructure independently.",
      "Led the MIT DCI Global Research Network's Global Mapping committee and served on its Global Workshops committee, coordinating researchers and institutions across jurisdictions.",
    ],
    skills: [
      "Payments product design", "BTCPayServer", "Settlement models", "Stablecoin & Stripe integrations",
      "Customer discovery", "Stakeholder research", "Developer enablement", "Grant-funded delivery",
      "Financial inclusion", "Research-network leadership",
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
    links: [],
  },
  {
    slug: "city-university",
    company: "City University of Seattle",
    badge: { mark: "CU", hue: "blue" },
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
      "Diagrammed and uncovered infrastructure inefficiencies, leading to a one-year $2.8M project coordinating three vendors, five teams, and ten network products.",
      "Directed the migration to Microsoft Azure — secure hybrid connectivity via site-to-site VPN gateway and a redundant tertiary failover environment.",
      "Cut an estimated $125K in annual datacenter and maintenance costs through consolidation, resource management, and licensing optimization — halving the department's annual infrastructure spend.",
      "Deployed a collaboration platform on Azure DevOps with PowerShell-scripted automation, reducing time spent on infrastructure projects by 80%.",
      "Ran a two-year enterprise application sunset and migration as solutions architect and technical product manager — modernizing legacy ERP and re-architecting structured data stores.",
      "Administered the Microsoft estate end to end: Azure AD (Entra ID) identity with SSO and conditional access, M365 tenant administration, and 65,000 email accounts migrated to the cloud.",
    ],
    skills: [
      "Solutions architecture", "Azure cloud migration", "Cost optimization", "Vendor management",
      "Azure DevOps & CI/CD", "PowerShell automation", "Identity & access management",
      "ERP modernization", "Data governance", "Stakeholder alignment",
    ],
    links: [],
  },
  {
    slug: "google-cloud-fellow",
    company: "Google",
    title: "Cloud Fellow, Cloud Engineer",
    kind: "fellowship",
    badge: { mark: "G", hue: "aqua" },
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
      "It starts in Seattle, inside a university's entire technology estate. Nine years as Technical Product Manager & Senior Systems Engineer — diagramming infrastructure until the inefficiencies had nowhere to hide. That diagramming became a one-year, $2.8M modernization program coordinating three vendors, five teams, and ten network products. Then the cloud: a directed migration to Azure with hybrid connectivity and redundant failover, $125K cut from annual costs — half the department's spend — and 80% off every infrastructure project through automation.",
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
