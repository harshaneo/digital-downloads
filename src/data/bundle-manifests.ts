import type { BundleManifest, LicenseTier } from '../types.ts';

export const STANDARD_LICENSE_TIERS: LicenseTier[] = [
  {
    id: 'personal',
    name: 'Personal License',
    priceMultiplier: 1.0,
    badge: 'Hobby & Study',
    description: 'Ideal for student work, personal portfolios, indie tinkering, and private non-commercial projects.',
    allowedUses: [
      'Unlimited personal, educational & exploratory projects',
      'Personal portfolio display and case study presentation',
      'Local prototyping & private testing environments',
      'Installation across up to 3 personal machines'
    ],
    prohibitedUses: [
      'Client work, fee-for-service, or agency deliverables',
      'Monetized SaaS, paid consumer apps, or commercial products',
      'Sublicensing, reselling, or public redistribution of source files',
      'Hosting raw uncompiled assets in public code repositories'
    ]
  },
  {
    id: 'commercial',
    name: 'Commercial License',
    priceMultiplier: 1.6,
    badge: 'Most Popular',
    description: 'The standard choice for freelancers, creative agencies, and revenue-generating applications.',
    allowedUses: [
      'Unlimited client projects & agency commissions',
      '1 commercial SaaS / digital application with revenue up to $500k ARR',
      'Global marketing campaigns, paid ads, and brand collateral',
      'Multi-seat collaboration for up to 5 core team members'
    ],
    prohibitedUses: [
      'Creating derivative design systems or stock assets intended for resale',
      'Extractable distribution where end-users can retrieve raw assets',
      'Enterprise-wide deployment spanning >5 seats without an upgrade'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise License',
    priceMultiplier: 3.5,
    badge: 'Unlimited Scale',
    description: 'Full legal indemnity, unlimited team seats, and uncapped ARR for high-growth companies.',
    allowedUses: [
      'Unlimited commercial products, applications & platforms with no revenue caps',
      'Company-wide seats across all employees, contractors, and subsidiaries',
      'Perpetual worldwide rights with $100,000 legal indemnification warranty',
      'Direct creator SLA, priority support, and private roadmap access'
    ],
    prohibitedUses: [
      'Reselling raw assets as standalone competitive stock products'
    ]
  }
];

export const BUNDLE_MANIFESTS: Record<string, BundleManifest> = {
  'msa-sow-master-kit': {
    bundleId: 'msa-sow-master-kit',
    version: '2026.2.0',
    releaseDate: '2026-11-12',
    totalFiles: 8,
    totalSize: '4.8 MB',
    sha256: '9a48f21b7ce3d011985fa4b18206d289e472098bc10521e89cf20188bb3e9102',
    signature: 'ecdsa-p256-sha256:3045022100e4b8a21190cd...719f20',
    fileTree: [
      {
        name: 'contracts',
        type: 'folder',
        children: [
          {
            name: 'Master_Services_Agreement_2026.docx',
            size: '1.8 MB',
            type: 'file',
            extension: 'docx',
            sampleAvailable: true,
            sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/msa-preview.docx'
          },
          {
            name: 'Statement_of_Work_Template.docx',
            size: '1.2 MB',
            type: 'file',
            extension: 'docx',
            sampleAvailable: true,
            sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/sow-template.docx'
          },
          {
            name: 'Change_Order_Rider.docx',
            size: '420 KB',
            type: 'file',
            extension: 'docx'
          }
        ]
      },
      {
        name: 'notion_and_markdown',
        type: 'folder',
        children: [
          {
            name: 'MSA_SOW_Notion_Workspace_Template.json',
            size: '640 KB',
            type: 'file',
            extension: 'json'
          },
          {
            name: 'FULL_AGREEMENT_MARKDOWN.md',
            size: '48 KB',
            type: 'file',
            extension: 'md'
          }
        ]
      },
      {
        name: 'guides_and_checklists',
        type: 'folder',
        children: [
          {
            name: 'Clause_By_Clause_Legal_Guide.pdf',
            size: '1.4 MB',
            type: 'file',
            extension: 'pdf',
            sampleAvailable: true,
            sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/clause-guide.pdf'
          },
          {
            name: 'Client_Negotiation_Playbook.pdf',
            size: '820 KB',
            type: 'file',
            extension: 'pdf'
          },
          {
            name: 'Execution_Checklist.txt',
            size: '12 KB',
            type: 'file',
            extension: 'txt'
          }
        ]
      }
    ],
    changelog: [
      {
        version: '2026.2.0',
        releaseDate: '2026-11-12',
        title: 'Release 2026.2: SOW Milestone Protection & IP Conveyance Update',
        changes: [
          'Added automatic deemed-acceptance 5-day review clause to eliminate client approval stalls',
          'Updated limitation of liability caps strictly bounded by trailing 6-month fee payments',
          'Integrated formal sprint milestone billing tables and electronic signature rider'
        ]
      },
      {
        version: '2026.1.0',
        releaseDate: '2026-05-18',
        title: 'Release 2026.1: Cross-Border Arbitration Framework',
        changes: [
          'Incorporated Delaware / New York commercial code standards for consulting agencies',
          'Added mutual non-solicitation covenants spanning 18 months post-completion'
        ]
      }
    ],
    creatorTips: {
      suggestedAmounts: [0, 10, 25, 50],
      creatorHandle: '@vance_legal',
      creatorName: 'Marcus Vance, Esq.',
      messagePrompt: 'Tip Marcus Vance to support quarterly legal clause reviews and state compliance updates!'
    }
  },
  'software-dev-ip-contract': {
    bundleId: 'software-dev-ip-contract',
    version: '3.1.0',
    releaseDate: '2026-11-10',
    totalFiles: 6,
    totalSize: '3.6 MB',
    sha256: '4b71e892cfa9801452ef71b0928374d9e018274619b8cf10928374619a018273',
    signature: 'ecdsa-p256-sha256:30440220718293a...82910a',
    fileTree: [
      {
        name: 'contracts',
        type: 'folder',
        children: [
          {
            name: 'Software_Development_Agreement.docx',
            size: '1.4 MB',
            type: 'file',
            extension: 'docx',
            sampleAvailable: true,
            sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/software-agreement.docx'
          },
          {
            name: 'Confidential_IP_Assignment_Rider.docx',
            size: '920 KB',
            type: 'file',
            extension: 'docx'
          },
          {
            name: 'Source_Code_Acceptance_Certificate.docx',
            size: '380 KB',
            type: 'file',
            extension: 'docx'
          }
        ]
      },
      {
        name: 'guidance',
        type: 'folder',
        children: [
          {
            name: 'Execution_Checklist.pdf',
            size: '900 KB',
            type: 'file',
            extension: 'pdf',
            sampleAvailable: true,
            sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/execution-checklist.pdf'
          },
          {
            name: 'Open_Source_GPL_Audit_Guide.md',
            size: '34 KB',
            type: 'file',
            extension: 'md'
          }
        ]
      }
    ],
    changelog: [
      {
        version: '3.1.0',
        releaseDate: '2026-11-10',
        title: 'Release 3.1: Clean Code & Viral GPL Exclusions',
        changes: [
          'Added affirmative warranty against GPL/AGPL copyleft contamination in commercial repos',
          'Updated source code escrow protocol and automated test acceptance covenants'
        ]
      }
    ],
    creatorTips: {
      suggestedAmounts: [0, 10, 25, 50],
      creatorHandle: '@reed_techcounsel',
      creatorName: 'Evelyn Reed',
      messagePrompt: 'Tip Evelyn Reed to support ongoing VC diligence template maintenance!'
    }
  },
  'b2b-saas-terms-privacy': {
    bundleId: 'b2b-saas-terms-privacy',
    version: '4.0.0',
    releaseDate: '2026-11-08',
    totalFiles: 7,
    totalSize: '4.2 MB',
    sha256: '7291a0c8b41928374619b028374619a018273645b1928374619a018273645e92',
    signature: 'ecdsa-p256-sha256:30450221008192a...918273',
    fileTree: [
      {
        name: 'terms_and_sla',
        type: 'folder',
        children: [
          {
            name: 'Enterprise_Terms_of_Service.docx',
            size: '1.6 MB',
            type: 'file',
            extension: 'docx',
            sampleAvailable: true,
            sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/saas-terms.docx'
          },
          {
            name: '99_9_Uptime_SLA_Matrix.docx',
            size: '840 KB',
            type: 'file',
            extension: 'docx'
          },
          {
            name: 'Data_Processing_Addendum_GDPR_DPA.docx',
            size: '1.1 MB',
            type: 'file',
            extension: 'docx'
          }
        ]
      },
      {
        name: 'privacy_and_security',
        type: 'folder',
        children: [
          {
            name: 'Website_Customer_Privacy_Policy.docx',
            size: '420 KB',
            type: 'file',
            extension: 'docx'
          },
          {
            name: 'Security_Audit_Whitepaper_Template.pdf',
            size: '1.2 MB',
            type: 'file',
            extension: 'pdf'
          }
        ]
      }
    ],
    changelog: [
      {
        version: '4.0.0',
        releaseDate: '2026-11-08',
        title: 'Release 4.0: GDPR Article 28 Standard Contractual Clauses',
        changes: [
          'Full DPA alignment with European Commission standard contractual clauses (SCCs)',
          'Tiered monthly credit table for uptime degradation between 99.9% and 95.0%'
        ]
      }
    ],
    creatorTips: {
      suggestedAmounts: [0, 15, 30, 60],
      creatorHandle: '@marcus_counsel',
      creatorName: 'Marcus Vance, Esq.',
      messagePrompt: 'Tip Marcus Vance to support enterprise procurement clause updates!'
    }
  },
  'apex-design-system': {
    bundleId: 'apex-design-system',
    version: '3.2.0',
    releaseDate: '2026-11-03',
    totalFiles: 48,
    totalSize: '148.4 MB',
    sha256: 'e8bf289b43d2fc5ea19c961e687884d5dfd6efd019ecfa389e81b6aa4a07d620',
    signature: 'ecdsa-p256-sha256:3045022100d8b4e7a2c0...4f91e8',
    fileTree: [
      {
        name: 'Apex_Design_System_v3.2.fig',
        size: '138.2 MB',
        type: 'file',
        extension: 'fig',
        sampleAvailable: true,
        sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/apex-sample.fig'
      },
      {
        name: 'tokens',
        type: 'folder',
        children: [
          {
            name: 'tokens.dark.json',
            size: '1.2 MB',
            type: 'file',
            extension: 'json',
            sampleAvailable: true,
            sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/tokens.dark.json'
          },
          {
            name: 'tokens.light.json',
            size: '1.2 MB',
            type: 'file',
            extension: 'json'
          },
          {
            name: 'tailwind.theme.js',
            size: '42 KB',
            type: 'file',
            extension: 'js'
          }
        ]
      },
      {
        name: 'components-export',
        type: 'folder',
        children: [
          {
            name: 'buttons.svg',
            size: '840 KB',
            type: 'file',
            extension: 'svg'
          },
          {
            name: 'navigation-bars.svg',
            size: '1.6 MB',
            type: 'file',
            extension: 'svg'
          },
          {
            name: 'data-tables.svg',
            size: '2.1 MB',
            type: 'file',
            extension: 'svg'
          },
          {
            name: 'modal-dialogs.svg',
            size: '980 KB',
            type: 'file',
            extension: 'svg'
          }
        ]
      },
      {
        name: 'documentation',
        type: 'folder',
        children: [
          {
            name: 'DESIGN_SYSTEM_GUIDE.pdf',
            size: '7.2 MB',
            type: 'file',
            extension: 'pdf',
            sampleAvailable: true,
            sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/apex-guide-preview.pdf'
          },
          {
            name: 'CHANGELOG.md',
            size: '18 KB',
            type: 'file',
            extension: 'md'
          },
          {
            name: 'LICENSE.txt',
            size: '4 KB',
            type: 'file',
            extension: 'txt'
          }
        ]
      }
    ],
    changelog: [
      {
        version: '3.2.0',
        releaseDate: '2026-11-03',
        title: 'Figma Auto-Layout 5.0 & Semantic Variable Upgrades',
        changes: [
          'Upgraded all 2,400+ components to Figma Auto-Layout 5.0 minimum/maximum bounds',
          'Introduced 128 new semantic variable tokens for WCAG AAA high-contrast modes',
          'Added 14 mobile tablet responsive breakout layouts for iOS 18 & Android 15',
          'Optimized component instance redraw latency by 42% inside large canvas files'
        ]
      },
      {
        version: '3.1.0',
        releaseDate: '2026-09-18',
        title: 'Interactive Micro-Interaction Variants',
        changes: [
          'Integrated Figma variable physics spring curves for switches, menus, and accordions',
          'Added comprehensive haptic feedback state annotations for mobile app handoffs',
          'Introduced standalone Tailwind CSS v4 preset file directly importable in projects'
        ]
      },
      {
        version: '3.0.0',
        releaseDate: '2026-06-12',
        title: 'Apex 3.0 Complete Overhaul',
        breaking: true,
        changes: [
          'Full rewrite of component token hierarchies into modern W3C Design Token spec',
          'Standardized all border radii to concentric geometry curves',
          'Deprecated legacy Figma styles in favor of nested color and spacing variables'
        ]
      }
    ],
    creatorTips: {
      suggestedAmounts: [0, 5, 15, 25],
      creatorHandle: '@elena_craft',
      creatorName: 'Elena Rostova',
      messagePrompt: 'Support Elena for maintaining monthly Figma token updates!'
    }
  },

  'hyperion-3d-cyberpunk': {
    bundleId: 'hyperion-3d-cyberpunk',
    version: '2.1.0',
    releaseDate: '2026-10-28',
    totalFiles: 142,
    totalSize: '1.82 GB',
    sha256: '3fa7168c919d3f443b711bbde7831f28b78912e7539ea5167e8140db2724a87c',
    signature: 'ecdsa-p256-sha256:9981fec4401a...710d2c',
    fileTree: [
      {
        name: 'Hyperion_Cyberpunk_Master.blend',
        size: '620 MB',
        type: 'file',
        extension: 'blend',
        sampleAvailable: true,
        sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/hyperion-prop-sample.blend'
      },
      {
        name: 'textures_4k_pbr',
        type: 'folder',
        children: [
          { name: 'Neon_Sign_Albedo_4K.exr', size: '48 MB', type: 'file', extension: 'exr' },
          { name: 'Neon_Sign_Roughness_4K.png', size: '22 MB', type: 'file', extension: 'png' },
          { name: 'Neon_Sign_Normal_4K.png', size: '36 MB', type: 'file', extension: 'png' },
          { name: 'Concrete_Wet_Metallic_4K.png', size: '28 MB', type: 'file', extension: 'png' },
          { name: 'SciFi_Plating_Displacement_4K.exr', size: '64 MB', type: 'file', extension: 'exr' }
        ]
      },
      {
        name: 'fbx_exports',
        type: 'folder',
        children: [
          { name: 'cyberpunk_vehicle_chassis.fbx', size: '82 MB', type: 'file', extension: 'fbx' },
          { name: 'modular_holographic_kiosk.fbx', size: '34 MB', type: 'file', extension: 'fbx' },
          { name: 'modular_overpass_bridge.fbx', size: '62 MB', type: 'file', extension: 'fbx' }
        ]
      },
      {
        name: 'unreal_nanite_presets',
        type: 'folder',
        children: [
          { name: 'M_Cyberpunk_Master_Shading.uasset', size: '14 MB', type: 'file', extension: 'uasset' },
          { name: 'Hyperion_Nanite_Config.ini', size: '8 KB', type: 'file', extension: 'ini' }
        ]
      },
      {
        name: 'README.md',
        size: '12 KB',
        type: 'file',
        extension: 'md'
      }
    ],
    changelog: [
      {
        version: '2.1.0',
        releaseDate: '2026-10-28',
        title: 'Unreal Engine 5.5 Nanite & Lumen Shader Optimization',
        changes: [
          'Full compatibility verification with Unreal Engine 5.5 virtual shadow maps',
          'Added 12 new modular elevated highway and holographic neon street props',
          'Cleaned topology for Blender 4.2 Geometry Node scatter brushes'
        ]
      },
      {
        version: '2.0.0',
        releaseDate: '2026-07-15',
        title: '4K PBR Subsurface Scanners & PBR Shaders',
        breaking: true,
        changes: [
          'Upgraded all textures to 16-bit half-float OpenEXR format for zero color banding',
          'Included native glTF/GLB web-ready models with DRACO compression'
        ]
      }
    ],
    creatorTips: {
      suggestedAmounts: [0, 5, 15, 25],
      creatorHandle: '@kai_vfx',
      creatorName: 'Kai Takahashi',
      messagePrompt: 'Tip Kai to support next month’s Neo-Tokyo environment pack!'
    }
  },

  'nextsaas-enterprise-starter': {
    bundleId: 'nextsaas-enterprise-starter',
    version: '4.0.2',
    releaseDate: '2026-11-04',
    totalFiles: 215,
    totalSize: '42.8 MB',
    sha256: '9b66138d8fe0a08e7ff910c4369a83eb33bc49ca3df02381273919e984a65a3d',
    signature: 'ecdsa-p256-sha256:77a10294e501...62ef90',
    fileTree: [
      {
        name: 'package.json',
        size: '3.4 KB',
        type: 'file',
        extension: 'json',
        sampleAvailable: true,
        sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/nextsaas-package.json'
      },
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'app',
            type: 'folder',
            children: [
              { name: 'layout.tsx', size: '2.8 KB', type: 'file', extension: 'tsx' },
              { name: 'page.tsx', size: '4.1 KB', type: 'file', extension: 'tsx' },
              { name: 'dashboard/page.tsx', size: '8.4 KB', type: 'file', extension: 'tsx' },
              { name: 'api/webhooks/stripe/route.ts', size: '6.2 KB', type: 'file', extension: 'ts' }
            ]
          },
          {
            name: 'components',
            type: 'folder',
            children: [
              { name: 'BillingTable.tsx', size: '7.1 KB', type: 'file', extension: 'tsx' },
              { name: 'TeamSwitcher.tsx', size: '4.8 KB', type: 'file', extension: 'tsx' },
              { name: 'AuditLogViewer.tsx', size: '9.2 KB', type: 'file', extension: 'tsx' }
            ]
          },
          {
            name: 'server',
            type: 'folder',
            children: [
              { name: 'db.ts', size: '2.1 KB', type: 'file', extension: 'ts' },
              { name: 'auth.ts', size: '5.5 KB', type: 'file', extension: 'ts' },
              { name: 'ratelimit.ts', size: '1.9 KB', type: 'file', extension: 'ts' }
            ]
          }
        ]
      },
      {
        name: 'prisma',
        type: 'folder',
        children: [
          { name: 'schema.prisma', size: '6.8 KB', type: 'file', extension: 'prisma' },
          { name: 'seed.ts', size: '3.2 KB', type: 'file', extension: 'ts' }
        ]
      },
      {
        name: 'Dockerfile',
        size: '1.4 KB',
        type: 'file',
        extension: 'dockerfile'
      },
      {
        name: 'README.md',
        size: '14.2 KB',
        type: 'file',
        extension: 'md',
        sampleAvailable: true,
        sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/nextsaas-readme.md'
      }
    ],
    changelog: [
      {
        version: '4.0.2',
        releaseDate: '2026-11-04',
        title: 'React 19 & Next.js 15 Partial Prerendering (PPR) Patch',
        changes: [
          'Upgraded React 19 stable compiler flags with zero hydration mismatch warnings',
          'Integrated Next.js 15 experimental partial prerendering for instant dashboard loads',
          'Updated Stripe billing webhooks with idempotency replay defense'
        ]
      },
      {
        version: '4.0.0',
        releaseDate: '2026-09-30',
        title: 'Enterprise Architecture Major Release',
        breaking: true,
        changes: [
          'Switched to Turborepo monorepo structure with shared UI package',
          'Integrated Clerk & Supabase RLS multitenancy isolation',
          'Zero-latency Edge middleware routing'
        ]
      }
    ],
    creatorTips: {
      suggestedAmounts: [0, 5, 15, 25],
      creatorHandle: '@marcus_dev',
      creatorName: 'Marcus Vance',
      messagePrompt: 'Send a coffee to Marcus for keeping enterprise deps always on latest!'
    }
  },

  'monumental-font-family': {
    bundleId: 'monumental-font-family',
    version: '1.8.0',
    releaseDate: '2026-10-14',
    totalFiles: 36,
    totalSize: '24.2 MB',
    sha256: '417b189cc9810a9c7b120f4d4554f6768393a521ef3258c0800b77da12bce151',
    signature: 'ecdsa-p256-sha256:2910fae10199...bc5514',
    fileTree: [
      {
        name: 'OTF_Desktop',
        type: 'folder',
        children: [
          { name: 'Monumental-Thin.otf', size: '420 KB', type: 'file', extension: 'otf' },
          { name: 'Monumental-Regular.otf', size: '435 KB', type: 'file', extension: 'otf' },
          { 
            name: 'Monumental-Bold.otf', 
            size: '448 KB', 
            type: 'file', 
            extension: 'otf',
            sampleAvailable: true,
            sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/monumental-bold-sample.otf'
          },
          { name: 'Monumental-Black.otf', size: '460 KB', type: 'file', extension: 'otf' }
        ]
      },
      {
        name: 'WOFF2_WebFonts',
        type: 'folder',
        children: [
          { name: 'Monumental-Variable.woff2', size: '185 KB', type: 'file', extension: 'woff2', sampleAvailable: true },
          { name: 'monumental.css', size: '4.2 KB', type: 'file', extension: 'css' }
        ]
      },
      {
        name: 'specimen_pdf',
        type: 'folder',
        children: [
          { name: 'Monumental_Specimen_Book.pdf', size: '18.4 MB', type: 'file', extension: 'pdf' }
        ]
      },
      { name: 'EULA_Agreement.pdf', size: '280 KB', type: 'file', extension: 'pdf' }
    ],
    changelog: [
      {
        version: '1.8.0',
        releaseDate: '2026-10-14',
        title: 'Variable Weight Axis & Extended Cyrillic Expansion',
        changes: [
          'Added seamless variable weight axis (100 to 900) in single 185KB WOFF2 file',
          'Full linguistic coverage for Extended Cyrillic, Greek, and Vietnamese',
          'Added 42 discretionary ligatures and stylistic set 04 for editorial layouts'
        ]
      }
    ],
    creatorTips: {
      suggestedAmounts: [0, 5, 15, 25],
      creatorHandle: '@clara_type',
      creatorName: 'Clara Lindqvist',
      messagePrompt: 'Tip Clara to fund casting the physical letterpress specimen!'
    }
  },

  'cinemascapes-ambient-audio': {
    bundleId: 'cinemascapes-ambient-audio',
    version: '1.4.0',
    releaseDate: '2026-10-20',
    totalFiles: 28,
    totalSize: '4.2 GB',
    sha256: '72ea98c7634f19bca88d3e6592239c09440ea295d985a53e921d22eec7bb9419',
    signature: 'ecdsa-p256-sha256:5681aa33ff12...88019b',
    fileTree: [
      {
        name: '24bit_96kHz_WAV',
        type: 'folder',
        children: [
          { 
            name: '01_Nordic_Fjord_Glacier_Drone.wav', 
            size: '285 MB', 
            type: 'file', 
            extension: 'wav',
            sampleAvailable: true,
            sampleDownloadUrl: 'https://cdn.nexus-vault.network/samples/fjord-drone-sample.wav'
          },
          { name: '02_Cosmic_Solar_Winds.wav', size: '310 MB', type: 'file', extension: 'wav' },
          { name: '03_Subterranean_Sub_Pulse.wav', size: '260 MB', type: 'file', extension: 'wav' },
          { name: '04_Granular_Rain_Resonator.wav', size: '295 MB', type: 'file', extension: 'wav' }
        ]
      },
      {
        name: 'stems_and_loops',
        type: 'folder',
        children: [
          { name: 'Drone_Stem_Analog_Synth.wav', size: '140 MB', type: 'file', extension: 'wav' },
          { name: 'Texture_Stem_Hydrophone.wav', size: '115 MB', type: 'file', extension: 'wav' },
          { name: 'Sub_Bass_Stem_30Hz.wav', size: '85 MB', type: 'file', extension: 'wav' }
        ]
      },
      {
        name: 'metadata_and_cues',
        type: 'folder',
        children: [
          { name: 'Soundminer_Metadata.csv', size: '24 KB', type: 'file', extension: 'csv' },
          { name: 'BPM_Key_Chart.pdf', size: '450 KB', type: 'file', extension: 'pdf' }
        ]
      }
    ],
    changelog: [
      {
        version: '1.4.0',
        releaseDate: '2026-10-20',
        title: 'Hydrophone & Granular Texture Expansion',
        changes: [
          'Added 8 uncompressed underwater hydrophone recordings from the Arctic circle',
          'Mastered at -24 LUFS cinema audio standard with zero clipping',
          'Embedded UCS (Universal Category System) compliant metadata'
        ]
      }
    ],
    creatorTips: {
      suggestedAmounts: [0, 5, 15, 25],
      creatorHandle: '@soren_audio',
      creatorName: 'Søren Møller',
      messagePrompt: 'Tip Søren to support his upcoming deep-cave acoustic recording expedition!'
    }
  },

  'phosphor-vector-icons': {
    bundleId: 'phosphor-vector-icons',
    version: '2.0.4',
    releaseDate: '2026-11-01',
    totalFiles: 3200,
    totalSize: '38.5 MB',
    sha256: '98d5ea2476579e023ca6e58bdf2093510c4974fca750b28e6c43d83935ee59d1',
    signature: 'ecdsa-p256-sha256:1198fbc1023a...90aa18',
    fileTree: [
      {
        name: 'svg',
        type: 'folder',
        children: [
          {
            name: 'regular',
            type: 'folder',
            children: [
              { name: 'activity.svg', size: '890 B', type: 'file', extension: 'svg', sampleAvailable: true },
              { name: 'airplay.svg', size: '750 B', type: 'file', extension: 'svg' },
              { name: 'shield-check.svg', size: '920 B', type: 'file', extension: 'svg', sampleAvailable: true },
              { name: 'vault-lock.svg', size: '1.1 KB', type: 'file', extension: 'svg' }
            ]
          },
          {
            name: 'fill',
            type: 'folder',
            children: [
              { name: 'activity-fill.svg', size: '910 B', type: 'file', extension: 'svg' },
              { name: 'shield-check-fill.svg', size: '940 B', type: 'file', extension: 'svg' }
            ]
          },
          {
            name: 'duotone',
            type: 'folder',
            children: [
              { name: 'activity-duotone.svg', size: '1.4 KB', type: 'file', extension: 'svg' },
              { name: 'shield-check-duotone.svg', size: '1.5 KB', type: 'file', extension: 'svg' }
            ]
          }
        ]
      },
      {
        name: 'react-components',
        type: 'folder',
        children: [
          { name: 'index.d.ts', size: '142 KB', type: 'file', extension: 'ts' },
          { name: 'PhosphorIcons.esm.js', size: '1.8 MB', type: 'file', extension: 'js' }
        ]
      },
      {
        name: 'figma',
        type: 'folder',
        children: [
          { name: 'Phosphor_Icons_Component_Library.fig', size: '24 MB', type: 'file', extension: 'fig' }
        ]
      },
      { name: 'LICENSE-MIT.txt', size: '1.1 KB', type: 'file', extension: 'txt' }
    ],
    changelog: [
      {
        version: '2.0.4',
        releaseDate: '2026-11-01',
        title: 'Tree-Shaking React 19 ESM Package & 120 New Icons',
        changes: [
          'Added 120 new developer and blockchain security icon glyphs',
          'Pure ESM tree-shakeable bundles (< 1.2kB per icon instance)',
          'Normalized all SVGs to 24x24 optical grid with 2px stroke weight'
        ]
      }
    ],
    creatorTips: {
      suggestedAmounts: [0, 5, 15, 25],
      creatorHandle: '@phosphor_crew',
      creatorName: 'Phosphor Community',
      messagePrompt: 'Tip the open source icon collective to fund daily glyph requests!'
    }
  }
};

