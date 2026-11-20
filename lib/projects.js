// ============================================================
// Btechs project registry — the single source of truth for the
// engineering projects shown on the homepage (Selected Builds),
// /portfolio (Btechs explorer + detail pages), the Story's nested
// Btechs milestones, and /roles/btechs.
//
// Editorial rules (automation: docs/PORTFOLIO_AUTOMATION.md):
//   • Every claim traces to repository evidence listed in `sources`.
//   • Maturity is what the code proves today, not what the README hopes.
//   • Private repositories never get a public repoUrl or internal detail.
//   • Only records with publish: "approved" render anywhere on the site.
//   • Hand edits win: automation proposes diffs, a human merges them.
// Last verified: 2026-11-20 (impact ranking set by Pauloes; NEARAuth and Foundry added).
// ============================================================

/** Allowed maturity levels, ordered least → most mature. */
export const MATURITY = {
  concept: { label: "Concept", rank: 0 },
  prototype: { label: "Prototype", rank: 1 },
  "tested-mvp": { label: "Tested MVP", rank: 2 },
  "public-demo": { label: "Public demo", rank: 3 },
  production: { label: "Production", rank: 4 },
};

/** Explorer categories, in display order. */
export const projectCategories = [
  {
    id: "ai-agents",
    label: "AI & Autonomous Agents",
    blurb: "Systems where AI does real work — and the controls that keep it honest.",
  },
  {
    id: "security-identity",
    label: "Security, Privacy & Identity",
    blurb: "Giving people control over who holds their identity — and proof of what happened to it.",
  },
  {
    id: "bitcoin-payments",
    label: "Bitcoin & Payments",
    blurb: "Self-custody and payment infrastructure for people who should own their money.",
  },
  {
    id: "data-research",
    label: "Data, ML & Research",
    blurb: "Research platforms and data products built for a global community.",
  },
  {
    id: "engineering",
    label: "Engineering & Infrastructure",
    blurb: "Algorithmic products and civic data infrastructure, built from first principles.",
  },
];

