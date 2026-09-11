# Anchor Registry — generated from pauloes.com role pages (2026-09-11)

**Source of truth:** `lib/data.js` in the pauloes portfolio repo — the same file that renders
every `/roles/<slug>` page on https://pauloes.com. Edit bullets THERE; then run
`node resume-coach/sync_registry.mjs` to regenerate this file. Never hand-edit the tables
below — edits are overwritten on the next sync. Weights live in `anchor-weights.json`.

Scoring is unchanged: **Placement = 2·Impact + Relevance**, Relevance assigned per JD (0–3).
Impact ≥ 4 ships unless Relevance = 0. Within a role, order by score descending.
**Track** = `product` (ships on any resume), `systems` (infra/security/IT JDs only),
`both`. **LP** = Amazon Leadership Principles the bullet evidences (see RULES.md → Leadership
Principles layer; a matching principle in a JD adds +1 Relevance, capped at 3). **Evidence rule stands:** every bullet here is Pauloes' own published claim;
wording may flex per doctrine §16, facts and figures never do, and nothing may be added
to a resume that is not in this file or attested by him in the conversation.

## BTechs — Founder & Technical Lead (New York, NY · Dec 2025 – Present)

*Context line:* MIT-backed New York charitable nonprofit building resilient, self-sovereign digital and financial infrastructure and delivering security- and privacy-focused, equitable AI/ML education.
*Lede:* BTechs is an MIT-backed New York charitable nonprofit delivering public-interest technology: resilient, self-sovereign digital and financial infrastructure for individuals, community organizations, and nonprofits, and security- and privacy-focused, equitable AI/ML education.

| ID | # | Anchor (verbatim from the site) | I | Track | LP | Note |
|---|---|---|---|---|---|---|
| T1 | R1 | Product Owner and Technical Lead for the DCI Global Research Map, the public platform mapping MIT DCI's global Bitcoin research network — owned from concept through launch. | **4** | product | OW CO DR | Product Owner + Technical Lead seat; concept→launch. Pair with the discovery bullet (committee, 29 inst / 25 researchers, 200% QoQ) when it lands on the site. |
| T1a | R2 | Lead the map's Global Mapping committee — PhD researchers and professors spanning computer science, mathematics, environmental science, law, government banking, philosophy, and electrical engineering — running customer interviews that define product features, attestation processes, and product requirements; the research database spans 29 institutions and 25 researchers, growing 200% quarter over quarter. | **4** | product | CO DD RL | Discovery/requirements seat. 29 institutions / 25 researchers / 200% QoQ attested 2026-09-04 — a MOVING figure; re-confirm with Pauloes before reuse after 2026-12. Same committee as BIH H3 (origin story); cut H3 first on a tight page. |
| T1b | R3 | Architect and operate the full production stack: React and TypeScript on a PostgreSQL/Supabase database, Vercel hosting and deployments, and GitHub-based source control and CI/CD, from local development through production. | **3** | product | OW FR DD | Stack bullet; add React/TypeScript on the site (attested 2026-09-04). |
| T4 | R4 | Lead product and technical consulting engagements for individual and nonprofit clients — web platforms, cloud environments, and development workflows from requirements through launch. | **2** | product | CO DR | Consulting engagements; first to cut on a tight page. |
| T2 | R5 | Design and teach applied AI/ML workshops on Google Cloud: Introduction to AI and Machine Learning, Preparing Data for ML APIs, Creating and Evaluating ML Models with BigQuery ML (classification and forecasting), and Dialogflow conversational agents. | **3** | product | LC HD TB | Spikes R=3 on AI/ML, GCP, data-platform, education JDs. |
| T5 | R6 | Co-lead BTechs' global Bitcoin education program — workshops building community capacity for self-custody and sovereign financial tooling. | **2** | product | HD SR | Always 'co-lead'. Redundant when BIH R3 (1,000+ graduates) ships — cut it then. |
| T6 | R7 | Represent BTechs at industry events and speaking engagements; cultivate relationships with leading Bitcoin researchers worldwide. | **2** | product | ET TB | Redundant when the BIH fundraising/speaking bullet ships — cut it then. |