/**
 * Returns a rich BundleManifest for any product ID, falling back to an
 * automatically structured, authentic manifest if not hardcoded.
 */
export function getBundleManifest(productId: string, productTitle?: string, creatorName?: string, format?: string, size?: string): BundleManifest {
  const existing = BUNDLE_MANIFESTS[productId];
  if (existing) {
    return existing;
  }

  const safeTitle = productTitle || productId.replace(/-/g, ' ');
  const safeCreator = creatorName || 'Creator';
  const cleanFormat = (format || 'ZIP').replace('.', '').toLowerCase();

  // Synthetic deterministic SHA-256 for products (strictly 64 hex characters)
  const hashSeed = productId.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0);
  const hexPrefix = hashSeed.toString(16).padStart(8, '0');
  const syntheticHash = `${hexPrefix}7c91e84d2f00a581e289c83fb00139e8a719c25f462198be014a9b5f92ff48`.substring(0, 64);

  return {
    bundleId: productId,
    version: '1.0.0',
    releaseDate: '2026-10-25',
    totalFiles: 18,
    totalSize: size || '48.5 MB',
    sha256: syntheticHash,
    signature: `ecdsa-p256-sha256:88${hashSeed.toString(16)}...4192ba`,
    fileTree: [
      {
        name: `master_bundle.${cleanFormat}`,
        size: size || '44.2 MB',
        type: 'file',
        extension: cleanFormat,
        sampleAvailable: true,
        sampleDownloadUrl: `https://cdn.nexus-vault.network/samples/${productId}-sample.${cleanFormat}`
      },
      {
        name: 'assets',
        type: 'folder',
        children: [
          { name: 'component_library.json', size: '1.4 MB', type: 'file', extension: 'json' },
          { name: 'preview_specimen.png', size: '2.8 MB', type: 'file', extension: 'png' },
          { name: 'source_files', type: 'folder', children: [
            { name: `core_data.${cleanFormat}`, size: '12.1 MB', type: 'file', extension: cleanFormat },
            { name: 'manifest.json', size: '14 KB', type: 'file', extension: 'json' }
          ]}
        ]
      },
      {
        name: 'documentation',
        type: 'folder',
        children: [
          { name: 'GETTING_STARTED.md', size: '8.4 KB', type: 'file', extension: 'md' },
          { name: 'LICENSE.pdf', size: '340 KB', type: 'file', extension: 'pdf' }
        ]
      }
    ],
    changelog: [
      {
        version: '1.0.0',
        releaseDate: '2026-10-25',
        title: `Official Release: ${safeTitle}`,
        changes: [
          'Initial production release verified against Nexus Vault security guidelines',
          'Complete asset files packaged with verified SHA-256 distribution checksum',
          'Full cross-platform documentation and source specifications included'
        ]
      }
    ],
    creatorTips: {
      suggestedAmounts: [0, 5, 15, 25],
      creatorHandle: `@${safeCreator.toLowerCase().replace(/\s+/g, '_')}`,
      creatorName: safeCreator,
      messagePrompt: `Tip ${safeCreator} to support continuous product maintenance and new releases!`
    }
  };
}
