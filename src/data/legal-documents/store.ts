export interface LegalDocumentClause {
  section: string;
  title: string;
  explanation: string;
  enforceableText: string;
}

export interface CompleteLegalDocument {
  id: string;
  documentTitle: string;
  jurisdiction: string;
  governingLaw: string;
  lastUpdated: string;
  version: string;
  totalClauses: number;
  wordCount: number;
  summary: string;
  parties: {
    partyA: string;
    partyB: string;
  };
  clauses: LegalDocumentClause[];
  signingBlock: {
    disclaimer: string;
    partyALabel: string;
    partyBLabel: string;
  };
}

export const LEGAL_DOCUMENTS_STORE: Record<string, CompleteLegalDocument> = {
  'msa-sow-master-kit': {
    id: 'msa-sow-master-kit',
    documentTitle: 'MASTER SERVICES AGREEMENT & MODULAR STATEMENT OF WORK',
    jurisdiction: 'United States & Multi-Jurisdictional Commercial Standard',
    governingLaw: 'State of Delaware / Commercial Code Standard',
    lastUpdated: 'November 2026',
    version: '2026.2.0',
    totalClauses: 10,
    wordCount: 3480,
    summary: 'Comprehensive dual-contract architecture for consulting, engineering, design, and software service providers. Shields service providers from unlimited indemnity, caps liabilities strictly at fees paid, establishes sprint milestone verification, and provides automatic change-order governance.',
    parties: {
      partyA: 'Service Provider ("Consultant / Contractor")',
      partyB: 'Client ("Customer / Company")'
    },
    clauses: [
      {
        section: '1.0',
        title: 'Scope of Engagement & Hierarchy of Terms',
        explanation: 'Specifies that individual Statements of Work (SOW) dictate deliverables, while this Master Agreement establishes the governing legal umbrella. In the event of a conflict between an SOW and this Agreement, the MSA prevails unless expressly referenced.',
        enforceableText: '1.1 Services. Provider agrees to perform the services described in one or more Statements of Work ("SOW") executed by both Parties referencing this Master Services Agreement ("Agreement"). Each SOW shall constitute a separate binding contract incorporating all terms herein.\n1.2 Conflict of Terms. In the event of an express conflict between the provisions of this Master Agreement and any SOW, this Agreement shall prevail unless the applicable SOW specifically identifies the conflicting section of this Master Agreement and explicitly declares the intent to supersede it.'
      },
      {
        section: '2.0',
        title: 'Fee Structure, Milestone Billing & Invoicing Terms',
        explanation: 'Guarantees prompt payment obligations (Net 15/30), authorizes standard 1.5% late payment interest, permits pausing service delivery during overdue accounts, and mandates advance retainers before milestone releases.',
        enforceableText: '2.1 Payment Schedule. Client shall pay Provider the fees set forth in each SOW. All invoices are due Net fifteen (15) days from invoice delivery date via ACH, wire, or corporate credit card.\n2.2 Delinquent Accounts. Unpaid balances shall accrue interest at the lesser of one and one-half percent (1.5%) per month or the maximum rate permissible by law. If any invoice remains delinquent for more than seven (7) calendar days past due, Provider reserves the right, upon written electronic notice, to suspend work and withhold deliverables without incurring liability or breach.'
      },
      {
        section: '3.0',
        title: 'Client Review, Acceptance Testing & Deemed Approval',
        explanation: 'Prevents indefinite client delays. Gives the client 5 business days to review deliverable milestones; failure to provide concrete written defect notices results in automatic acceptance.',
        enforceableText: '3.1 Review Window. Client shall have five (5) business days ("Acceptance Window") following electronic delivery of each milestone deliverable to review and verify conformity with the explicit criteria outlined in the governing SOW.\n3.2 Deemed Acceptance. If Client fails to provide a written, specific list of material non-conformities before the expiration of the Acceptance Window, or uses the deliverable in any commercial capacity, the deliverable shall be deemed irrevocably accepted and the corresponding milestone fee shall become immediately payable.'
      },
      {
        section: '4.0',
        title: 'Change-Order Governance & Out-of-Scope Work',
        explanation: 'Eliminates "scope creep". Any modification to timeline, design mockups, features, or architectural specifications requires an executed Change Order with commensurate fee adjustments.',
        enforceableText: '4.1 Scope Integrity. Provider is obligated solely to deliver the items explicitly itemized in the applicable SOW. Requests for revisions exceeding agreed review cycles, new functionality, or changes to core architectural assumptions constitute Out-of-Scope Work.\n4.2 Change Order Requirement. Out-of-Scope Work shall be formally estimated in a written Change Order specifying additional fees and schedule impacts. Provider shall not be obligated to commence requested alterations until Client executes the corresponding Change Order.'
      },
      {
        section: '5.0',
        title: 'Intellectual Property Transfer & Conditional Conveyance',
        explanation: 'Crucial protection: Intellectual property rights ONLY transfer to the client once all invoices and fees are paid in full. Provider retains pre-existing tools, libraries, codebases, and templates.',
        enforceableText: '5.1 Conditional Assignment. Conditioned upon Client\'s complete and timely payment of all fees due hereunder, Provider hereby assigns to Client all right, title, and interest in and to the custom deliverables specifically created under the applicable SOW ("Work Product").\n5.2 Background Technology & Tools. Provider retains exclusive ownership of all pre-existing tools, routines, design systems, algorithms, standard utilities, and proprietary libraries ("Provider Technology"). Provider grants Client a perpetual, non-exclusive, worldwide, royalty-free license to use Provider Technology solely as embedded within the completed Work Product.'
      },
      {
        section: '6.0',
        title: 'Confidentiality, Mutual NDA & Non-Disclosure',
        explanation: 'Enforces standard enterprise-grade non-disclosure protections for trade secrets, source code, financial roadmaps, and business plans for a 3-year survival period.',
        enforceableText: '6.1 Confidential Information. Each Party agrees to protect the Confidential Information of the other Party with the same degree of care it exercises regarding its own confidential assets, but not less than reasonable care.\n6.2 Exclusions. Confidentiality shall not apply to information that is publicly known through no breach, already in the receiving party\'s possession without duty of confidentiality, or independently developed without reliance on the disclosing party\'s data.'
      },
      {
        section: '7.0',
        title: 'Limitation of Liability & Consequential Damage Waiver',
        explanation: 'The paramount defense clause. Strictly limits aggregate damages to the actual fees paid under the specific SOW in the preceding 6 months, and waives lost profits, downtime, or indirect damages.',
        enforceableText: '7.1 Consequential Damages Waiver. IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF REVENUE, PROFITS, DATA, BUSINESS INTERRUPTION, OR REPUTATIONAL DAMAGE, REGARDLESS OF THE LEGAL THEORY.\n7.2 Aggregate Cap. IN NO EVENT SHALL PROVIDER\'S TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT EXCEED THE AGGREGATE FEES ACTUALLY PAID BY CLIENT TO PROVIDER UNDER THE SPECIFIC SOW GIVING RISE TO LIABILITY IN THE SIX (6) MONTHS PRECEDING THE CLAIM.'
      },
      {
        section: '8.0',
        title: 'Non-Solicitation of Personnel',
        explanation: 'Protects the provider against client poaching consultants, senior software engineers, or designers for 18 months following project completion.',
        enforceableText: '8.1 Mutual Restraint. During the term of this Agreement and for a period of eighteen (18) months following its termination, Client shall not directly or indirectly recruit, solicit, hire, or engage as an employee or independent contractor any employee or subcontractor of Provider who participated in the performance of services hereunder without Provider\'s prior written consent.'
      },
      {
        section: '9.0',
        title: 'Termination for Cause & Convenience',
        explanation: 'Defines how the contract can be terminated by either party, with 30 days notice for convenience and 14 days cure period for breach, ensuring compensation for all work completed to date.',
        enforceableText: '9.1 Termination for Breach. Either Party may terminate this Agreement immediately upon written notice if the other Party materially breaches any term and fails to cure such breach within fourteen (14) calendar days of receiving written notice.\n9.2 Payment Upon Termination. In the event of any termination, Client shall immediately pay Provider for all services rendered, non-cancelable commitments incurred, and milestones completed up to the effective termination date.'
      },
      {
        section: '10.0',
        title: 'Governing Law, Arbitration & Severability',
        explanation: 'Establishes binding AAA commercial arbitration in Delaware/New York, with prevailing-party attorney fee recovery to discourage frivolous lawsuits.',
        enforceableText: '10.1 Jurisdiction. This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflicts of law principles.\n10.2 Dispute Resolution & Attorney Fees. Any dispute arising out of this Agreement shall be resolved through binding commercial arbitration administered by the American Arbitration Association (AAA). The prevailing Party in any enforcement action or arbitration shall be entitled to recover reasonable attorneys\' fees and arbitration costs.'
      }
    ],
    signingBlock: {
      disclaimer: 'This document constitutes an enforceable commercial legal agreement when executed by authorized corporate signatories. Always consult qualified legal counsel in your specific municipal jurisdiction for specialized regulatory compliance.',
      partyALabel: 'PROVIDER: Authorized Signatory (Founder / Principal)',
      partyBLabel: 'CLIENT: Authorized Signatory (CEO / Procurement Officer)'
    }
  },
  'software-dev-ip-contract': {
    id: 'software-dev-ip-contract',
    documentTitle: 'SOFTWARE DEVELOPMENT & INTELLECTUAL PROPERTY ASSIGNMENT AGREEMENT',
    jurisdiction: 'United States & Global Commercial Software Standard',
    governingLaw: 'State of California / Delaware Commercial Code',
    lastUpdated: 'November 2026',
    version: '3.1.0',
    totalClauses: 8,
    wordCount: 2920,
    summary: 'Ironclad contractor & team IP assignment contract. Protects technology companies, founders, and SaaS operators against developer equity or IP claims, guaranteeing 100% transfer of source code, patents, and trade secrets.',
    parties: {
      partyA: 'Developer / Technical Contractor ("Contributor")',
      partyB: 'Software Corporation ("Company")'
    },
    clauses: [
      {
        section: '1.0',
        title: 'Comprehensive Work-Made-For-Hire & IP Transfer',
        explanation: 'Explicitly designates all written code, architecture, schema, APIs, algorithms, and documentation as work-made-for-hire, with immediate assignment of any non-qualifying IP.',
        enforceableText: '1.1 Work Made For Hire. Contributor acknowledges and agrees that all software, code, scripts, algorithms, schemas, UI/UX designs, documentation, and technical deliverables ("Inventions") created in connection with the engagement are "works made for hire" under the U.S. Copyright Act.\n1.2 Irrevocable Assignment. To the extent any Invention does not qualify as a work made for hire, Contributor hereby irrevocably transfers, assigns, and conveys to Company all right, title, interest, copyright, patent rights, trade secret rights, and moral rights worldwide in perpetuity.'
      },
      {
        section: '2.0',
        title: 'Clean Code, Open Source & Third-Party Library Warranty',
        explanation: 'Prevents viral GPL open-source contamination of proprietary software codebases by warranting clean licensing for all imported dependencies.',
        enforceableText: '2.1 Open Source Compliance. Contributor warrants that no source code delivered shall contain or incorporate any software licensed under the GNU General Public License (GPL), AGPL, or other "copyleft" licenses that would require the Company to disclose or license its proprietary codebase.\n2.2 Prior Inventions. Contributor explicitly itemizes on Schedule A all prior inventions owned prior to engagement; any prior technology embedded within Company code is licensed royalty-free, perpetually to Company.'
      },
      {
        section: '3.0',
        title: 'Source Code Escrow, Git Repository & Clean Delivery',
        explanation: 'Mandates timely commits to official company repositories, complete commit histories, clean build scripts, and documentation sufficient for independent compilation.',
        enforceableText: '3.1 Repository Protocol. Contributor shall commit all source code, unit tests, configurations, and documentation directly into the Company\'s designated Git repositories on a continuous basis, but not less than once every seventy-two (72) hours.\n3.2 Clean Build Standard. Deliverables are not accepted until code passes automated test suites, produces zero compiler errors, and includes Dockerfiles or environment manifests enabling clean reproduction.'
      },
      {
        section: '4.0',
        title: 'Confidentiality & Source Code Trade Secret Protection',
        explanation: 'Classifies algorithms, API keys, database credentials, architecture plans, and unreleased product roadmaps as high-security trade secrets.',
        enforceableText: '4.1 Strict Secrecy. Contributor shall not disclose, reproduce, fork, or utilize Company source code, cryptographic keys, customer telemetry, or architectural designs for any purpose outside direct Company authorization.\n4.2 Zero Personal Storage. Contributor agrees not to store unencrypted source code or customer data on personal cloud drives, public repositories, or unsecured external media.'
      },
      {
        section: '5.0',
        title: 'Indemnification Against Infringement Claims',
        explanation: 'Contributor warrants that code is original and agrees to indemnify the Company against third-party copyright, patent, or trade secret infringement claims.',
        enforceableText: '5.1 Originality Warranty. Contributor represents and warrants that all Work Product is original work and does not infringe, misappropriate, or violate any third-party copyright, trade secret, trademark, or patent.\n5.2 Indemnity Defense. Contributor shall defend and hold harmless Company from and against any third-party claims, liabilities, or legal expenses arising out of a breach of the originality warranty.'
      },
      {
        section: '6.0',
        title: 'Power of Attorney for Patent & Copyright Filings',
        explanation: 'Authorizes Company to execute patent or copyright filings if the developer becomes unavailable or refuses to sign administrative filings.',
        enforceableText: '6.1 Execution of Documents. Contributor shall assist Company in securing and registering patent, copyright, and trademark protections for all assigned Inventions.\n6.2 Power of Attorney. If Company is unable after reasonable effort to secure Contributor\'s signature, Contributor hereby irrevocably appoints Company as Contributor\'s agent and attorney-in-fact to execute and file applications on Contributor\'s behalf.'
      },
      {
        section: '7.0',
        title: 'Non-Competition & Non-Solicitation Covenants',
        explanation: 'Prevents developer from soliciting team members or building a directly competitive clone product during and immediately following the engagement.',
        enforceableText: '7.1 Team Non-Solicit. For twelve (12) months following termination, Contributor shall not solicit, recruit, or entice away any engineer, product manager, or contractor of Company.\n7.2 Competitive Misuse. Contributor shall not use Company Confidential Information or proprietary trade secrets to design, market, or build a substantially identical software product.'
      },
      {
        section: '8.0',
        title: 'Governing Law & Equitable Injunction Relief',
        explanation: 'Provides Company the right to seek emergency injunctive relief from courts to stop unauthorized source code leaks or IP misuse.',
        enforceableText: '8.1 Injunction Rights. Contributor acknowledges that breach of IP assignment or confidentiality causes irreparable harm for which monetary damages are inadequate; Company shall be entitled to immediate injunctive relief in any court of competent jurisdiction without posting bond.'
      }
    ],
    signingBlock: {
      disclaimer: 'Essential for VC due diligence, M&A acquisitions, and institutional funding rounds. Validates clean chain-of-title across all engineering assets.',
      partyALabel: 'CONTRIBUTOR: Developer / Systems Architect',
      partyBLabel: 'COMPANY: Chief Executive Officer / General Counsel'
    }
  },
  'b2b-saas-terms-privacy': {
    id: 'b2b-saas-terms-privacy',
    documentTitle: 'ENTERPRISE B2B SAAS TERMS OF SERVICE & SLA MATRIX',
    jurisdiction: 'United States, European Union (GDPR) & Global Cloud Standard',
    governingLaw: 'State of Delaware / GDPR Article 28 Standard',
    lastUpdated: 'November 2026',
    version: '4.0.0',
    totalClauses: 9,
    wordCount: 3650,
    summary: 'Procurement-ready master subscription agreement with 99.9% uptime Service Level Agreement (SLA), customer data privacy governance, security audit commitments, and service credits framework.',
    parties: {
      partyA: 'SaaS Platform Provider ("Vendor")',
      partyB: 'Enterprise Customer ("Subscriber")'
    },
    clauses: [
      {
        section: '1.0',
        title: 'Subscription Services, Seat Licensing & Fair Use',
        explanation: 'Grants non-exclusive, non-transferable access based on purchased user seats, API rate quotas, and acceptable usage restrictions.',
        enforceableText: '1.1 License Grant. Subject to the terms herein, Vendor grants Subscriber a non-exclusive, non-transferable, non-sublicensable worldwide license to access and utilize the SaaS Services for internal business operations.\n1.2 Seat Allocation. Each user credential may be used solely by one named individual. Credential sharing across team members is prohibited. API usage is bounded by the hourly rate limits specified on the order schedule.'
      },
      {
        section: '2.0',
        title: 'Service Level Agreement (SLA) & 99.9% Uptime Commitment',
        explanation: 'Commits to 99.9% monthly uptime calculated excluding scheduled maintenance windows, with tiered credit penalties if thresholds are breached.',
        enforceableText: '2.1 Uptime Guarantee. Vendor shall use commercially reasonable efforts to ensure the Production Platform maintains at least 99.9% Monthly Uptime Percentage during each billing calendar month.\n2.2 Scheduled Maintenance. Maintenance performed during designated Sunday maintenance windows with at least 48 hours advance notice shall not count as downtime.'
      },
      {
        section: '3.0',
        title: 'Service Credit Remedy Matrix',
        explanation: 'Defines the sole and exclusive remedy for uptime degradation: financial credits applied toward subsequent invoice renewals.',
        enforceableText: '3.1 Credit Tiers. If Monthly Uptime falls below commitments, Subscriber is entitled upon written request to Service Credits as follows: (a) <99.9% to 99.0%: 10% monthly fee credit; (b) <99.0% to 95.0%: 25% monthly fee credit; (c) <95.0%: 50% monthly fee credit.\n3.2 Exclusive Remedy. Service Credits constitute Subscriber\'s sole and exclusive remedy for any failure to meet Service Levels.'
      },
      {
        section: '4.0',
        title: 'Customer Data Ownership & GDPR Data Processing (DPA)',
        explanation: 'Explicitly guarantees that customer data remains 100% owned by the subscriber. Incorporates GDPR standard contractual clauses and sub-processor commitments.',
        enforceableText: '4.1 Data Ownership. Subscriber retains all right, title, and ownership interest in all electronic data, files, and records submitted by Subscriber ("Customer Data"). Vendor acquires zero ownership rights.\n4.2 Data Protection Addendum. To the extent Customer Data includes Personal Data under GDPR/CCPA, the Parties agree to abide by the Data Processing Addendum (DPA) incorporated herein by reference, ensuring standard encryption (AES-256 at rest, TLS 1.3 in transit).'
      },
      {
        section: '5.0',
        title: 'Security Audits, SOC 2 Certification & Vulnerability Scanning',
        explanation: 'Warrants maintaining independent SOC 2 Type II attestation, annual third-party penetration testing, and 72-hour breach notification protocols.',
        enforceableText: '5.1 Security Standards. Vendor shall maintain rigorous administrative, technical, and physical safeguards including annual SOC 2 Type II audit reports available upon NDA.\n5.2 Incident Notification. In the event of confirmed unauthorized access to Subscriber Customer Data, Vendor shall notify Subscriber within seventy-two (72) hours of security incident confirmation.'
      },
      {
        section: '6.0',
        title: 'Mutual Indemnification & IP Infringement Defense',
        explanation: 'Standard enterprise mutual indemnity: Vendor defends Subscriber against IP infringement lawsuits; Subscriber defends Vendor against unauthorized content claims.',
        enforceableText: '6.1 Vendor Indemnity. Vendor shall defend Subscriber against any third-party claim alleging the SaaS Platform directly infringes any valid copyright or patent, and shall pay court-awarded damages or settled sums.\n6.2 Exclusions. Vendor shall have no liability if infringement arises from Subscriber\'s unauthorized modification of the Service or combination with non-Vendor software.'
      },
      {
        section: '7.0',
        title: 'Limitation of Liability & Multiplier Cap',
        explanation: 'Standard procurement 12-month trailing fees liability cap, balanced with higher carve-outs for direct gross negligence or intentional misconduct.',
        enforceableText: '7.1 Liability Cap. EXCEPT FOR INDEMNIFICATION OBLIGATIONS OR BREACHES OF CONFIDENTIALITY, NEITHER PARTY\'S TOTAL AGGREGATE LIABILITY SHALL EXCEED THE TOTAL FEES PAID BY SUBSCRIBER IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.'
      },
      {
        section: '8.0',
        title: 'Data Portability, Retrieval & Deletion Upon Termination',
        explanation: 'Ensures subscriber has 30 days to export all databases and JSON/CSV backups prior to complete cryptographic erasure.',
        enforceableText: '8.1 Export Window. Following termination or expiration, Subscriber shall have thirty (30) calendar days to export and download all Customer Data in standard format (JSON, CSV, SQL).\n8.2 Cryptographic Sanitization. Following said 30-day window, Vendor shall securely delete all Customer Data from live systems in compliance with NIST 800-88 guidelines.'
      },
      {
        section: '9.0',
        title: 'Governing Law, Venue & Severability',
        explanation: 'Enterprise standard Delaware governing law with waiver of jury trial and class action representation.',
        enforceableText: '9.1 Governing Law. This Agreement shall be construed under the laws of the State of Delaware. Both Parties irrevocably waive right to trial by jury or participation in class-action arbitration.'
      }
    ],
    signingBlock: {
      disclaimer: 'Engineered specifically for enterprise security questionnaires, procurement legal reviews, and B2B vendor approval gates.',
      partyALabel: 'VENDOR: Vice President of Global Enterprise Sales',
      partyBLabel: 'SUBSCRIBER: Chief Information Security Officer / Procurement Director'
    }
  }
};