*Skills on the page:* Zero-to-one product ownership · Full-stack architecture · PostgreSQL / Supabase · Vercel · GitHub CI/CD · Google Cloud AI/ML · BigQuery ML · Curriculum design · Community & research partnerships · Nonprofit leadership
*Vendors/partners on the page:* MIT Media Lab, Georgia Tech, Reed College, CU Boulder, McMaster University, University of Central Florida, Old Dominion University · VMASC, SUNY Nassau, University of Wyoming
*Links on the page:* [DCI Global Research Map (live)](https://dci-global-research-map.vercel.app/) · [Repository — Btechs-org/DCI-Global-Research-Map](https://github.com/Btechs-org/DCI-Global-Research-Map) · [btechs.io](https://btechs.io)

## Bitcoin Innovation Hub — Co-Founder & CEO (Kampala, Uganda · Remote (New York, NY) · Mar 2024 – Jul 2026)

*Context line:* Bitcoin technology and financial-inclusion firm backed by a three-year, $300K grant from Jack Dorsey's #startsmall (fiscal sponsor: Human Rights Foundation).
*Lede:* The Bitcoin Innovation Hub was a Kampala-based Bitcoin technology and financial-inclusion firm, backed by a three-year $300,000 grant from Jack Dorsey's #startsmall initiative, empowering individuals, businesses, and communities — with a focus on refugee economic opportunity — to harness Bitcoin.

| ID | # | Anchor (verbatim from the site) | I | Track | LP | Note |
|---|---|---|---|---|---|---|
| H1 | R1 | Designed and shipped a Bitcoinized inventory and settlement product, implemented on BTCPayServer, that cut transaction fees by more than 90% — improving liquidity and bringing modern asset management within reach of small businesses. | **5** | product | IS CO DR | MUST-HAVE. PM phrasing on resumes: 'Designed and launched a 0-to-1 … product on BTCPayServer'. |
| H2 | R2 | Worked with vendors to implement point-of-sale systems and bespoke payment integrations, including stablecoin acceptance and Stripe on client digital platforms. | **4** | product | CO DR | Payments/GTM variants; R=0 on pure infra. |
| H6 | R3 | Built and delivered the Hub's financial-literacy and Bitcoin education program, graduating more than 1,000 refugees with diplomas covering practical financial skills and peer-to-peer Bitcoin transactions. | **5** | product | TB SR DR | MUST-HAVE per Pauloes 2026-09-04. PM phrasing: 'Took … from 0 to 1 and scaled it'. |
| H7 | R4 | Ran intensive two-day developer workshops for 125+ third- and fourth-year computer science students — granting 100+ Blockstream Jade hardware wallets to students and two Bitcoin miners to the university — from which student teams went on to lead four flagship builds: Bitcoin-powered savings and micro-investment apps, remittance platforms, point-of-sale solutions, and real-world-asset tokenization. | **4** | product | HD TB SR | MUST-HAVE. PM phrasing: 'Drove developer go-to-market and ecosystem growth …' Makerere University is the university. |
| H5 | R5 | Validated product direction and prioritized roadmap investments through customer research and stakeholder interviews with universities, merchants, developers, and policymakers. | **3** | product | CO RL | Superseded on the page by the BTechs discovery bullet when both would appear. |
| H4 | R6 | Authored product documentation, implementation guides, and deployment automation enabling client engineering teams to stand up and operate their own infrastructure independently. | **3** | product | IS HS | Enablement/docs; GTM and developer-platform JDs. |
| H8 | R7 | Raised the Hub's founding capital — the three-year, $300K #startsmall grant from Jack Dorsey — and represented the Hub as a public speaker, including the recorded talk Empowering Through Education: Bitcoin's Role in Awareness and Adoption. | **3** | product | ET TB BA | MUST-HAVE per Pauloes 2026-09-04 (fundraising + public speaking). The #startsmall grant is the ONLY raise on file. The talk title autolinks to the YouTube recording in render_docs.py. |
| H3 | R8 | Joined the MIT DCI Global Research Network as an Africa lead focused on growing the network across the continent — going on to lead its global growth initiative as Global Mapping committee lead, serving on the Global Workshops committee and coordinating researchers and institutions across jurisdictions. | **4** | product | OW TB ET | Same committee seat as the BTechs discovery bullet: H3 = origin/growth story, BTechs = requirements work; on a tight page keep one. |

*Skills on the page:* Payments product design · BTCPayServer · Settlement models · Stablecoin & Stripe integrations · Customer discovery · Stakeholder research · Developer enablement · Grant-funded delivery · Financial inclusion · Research-network leadership
*Vendors/partners on the page:* #startsmall, Human Rights Foundation, HRF Bitcoin Development Fund, Blockstream, MIT Digital Currency Initiative, MIT Media Lab, Sphinx Chat, Stakwork, Makerere University
*Links on the page:* [#startsmall grant tracker (public record)](https://docs.google.com/spreadsheets/d/1-ycOLoA496Qj37IHJvrXO3Vg2ETvMphtRGjyv2FNn8c/edit?gid=0#gid=0&range=C104) · [btchubafrica.com (archive)](https://btchubafrica.com/about-us/) · [Talk — Empowering Through Education: Bitcoin's Role in Awareness and Adoption](https://www.youtube.com/watch?v=NubSrCXgmdk&t=1280s)

## Bloomberg LP — Senior Technical Product Manager (New York, NY · Jun 2022 – Feb 2024)

*Context line:* Digital platform ownership across Bloomberg's Law, Tax, and Government verticals.
*Lede:* At Bloomberg I owned the full lifecycle of the company's digital platform across its financial verticals — 20+ properties and more than 1,000 pages serving over a million monthly users — where compliance was treated as part of the product, not a review at the end.

| ID | # | Anchor (verbatim from the site) | I | Track | LP | Note |
|---|---|---|---|---|---|---|
| B1 | R1 | Built and managed over 20 company websites and 1,000+ pages serving 1M+ monthly users — defining product requirements, maintaining documentation, prioritizing delivery, and executing against strategic roadmaps. | **5** | product | OW DR | MUST-HAVE. The ONLY place the 1M+ figure belongs. |
| B2 | R2 | Shipped the Salesforce Marketing Cloud and SalesWings integration across the Law, Tax, and Government verticals, aligning sales and marketing on CRM-connected lead scoring by urgency and interest and reviving cold leads, lifting sales conversion rates 17% YoY and email CTR 25%. | **4** | product | CO DR DD | Resume form ends at the 17% YoY / 25% CTR result; the 1M+ figure belongs to B1 (scope rule, 2026-09-04). |
| B7 | R3 | Led integration and onboarding of Salesforce Marketing Cloud, SalesWings, Webflow, and Asana through legal, procurement, and security review; Webflow campaign landing pages with twice-weekly social posting had Bloomberg Law generating leads 2.5x faster year over year. | **4** | product | OW ET DR | Legal/procurement/security review + Webflow 2.5x faster YEAR over year (corrected from MoM 2026-09-04). |
| B4 | R4 | Owned architecture, UX optimization, accessibility compliance, privacy and policy, and technical SEO across the estate — sustaining a 100% pass rate across six GDPR/CCPA audits. | **4** | product | HS ET OW | Six audits = GDPR, CCPA, ISO/IEC 27001, ISO/IEC 27701, SOC 2, NIST CSF; ship the list on compliance-leaning JDs. |
| B3 | R5 | Orchestrated Agile delivery of over 200 features, coordinating engineering teams across time zones and communicating priorities and milestones to technical and executive stakeholders. | **4** | product | DR BA | 200+ features; exec stakeholders. |
| B9 | R6 | Led Scrum ceremonies end to end, sprint planning, estimation and backlog refinement, daily standups, and retrospectives, and owned product documentation in Confluence alongside Google Docs, Sheets, and Slides. | **2** | product | HS DR | Scrum ceremonies + Confluence. Ships on Agile/Scrum-heavy JDs. |
| B10 | R7 | Prioritized the backlog and sprints against OKRs, and reported progress through monthly and quarterly business reviews with executives and keep-informed stakeholders: presentations and reports covering what shipped, what is in flight, and what comes next. | **3** | product | DD ET DR | OKR-driven prioritization + MBR/QBR exec reporting. Spikes on Doerr/OKR/KP companies. |
| B11 | R8 | Gated what entered the backlog and what got built based on ROI: sizing engineering and design costs against expected return before work was committed, and prioritizing work that cut tech debt and engineering spend alongside the customer needs carrying the highest return. | **3** | product | FR RL DD | ROI-gated backlog; tech-debt vs customer return. |
| B6 | R9 | Led Bloomberg CORE, a shared parent theme that grew out of the Bloomberg Law redesign: its best elements, mega menus, carousels, and cards, became a component library for every future web build, cutting production and deployment time and engineering cost of new builds by 50%, with updates and patches applied once and inherited identically by every site on the theme. | **4** | product | IS FR HS | Bloomberg CORE. 50% figure added to the site 2026-09-05 [reported]; never sharpen. |
| B12 | R10 | Ran planning and architecture sessions on whiteboards and Miro to visualize roadmaps, system designs, and next steps, and managed delivery in Jira with engineers and designers: epics, stories, tasks, and bugs, with labels and components giving every project visibility in progress reports. | **2** | product | DD IS | Miro/Jira delivery mechanics. |
| B13 | R11 | Built RACI matrices during project planning to assign roles and responsibilities across engineering, design, marketing, legal, and executive stakeholders: one accountable owner per deliverable, consulted parties engaged before decisions were made, and informed groups tied to the right reporting cadence, eliminating ownership ambiguity and duplicated work across distributed teams. | **2** | product | OW ET | RACI matrices; pairs with the launch-checklist story. |
| B5 | R12 | Interviewed customers, Customer Support, and Sales across Bloomberg Law, Tax, and Government to surface product gaps — translating validated needs into roadmap priorities. | **3** | product | CO DD | Customer/CS/Sales interviews → roadmap. |

*Skills on the page:* Enterprise platform ownership · Roadmap strategy · Agile at scale · OKR-driven prioritization · ROI analysis · Design systems · Scrum ceremonies · RACI matrices · Jira & Confluence · Miro · Privacy-by-design · GDPR / CCPA · Salesforce Marketing Cloud · Technical SEO · Accessibility · Executive communication · Customer discovery
*Vendors/partners on the page:* Salesforce Marketing Cloud, Webflow, Asana, SalesWings
*Certifications on the page:* Bloomberg Market Concepts (BMC) (December 27, 2021); Bloomberg ESG Certificate (July 17, 2023)

## City University of Seattle — Technical Product Manager & Senior Systems Engineer (Seattle, WA · Mar 2014 – Jul 2023)

*Context line:* Nine years owning enterprise infrastructure and its product roadmap end to end.
*Lede:* Nine years owning the university's technology estate end to end, from diagramming infrastructure inefficiencies that became a $2.8M modernization program to directing the migration to Microsoft Azure with secure hybrid connectivity and redundant failover, while running tenant-wide security and compliance across Microsoft 365 and passing every annual third-party audit.

| ID | # | Anchor (verbatim from the site) | I | Track | LP | Note |
|---|---|---|---|---|---|---|
| C1 | R1 | Diagrammed and uncovered infrastructure inefficiencies, leading to a one-year $2.8M project coordinating three vendors, five teams, and ten network products — the anchor of a two-year network infrastructure upgrade delivered through the first U.S.–China tariff war's hardware delays and cost escalations. | **5** | both | DD TB OW | MUST-HAVE. Resume form adds 'managing tariff-war hardware delays and cost escalations across vendors, legal, and executive stakeholders'. |
| C5 | R2 | Directed the migration to Microsoft Azure Cloud, delivering secure hybrid connectivity via a site-to-site VPN gateway and a redundant tertiary failover environment. | **3** | both | OW HS BA | Azure migration; on-thesis for cloud/infra. |
| S17 | R3 | Owned identity and access management for Azure resources and resource groups through Azure RBAC, scoping every role assignment to the least privilege possible. | **3** | systems | HS OW | Azure RBAC least privilege on resources and resource groups (site, 2026-09-10). Spikes on IAM, cloud-security, and Zero Trust JDs. |
| S18 | R4 | Built and ran the Azure network layer: virtual networks, VPN gateways, connections, and peerings, network security groups with inbound and outbound firewall rules, subnets, and DNS zones providing tertiary DNS redundancy. | **3** | systems | OW HS DD | Azure network layer: VNets, VPN gateways, peerings, NSG rules, subnets, DNS zones with tertiary redundancy (site, 2026-09-10). Pairs with C5 on cloud-infra JDs; never ship both at full length. |
| S19 | R5 | Deployed Azure Virtual Desktop (formerly Windows Virtual Desktop) workspaces for secure access to applications and resources, and gated server resources behind Just-in-Time access. | **3** | systems | IS HS BA | Azure Virtual Desktop workspaces + Just-in-Time access (site, 2026-09-10). Spikes R=3 on Windows 365 / Cloud PC / VDI asks. |
| S4 | R6 | Ran core network and infrastructure services — Active Directory, DNS, DHCP, switches, firewalls, and wireless — across a hybrid environment of over 100 servers with redundant failover. | **3** | systems | OW HS | 100+ servers. |
| C3 | R7 | Deployed a collaboration platform on Azure DevOps with Terraform and PowerShell-scripted automation to improve repeatability and scalability, cutting time to deploy per infrastructure project by 80% — from 16 hours to just over 3. | **4** | both | IS FR DR | 80% = 16h → ~3h per project (site-attested); Terraform + PowerShell. |
| C2 | R8 | Cut annual datacenter and maintenance spend in half — $250K to $125K — by consolidating physical servers onto VMware vSphere/ESXi virtual machines with Nimble NAS/SAN storage, shrinking the footprint from seven full racks to two, and relocating colocation from a downtown datacenter to Sabey's facility 15 miles outside the city for cheaper monthly hosting. | **4** | both | FR RL DR | $250K → $125K; VMware vSphere/ESXi + Nimble; 7 racks → 2; Sabey relocation (site-attested). |
| S2 | R9 | Implemented and administered Azure Active Directory (Entra ID) — SSO, conditional access, dynamic groups, and MFA including FIDO2/YubiKey policies — automating identity provisioning and enforcing security standards. | **3** | both | HS OW | Entra ID / SSO / conditional access / MFA FIDO2. |
| C6 | R10 | Served on the university's security committee responsible for change management and the identity lifecycle: onboarding and offboarding users, and governing security groups whose membership auto-provisioned access to applications, file shares, and resources across the Microsoft environment. | **3** | both | OW ET HS | Security committee: change management + identity lifecycle. Replaces the old 'IT lead for cross-departmental initiatives' wording. |
| S12 | R11 | Ran hybrid identity across Entra ID, Office 365, and on-premises Active Directory, keeping directories synchronized across every domain controller, local and cloud, through Microsoft Entra Connect (then Azure AD Connect). | **2** | systems | DD HS | Hybrid identity via Entra Connect. |
| S13 | R12 | Led vendor communications to stand up SAML single sign-on in Entra ID for third-party applications such as Zoom, Blackboard, and Brightspace: exchanging federation metadata and token-signing certificates, configuring sign-on and reply URLs and entity IDs, mapping identity claims such as name and email, and auto-provisioning users against available licenses through SCIM. | **3** | systems | OW ET DD | SAML SSO + SCIM provisioning for Zoom/Blackboard/Brightspace (added to the site 2026-09-05+). |
| S14 | R13 | Managed the Windows Server and SQL Server estates from Server 2012 through Server 2022, migrating and integrating workloads with Azure through Azure Migrate and System Center, and moving SQL services from on premises to the cloud with backups and restores. | **2** | systems | OW DD | Windows Server / SQL Server estate; Azure Migrate, System Center. |
| S15 | R14 | Ran SQL Server maintenance across full, differential, and transaction log backups, and configured networking and security access for instances and databases on least privilege, using group Managed Service Accounts and passwordless authentication. | **2** | systems | HS DD | SQL Server backups, least privilege, gMSA. |
| C7 | R15 | Owned annual third-party security audits of the Active Directory estate — assessed by McKinsey against ISO 27001, the NIST Cybersecurity Framework (NIST CSF), and SOC 2 — passing every audit, with year-round standards readiness as a core part of the role. | **4** | both | HS ET DD | McKinsey-assessed ISO 27001 / NIST CSF / SOC 2 — ships wherever legal, risk, compliance, or security appear in a JD. |
| S1 | R16 | Administered the Microsoft 365 estate end to end — tenant administration across Exchange, Teams, and SharePoint — migrating 65K email accounts to the cloud and owning Office 365 adoption. | **3** | systems | OW DR | 65K mailboxes. |
| S3 | R17 | Managed the endpoint fleet through Intune (MDM/MAM) and Autopilot provisioning across Windows, macOS, and mobile devices, enforcing device security and compliance policies. | **3** | systems | HS OW | Intune/Autopilot. |
| C4 | R18 | Ran a two-year enterprise application sunset and migration as solutions architect and technical product manager — modernizing legacy ERP and re-architecting structured data stores. | **3** | both | OW TB DR | ERP sunset/migration as solutions architect. |
| S5 | R19 | Oversaw managed service providers and vendors — scoping, escalation, and delivery oversight — while providing direct support to executives and end users. | **2** | systems | ET CO | MSP/vendor oversight + exec support. |
| | | **Microsoft 365 Security & Compliance Operations** — Detection, prevention, and remediation across the tenant, 2014–2023. Operated under the product names of the time; listed with their current Microsoft names. | | | |
| S7 | P1 | Ran email threat protection across the tenant through Exchange Online Protection and Microsoft Defender for Office 365 (then Office 365 ATP) — tuning spam and phishing filter policies and thresholds, managing quarantine and release, and using zero-hour auto purge to retract spam and phishing mail already delivered. | **3** | systems | HS DD | Defender for Office 365 / EOP; spikes R=3 on detection, screening, fraud, sanctions/AML, trust-and-safety JDs. |
| S8 | P2 | Maintained tenant allow and block lists for sender domains and IP ranges, and blocked sign-ins by country and IP range through Entra Conditional Access named locations. | **2** | systems | HS BA | Allow/block lists + Conditional Access geo-blocking. |
| S9 | P3 | Wrote Microsoft Purview DLP policies (then Office 365 DLP) on sensitive-information types such as Social Security numbers, credit card numbers, dates of birth, and other PII, auto-encrypting outbound email containing them, and enforced tenant-wide compliance policies. | **3** | systems | HS OW | Purview DLP with PII types (site-expanded 2026-09-05+). |
| S10 | P4 | Built anomaly detection and automated remediation in Microsoft Sentinel (then Azure Sentinel) and Entra ID Protection — alerting on unusual-IP and unusual-location sign-ins and auto-blocking risky accounts. | **3** | systems | DD BA IS | Sentinel + Entra ID Protection anomaly detection / auto-remediation. |
| S16 | P5 | Ran compromised-account investigation and response from the Microsoft Defender portal (then the Office 365 Security & Compliance Center): auditing sign-in activity, inbox rules, and user risk state on suspect accounts, confirming compromise in Entra ID Protection, remediating with forced password resets and revoked sign-in sessions to log out every device, and containing threats through quarantine policies, litigation holds on mailboxes under investigation, and automated investigation and response (AIR) playbooks. | **3** | systems | DD BA OW | Compromised-account IR from the Defender portal: AIR playbooks, litigation holds, session revocation (site-attested). |
| S11 | P6 | Rolled out two-step verification (MFA) tenant-wide, alongside the FIDO2/YubiKey policies above, and owned the tenant's security settings baseline. | **2** | systems | HS OW | MFA rollout + security baseline; folds into S2 when S2 ships. |

*Skills on the page:* Solutions architecture · Azure cloud migration · Cost optimization · Vendor management · Azure DevOps & CI/CD · PowerShell automation · Identity & access management · Azure RBAC & networking · Azure Virtual Desktop · ERP modernization · Microsoft 365 administration · Intune & Autopilot · Security audits (ISO 27001 · NIST CSF · SOC 2) · Data governance · Stakeholder alignment · Defender for Office 365 · Microsoft Sentinel · Purview DLP · Conditional Access · Incident response & remediation · SAML SSO & SCIM provisioning · SQL Server administration · Terraform · VMware vSphere & ESXi · Nimble NAS/SAN storage
*Vendors/partners on the page:* Microsoft, VMware, CDW, Symantec, GFI LanGuard, DocImage, Iron Mountain, Zoom, Blackboard, D2L Brightspace, Virtru, Citrix, Google, McKinsey & Company, Cloudflare, Sabey, Cisco, Juniper Networks, HP, Dell

## Google — Cloud Fellow, Cloud Engineer (Remote · Oct 2021 – Oct 2022)

*Context line:* Selective 12-week Cloud Career Jump Start fellowship — not an employment role, and never dressed up as one.
*Lede:* A selective 12-week Google Cloud fellowship that turned cloud fluency into hands-on GCP practice — compute, storage, networking, IAM, and databases — working directly with Google Cloud practitioners. It's the foundation the BTechs Google Cloud AI/ML teaching practice stands on today.

| ID | # | Anchor (verbatim from the site) | I | Track | LP | Note |
|---|---|---|---|---|---|---|
| G1 | R1 | Selected for Google Cloud's 12-week Cloud Career Jump Start fellowship, completing training aligned with the Associate Cloud Engineer curriculum. | **2** | both | LC | Fellowship, never an employment role. R=3 on GCP/cloud JDs earns a role block; else compress to the certifications line. |
| G1b | R2 | Practiced deploying and managing GCP compute, storage, networking, IAM, and databases through hands-on labs and sessions with Google Cloud engineers. | **1** | both | LC | Detail of G1. |
| G1c | R3 | Applied cloud architecture, security, monitoring, operations, and troubleshooting patterns with Google Cloud practitioners. | **1** | both | LC | Detail of G1. |

*Skills on the page:* Google Cloud Platform · Compute & storage · Cloud networking · IAM · Cloud databases · Architecture patterns · Monitoring & operations · Troubleshooting

## University of Washington — Foster School of Business — Inclusive Product Management Fellow (Seattle, WA · Oct 2021 – Dec 2021)

*Context line:* Ten-week program at the UW Product Management Center — one of fifty selected nationally.
*Lede:* One of fifty fellows selected nationally for the UW Product Management Center's Inclusive Product Management program — a ten-week deep dive into product frameworks that turned into a coaching seat, working with participants on roadmaps, value propositions, and business cases.

| ID | # | Anchor (verbatim from the site) | I | Track | LP | Note |
|---|---|---|---|---|---|---|
| F1 | R1 | Selected as one of fifty fellows nationally for the UW Product Management Center's Inclusive Product Management program. | **2** | product | LC HD | One of fifty nationally. R=3 on coaching/mentoring/SME JDs; else compress to the certifications line. |
| F1b | R2 | Coached participants on business and product frameworks, roadmaps, and value propositions after selection led to a coaching role. | **2** | product | HD ET | Coaching seat detail. |

*Skills on the page:* Product frameworks · Roadmapping · Value propositions · Business cases · Coaching & mentorship · Inclusive product practice

## Credentials (site `credentials`)

- MIT DCI Global Research Network — Global Mapping committee lead
- Google Machine Learning Engineer track (expected 2026)
- Google Cloud Career Jump Start fellowship (2022)
- Advanced Certified Scrum Product Owner (CSPO), CSM (2023)
- Microsoft: Azure Fundamentals, Azure DevOps, Office 365 Fundamentals (2022)
- UW Certificate in Data Modeling & Warehousing

## Leadership Principles — evidence index

Amazon's sixteen principles in Amazon's own order. Each lists the anchors that evidence it,
so an interview story or a JD that names the principle (or its synonym at another company)
starts from real, on-file experience. Never print principle names on a resume; let the verbs
and outcomes carry them. Synonym map and writing rules: RULES.md.

- **Customer Obsession** (CO): T1 (BTechs), T1a (BTechs), T4 (BTechs), H1 (Bitcoin Innovation Hub), H2 (Bitcoin Innovation Hub), H5 (Bitcoin Innovation Hub), B2 (Bloomberg LP), B5 (Bloomberg LP), S5 (City University of Seattle)
- **Ownership** (OW): T1 (BTechs), T1b (BTechs), H3 (Bitcoin Innovation Hub), B1 (Bloomberg LP), B7 (Bloomberg LP), B4 (Bloomberg LP), B13 (Bloomberg LP), C1 (City University of Seattle), C5 (City University of Seattle), S17 (City University of Seattle), S18 (City University of Seattle), S4 (City University of Seattle), S2 (City University of Seattle), C6 (City University of Seattle), S13 (City University of Seattle), S14 (City University of Seattle), S1 (City University of Seattle), S3 (City University of Seattle), C4 (City University of Seattle), S9 (City University of Seattle), S16 (City University of Seattle), S11 (City University of Seattle)
- **Invent and Simplify** (IS): H1 (Bitcoin Innovation Hub), H4 (Bitcoin Innovation Hub), B6 (Bloomberg LP), B12 (Bloomberg LP), S19 (City University of Seattle), C3 (City University of Seattle), S10 (City University of Seattle)
- **Are Right, A Lot** (RL): T1a (BTechs), H5 (Bitcoin Innovation Hub), B11 (Bloomberg LP), C2 (City University of Seattle)
- **Learn and Be Curious** (LC): T2 (BTechs), G1 (Google), G1b (Google), G1c (Google), F1 (University of Washington — Foster School of Business)
- **Hire and Develop the Best** (HD): T2 (BTechs), T5 (BTechs), H7 (Bitcoin Innovation Hub), F1 (University of Washington — Foster School of Business), F1b (University of Washington — Foster School of Business)
- **Insist on the Highest Standards** (HS): H4 (Bitcoin Innovation Hub), B4 (Bloomberg LP), B9 (Bloomberg LP), B6 (Bloomberg LP), C5 (City University of Seattle), S17 (City University of Seattle), S18 (City University of Seattle), S19 (City University of Seattle), S4 (City University of Seattle), S2 (City University of Seattle), C6 (City University of Seattle), S12 (City University of Seattle), S15 (City University of Seattle), C7 (City University of Seattle), S3 (City University of Seattle), S7 (City University of Seattle), S8 (City University of Seattle), S9 (City University of Seattle), S11 (City University of Seattle)
- **Think Big** (TB): T2 (BTechs), T6 (BTechs), H6 (Bitcoin Innovation Hub), H7 (Bitcoin Innovation Hub), H8 (Bitcoin Innovation Hub), H3 (Bitcoin Innovation Hub), C1 (City University of Seattle), C4 (City University of Seattle)
- **Bias for Action** (BA): H8 (Bitcoin Innovation Hub), B3 (Bloomberg LP), C5 (City University of Seattle), S19 (City University of Seattle), S8 (City University of Seattle), S10 (City University of Seattle), S16 (City University of Seattle)
- **Frugality** (FR): T1b (BTechs), B11 (Bloomberg LP), B6 (Bloomberg LP), C3 (City University of Seattle), C2 (City University of Seattle)
- **Earn Trust** (ET): T6 (BTechs), H8 (Bitcoin Innovation Hub), H3 (Bitcoin Innovation Hub), B7 (Bloomberg LP), B4 (Bloomberg LP), B10 (Bloomberg LP), B13 (Bloomberg LP), C6 (City University of Seattle), S13 (City University of Seattle), C7 (City University of Seattle), S5 (City University of Seattle), F1b (University of Washington — Foster School of Business)
- **Dive Deep** (DD): T1a (BTechs), T1b (BTechs), B2 (Bloomberg LP), B10 (Bloomberg LP), B11 (Bloomberg LP), B12 (Bloomberg LP), B5 (Bloomberg LP), C1 (City University of Seattle), S18 (City University of Seattle), S12 (City University of Seattle), S13 (City University of Seattle), S14 (City University of Seattle), S15 (City University of Seattle), C7 (City University of Seattle), S7 (City University of Seattle), S10 (City University of Seattle), S16 (City University of Seattle)
- **Have Backbone; Disagree and Commit** (BB): _no anchor tagged yet_
- **Deliver Results** (DR): T1 (BTechs), T4 (BTechs), H1 (Bitcoin Innovation Hub), H2 (Bitcoin Innovation Hub), H6 (Bitcoin Innovation Hub), B1 (Bloomberg LP), B2 (Bloomberg LP), B7 (Bloomberg LP), B3 (Bloomberg LP), B9 (Bloomberg LP), B10 (Bloomberg LP), C3 (City University of Seattle), C2 (City University of Seattle), S1 (City University of Seattle), C4 (City University of Seattle)
- **Strive to be Earth's Best Employer** (BE): _no anchor tagged yet_
- **Success and Scale Bring Broad Responsibility** (SR): T5 (BTechs), H6 (Bitcoin Innovation Hub), H7 (Bitcoin Innovation Hub)

