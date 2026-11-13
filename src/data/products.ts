import { DigitalProduct } from '../types';

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  // ==========================================
  // 1. LEGAL & COMMERCIAL CONTRACTS
  // ==========================================
  {
    id: 'msa-sow-master-kit',
    title: 'Master Services Agreement & SOW Kit',
    subtitle: 'Dual MSA + SOW legal contract framework for tech agencies, consultancies & high-ticket contractors',
    description: 'An attorney-drafted commercial agreement suite protecting IP ownership, limiting warranty liabilities, and establishing strict payment milestones with change-order governance. Formatted in Microsoft Word (.docx), Notion, and exportable PDF.',
    category: 'legal-contracts',
    price: 99,
    originalPrice: 149,
    rating: 4.99,
    reviewCount: 284,
    downloadsCount: 3120,
    fileFormat: '.DOCX',
    fileSize: '4.8 MB',
    version: '2026.2',
    updatedAt: 'Yesterday',
    license: 'Commercial & Personal',
    previewGradient: 'from-amber-600 via-orange-600 to-stone-800',
    iconName: 'FileText',
    tags: ['Legal', 'MSA', 'SOW', 'Agency', 'Contract', 'Word'],
    badge: 'BESTSELLER',
    isTrending: true,
    creator: {
      name: 'Marcus Vance, Esq.',
      handle: '@vance_legal',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 6420
    },
    features: [
      'Comprehensive Master Services Agreement (MSA) with limitation of liability caps',
      'Modular Statement of Work (SOW) template with sprint milestone billing',
      'Formal Change Order Request (COR) rider with approval signatures',
      'IP assignment & work-for-hire assignment clauses vetted across 50 states',
      'Editable Word (.docx), Google Docs copy link, and annotated PDF manual'
    ],
    includedFiles: [
      { name: 'Master_Services_Agreement_2026.docx', size: '1.8 MB', type: 'Word Document' },
      { name: 'Statement_of_Work_Template.docx', size: '1.2 MB', type: 'Word Document' },
      { name: 'Change_Order_Rider.docx', size: '420 KB', type: 'Word Document' },
      { name: 'Clause_By_Clause_Legal_Guide.pdf', size: '1.4 MB', type: 'PDF Document' }
    ]
  },
  {
    id: 'software-dev-ip-contract',
    title: 'Software Development & IP Assignment Suite',
    subtitle: 'Ironclad contractor & team IP assignment contract with source code escrow & indemnification',
    description: 'Protects software companies and founders against developer IP claims. Guarantees 100% transfer of copyright, patent rights, trade secrets, and source code upon compensation with strict non-solicitation protections.',
    category: 'legal-contracts',
    price: 129,
    originalPrice: 199,
    rating: 4.97,
    reviewCount: 168,
    downloadsCount: 1840,
    fileFormat: '.DOCX',
    fileSize: '3.6 MB',
    version: '3.1.0',
    updatedAt: '3 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-slate-700 via-stone-800 to-amber-900',
    iconName: 'FileText',
    tags: ['Software', 'IP Assignment', 'Developer Contract', 'Legal', 'SaaS'],
    badge: 'FEATURED',
    isTrending: true,
    creator: {
      name: 'Evelyn Reed',
      handle: '@reed_techcounsel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 4210
    },
    features: [
      'Irrevocable copyright and patent assignment covering past and future deliverables',
      'Source code delivery protocols with clean build warranty warranties',
      'Non-disclosure, non-disparagement, and 2-year client non-solicitation covenants',
      'Explicit exclusion of third-party open-source liability from proprietary code',
      'Ready-to-sign templates for contractors, full-time hires, and technical advisors'
    ],
    includedFiles: [
      { name: 'Software_Development_Agreement.docx', size: '1.4 MB', type: 'Word Document' },
      { name: 'Confidential_IP_Assignment_Rider.docx', size: '920 KB', type: 'Word Document' },
      { name: 'Source_Code_Acceptance_Certificate.docx', size: '380 KB', type: 'Word Document' },
      { name: 'Execution_Checklist.pdf', size: '900 KB', type: 'PDF Document' }
    ]
  },
  {
    id: 'b2b-saas-terms-privacy',
    title: 'B2B SaaS Terms of Service & SLA Suite',
    subtitle: 'Enterprise subscription terms, 99.9% uptime SLA matrix, DPA & customer privacy policy',
    description: 'Enterprise-grade B2B SaaS terms engineered to pass procurement audits. Covers multi-seat seat licensing, fair-use API limits, service credits for downtime, data retention protocols, and mutual indemnification.',
    category: 'legal-contracts',
    price: 149,
    originalPrice: 249,
    rating: 4.96,
    reviewCount: 142,
    downloadsCount: 1530,
    fileFormat: '.DOCX',
    fileSize: '5.2 MB',
    version: '4.0.0',
    updatedAt: 'Last week',
    license: 'Commercial & Personal',
    previewGradient: 'from-stone-900 via-blue-950 to-indigo-900',
    iconName: 'FileText',
    tags: ['SaaS', 'Terms of Service', 'Privacy Policy', 'SLA', 'GDPR', 'Legal'],
    badge: 'HOT',
    isTrending: true,
    creator: {
      name: 'David Sterling',
      handle: '@sterling_legal',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 3890
    },
    features: [
      'Comprehensive Cloud Subscription Agreement (CSA) for enterprise procurement',
      'Standard Service Level Agreement (SLA) with clear credit calculation tables',
      'Data Processing Agreement (DPA) matching EU/UK GDPR and California CCPA',
      'Clear acceptable use policy (AUP) prohibiting reverse engineering and automated scraping',
      'Includes Markdown (.md) and HTML copy for instant web deployment'
    ],
    includedFiles: [
      { name: 'B2B_SaaS_Terms_of_Service.docx', size: '1.9 MB', type: 'Word Document' },
      { name: 'Service_Level_Agreement_SLA.docx', size: '1.1 MB', type: 'Word Document' },
      { name: 'Customer_Data_Processing_Addendum.docx', size: '1.4 MB', type: 'Word Document' },
      { name: 'Web_Deploy_Ready_Terms.md', size: '800 KB', type: 'Markdown Document' }
    ]
  },

  // ==========================================
  // 2. SALES, RFPS & DEAL PROPOSALS
  // ==========================================
  {
    id: 'enterprise-rfp-framework',
    title: 'Enterprise RFP Winning Response Kit',
    subtitle: '60-slide corporate proposal deck, technical capability matrices & security compliance boilerplate',
    description: 'A battle-tested corporate proposal architecture designed to win high-ticket tenders ($50k–$500k). Includes executive briefing layouts, compliance response tables, pricing options, implementation timelines, and case study frameworks.',
    category: 'sales-proposals',
    price: 89,
    originalPrice: 159,
    rating: 4.98,
    reviewCount: 215,
    downloadsCount: 2740,
    fileFormat: '.PPTX',
    fileSize: '42 MB',
    version: '3.0.0',
    updatedAt: '4 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-orange-600 via-amber-700 to-stone-900',
    iconName: 'Presentation',
    tags: ['RFP', 'Proposal', 'B2B Sales', 'PowerPoint', 'Keynote', 'Pitch'],
    badge: 'BESTSELLER',
    isTrending: true,
    creator: {
      name: 'Sophia Chen',
      handle: '@chen_proposals',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 5120
    },
    features: [
      '60 Modular slide designs in 16:9 widescreen format (PowerPoint & Keynote)',
      'Pre-written executive summary narratives and methodology descriptions',
      'Technical architecture diagrams and phased project delivery Gantt charts',
      'Security questionnaire response boilerplate (SOC2, ISO, data residency)',
      'Interactive pricing scenario comparison matrices'
    ],
    includedFiles: [
      { name: 'Enterprise_RFP_Response_Deck.pptx', size: '28 MB', type: 'PowerPoint Deck' },
      { name: 'Enterprise_RFP_Response_Deck.key', size: '12 MB', type: 'Keynote Deck' },
      { name: 'Security_Boilerplate_Responses.docx', size: '1.2 MB', type: 'Word Document' },
      { name: 'Proposal_Scoring_Rubric_Guide.pdf', size: '800 KB', type: 'PDF Guide' }
    ]
  },
  {
    id: 'high-ticket-agency-proposal',
    title: 'High-Ticket Agency Pitch & Scope Deck',
    subtitle: '3-tier pricing tables, interactive milestone roadmap & high-converting client proposal deck',
    description: 'A refined presentation template engineered for design, branding, and dev consultancies closing $20k+ retainers. Emphasizes business outcomes over hourly billing with anchored tier psychology.',
    category: 'sales-proposals',
    price: 59,
    originalPrice: 99,
    rating: 4.95,
    reviewCount: 184,
    downloadsCount: 2210,
    fileFormat: '.FIG',
    fileSize: '24 MB',
    version: '2.4.0',
    updatedAt: '5 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-amber-500 via-rose-600 to-purple-800',
    iconName: 'Presentation',
    tags: ['Pitch Deck', 'Agency', 'Proposal', 'Figma', 'Keynote', 'Sales'],
    badge: 'HOT',
    isTrending: false,
    creator: {
      name: 'Julian Croft',
      handle: '@croft_advisory',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 3950
    },
    features: [
      '38 High-craft slides in Figma and Apple Keynote',
      'Anchored 3-tier Good/Better/Best pricing breakdown slides',
      'Sprint deliverable roadmaps with milestones and sign-off gates',
      'Impact metrics and before/after ROI case study templates',
      'Vector typographic layouts with subtle stone-textured aesthetics'
    ],
    includedFiles: [
      { name: 'HighTicket_Proposal_Template.fig', size: '14 MB', type: 'Figma Document' },
      { name: 'HighTicket_Proposal_Template.key', size: '9.2 MB', type: 'Keynote Presentation' },
      { name: 'Pricing_Strategy_Guide.pdf', size: '800 KB', type: 'PDF Document' }
    ]
  },
  {
    id: 'saas-investor-pitch-kit',
    title: 'Seed & Series A Pitch Deck Kit',
    subtitle: '18-slide institutional VC deck, financial runway slides & due diligence data room structure',
    description: 'Modeled after decks that raised over $80M in venture capital from Tier-1 Silicon Valley funds. Features concise problem-solution framing, market sizing (TAM/SAM/SOM), product demo teardowns, and unit economics slides.',
    category: 'sales-proposals',
    price: 79,
    originalPrice: 129,
    rating: 4.97,
    reviewCount: 156,
    downloadsCount: 1980,
    fileFormat: '.KEY',
    fileSize: '36 MB',
    version: '2026.1',
    updatedAt: 'Yesterday',
    license: 'Commercial & Personal',
    previewGradient: 'from-emerald-700 via-teal-800 to-stone-900',
    iconName: 'Presentation',
    tags: ['VC Deck', 'Pitch', 'Startups', 'Fundraising', 'Keynote', 'PowerPoint'],
    badge: 'FEATURED',
    isTrending: true,
    creator: {
      name: 'Aaron Mercer',
      handle: '@mercer_vc',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 4120
    },
    features: [
      'Strict 18-slide core institutional VC deck structure',
      'Dynamic TAM / SAM / SOM market sizing diagrams',
      'MRR growth, cohort retention, and burn rate visualization templates',
      'Due Diligence Data Room directory checklist and tracker',
      'Available in Apple Keynote, PowerPoint, and Figma formats'
    ],
    includedFiles: [
      { name: 'Institutional_VC_Pitch_Deck.key', size: '16 MB', type: 'Keynote Deck' },
      { name: 'Institutional_VC_Pitch_Deck.pptx', size: '18 MB', type: 'PowerPoint Deck' },
      { name: 'Due_Diligence_Data_Room_Checklist.xlsx', size: '1.2 MB', type: 'Excel Spreadsheet' },
      { name: 'Pitch_Narrative_Script.pdf', size: '800 KB', type: 'PDF Document' }
    ]
  },

  // ==========================================
  // 3. OPERATIONS & SOP LIBRARIES
  // ==========================================
  {
    id: 'agency-sop-master-library',
    title: 'Turnkey Digital Agency SOP Manual (45+ SOPs)',
    subtitle: 'Standard operating procedures for client intake, sprint QA, scope creep defense & offboarding',
    description: 'An exhaustive operational operating system built for digital agencies, software studios, and boutique consultancies. Provides step-by-step checklists, responsibility assignment matrices (RACI), and client communication email templates.',
    category: 'ops-sops',
    price: 119,
    originalPrice: 199,
    rating: 4.99,
    reviewCount: 312,
    downloadsCount: 3840,
    fileFormat: '.NOTION',
    fileSize: '8.4 MB',
    version: '4.2.0',
    updatedAt: '2 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-emerald-600 via-stone-800 to-amber-900',
    iconName: 'FolderGit2',
    tags: ['SOP', 'Agency Operations', 'Notion', 'Checklists', 'Processes', 'Management'],
    badge: 'BESTSELLER',
    isTrending: true,
    creator: {
      name: 'Clara Oswald',
      handle: '@clara_ops',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 7850
    },
    features: [
      '45+ Fully documented, step-by-step standard operating procedures',
      'Turnkey Notion workspace duplicate link + editable Google Docs/Word backups',
      'RACI accountability matrices for designers, developers, and project leads',
      'Scope-creep defense scripts and formal client deviation notices',
      'Complete post-launch warranty, QA checkoff, and handoff protocols'
    ],
    includedFiles: [
      { name: 'Agency_SOP_Workspace_Notion_Archive.zip', size: '4.2 MB', type: 'Notion Workspace Export' },
      { name: 'All_45_SOPs_Standard_Docx.zip', size: '3.1 MB', type: 'Word Document Archive' },
      { name: 'RACI_Responsibility_Matrix.xlsx', size: '650 KB', type: 'Excel Spreadsheet' },
      { name: 'Operations_Implementation_Guide.pdf', size: '450 KB', type: 'PDF Document' }
    ]
  },
  {
    id: 'remote-employee-handbook',
    title: 'Modern People Ops & Remote Employee Handbook',
    subtitle: 'Remote work policies, async communication guidelines, 30-60-90 onboarding & review rubrics',
    description: 'A modern, non-bureaucratic employee handbook designed for distributed tech companies. Clearly defines equipment stipends, flexible hours, async documentation etiquette, PTO tracking, security obligations, and performance improvement procedures.',
    category: 'ops-sops',
    price: 69,
    originalPrice: 119,
    rating: 4.96,
    reviewCount: 192,
    downloadsCount: 2310,
    fileFormat: '.DOCX',
    fileSize: '4.2 MB',
    version: '3.0.0',
    updatedAt: '3 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-stone-800 via-teal-900 to-stone-900',
    iconName: 'FolderGit2',
    tags: ['People Ops', 'Employee Handbook', 'Remote Work', 'HR', 'Onboarding'],
    badge: 'HOT',
    isTrending: false,
    creator: {
      name: 'Liam Kester',
      handle: '@kester_peopleops',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 4620
    },
    features: [
      '68-page comprehensive remote-first employee policy handbook',
      'Structured 30-60-90 day new hire onboarding checklists',
      'Bi-annual performance review rubrics with level-based skill expectations',
      'Modern security, password manager, and Bring-Your-Own-Device (BYOD) policies',
      'Available in Notion, Word (.docx), and web-publishable Markdown'
    ],
    includedFiles: [
      { name: 'Remote_Employee_Handbook_2026.docx', size: '2.1 MB', type: 'Word Document' },
      { name: 'New_Hire_30_60_90_Checklist.docx', size: '850 KB', type: 'Word Document' },
      { name: 'Performance_Review_Evaluation_Rubric.xlsx', size: '720 KB', type: 'Excel Spreadsheet' },
      { name: 'Quick_Start_HR_Checklist.pdf', size: '530 KB', type: 'PDF Document' }
    ]
  },

  // ==========================================
  // 4. FINANCIAL MODELS & ANALYTICAL SPREADSHEETS
  // ==========================================
  {
    id: 'saas-5year-financial-model',
    title: 'SaaS 5-Year Dynamic Financial Model',
    subtitle: 'Institutional 3-statement model, MRR cohort retention curves, hiring burn & cap table dilution',
    description: 'An audit-tested financial model built by former tech investment bankers. Seamlessly models monthly revenue expansion, churn cohorts, CAC payback periods, headcount ramp-ups, and prospective fundraising rounds.',
    category: 'financial-models',
    price: 129,
    originalPrice: 199,
    rating: 4.99,
    reviewCount: 384,
    downloadsCount: 4520,
    fileFormat: '.XLSX',
    fileSize: '8.6 MB',
    version: '5.1.0',
    updatedAt: 'Yesterday',
    license: 'Commercial & Personal',
    previewGradient: 'from-emerald-700 via-green-800 to-stone-900',
    iconName: 'FileSpreadsheet',
    tags: ['SaaS Model', 'Financial Model', 'Excel', 'Cap Table', 'Valuation', 'Runway'],
    badge: 'BESTSELLER',
    isTrending: true,
    creator: {
      name: 'Viktor Lind',
      handle: '@lind_modeling',
      avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 8910
    },
    features: [
      'Fully linked 3-statement model (Income Statement, Balance Sheet, Cash Flow)',
      'Dynamic SaaS metrics dashboard: ARR, MRR, NRR, LTV, CAC, and Rule of 40',
      'Monthly hiring plan matrix calculating taxes, benefits, and equipment ramp-ups',
      'Cap Table dilution simulator supporting SAFEs, convertible notes, and priced rounds',
      'Formatted in Microsoft Excel (.xlsx) and 100% compatible with Google Sheets'
    ],
    includedFiles: [
      { name: 'SaaS_5Year_Institutional_Model_v5.1.xlsx', size: '5.4 MB', type: 'Excel Workbook' },
      { name: 'Cap_Table_Dilution_Simulator.xlsx', size: '1.8 MB', type: 'Excel Workbook' },
      { name: 'Model_Assumption_Documentation.pdf', size: '1.4 MB', type: 'PDF Guide' }
    ]
  },
  {
    id: 'multifamily-cre-proforma',
    title: 'Commercial Real Estate Multifamily Pro-Forma',
    subtitle: 'Acquisition underwriting model, DSCR debt coverage, renovation IRR sensitivity & cap rates',
    description: 'Institutional-grade real estate underwriting workbook for 10 to 200+ unit multifamily acquisitions. Automatically calculates leveraged/unleveraged IRRs, equity multiples, debt service coverage ratios, and cash-on-cash returns.',
    category: 'financial-models',
    price: 89,
    originalPrice: 149,
    rating: 4.97,
    reviewCount: 178,
    downloadsCount: 2190,
    fileFormat: '.XLSX',
    fileSize: '6.2 MB',
    version: '3.3.0',
    updatedAt: '4 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-teal-700 via-stone-800 to-amber-950',
    iconName: 'FileSpreadsheet',
    tags: ['Real Estate', 'Pro-Forma', 'Multifamily', 'Excel', 'IRR', 'Underwriting'],
    badge: 'FEATURED',
    isTrending: true,
    creator: {
      name: 'Nathan Drake',
      handle: '@skyline_cre',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 3670
    },
    features: [
      '10-Year cash flow forecasting with dynamic rent roll analysis',
      'Value-add renovation budget tracking with unit turn ROI projections',
      'Dual-tranche debt sizing with senior loan, mezzanine debt, and refi assumptions',
      '2-Way Sensitivity tables for exit cap rates and market rent growth rates',
      'Print-ready Executive Investment Committee memo summary tab'
    ],
    includedFiles: [
      { name: 'Multifamily_Acquisition_ProForma_v3.3.xlsx', size: '4.8 MB', type: 'Excel Workbook' },
      { name: 'Investment_Committee_Deck_Summary.xlsx', size: '1.1 MB', type: 'Excel Workbook' },
      { name: 'Underwriting_Cheat_Sheet.pdf', size: '300 KB', type: 'PDF Guide' }
    ]
  },

  // ==========================================
  // 5. COMPLIANCE, SECURITY & AUDIT PACKS
  // ==========================================
  {
    id: 'soc2-policy-evidence-pack',
    title: 'SOC 2 Type II Complete Policy & Audit Suite',
    subtitle: '18 core security policies, risk assessment registers & auditor evidence tracking matrix',
    description: 'Save hundreds of hours and tens of thousands of dollars in consulting fees when preparing for SOC 2 Type I or Type II audits. Includes battle-tested policies for access control, cryptography, incident response, change management, and vendor oversight.',
    category: 'compliance-security',
    price: 249,
    originalPrice: 399,
    rating: 4.99,
    reviewCount: 228,
    downloadsCount: 2650,
    fileFormat: '.DOCX',
    fileSize: '14.2 MB',
    version: '2026.1',
    updatedAt: 'Yesterday',
    license: 'Commercial & Personal',
    previewGradient: 'from-rose-800 via-stone-900 to-indigo-950',
    iconName: 'ShieldCheck',
    tags: ['SOC 2', 'Security', 'Compliance', 'Audit', 'Policies', 'InfoSec'],
    badge: 'BESTSELLER',
    isTrending: true,
    creator: {
      name: 'Gregory Thorne, CISSP',
      handle: '@cyberguard_soc2',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 4890
    },
    features: [
      '18 Modular, auditor-approved Information Security Policies',
      'Complete Risk Assessment Register and Business Impact Analysis workbook',
      'Disaster Recovery (DR) & Business Continuity Plan (BCP) with test templates',
      'Vendor Security Assessment matrix & third-party risk review forms',
      'Auditor Evidence Collection Tracker mapping controls to Trust Services Criteria'
    ],
    includedFiles: [
      { name: 'All_18_SOC2_Policies_Docx_Bundle.zip', size: '8.4 MB', type: 'Policy Archive' },
      { name: 'SOC2_Evidence_Collection_Tracker.xlsx', size: '2.8 MB', type: 'Excel Workbook' },
      { name: 'Risk_Assessment_Register.xlsx', size: '1.9 MB', type: 'Excel Workbook' },
      { name: 'Auditor_Readiness_Playbook.pdf', size: '1.1 MB', type: 'PDF Document' }
    ]
  },
  {
    id: 'gdpr-ccpa-data-governance',
    title: 'GDPR & CCPA Data Governance Pack',
    subtitle: 'Data Processing Agreements (DPA), Record of Processing (ROPA) & DSAR response workflows',
    description: 'Ensure full global compliance across EU GDPR, UK GDPR, and California Privacy Rights Act (CPRA). Includes customer-facing DPAs with standard contractual clauses (SCCs), internal data inventory templates, and breach notification playbooks.',
    category: 'compliance-security',
    price: 119,
    originalPrice: 189,
    rating: 4.96,
    reviewCount: 148,
    downloadsCount: 1720,
    fileFormat: '.DOCX',
    fileSize: '7.8 MB',
    version: '3.1.0',
    updatedAt: '3 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-blue-800 via-indigo-900 to-stone-900',
    iconName: 'ShieldCheck',
    tags: ['GDPR', 'CCPA', 'Data Privacy', 'DPA', 'ROPA', 'Compliance'],
    badge: 'FEATURED',
    isTrending: false,
    creator: {
      name: 'Hannah Morris',
      handle: '@global_privacy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 3240
    },
    features: [
      'Enterprise Data Processing Agreement (DPA) incorporating EU standard contractual clauses',
      'Record of Processing Activities (ROPA) workbook conforming to GDPR Article 30',
      'Data Subject Access Request (DSAR) intake procedures and 30-day response scripts',
      '72-Hour Data Breach Notification protocol with template supervisory notices',
      'Transfer Impact Assessment (TIA) questionnaire for international data flows'
    ],
    includedFiles: [
      { name: 'Global_Data_Processing_Agreement_DPA.docx', size: '2.4 MB', type: 'Word Document' },
      { name: 'Article_30_ROPA_Data_Inventory.xlsx', size: '2.2 MB', type: 'Excel Workbook' },
      { name: 'DSAR_Response_Script_Playbook.docx', size: '1.6 MB', type: 'Word Document' },
      { name: 'Data_Breach_Notification_Kit.pdf', size: '1.6 MB', type: 'PDF Document' }
    ]
  },

  // ==========================================
  // 6. WEBSITES, UI KITS & DESIGN SYSTEMS
  // ==========================================
  {
    id: 'apex-design-system',
    title: 'Apex Design System & UI Kit v3.2',
    subtitle: 'Production Figma UI kit with 2,400+ auto-layout components, semantic tokens & web pages',
    description: 'A comprehensive, multi-brand UI system for high-cadence web teams. Built in Figma auto-layout 5.0 with WCAG AA/AAA token palettes, responsive web variants, and interactive prototype variables.',
    category: 'websites-ui',
    price: 49,
    originalPrice: 89,
    rating: 4.98,
    reviewCount: 342,
    downloadsCount: 4210,
    fileFormat: '.FIG',
    fileSize: '148 MB',
    version: '3.2.0',
    updatedAt: '2 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-indigo-600 via-purple-600 to-pink-500',
    iconName: 'Layout',
    tags: ['Figma', 'UI Kit', 'Design System', 'SaaS', 'Websites'],
    badge: 'BESTSELLER',
    isTrending: true,
    creator: {
      name: 'Elena Rostova',
      handle: '@elena_craft',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 8940
    },
    features: [
      '2,400+ Auto-Layout 5.0 components',
      'Full semantic token library with dark/light themes',
      '48 Complete pre-built desktop and mobile page templates',
      'Interactive Figma component variants with tactile feedback',
      'Free lifetime updates and Discord community access'
    ],
    includedFiles: [
      { name: 'Apex_Design_System_v3.2.fig', size: '138 MB', type: 'Figma Document' },
      { name: 'Tokens_Export_Tailwind.json', size: '2.4 MB', type: 'JSON Tokens' },
      { name: 'License_Agreement.pdf', size: '420 KB', type: 'PDF Document' },
      { name: 'Documentation_Guide.pdf', size: '7.2 MB', type: 'PDF Guide' }
    ]
  },
  {
    id: 'editorial-exhibition-storefront',
    title: 'Editorial Exhibition Storefront Template',
    subtitle: 'High-aesthetic digital marketplace frontend with warm travertine plinths & concentric geometry',
    description: 'A benchmark 2026 digital storefront built on Vite, React 19, and Tailwind CSS v4. Features warm stone materiality, 3-tier diffuse shadows, and custom asset inspector modals.',
    category: 'websites-ui',
    price: 39,
    originalPrice: 65,
    rating: 4.96,
    reviewCount: 184,
    downloadsCount: 2150,
    fileFormat: '.TSX',
    fileSize: '18.4 MB',
    version: '1.4.0',
    updatedAt: 'Yesterday',
    license: 'Commercial & Personal',
    previewGradient: 'from-stone-700 via-amber-700 to-stone-900',
    iconName: 'Monitor',
    tags: ['React 19', 'Tailwind v4', 'Vite', 'Storefront', 'Editorial'],
    badge: 'HOT',
    isTrending: true,
    creator: {
      name: 'Julian Thorne',
      handle: '@thorne_labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 4320
    },
    features: [
      'Vite 6 + React 19 + Tailwind v4 architecture',
      '3-Tier diffuse shadows & specular top rim lights',
      'Concentric radius geometry (R_outer = R_inner + padding)',
      'Look-Inside ZIP inspector modal & license selector',
      'Full WCAG AA keyboard accessible navigation'
    ],
    includedFiles: [
      { name: 'storefront_source_bundle.zip', size: '16.8 MB', type: 'ZIP Archive' },
      { name: 'tailwind.config.mjs', size: '14 KB', type: 'Config' },
      { name: 'README.md', size: '8 KB', type: 'Markdown' }
    ]
  },

  // ==========================================
  // 2. BACKENDS & APIS (Microservices, Cloudflare, Databases)
  // ==========================================
  {
    id: 'cloudflare-edge-api-engine',
    title: 'Cloudflare Edge Worker & Supabase API',
    subtitle: 'Zero-cold-start serverless REST API starter with JWT auth, rate-limiting & Postgres RLS',
    description: 'Production-ready Edge backend built for Cloudflare Pages & Workers with Supabase PostgreSQL connection pooling. Includes OpenAPI 3.1 docs, Redis/KV caching, and cryptographically verified webhook signing.',
    category: 'backends',
    price: 35,
    originalPrice: 59,
    rating: 4.95,
    reviewCount: 142,
    downloadsCount: 1890,
    fileFormat: '.ZIP',
    fileSize: '12.5 MB',
    version: '2.0.1',
    updatedAt: '3 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-amber-600 via-orange-600 to-amber-900',
    iconName: 'Server',
    tags: ['Cloudflare', 'Supabase', 'TypeScript', 'API', 'PostgreSQL'],
    badge: 'NEW',
    isTrending: true,
    creator: {
      name: 'Alex Chen',
      handle: '@chen_infra',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 5120
    },
    features: [
      'Sub-15ms cold start global edge routing via Cloudflare',
      'Supabase Postgres connection pooler & RLS policies',
      'Bearer JWT authentication middleware & refresh rotation',
      'Upstash Redis rate-limiter with IP & user token buckets',
      'Full TypeScript OpenAPI schema validation via Zod'
    ],
    includedFiles: [
      { name: 'edge-api-worker.ts', size: '42 KB', type: 'TypeScript' },
      { name: 'schema.sql', size: '18 KB', type: 'SQL Migration' },
      { name: 'wrangler.jsonc', size: '4 KB', type: 'Config' },
      { name: 'deployment_runbook.md', size: '12 KB', type: 'Markdown' }
    ]
  },
  {
    id: 'express-high-speed-scraper',
    title: 'Express Scraper & Queue Microservice',
    subtitle: 'Multi-threaded Cheerio/Puppeteer worker engine with anti-detection headers & BullMQ queue',
    description: 'High-throughput Node.js & Express backend designed for price aggregators, e-commerce monitoring, and real-time data ingestion. Features automated retry policies, fingerprint masking, and Redis caching.',
    category: 'backends',
    price: 29,
    originalPrice: 49,
    rating: 4.91,
    reviewCount: 96,
    downloadsCount: 1340,
    fileFormat: '.ZIP',
    fileSize: '8.8 MB',
    version: '1.2.0',
    updatedAt: '5 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-emerald-600 via-teal-700 to-slate-900',
    iconName: 'Database',
    tags: ['Node.js', 'Express', 'Scraper', 'BullMQ', 'Redis'],
    badge: 'FEATURED',
    creator: {
      name: 'Devin K.',
      handle: '@devin_backend',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 3100
    },
    features: [
      'Concurrent scraping worker pool with rate limit backoff',
      'Automated user-agent & browser fingerprint rotation',
      'Redis BullMQ queue with dead-letter retry handler',
      'Normalized JSON output schemas for shopping & catalogue data',
      'Structured winston telemetry logging'
    ],
    includedFiles: [
      { name: 'scraper-engine.mjs', size: '36 KB', type: 'JavaScript' },
      { name: 'queue-worker.mjs', size: '24 KB', type: 'JavaScript' },
      { name: 'docker-compose.yml', size: '3 KB', type: 'Docker' }
    ]
  },

  // ==========================================
  // 3. REACT WEB APPS (Full Software, SPA, Terminals)
  // ==========================================
  {
    id: 'arrow-quant-terminal',
    title: 'Arrow Quant Financial Trading Terminal',
    subtitle: 'Institutional-grade React Canvas quant desk with real-time orderbook, depth & execution charts',
    description: 'Complete production trading terminal web app. Built with React 19, WebGL Canvas rendering, live tick pipelines, simulated order matching engine, and multi-pane docking layout.',
    category: 'react-apps',
    price: 59,
    originalPrice: 99,
    rating: 4.99,
    reviewCount: 289,
    downloadsCount: 3120,
    fileFormat: '.ZIP',
    fileSize: '34.2 MB',
    version: '2.4.0',
    updatedAt: '3 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-emerald-500 via-cyan-600 to-slate-900',
    iconName: 'Code2',
    tags: ['React 19', 'Quant', 'Canvas', 'Financial', 'Dashboard'],
    badge: 'BESTSELLER',
    isTrending: true,
    creator: {
      name: 'Soren Lindqvist',
      handle: '@soren_quant',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 6840
    },
    features: [
      '60 FPS WebGL / Canvas financial candlestick engine',
      'Bid/Ask depth visualizer with microsecond tick simulation',
      'Multi-window dockable workspace with keyboard shortcuts',
      'Integrated risk metrics (Sharpe ratio, drawdowns, VaR)',
      'Modular TypeScript architecture with zero external UI bloat'
    ],
    includedFiles: [
      { name: 'arrow-quant-terminal-source.zip', size: '32.1 MB', type: 'ZIP Archive' },
      { name: 'quant_indicators_manual.pdf', size: '1.8 MB', type: 'PDF' }
    ]
  },
  {
    id: 'bookmarksoft-weather-portal',
    title: 'Atmospheric Weather & Soundscape App',
    subtitle: 'Hyperlocal weather portal with procedural Web Audio generative rain synthesizers & radar maps',
    description: 'An immersive React web app pairing real-time Open-Meteo hyperlocal forecasts with procedural Web Audio ambient soundscapes (rain, thunder, mountain wind) and MapLibre satellite radar.',
    category: 'react-apps',
    price: 34,
    originalPrice: 55,
    rating: 4.97,
    reviewCount: 165,
    downloadsCount: 1980,
    fileFormat: '.ZIP',
    fileSize: '22.8 MB',
    version: '1.3.2',
    updatedAt: '4 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-sky-500 via-indigo-600 to-slate-900',
    iconName: 'Cloud',
    tags: ['React', 'Web Audio', 'Weather', 'MapLibre', 'Soundscape'],
    badge: 'HOT',
    creator: {
      name: 'Aria Chen',
      handle: '@aria_audio',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 4190
    },
    features: [
      'Real-time WMO weather decoding with severe alert cards',
      'Synthesized Web Audio spatial rain & thunder generator',
      'Interactive vector weather radar via MapLibre GL',
      'Transit impact & hourly wardrobe recommendation engine',
      'Zero external API key requirement (Open-Meteo free tier)'
    ],
    includedFiles: [
      { name: 'weather-soundscape-app.zip', size: '21.5 MB', type: 'ZIP Archive' },
      { name: 'soundscapeService.ts', size: '14 KB', type: 'TypeScript' }
    ]
  },
  {
    id: 'uk-shopping-aggregator',
    title: 'UK Shopping Aggregator & Smart Basket',
    subtitle: 'Multi-store price comparison application with automated voucher matcher & saving optimizer',
    description: 'Full-featured consumer price comparison web app. Preloaded with UK catalogue data across tech, vehicles, and groceries with deal highlighting, price variance scoring, and basket optimization.',
    category: 'react-apps',
    price: 42,
    originalPrice: 70,
    rating: 4.92,
    reviewCount: 112,
    downloadsCount: 1620,
    fileFormat: '.ZIP',
    fileSize: '16.5 MB',
    version: '1.1.0',
    updatedAt: '1 week ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-violet-600 via-purple-700 to-indigo-900',
    iconName: 'ShoppingBag',
    tags: ['React', 'Shopping', 'Price Comparison', 'Ecommerce', 'UK'],
    badge: 'FEATURED',
    creator: {
      name: 'Julian Thorne',
      handle: '@thorne_labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 4320
    },
    features: [
      'Multi-retailer price matrix comparison view',
      'Smart basket total calculator across split retailers',
      'Deal score calculation algorithms with price trend graphs',
      'Custom URL scraper modal and dashboard integration',
      'Light/Dark theme support with Tailwind CSS'
    ],
    includedFiles: [
      { name: 'uk-shopping-aggregator.zip', size: '15.9 MB', type: 'ZIP Archive' },
      { name: 'catalogue_schema.json', size: '320 KB', type: 'JSON' }
    ]
  },

  // ==========================================
  // 4. MOBILE APPS (React Native, Expo, Mobile Starters)
  // ==========================================
  {
    id: 'fluid-expo-mobile-starter',
    title: 'Fluid React Native & Expo Starter',
    subtitle: 'Cross-platform iOS & Android mobile architecture with spring gesture physics & offline SQLite',
    description: 'Production React Native template built on Expo SDK 52. Features Apple-grade concentric card physics, bottom tactile glass dock, biometric auth, and offline database synchronization.',
    category: 'mobile-apps',
    price: 45,
    originalPrice: 79,
    rating: 4.96,
    reviewCount: 178,
    downloadsCount: 2340,
    fileFormat: '.ZIP',
    fileSize: '28.4 MB',
    version: '2.0.0',
    updatedAt: '2 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-blue-600 via-indigo-600 to-slate-900',
    iconName: 'Smartphone',
    tags: ['React Native', 'Expo', 'iOS', 'Android', 'Mobile'],
    badge: 'HOT',
    isTrending: true,
    creator: {
      name: 'Leo Varma',
      handle: '@leo_mobile',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 5890
    },
    features: [
      'Expo SDK 52 with file-based Expo Router v3',
      'Reanimated 3 spring gestures & sheet interactions',
      'Offline-first SQLite storage with background sync queue',
      'FaceID / TouchID biometric authentication flow',
      'Universal iOS & Android native component styling'
    ],
    includedFiles: [
      { name: 'fluid-expo-mobile-app.zip', size: '27.2 MB', type: 'ZIP Archive' },
      { name: 'app_store_submission_guide.pdf', size: '1.2 MB', type: 'PDF' }
    ]
  },
  {
    id: 'pulse-mobile-field-recorder',
    title: 'Pulse Mobile Audio & Field Recorder App',
    subtitle: 'Low-latency mobile sound capture app with real-time FFT visualizer & lossless export',
    description: 'High-fidelity mobile audio recorder app template. Includes live stereophonic visualizers, metadata tagging, uncompressed 24-bit WAV export, and background audio service.',
    category: 'mobile-apps',
    price: 32,
    originalPrice: 50,
    rating: 4.93,
    reviewCount: 88,
    downloadsCount: 1150,
    fileFormat: '.ZIP',
    fileSize: '19.2 MB',
    version: '1.2.0',
    updatedAt: '1 week ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-fuchsia-600 via-rose-600 to-stone-900',
    iconName: 'Volume2',
    tags: ['React Native', 'Audio', 'FFT', 'Recording', 'Mobile'],
    badge: 'NEW',
    creator: {
      name: 'Aria Chen',
      handle: '@aria_audio',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 4190
    },
    features: [
      'Low-latency native microphone capture stream',
      '60 FPS dynamic FFT frequency bar equalizer',
      'WAV & AAC format selector with customizable sample rates',
      'GPS location and session note metadata embedder',
      'Export directly to Cloud or Files'
    ],
    includedFiles: [
      { name: 'pulse-recorder-source.zip', size: '18.5 MB', type: 'ZIP Archive' },
      { name: 'audio_engine_spec.pdf', size: '700 KB', type: 'PDF' }
    ]
  },

  // ==========================================
  // 5. PDF DOCUMENTS (Architecture Specs, Guides, Blueprints)
  // ==========================================
  {
    id: 'zero-to-scale-architecture-guide',
    title: 'Zero-to-Scale Fullstack Architecture Blueprint',
    subtitle: '120-page tactical technical manual: bootstrapping production apps from $0 to 1M MAU',
    description: 'The definitive architectural field guide. Detailed blueprints covering Cloudflare Edge routing, Supabase RLS, connection pooling traps, cold-start latency mitigation, and zero-egress CDN storage.',
    category: 'documents-pdf',
    price: 24,
    originalPrice: 45,
    rating: 4.99,
    reviewCount: 412,
    downloadsCount: 5820,
    fileFormat: '.PDF',
    fileSize: '14.2 MB',
    version: '2026.2',
    updatedAt: 'Just now',
    license: 'Commercial & Personal',
    previewGradient: 'from-rose-600 via-amber-600 to-stone-900',
    iconName: 'FileText',
    tags: ['Architecture', 'Cloud', 'Zero-to-Scale', 'DevOps', 'PDF'],
    badge: 'BESTSELLER',
    isTrending: true,
    creator: {
      name: 'Julian Thorne',
      handle: '@thorne_labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 4320
    },
    features: [
      '120 Pages of battle-tested architectural diagrams & code snippets',
      '$0 Cloud blueprint: Cloudflare + Supabase + Neon + PostHog',
      'Detailed checklist on avoiding AWS/GCP surprise egress billing',
      'Production database connection pooling & migration runbooks',
      'Includes vector SVG architectural diagram assets'
    ],
    includedFiles: [
      { name: 'Zero_To_Scale_Architecture_v2026.pdf', size: '12.8 MB', type: 'PDF Guide' },
      { name: 'Architecture_Diagrams_Vector.svg', size: '1.4 MB', type: 'Vector SVG' }
    ]
  },
  {
    id: 'wcag-accessibility-audit-playbook',
    title: 'WCAG 2.2 AAA Engineering & Audit Manual',
    subtitle: 'Tactile interactive PDF manual with code contracts, screen-reader testing scripts & checklists',
    description: 'An actionable manual for senior engineers and designers. Covers focus trap implementation, ARIA live region announcements, keyboard flow testing, and color contrast calculations.',
    category: 'documents-pdf',
    price: 19,
    originalPrice: 35,
    rating: 4.94,
    reviewCount: 154,
    downloadsCount: 2210,
    fileFormat: '.PDF',
    fileSize: '8.6 MB',
    version: '2.2.0',
    updatedAt: '1 week ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-emerald-700 via-teal-800 to-stone-950',
    iconName: 'FileText',
    tags: ['Accessibility', 'WCAG', 'HTML/ARIA', 'Testing', 'PDF'],
    badge: 'NEW',
    creator: {
      name: 'Elena Rostova',
      handle: '@elena_craft',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 8940
    },
    features: [
      '68 Interactive checklist items covering WCAG 2.2 AA and AAA',
      'React & TypeScript code contracts for accessible dialogs and dropdowns',
      'Screen reader testing scripts for VoiceOver, NVDA, and TalkBack',
      'Color contrast math & APCA contrast calculation formulas'
    ],
    includedFiles: [
      { name: 'WCAG_2.2_AAA_Engineering_Manual.pdf', size: '8.1 MB', type: 'PDF Guide' },
      { name: 'Accessibility_Audit_Checklist.xlsx', size: '500 KB', type: 'Excel' }
    ]
  },

  // ==========================================
  // 6. EXCEL SPREADSHEETS (Financial Models, Calculations)
  // ==========================================
  {
    id: 'saas-unit-economics-financial-model',
    title: 'SaaS Unit Economics & Runway Financial Model',
    subtitle: 'Dynamic multi-scenario Excel workbook (.XLSX) with CAC, LTV, cohort retention & hiring plans',
    description: 'An investor-ready financial model built for bootstrapped and venture-backed SaaS startups. Features automated formula chaining, sensitivity tables, 36-month hiring runway projections, and dynamic charts.',
    category: 'spreadsheets',
    price: 29,
    originalPrice: 55,
    rating: 4.97,
    reviewCount: 224,
    downloadsCount: 3410,
    fileFormat: '.XLSX',
    fileSize: '4.8 MB',
    version: '4.1.0',
    updatedAt: '3 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-emerald-600 via-green-700 to-stone-900',
    iconName: 'FileSpreadsheet',
    tags: ['Excel', 'Financial Model', 'SaaS', 'Spreadsheets', 'Startup'],
    badge: 'BESTSELLER',
    isTrending: true,
    creator: {
      name: 'Marcus Vance',
      handle: '@vance_vfx',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 3950
    },
    features: [
      'Pre-built 36-month financial forecast & cash runway calculations',
      'Automated CAC, LTV, payback period, and gross margin modules',
      'Cohort-based net revenue retention & churn modeling tabs',
      'Headcount planning matrix with automated payroll tax calculations',
      'Compatible with Microsoft Excel, Google Sheets & Apple Numbers'
    ],
    includedFiles: [
      { name: 'SaaS_Unit_Economics_Model_v4.1.xlsx', size: '4.2 MB', type: 'Excel Document' },
      { name: 'Financial_Model_Walkthrough.pdf', size: '600 KB', type: 'PDF' }
    ]
  },
  {
    id: 'developer-freelance-pricing-calculator',
    title: 'Developer Freelance Pricing & Tax Calculator',
    subtitle: 'Automated workbook for value-based project pricing, tax reserves, overhead & daily rates',
    description: 'An essential financial planner for independent software engineers and technical consultants. Eliminates under-quoting by converting income targets, billable hours, and tax brackets into solid project quotes.',
    category: 'spreadsheets',
    price: 15,
    originalPrice: 28,
    rating: 4.91,
    reviewCount: 98,
    downloadsCount: 1650,
    fileFormat: '.XLSX',
    fileSize: '2.4 MB',
    version: '2.0.0',
    updatedAt: '1 week ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-teal-600 via-cyan-700 to-slate-900',
    iconName: 'FileSpreadsheet',
    tags: ['Excel', 'Freelance', 'Pricing', 'Calculator', 'Spreadsheets'],
    badge: 'HOT',
    creator: {
      name: 'Devin K.',
      handle: '@devin_backend',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 3100
    },
    features: [
      'Value-based vs hourly quote pricing comparator',
      'Automated quarterly tax reserve and expense deduction tracker',
      'Client proposal pricing table generator',
      'Billable utilization and vacation adjustment formulas'
    ],
    includedFiles: [
      { name: 'Freelance_Developer_Pricing_Workbook.xlsx', size: '2.1 MB', type: 'Excel Document' },
      { name: 'Pricing_Strategy_Guide.pdf', size: '300 KB', type: 'PDF' }
    ]
  },

  // ==========================================
  // 7. RESUMES & PORTFOLIOS (Tech CVs, Portfolios)
  // ==========================================
  {
    id: 'staff-engineer-tech-lead-resume',
    title: 'Staff Engineer & Tech Lead Resume Pack',
    subtitle: 'ATS-optimized executive tech resumes (.PDF, .DOCX, .FIG) with proven high-impact impact bullet frameworks',
    description: 'A battle-tested resume kit designed for Senior Engineers, Staff Software Architects, and Engineering Leaders. Engineered to pass automated Applicant Tracking Systems (ATS) while captivating human hiring managers.',
    category: 'resumes',
    price: 22,
    originalPrice: 40,
    rating: 4.98,
    reviewCount: 310,
    downloadsCount: 4620,
    fileFormat: '.PDF',
    fileSize: '6.5 MB',
    version: '3.0.0',
    updatedAt: 'Yesterday',
    license: 'Commercial & Personal',
    previewGradient: 'from-stone-900 via-stone-800 to-stone-950',
    iconName: 'Briefcase',
    tags: ['Resume', 'Tech Lead', 'ATS', 'CV', 'Career'],
    badge: 'BESTSELLER',
    isTrending: true,
    creator: {
      name: 'Julian Thorne',
      handle: '@thorne_labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 4320
    },
    features: [
      'Strict ATS-compliant single-column and dual-column layouts',
      '150+ Action-result bullet formula examples (XYZ framework)',
      'Editable formats: Adobe PDF, Microsoft Word .DOCX, and Figma',
      'Matching cover letter template and executive summary formulas',
      'Includes typography tokens: Newsreader, JetBrains Mono & Plus Jakarta'
    ],
    includedFiles: [
      { name: 'Staff_Engineer_Resume_Template.docx', size: '1.2 MB', type: 'Word Document' },
      { name: 'Staff_Engineer_Resume_Template.pdf', size: '2.8 MB', type: 'PDF' },
      { name: 'Staff_Resume_Figma_Source.fig', size: '2.1 MB', type: 'Figma' },
      { name: 'Cover_Letter_Template.docx', size: '400 KB', type: 'Word' }
    ]
  },
  {
    id: 'fullstack-designer-engineer-portfolio',
    title: 'Designer-Engineer Resume & Portfolio Template',
    subtitle: 'Minimalist 2-page tech CV & matching responsive web case study portfolio structure',
    description: 'Bespoke resume and portfolio kit designed for modern "product engineers" who straddle design and code. Features typographic elegance, case-study metrics layout, and markdown export.',
    category: 'resumes',
    price: 19,
    originalPrice: 35,
    rating: 4.95,
    reviewCount: 140,
    downloadsCount: 2480,
    fileFormat: '.PDF',
    fileSize: '5.2 MB',
    version: '2.1.0',
    updatedAt: '4 days ago',
    license: 'Commercial & Personal',
    previewGradient: 'from-indigo-900 via-slate-800 to-stone-900',
    iconName: 'Briefcase',
    tags: ['Resume', 'Portfolio', 'Fullstack', 'Designer', 'CV'],
    badge: 'HOT',
    creator: {
      name: 'Elena Rostova',
      handle: '@elena_craft',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
      salesCount: 8940
    },
    features: [
      'Editorial typography with clean visual hierarchy and tabular figures',
      'Case study project breakdown cards with live metric callouts',
      'Available in PDF, Figma, and responsive HTML/Tailwind web version',
      'Full ATS scan verified with 98% readability score'
    ],
    includedFiles: [
      { name: 'Designer_Engineer_CV.pdf', size: '2.4 MB', type: 'PDF' },
      { name: 'Portfolio_Web_Template.zip', size: '2.2 MB', type: 'ZIP Archive' },
      { name: 'Figma_Typography_Source.fig', size: '600 KB', type: 'Figma' }
    ]
  }
];