export const projects = [
  // ---------------------------------------------------------------- NEARAuth
  {
    id: "nearauth",
    slug: "nearauth",
    name: "NEARAuth",
    organization: "Btechs",
    category: "security-identity",
    tagline: "A private identity for every signup — with a password vault and a tamper-evident audit trail.",
    problem:
      "Every signup hands a company your real email address, which then gets sold, leaked, or shared — and you rarely find out who did it.",
    summary:
      "A Chrome extension and privacy dashboard that gives every signup its own email alias and strong password, keeps credentials in an encrypted vault, flags when an alias is shared, and anchors the audit trail on NEAR.",
    overview:
      "NEARAuth makes the real email address something you never give out. At signup, the extension fills a unique alias and a generated password; credentials go into a local encrypted vault; and when mail reaches an alias from a sender it was never given to, the exposure engine flags who shared it, with evidence. Every event is hashed into Merkle batches and their roots are anchored to a NEAR smart contract, so the history can't be quietly rewritten. Built at the NEAR Private AI Hackathon NYC (Build City × NEAR Legion), November 11, 2026, and extended after the demo with a policy-guarded privacy assistant.",
    contribution: [
      "Created the product and was its primary engineer (32 of 42 commits): the extension, vault, exposure engine, NEAR contract, and privacy-assistant agent.",
      "Built it with a hackathon team — teammates contributed end-to-end tests and the demo video.",
      "Set the security bar: no plaintext secrets, human approval before any account action, and nothing claimed that wasn't verified.",
    ],
    architecture: [
      "A Manifest V3 Chrome extension and a static dashboard share one library: alias and password generation, an AES-256-GCM vault (PBKDF2-SHA256, 600,000 iterations), exposure detection, and Merkle batching.",
      "A Rust smart contract (near-sdk) stores only Merkle roots; it is deployed to NEAR Testnet and anchored through a GitHub Actions workflow.",
      "A separate LangGraph privacy assistant runs request → deterministic policy → human approval → execute → verify → receipt, with Postgres/pgvector memory and an optional local model for intent classification.",
    ],
    capabilities: [
      "Signup detection that fills a unique alias and a strong generated password",
      "Encrypted local credential vault with auto-lock",
      "Exposure engine that names the likely leaker, with evidence and a confidence score",
      "Alias providers: addy.io and SimpleLogin adapters, plus a demo provider",
      "Merkle-batched audit trail anchored to a NEAR Testnet contract, with tamper detection",
      "Privacy assistant with policy checks and human approval before any action",
    ],
    validation: [
      "About 85 automated tests: 53 unit, 26 agent, 6 Rust contract, plus browser end-to-end specs",
      "Four CI workflows, including contract build and testnet deployment",
      "Contract live on NEAR Testnet (nearauth-ledger.testnet) with recorded anchor transactions",
      "Honest status: a demo prototype — alias forwarding is verified against mocked providers, and the security model is unaudited",
    ],
    highlights: ["AES-256-GCM vault, 600k PBKDF2", "Audit trail anchored on NEAR", "Policy-guarded privacy agent"],
    tech: ["JavaScript (MV3)", "Rust · NEAR SDK", "LangGraph", "WebCrypto", "Postgres / pgvector", "Playwright"],
    maturity: "public-demo",
    dates: { start: "2026-11-11", end: "2026-11-19" },
    milestone: {
      date: "2026-11-11",
      title: "NEARAuth demos at the NEAR Private AI Hackathon NYC",
      detail: "Extension, encrypted vault, exposure engine, and a NEAR Testnet audit contract — built and deployed on hackathon day.",
    },
    visibility: "public",
    repoUrl: "https://github.com/pauloes-btechs/NEARAuth",
    demoUrl: "https://pauloes-btechs.github.io/NEARAuth/",
    image: {
      src: "/projects/nearauth.webp",
      alt: "NEARAuth identity vault listing protected accounts, each with its own masked email alias and status",
      kind: "screenshot",
      caption: "Live interactive demo — sample identities.",
    },
    gallery: [
      {
        src: "/projects/nearauth-ledger.webp",
        alt: "NEARAuth audit ledger showing a Merkle root of eleven events anchored to the nearauth-ledger contract on NEAR Testnet",
        caption: "Audit ledger — event commitments batched into a Merkle root and anchored on NEAR Testnet.",
      },
    ],
    sources: [
      { label: "README — hackathon, status, architecture", ref: "NEARAuth/README.md" },
      { label: "Vault, generators, detection, Merkle", ref: "NEARAuth/extension/lib/" },
      { label: "Audit-ledger contract and testnet deployment record", ref: "NEARAuth/contracts/audit-ledger/" },
      { label: "Privacy assistant agent and tests", ref: "NEARAuth/agent/" },
    ],
    featured: true,
    priority: 2,
    publish: "approved",
  },

  // ----------------------------------------------------------------- Foundry
  {
    id: "foundry",
    slug: "foundry",
    name: "Foundry — AI Software Factory",
    organization: "Btechs",
    category: "ai-agents",
    tagline: "An agentic engineering system that turns a product brief into verified software.",
    problem:
      "AI coding agents write code fast but can't be trusted to finish: they skip tests, drop requirements, and approve their own work.",
    summary:
      "An autonomous software factory: it compiles a brief into requirements, architecture, and a task DAG, runs specialist agents in isolated worktrees, executes the tests, and gets independent review before anything merges.",
    overview:
      "Foundry is the system Btechs uses to build software with AI agents without trusting them blindly. A brief — one sentence or a long specification — is compiled into numbered requirements and scope gates, planned into an architecture and task graph, and executed by specialist agents in isolated git worktrees under a deterministic policy engine. Completion requires validation: tests are actually run, test integrity is checked, an independent reviewer approves each change, and a run report traces every requirement to its coverage. KYAgent was delivered through Foundry.",
    contribution: [
      "Designed and built the system: product specification, architecture, security model, and evaluation strategy.",
      "Defined the rules enforced in code — agents can't approve their own privileged work, LLMs can't override policy, failing tests are never hidden, metrics are never invented.",
      "Used it to deliver KYAgent for the MongoDB AI Hackathon.",
    ],
    architecture: [
      "A TypeScript monorepo: a CLI and control-plane server (HTTP + server-sent events) with durable state in node:sqlite and an append-only event log.",
      "A brief compiler, planner, and factory manager produce the task DAG; a model router sends routine work to smaller models and architecture, review, and security to the strongest, through Anthropic's API or the Claude Code CLI.",
      "Each task runs in its own git worktree and sandbox with stripped environment and timeouts; a React Factory Floor shows runs live or in replay.",
    ],
    capabilities: [
      "Brief compilation with requirement IDs, conflict detection, scope gates, and time-budget parsing",
      "Per-task git worktrees, sandboxed commands, and a deterministic policy engine",
      "Executed validation with test-integrity checks (no deleted tests, no weakened assertions)",
      "Independent review, merge integration, repair loops, and retries by failure class",
      "Human approvals, budgets, kill switch, crash recovery, and cost accounting",
      "RUN_REPORT with requirement coverage, and a live or replayed Factory Floor",
    ],
    validation: [
      "Milestone 4 — the vertical factory loop works end to end and is tested",
      "The specification's first factory test passes end to end, and six of Foundry's own evaluation scenarios run in CI against the real pipeline",
      "Delivered KYAgent: 35 test files, CI, and a public demo",
      "Honest status: visual QA, security scanners, and deployment targets are planned and reported as deferred, never claimed",
    ],
    highlights: ["Brief → requirements → task DAG", "Agents can't approve their own work", "Delivered KYAgent"],
    tech: ["TypeScript", "Claude (Anthropic API)", "Claude Code", "node:sqlite", "Git worktrees", "React"],
    maturity: "tested-mvp",
    dates: { start: "2026-09-26", end: "2026-10-30" },
    milestone: {
      date: "2026-09-26",
      title: "Foundry v0.1.0 — the vertical factory loop",
      detail: "Brief compiler, factory manager, policy engine, sandboxed agents, review, integration, and the Factory Floor — then put to work building KYAgent.",
    },
    visibility: "private-repo",
    repoUrl: null,
    demoUrl: null,
    image: {
      src: "/projects/foundry.webp",
      alt: "Diagram of the Foundry pipeline: brief, plan, agents, tests, review, integrate, report — agents propose, systems verify",
      kind: "diagram",
      caption: "Pipeline diagram drawn from the Foundry README — not a screenshot.",
    },
    gallery: [],
    sources: [
      { label: "Foundry README — status, pipeline, what is real and what is not", ref: "private repository" },
      { label: "KYAgent README — delivered by Foundry", ref: "KYAgent/README.md" },
    ],
    featured: true,
    priority: 4,
    publish: "approved",
  },

  // ---------------------------------------------------------------- KYAgent
  {
    id: "kyagent",
    slug: "kyagent",
    name: "KYAgent",
    organization: "Btechs",
    category: "ai-agents",
    tagline: "Know-Your-Agent for AI that moves money.",
    problem:
      "Companies are letting AI agents make payments, but one-time KYC and API keys can't prove which agent is acting, what it's allowed to do, or whether it should be re-screened when sanctions lists change.",
    summary:
      "Identity, delegated authorization, and continuous OFAC screening for autonomous financial agents — every decision returns ALLOW, REVIEW, or BLOCK with signed, reconstructable evidence.",
    overview:
      "KYAgent gives every AI agent a cryptographic identity, binds it to the human operator who delegated authority, and investigates each payment request through a seven-stage pipeline before money moves. When the sanctions list changes, agents are re-screened automatically rather than at the next annual review. Built for the MongoDB AI Hackathon 2026 (Problem Statement 1: Recursive Harnessing).",
    contribution: [
      "Founder and product owner: framed the agent-compliance problem and wrote the product and architecture specification.",
      "Delivered the build through Foundry, my autonomous software-delivery system — coding agents work in isolated worktrees, an independent reviewer approves every change, and validation runs after each task.",
      "Owned the security model: fail-closed execution, hash-pinned invariants the adaptive harness can never relax, and signed audit receipts.",
    ],
    architecture: [
      "A stateless Node.js service (no framework) with MongoDB Atlas as the system of record, so the service can restart mid-stream and any past decision can be rebuilt from documents alone.",
      "Atlas Search powers fuzzy and phonetic sanctions matching; Atlas Vector Search (Voyage AI embeddings) retrieves similar verified past cases; Change Streams drive continuous re-screening when the OFAC list updates.",
      "An adaptive harness versions its own policies inside immutable, hash-checked invariants — it can tune thresholds but cannot talk itself out of its controls.",
    ],
    capabilities: [
      "Ed25519 agent identity, single-use nonces, and scoped JWS credentials",
      "Seven-stage investigation pipeline returning ALLOW, REVIEW, or BLOCK",
      "Change-stream sanctions watcher that re-screens agents when the list updates",
      "Vector-search memory of previously verified cases",
      "Ed25519-signed compliance receipts and a hash-chained audit trail",
      "Operator dashboard, SDK, and an OpenAPI contract",
    ],
    validation: [
      "35 test files on Node's built-in test runner, including 9 Atlas integration suites",
      "CI runs the full test suite on Node 22; Docker and docker-compose for local Atlas-backed runs",
      "Public live console screens wallets and counterparties against the current OFAC SDN list (the full agent pipeline runs in the service, not the static console)",
    ],
    highlights: ["Atlas Search + Vector Search + Change Streams", "Fail-closed, hash-pinned invariants", "Signed, reconstructable decisions"],
    tech: ["Node.js", "MongoDB Atlas", "Atlas Vector Search", "Voyage AI", "Ed25519 / JWS", "Docker"],
    maturity: "tested-mvp",
    dates: { start: "2026-09-26", end: "2026-11-12" },
    milestone: {
      date: "2026-09-28",
      title: "KYAgent ships for the MongoDB AI Hackathon",
      detail: "Identity, sanctions watcher, and adaptive harness assembled in three days — with a public OFAC screening console.",
    },
    visibility: "public",
    repoUrl: "https://github.com/pauloes-btechs/KYAgent",
    demoUrl: "https://pauloes-btechs.github.io/KYAgent/live/",
    image: {
      src: "/projects/kyagent.webp",
      alt: "KYAgent Live Console screening two wallet addresses against the OFAC SDN list — one blocked as a Lazarus Group address, one clear",
      kind: "screenshot",
    },
    gallery: [
      {
        src: "/projects/kyagent-architecture.webp",
        alt: "KYAgent system architecture: participants, the Node.js service layers, and MongoDB Atlas collections, search indexes, and change streams",
        caption: "System architecture — stateless service, Atlas as the system of record (from the repository).",
      },
      {
        src: "/projects/kyagent-pipeline.webp",
        alt: "KYAgent investigation pipeline stages from identity verification to decision",
        caption: "The investigation pipeline every payment request passes through (from the repository).",
      },
    ],
    sources: [
      { label: "README — delivery state, hackathon brief, Foundry delivery", ref: "KYAgent/README.md" },
      { label: "Pipeline, watcher, harness, and receipts source", ref: "KYAgent/src/" },
      { label: "Test suites", ref: "KYAgent/test/" },
      { label: "Live console (GitHub Pages)", ref: "KYAgent/docs/live/" },
    ],
    featured: true,
    priority: 3,
    publish: "approved",
  },

  // ------------------------------------------------------- Sovereign Wallet
  {
    id: "sovereign-wallet",
    slug: "sovereign-wallet",
    name: "Sovereign Wallet",
    organization: "Btechs",
    category: "bitcoin-payments",
    tagline: "One noncustodial wallet for beginners and Lightning power users.",
    problem:
      "Bitcoin users choose between simple wallets that hide everything and Lightning node tooling that demands a terminal — and mixing the two risks mixing up funds.",
    summary:
      "A noncustodial Bitcoin and Lightning wallet with two engines kept strictly apart: an everyday mode on Ark, and an advanced mode over Lightning Terminal for channels, Loop, and Pool.",
    overview:
      "Sovereign Wallet serves two audiences without compromising either. Everyday mode keeps keys on the device and routes Lightning through an Ark-based swap service; advanced mode drives a full Lightning Terminal (litd) node — channels, Loop swaps, Pool, Taproot Assets. Each engine declares its capabilities behind one contract, and the payment engine records every intent before it dispatches so a crash can never lose track of money.",
    contribution: [
      "Founder and product owner: defined the two-mode product and the rule that the engines are never merged.",
      "Led the architecture and integration — capability contract, payment engine, litd and Wavelength adapters — built through reviewed, agent-assisted pull requests.",
      "Owned release readiness: recovery drills, regtest verification of real Loop swaps, and the signing and release plan.",
    ],
    architecture: [
      "A pnpm TypeScript monorepo. A shared capability contract sits in front of two isolated engines: Ark (Wavelength) for everyday use and litd/LND over gRPC for advanced users.",
      "The payment engine writes each intent to an encrypted SQLite store (SQLCipher or OS keyring) before dispatch, then reconciles on restart — crash-safe by construction.",
      "Front ends: a Tauri 2 desktop app that runs daemons as sidecars, a React Native mobile app that reaches a remote node over Lightning Node Connect, a web demo, and a Storybook catalog.",
    ],
    capabilities: [
      "Provider capability contract with a crash-safe payment engine",
      "Advanced mode over litd: channels, Loop, Pool, Taproot Assets, Faraday",
      "Liquidity manager with AutoLoop budgets and quotes",
      "Desktop sidecar lifecycle for the Wavelength daemon",
      "Recovery drills and a Docker regtest harness (bitcoind, two LND nodes, litd)",
      "Quantum-exposure view showing which funds already have public keys visible on-chain",
    ],
    validation: [
      "110 Vitest test files (unit, fuzz, and integration) plus Playwright end-to-end tests for desktop",
      "Four CI workflows, including real Loop In and Loop Out swaps verified on regtest",
      "Five release-blocking recovery drills recorded in the repository's test results",
      "Public demos: the advanced desktop app replaying real litd responses recorded on regtest, and everyday mode on a simulated Ark client — fake funds, nothing is sent",
      "Honest status: builds are not yet signed for distribution",
    ],
    highlights: ["Crash-safe payment intents", "Real Loop swaps verified in CI", "Desktop · mobile · web from one monorepo"],
    tech: ["TypeScript", "Lightning (litd / LND)", "Ark", "Tauri 2", "React Native", "SQLCipher"],
    maturity: "public-demo",
    dates: { start: "2026-10-30", end: "2026-11-16" },
    milestone: {
      date: "2026-11-05",
      title: "Sovereign Wallet verifies real Loop swaps in CI",
      detail: "Loop In and Loop Out run end to end through the wallet's bridge on regtest, on every change.",
    },
    visibility: "public",
    repoUrl: "https://github.com/pauloes-btechs/sovereign-wallet",
    demoUrl: "https://sovereign-wallet.vercel.app/desktop",
    image: {
      src: "/projects/sovereign-wallet.webp",
      alt: "Sovereign Wallet desktop dashboard showing total balance split across on-chain, Lightning spendable, locked, and receivable funds, with quick actions for Loop and liquidity",
      kind: "screenshot",
      caption: "Live demo — the desktop app replaying litd responses recorded on regtest. Fake funds; nothing is sent.",
    },
    gallery: [
      {
        src: "/projects/sovereign-wallet-home.webp",
        alt: "Sovereign Wallet everyday-mode home screen on mobile showing Lightning, on-chain, and locked balances",
        caption: "Everyday mode — demo build on regtest with a simulated Ark client.",
        narrow: true,
      },
    ],
    sources: [
      { label: "README and product capability matrix", ref: "sovereign-wallet/README.md, docs/PRODUCT_CAPABILITY_MATRIX.md" },
      { label: "Payment engine and capability contract", ref: "sovereign-wallet/packages/" },
      { label: "Recovery drill results", ref: "sovereign-wallet/docs/TEST_RESULTS.md" },
      { label: "CI workflows", ref: "sovereign-wallet/.github/workflows/" },
    ],
    featured: false,
    priority: 5,
    publish: "approved",
  },

  // ---------------------------------------------------------- TheRepoReport
  {
    id: "thereporeport",
    slug: "thereporeport",
    name: "TheRepoReport",
    organization: "Btechs",
    category: "ai-agents",
    tagline: "A personal, AI-narrated GitHub newsroom — three editions a day, $0 to run.",
    problem:
      "Developers who follow dozens of repositories can't keep up with what actually changed, and raw activity feeds are too noisy to trust.",
    summary:
      "An automated newsroom that turns GitHub activity into scored, fact-checked stories and narrated audio editions three times a day — on GitHub Actions and Pages with no paid services.",
    overview:
      "TheRepoReport collects activity from a watchlist of repositories, groups it into stories, scores each on evidence-backed impact, and has a local language model explain the ones that clear the bar in plain language. A validator rejects invented URLs, versions, and overstated claims before anything is narrated; quiet windows produce a short edition that says so instead of inventing news.",
    contribution: [
      "Founder and product owner: wrote the build specification, editorial rules, and the zero-recurring-cost constraint.",
      "Designed the pipeline and its guardrails — evidence-only scoring, the hallucination validator, and the deterministic fallback.",
      "Shipped it to a scheduled public site with benchmarks from real production runs.",
    ],
    architecture: [
      "A TypeScript pipeline runs on GitHub Actions three times a day: collect → group into stories → score → select → explain and validate → script → narrate → publish.",
      "Ollama (Qwen3) and Kokoro text-to-speech run inside the job, so there is no server, no database, and no API bill; run state lives as JSON on a dedicated branch.",
      "A React site on GitHub Pages plays each edition, with chapters, a seven-day archive, and a podcast feed.",
    ],
    capabilities: [
      "Incremental GitHub collection with ETags and cursors",
      "Six-part impact score that only awards evidence-backed points",
      "LLM explanations gated by a validator against invented URLs, versions, and CVEs",
      "Two-narrator audio editions with chapters and a podcast feed",
      "Settings page whose changes are committed as version-controlled config by a workflow",
    ],
    validation: [
      "28 Vitest test files (~300 cases) and CI on every pull request",
      "An editorial eval harness on recorded model outputs, including prompt-injection and over-claim cases",
      "Benchmarks from five real Actions runs: ~490–570 s per edition on a standard runner",
      "Live, scheduled public site",
    ],
    highlights: ["Hallucination validator + fallback", "Local LLM + TTS, $0/month", "Scheduled, public, benchmarked"],
    tech: ["TypeScript", "GitHub Actions", "Ollama · Qwen3", "Kokoro TTS", "React", "Zod"],
    maturity: "public-demo",
    dates: { start: "2026-11-10", end: "2026-11-11" },
    milestone: {
      date: "2026-11-10",
      title: "TheRepoReport publishes its first narrated editions",
      detail: "Specified, built, benchmarked, and live on a three-a-day schedule in a single day.",
    },
    visibility: "public",
    repoUrl: "https://github.com/pauloes-btechs/TheRepoReport",
    demoUrl: "https://pauloes-btechs.github.io/TheRepoReport/",
    image: {
      src: "/projects/thereporeport.webp",
      alt: "TheRepoReport evening edition page with a listen button and the day's three scheduled editions",
      kind: "screenshot",
    },
    gallery: [],
    sources: [
      { label: "README — architecture, cost model", ref: "TheRepoReport/README.md" },
      { label: "Pipeline source", ref: "TheRepoReport/pipeline/" },
      { label: "Benchmarks from real runs", ref: "TheRepoReport/docs/BENCHMARKS.md" },
      { label: "Eval harness", ref: "TheRepoReport/eval/" },
    ],
    featured: false,
    priority: 6,
    publish: "approved",
  },

  // ------------------------------------------------ DCI Global Research Map
  {
    id: "dci-global-research-map",
    slug: "dci-global-research-map",
    name: "DCI Global Research Map",
    organization: "Btechs",
    category: "data-research",
    tagline: "The public map of MIT DCI's global Bitcoin research network.",
    problem:
      "Researchers, universities, and nonprofits working on Bitcoin and financial sovereignty had no shared, current view of who is doing what, where.",
    summary:
      "A production platform charting MIT DCI's worldwide research network — an interactive map and entity database with community submissions and admin review.",
    overview:
      "The DCI Global Research Map is Btechs' flagship: a public platform that charts the universities, institutions, and nonprofits in MIT Digital Currency Initiative's global research network. Its requirements came from the Global Mapping committee — PhD researchers and professors across computer science, mathematics, law, and more — through customer interviews led as committee lead.",
    contribution: [
      "Product Owner and Technical Lead, from concept through production.",
      "Lead the Global Mapping committee and the customer interviews that define features, attestation processes, and requirements.",
      "Architect and operate the production stack, from local development through deployment.",
    ],
    architecture: [
      "React and TypeScript front end on a PostgreSQL database hosted by Supabase.",
      "Vercel hosting and deployments, with GitHub-based source control and CI/CD.",
      "A community submission flow feeds an admin review pipeline before entries are published.",
    ],
    capabilities: [
      "Interactive world map of the research network",
      "Browsable entity database with live updates",
      "Community submission flow with admin review",
    ],
    validation: [
      "Live in production at dci-global-research-map.vercel.app",
      "Research database spanning 29 institutions and 25 researchers; entries grew 600% month over month after launch",
    ],
    highlights: ["In production", "Committee-driven requirements", "Supabase + Vercel + CI/CD"],
    tech: ["React", "TypeScript", "PostgreSQL / Supabase", "Vercel", "GitHub CI/CD"],
    maturity: "production",
    dates: { start: "2025-12-01", end: null },
    milestone: {
      date: "2025-12-01",
      title: "DCI Global Research Map becomes Btechs' flagship",
      detail: "Owned as Product Owner and Technical Lead — live in production for MIT DCI's research network.",
    },
    visibility: "private-repo",
    repoUrl: null,
    demoUrl: "https://dci-global-research-map.vercel.app/",
    image: {
      src: "/portfolio/dci-map.webp",
      alt: "DCI Global Research Map — interactive world map of MIT DCI's research network",
      kind: "screenshot",
    },
    gallery: [],
    sources: [
      { label: "Resume anchor registry (existing site content, lib/data.js → roles.btechs)", ref: "portfolio/lib/data.js" },
      { label: "Live production site", ref: "dci-global-research-map.vercel.app" },
    ],
    featured: true,
    priority: 1,
    publish: "approved",
  },

  // -------------------------------------------------------------- Roomsplit
  {
    id: "roomsplit",
    slug: "roomsplit",
    name: "Roomsplit",
    organization: "Btechs",
    category: "engineering",
    tagline: "Fair room allocation and cost sharing for group vacation rentals.",
    problem:
      "Groups sharing a vacation rental have to decide who gets which bedroom and how to split the bill — and today that means an argument.",
    summary:
      "A group app that collects preferences, proposes room assignments, and prices every bedroom to the exact cent — with a sealed-bid auction when the group wants market prices.",
    overview:
      "Roomsplit turns a group chat argument into a decision. Each party states preferences and a budget; an optimizer searches feasible arrangements and proposes the best under three strategies; the group votes; prices are computed with deterministic integer-cent arithmetic. AI is used only to draft bedrooms from listing photos — never to decide money.",
    contribution: [
      "Founder and product owner: defined the fairness model and the 'AI never decides money' rule.",
      "Directed the engine design — exact-cent apportionment, optimizer, and envy-free auction — built through AI-assisted development.",
      "Owned validation: unit, integration, and end-to-end coverage of the full group journey.",
    ],
    architecture: [
      "Next.js App Router with server actions; all writes and authorization go through a service layer, and each viewer gets a permission-filtered read model.",
      "A pure, I/O-free TypeScript engine handles money, scoring, optimization, and auctions.",
      "SQLite storage; listing import uses an SSRF-guarded fetch with robots.txt checks and vision models (Gemini or Claude) to draft rooms for human review.",
    ],
    capabilities: [
      "Exact-cent cost split using largest-remainder apportionment",
      "Room assignment: exhaustive search for small groups, local search beyond, three strategies",
      "Sealed-bid auction with envy-free prices",
      "Group workflow: invites, questionnaires, proposals, voting, agreement",
      "Listing import that drafts bedrooms from photos for review",
    ],
    validation: [
      "82 Vitest unit and integration cases across the engine and services",
      "Playwright end-to-end specs covering the group journey and listing import",
    ],
    highlights: ["Integer-cent pricing, no AI on money", "Exhaustive + local-search optimizer", "Envy-free auction"],
    tech: ["TypeScript", "Next.js", "SQLite", "Zod", "Vitest", "Playwright"],
    maturity: "tested-mvp",
    dates: { start: "2026-11-02", end: "2026-11-03" },
    milestone: {
      date: "2026-11-02",
      title: "Roomsplit's fairness engine and group workflow",
      detail: "Exact-cent pricing, optimizer, and auction — 82 tests green, end-to-end journey covered.",
    },
    visibility: "public",
    repoUrl: "https://github.com/pauloes-btechs/renter-app",
    demoUrl: "https://renter-app-kohl.vercel.app",
    image: {
      src: "/projects/roomsplit.webp",
      alt: "Roomsplit results page recommending a balanced allocation where every party gets its first-choice bedroom within budget",
      kind: "screenshot",
      caption: "Seeded demo group, local build.",
    },
    gallery: [
      {
        src: "/projects/roomsplit-pricing.webp",
        alt: "Roomsplit pricing methodology: rent split into shared and private pools, shared cost per traveler, and bedroom weights",
        caption: "Pricing methodology shown to every group member — deterministic arithmetic in integer cents.",
      },
    ],
    sources: [
      { label: "Engine source (money, optimizer, auction)", ref: "renter-app/src/lib/engine/" },
      { label: "Unit and integration tests", ref: "renter-app/tests/" },
      { label: "End-to-end specs", ref: "renter-app/e2e/" },
    ],
    featured: false,
    priority: 7,
    publish: "approved",
  },

  // ------------------------------------------------------------- Lanekeeper
  {
    id: "lanekeeper",
    slug: "lanekeeper",
    name: "Lanekeeper",
    organization: "Btechs",
    category: "engineering",
    tagline: "A lane-sized robot concept for clearing glass from NYC bike lanes — and the data platform behind it.",
    problem:
      "Broken glass in New York's protected bike lanes causes flats and injuries, and staffed street sweepers are too costly to clear it often.",
    summary:
      "A concept robot that sweeps overnight, backed by a working geospatial data platform: lane cells, AI glass verification, rider text reports, and public run reports.",
    overview:
      "Lanekeeper pairs a hardware concept with real software. The robot (LK-01) is a design — renders and specifications, not yet built. The data platform is real: the lane network is modeled as 25-metre cells, camera frames are verified for glass by a vision model, a webhook accepts rider text reports, and a trigger builds a public report when each run ends.",
    contribution: [
      "Originated the concept and the civic problem framing.",
      "Designed the data model and the verification and reporting flows; produced the prototype renders and cost model.",
    ],
    architecture: [
      "Postgres with PostGIS on Supabase models lanes as 25 m cells carrying detections, remediations, rider reports, and a hazard score, with row-level security and public-read policies.",
      "Edge functions verify frames with Gemini Robotics-ER behind an API key and spend cap, and accept rider reports over SMS with signature validation and hashed phone numbers.",
      "A trigger builds a public run report when each run ends.",
    ],
    capabilities: [
      "PostGIS lane-cell schema with seeded 1st Avenue lane",
      "Glass-verification edge function with fail-closed auth and spend cap",
      "Rider SMS reporting webhook with signature validation (number not yet provisioned)",
      "Automatic public run reports",
      "Three.js concept presentation and cost model",
    ],
    validation: [
      "Deno unit tests on the verification function's auth, fail-closed, and spend-cap paths",
      "v0.1.0 tagged October 2026; v0.2.0 (November 2026) shipped the public website with a 3D LK-01 model, city lane maps, and a cost estimator",
      "Public concept site with an interactive 3D model of LK-01, city lane maps, and demo requests",
      "Honest status: the robot hardware is a design; the software platform is a working prototype",
    ],
    highlights: ["PostGIS lane model", "Vision-model verification", "Concept hardware, real data platform"],
    tech: ["Supabase", "PostGIS", "Deno", "Gemini Robotics-ER", "Twilio", "Three.js"],
    maturity: "prototype",
    dates: { start: "2026-10-10", end: "2026-11-12" },
    milestone: {
      date: "2026-11-10",
      title: "Lanekeeper v0.2.0 goes public",
      detail: "Public site with an interactive 3D LK-01 model, city lane maps, and a pilot cost estimator — on top of the v0.1.0 data platform.",
    },
    visibility: "public",
    repoUrl: "https://github.com/pauloes-btechs/lanekeeper",
    demoUrl: "https://pauloes-btechs.github.io/lanekeeper/",
    image: {
      src: "/projects/lanekeeper.webp",
      alt: "Concept render of the LK-01 bike-lane sweeper robot — a design, not a photograph of built hardware",
      kind: "render",
      caption: "Concept render — the hardware is a design.",
    },
    gallery: [
      {
        src: "/projects/lanekeeper-specs.webp",
        alt: "LK-01 concept specification sheet",
        caption: "LK-01 design targets (concept).",
      },
    ],
    sources: [
      { label: "README — concept-stage status", ref: "lanekeeper/README.md" },
      { label: "Database migrations", ref: "lanekeeper/supabase/migrations/" },
      { label: "Edge functions and tests", ref: "lanekeeper/supabase/functions/" },
      { label: "v0.2.0 release (website)", ref: "lanekeeper tag v0.2.0" },
    ],
    featured: false,
    priority: 8,
    publish: "approved",
  },
];

