import { DigitalProduct } from '../types';

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  // ==========================================
  // 1. WEBSITES & UI (Websites, UI Kits, Landing Pages)
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