// ------------------------------------------------------------ selectors

/** Records cleared for the public site. */
export function publishedProjects() {
  return projects
    .filter((p) => p.publish === "approved")
    .sort((a, b) => a.priority - b.priority);
}

/** Homepage "Selected Builds". */
export function featuredProjects() {
  return publishedProjects().filter((p) => p.featured);
}

export function getProject(slug) {
  return publishedProjects().find((p) => p.slug === slug) || null;
}

/** Explorer groups: categories ordered by their highest-ranked project, empty ones dropped. */
export function projectsByCategory() {
  const pub = publishedProjects();
  return projectCategories
    .map((c) => ({ ...c, projects: pub.filter((p) => p.category === c.id) }))
    .filter((c) => c.projects.length > 0)
    .sort((a, b) => a.projects[0].priority - b.projects[0].priority);
}

/** Story milestones under the Btechs chapter, oldest first. */
export function projectMilestones() {
  return publishedProjects()
    .filter((p) => p.milestone)
    .map((p) => ({ ...p.milestone, slug: p.slug, name: p.name, image: p.image }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function categoryLabel(id) {
  return projectCategories.find((c) => c.id === id)?.label || id;
}

export function maturityLabel(key) {
  return MATURITY[key]?.label || key;
}

/** "2026-11-05" → "Nov 2026" (UTC, so build output is stable). */
export function formatMonth(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** Small integers as words for prose ("Sixteen properties"). */
const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
  "eighteen", "nineteen", "twenty",
];
export function countWord(n, { capitalize = false } = {}) {
  const w = WORDS[n] ?? String(n);
  return capitalize ? w.charAt(0).toUpperCase() + w.slice(1) : w;
}
