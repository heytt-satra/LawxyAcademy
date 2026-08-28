export const COURSES = [
  {
    id: 'level-1',
    slug: 'level-1',
    title: 'AI-Native Lawyer Certification — Level 1: Foundation',
    level: 1,
    credentialCode: 'AINL-L1',
    credentialTitle: 'Lawxy Certified AI-Native Lawyer (Foundation)',
    duration: '32 Hours',
    modulesCount: 12,
    lessonsCount: 55,
    passingScore: 70,
    shortDescription: 'Core foundation for lawyers and legal professionals to safely, ethically, and effectively apply AI across daily legal workflows.',
    longDescription: 'The Level 1 Certification establishes the rigorous baseline required for 21st-century AI-native legal practice. You will master the fundamentals of large language models, prompt engineering tailored for legal documents, reliable legal research, hallucination identification, rigorous source verification, and human-in-the-loop ethical oversight. All learning material is free; certification requires passing the comprehensive proctored assessment.',
    prerequisites: ['Basic legal reasoning & document familiarity'],
    lawxyIntegrations: [
      { tool: 'JurisMind', description: 'AI-assisted legal research and authority verification' },
      { tool: 'Case Lens', description: 'Factual timeline reconstruction & case synthesis' },
      { tool: 'Contract Review Studio', description: 'Redline analysis and risk classification' },
      { tool: 'AgentFlow', description: 'Standardized multi-step legal task orchestration' }
    ],
    modules: [
      {
        id: 'm1',
        slug: 'ai-fundamentals-for-legal',
        title: 'Module 1: AI Fundamentals for Legal Professionals',
        estimatedMinutes: 150,
        competencyCode: 'L1-AIFUND',
        description: 'Demystifying artificial intelligence, machine learning, and neural networks without technical jargon. Understanding where AI creates leverage and where it fails.',
        learningObjectives: [
          'Distinguish between deterministic software, generative AI, and specialized legal AI models',
          'Understand parameters, context windows, tokens, and inference mechanics',
          'Identify the primary failure modes of generative models in high-stakes legal environments',
          'Assess organizational AI readiness and establish appropriate guardrails'
        ],
        lessons: [
          {
            id: 'l1-1',
            slug: 'what-is-generative-ai-in-law',
            title: '1.1 Generative AI in the Modern Legal Ecosystem',
            type: 'reading',
            duration: '20 min',
            summary: 'How foundation models differ from previous legal tech (Boolean search, rule engines, predictive coding).'
          },
          {
            id: 'l1-2',
            slug: 'understanding-tokens-and-context-windows',
            title: '1.2 Tokens, Context Windows, and Memory in Legal Context',
            type: 'video',
            duration: '25 min',
            videoUrl: 'https://player.vimeo.com/video/890123456',
            summary: 'How legal briefs and 100-page contracts are tokenized, processed, and truncated.'
          },
          {
            id: 'l1-3',
            slug: 'deterministic-vs-probabilistic-systems',
            title: '1.3 Probabilistic Models in a Deterministic Profession',
            type: 'interactive',
            duration: '35 min',
            summary: 'Interactive simulation showing temperature adjustments and hallucination likelihood on case law lookups.'
          },
          {
            id: 'l1-4',
            slug: 'evaluating-legal-ai-tools',
            title: '1.4 Taxonomy of Legal AI Tools (Generic LLMs vs Specialized Legal Systems)',
            type: 'reading',
            duration: '30 min',
            summary: 'Framework for assessing closed legal AI platforms like Lawxy JurisMind vs general-purpose chat interfaces.'
          },
          {
            id: 'l1-5',
            slug: 'module-1-knowledge-check',
            title: '1.5 Module 1 Assessment & Scenario Check',
            type: 'assessment',
            duration: '40 min',
            summary: 'Scenario test evaluating your ability to select appropriate AI tools for discrete legal matters.'
          }
        ]
      },
      {
        id: 'm2',
        slug: 'llms-in-legal-context',
        title: 'Module 2: LLMs and How They Work in Legal Context',
        estimatedMinutes: 120,
        competencyCode: 'L1-LLM',
        description: 'Deep-dive into pre-training, fine-tuning, embeddings, and Retrieval-Augmented Generation (RAG) within legal databases.',
        learningObjectives: [
          'Explain how RAG anchors LLM generation in verified primary sources (statutes, case law, regulations)',
          'Understand vector search versus keyword indexing in legal research',
          'Evaluate data leakage risks and model training on user inputs'
        ],
        lessons: [
          {
            id: 'l2-1',
            slug: 'retrieval-augmented-generation-for-lawyers',
            title: '2.1 RAG Architecture in Legal Practice',
            type: 'reading',
            duration: '25 min',
            summary: 'Why zero-shot generation hallucinates citations and how RAG pipelines ground outputs in court records.'
          },
          {
            id: 'l2-2',
            slug: 'embeddings-and-semantic-search',
            title: '2.2 Semantic Vector Search vs Boolean Queries',
            type: 'interactive',
            duration: '35 min',
            summary: 'Hands-on comparison: Finding obscure precedential cases using conceptual embeddings vs legacy keywords.'
          },
          {
            id: 'l2-3',
            slug: 'model-training-and-client-data-leakage',
            title: '2.3 Model Training, Fine-Tuning, and Privacy Boundaries',
            type: 'reading',
            duration: '30 min',
            summary: 'Analyzing cloud terms of service, zero data retention policies, and enterprise API guarantees.'
          },
          {
            id: 'l2-4',
            slug: 'module-2-knowledge-check',
            title: '2.4 Module 2 Practical Knowledge Check',
            type: 'assessment',
            duration: '30 min',
            summary: 'Analyze cloud terms of service for an AI vendor and identify 3 critical privacy red flags.'
          }
        ]
      },
      {
        id: 'm3',
        slug: 'prompting-for-legal-professionals',
        title: 'Module 3: Prompting for Legal Professionals',
        estimatedMinutes: 180,
        competencyCode: 'L1-PROMPT',
        description: 'Master structured legal prompt architectures: role assignment, context injection, boundary negative constraints, and few-shot legal demonstrations.',
        learningObjectives: [
          'Construct multi-part system prompts for contract redlining, memo outlining, and deposition preparation',
          'Use few-shot examples to enforce jurisdiction-specific citation formatting (Bluebook/OSCOLA)',
          'Apply negative constraints to strictly prevent fabricated statutory provisions'
        ],
        lessons: [
          {
            id: 'l3-1',
            slug: 'legal-prompt-engineering-framework',
            title: '3.1 The 5-Pillar Legal Prompt Architecture',
            type: 'reading',
            duration: '30 min',
            summary: 'Role, Context, Task, Constraints, and Output Specification applied to legal tasks.'
          },
          {
            id: 'l3-2',
            slug: 'chain-of-thought-legal-reasoning',
            title: '3.2 Chain-of-Thought (CoT) and Step-by-Step Legal Reasoning',
            type: 'interactive',
            duration: '40 min',
            summary: 'Interactive workshop: Prompting the model to outline jurisdictional elements before drawing conclusions.'
          },
          {
            id: 'l3-3',
            slug: 'handling-negative-constraints-and-hallucination-curbs',
            title: '3.3 Negative Constraints & Defensive Prompting',
            type: 'video',
            duration: '30 min',
            videoUrl: 'https://player.vimeo.com/video/890123457',
            summary: 'Techniques to prevent LLMs from extrapolating beyond provided contract excerpts.'
          },
          {
            id: 'l3-4',
            slug: 'advanced-few-shot-prompting-for-briefs',
            title: '3.4 Few-Shot Examples for Strict Format Adherence',
            type: 'interactive',
            duration: '40 min',
            summary: 'Teaching the model specific appellate style guidelines through targeted exemplar pairs.'
          },
          {
            id: 'l3-5',
            slug: 'module-3-prompting-lab',
            title: '3.5 Prompt Engineering Practical Laboratory',
            type: 'exercise',
            duration: '40 min',
            summary: 'Build a production-grade prompt for drafting a formal cease-and-desist letter with strict factual bounds.'
          }
        ]
      },
      {
        id: 'm4',
        slug: 'legal-research-with-ai',
        title: 'Module 4: Legal Research with AI (Lawxy JurisMind & Beyond)',
        estimatedMinutes: 210,
        competencyCode: 'L1-RESEARCH',
        description: 'Conducting high-speed, verifiable legal research. Using AI for issue identification, secondary source synthesis, and direct primary authority verification.',
        learningObjectives: [
          'Formulate comprehensive research queries combining natural language and jurisdictional limits',
          'Synthesize split-circuit authority and conflicting precedent with citations',
          'Use Lawxy JurisMind workflows to cross-examine AI research memos against official dockets'
        ],
        lessons: [
          {
            id: 'l4-1',
            slug: 'ai-assisted-issue-spotting',
            title: '4.1 AI-Assisted Issue Spotting & Fact-Pattern Analysis',
            type: 'reading',
            duration: '30 min',
            summary: 'Extracting subtle cause-of-action elements from unstructured witness statements and discovery documents.'
          },
          {
            id: 'l4-2',
            slug: 'primary-vs-secondary-authority-synthesis',
            title: '4.2 Synthesizing Multi-Jurisdictional Case Law',
            type: 'interactive',
            duration: '45 min',
            summary: 'Comparing state supreme court treatments of trade secret misappropriation via RAG queries.'
          },
          {
            id: 'l4-3',
            slug: 'jurismind-case-law-investigation',
            title: '4.3 Practical Research with Lawxy JurisMind',
            type: 'video',
            duration: '35 min',
            videoUrl: 'https://player.vimeo.com/video/890123458',
            summary: 'Step-by-step walkthrough of automated Shepardizing/KeyCiting and validating good law status.'
          },
          {
            id: 'l4-4',
            slug: 'statutory-and-regulatory-cross-referencing',
            title: '4.4 Statutory & Administrative Code Deep-Dives',
            type: 'reading',
            duration: '30 min',
            summary: 'Navigating federal registers, enabling legislation, and administrative agency guidance with AI.'
          },
          {
            id: 'l4-5',
            slug: 'research-memo-generation-and-audit',
            title: '4.5 Drafting & Auditing the AI Research Memo',
            type: 'interactive',
            duration: '40 min',
            summary: 'Reviewing an automated legal memo line-by-line against primary reporter PDFs.'
          },
          {
            id: 'l4-6',
            slug: 'module-4-research-capstone',
            title: '4.6 Module 4 Assessment: Real-World Research Sprint',
            type: 'assessment',
            duration: '30 min',
            summary: 'Draft a 2-page research synthesis on arbitration clause enforceability in electronic consumer contracts.'
          }
        ]
      },
      {
        id: 'm5',
        slug: 'ai-assisted-legal-drafting',
        title: 'Module 5: AI-Assisted Legal Drafting & Summarization',
        estimatedMinutes: 180,
        competencyCode: 'L1-DRAFT',
        description: 'Transforming rough notes, client intakes, and term sheets into formal legal instruments with human verification at every step.',
        learningObjectives: [
          'Draft clear, enforceable demand letters, pleadings, and non-disclosure agreements with AI',
          'Perform automated document summarization while preserving nuance and material risk points',
          'Maintain consistent defined terms and cross-references across multi-hundred-page documents'
        ],
        lessons: [
          {
            id: 'l5-1',
            slug: 'principles-of-ai-native-drafting',
            title: '5.1 Principles of AI-Native Legal Drafting',
            type: 'reading',
            duration: '30 min',
            summary: 'The collaborative drafting model: AI produces first drafts, lawyer governs intent and legal enforceability.'
          },
          {
            id: 'l5-2',
            slug: 'drafting-pleadings-and-motions',
            title: '5.2 Drafting Complaints, Answers, and Standard Motions',
            type: 'interactive',
            duration: '40 min',
            summary: 'Formulating affirmative defenses and fact allegations tailored to local court rules.'
          },
          {
            id: 'l5-3',
            slug: 'executive-and-client-summarization',
            title: '5.3 Multi-Level Document Summarization',
            type: 'video',
            duration: '30 min',
            videoUrl: 'https://player.vimeo.com/video/890123459',
            summary: 'Translating 80-page discovery responses into 1-page executive memos for general counsel.'
          },
          {
            id: 'l5-4',
            slug: 'defined-term-and-cross-reference-checking',
            title: '5.4 Automated Consistency & Cross-Reference Verification',
            type: 'interactive',
            duration: '40 min',
            summary: 'Using AI to flag undefined capitalized terms, circular definitions, and orphaned section citations.'
          },
          {
            id: 'l5-5',
            slug: 'module-5-drafting-exam',
            title: '5.5 Module 5 Drafting Assessment',
            type: 'assessment',
            duration: '40 min',
            summary: 'Produce a refined settlement agreement based on a contentious mediation term sheet.'
          }
        ]
      },
      {
        id: 'm6',
        slug: 'contract-analysis-with-ai',
        title: 'Module 6: Contract Analysis & Risk Identification with AI',
        estimatedMinutes: 180,
        competencyCode: 'L1-CONTRACT',
        description: 'Using AI for clause extraction, deviation analysis against playbook standards, risk scoring, and automated redlining.',
        learningObjectives: [
          'Extract standard and non-standard clauses across MSA, NDA, DPA, and SLA agreements',
          'Benchmark third-party agreements against a law firm or corporate playbook',
          'Identify hidden indemnity, limitation of liability, and IP assignment exposures'
        ],
        lessons: [
          {
            id: 'l6-1',
            slug: 'contract-triage-and-clause-extraction',
            title: '6.1 Contract Triage and Clause Categorization',
            type: 'reading',
            duration: '30 min',
            summary: 'Automating clause taxonomy and identifying missing mandatory terms.'
          },
          {
            id: 'l6-2',
            slug: 'playbook-comparison-and-redlining',
            title: '6.2 Playbook Comparison & Automated Redlining',
            type: 'interactive',
            duration: '45 min',
            summary: 'Configuring risk thresholds (Low, Medium, High, Unacceptable) on indemnification caps.'
          },
          {
            id: 'l6-3',
            slug: 'lawxy-contract-review-studio-walkthrough',
            title: '6.3 Practical Review in Lawxy Contract Review Studio',
            type: 'video',
            duration: '35 min',
            videoUrl: 'https://player.vimeo.com/video/890123460',
            summary: 'Using side-by-side markup and rationale explanations for client negotiations.'
          },
          {
            id: 'l6-4',
            slug: 'evaluating-ambiguity-and-loophole-risks',
            title: '6.4 Spotting Ambiguity, Vague Standards, and Traps',
            type: 'reading',
            duration: '30 min',
            summary: 'Flagging subjective standards ("commercially reasonable efforts") and drafting precise alternatives.'
          },
          {
            id: 'l6-5',
            slug: 'module-6-contract-audit-test',
            title: '6.5 Module 6 Practical Contract Audit Assessment',
            type: 'assessment',
            duration: '40 min',
            summary: 'Review a vendor master services agreement and generate an executive risk memo with redlines.'
          }
        ]
      },
      {
        id: 'm7',
        slug: 'case-analysis-and-due-diligence',
        title: 'Module 7: Case Analysis & Due Diligence (Lawxy Case Lens)',
        estimatedMinutes: 180,
        competencyCode: 'L1-CASEDD',
        description: 'Analyzing high-volume litigation records, corporate virtual data rooms (VDR), and chronological fact-pattern assembly.',
        learningObjectives: [
          'Assemble chronological event timelines from emails, text messages, and internal communications',
          'Surface contradictions across deposition transcripts and sworn affidavits',
          'Conduct rapid M&A due diligence across hundreds of supplier and employment contracts'
        ],
        lessons: [
          {
            id: 'l7-1',
            slug: 'chronological-timeline-reconstruction',
            title: '7.1 Timeline Construction & Fact Matrix Assembly',
            type: 'reading',
            duration: '30 min',
            summary: 'Synthesizing evidence across fragmented document sets using Lawxy Case Lens.'
          },
          {
            id: 'l7-2',
            slug: 'cross-examining-witness-testimony',
            title: '7.2 Detecting Inconsistencies in Deposition Transcripts',
            type: 'interactive',
            duration: '45 min',
            summary: 'Spotting conflicting testimony on key corporate meeting dates and email timestamps.'
          },
          {
            id: 'l7-3',
            slug: 'due-diligence-sampling-and-reporting',
            title: '7.3 Scaled Due Diligence in M&A Transactions',
            type: 'video',
            duration: '35 min',
            videoUrl: 'https://player.vimeo.com/video/890123461',
            summary: 'Filtering change-of-control provisions and assignment restrictions across 200 lease agreements.'
          },
          {
            id: 'l7-4',
            slug: 'managing-hallucination-risk-in-discovery',
            title: '7.4 Quality Control & Verification in High-Volume Discovery',
            type: 'reading',
            duration: '30 min',
            summary: 'Statistical sampling and human verification protocols to guarantee comprehensive diligence.'
          },
          {
            id: 'l7-5',
            slug: 'module-7-diligence-exam',
            title: '7.5 Module 7 Case Analysis Assessment',
            type: 'assessment',
            duration: '40 min',
            summary: 'Perform due diligence on a 10-document corporate data room and flag 4 critical deal risks.'
          }
        ]
      },
      {
        id: 'm8',
        slug: 'ai-workflows-for-legal-practice',
        title: 'Module 8: AI Workflows for Legal Practice (Lawxy AgentFlow)',
        estimatedMinutes: 150,
        competencyCode: 'L1-WORKFLOW',
        description: 'Designing repeatable, multi-step legal workflows with built-in human verification gates.',
        learningObjectives: [
          'Map end-to-end legal processes into discrete AI tasks (ingest -> extract -> evaluate -> draft -> verify)',
          'Establish mandatory Human-In-The-Loop (HITL) checkpoints before client delivery',
          'Deploy workflow automation with Lawxy AgentFlow'
        ],
        lessons: [
          {
            id: 'l8-1',
            slug: 'deconstructing-legal-processes',
            title: '8.1 Deconstructing Complex Legal Work into Modular Steps',
            type: 'reading',
            duration: '30 min',
            summary: 'Why monolithic prompts fail on complex legal matters and how multi-agent pipelines succeed.'
          },
          {
            id: 'l8-2',
            slug: 'human-in-the-loop-architecture',
            title: '8.2 Designing Mandatory Human Review Checkpoints',
            type: 'video',
            duration: '30 min',
            videoUrl: 'https://player.vimeo.com/video/890123462',
            summary: 'Where human judgment is irreplaceable: risk tolerance, tactical posture, and client relationships.'
          },
          {
            id: 'l8-3',
            slug: 'lawxy-agentflow-configuration',
            title: '8.3 Building Workflows with Lawxy AgentFlow',
            type: 'interactive',
            duration: '45 min',
            summary: 'Configure an automated NDA review workflow with attorney approval gates.'
          },
          {
            id: 'l8-4',
            slug: 'module-8-workflow-assessment',
            title: '8.4 Module 8 Workflow Design Assessment',
            type: 'assessment',
            duration: '45 min',
            summary: 'Architect a 5-step AI workflow for processing trademark infringement notices.'
          }
        ]
      },
      {
        id: 'm9',
        slug: 'hallucinations-verification-and-source-validation',
        title: 'Module 9: Hallucinations, Verification & Source Validation (CRITICAL)',
        estimatedMinutes: 180,
        competencyCode: 'L1-VERIFY',
        isCritical: true,
        description: 'The core defensive skill of the AI-native lawyer: identifying false authorities, fabricated quotations, and phantom procedural histories before filing.',
        learningObjectives: [
          'Identify the psychological and statistical mechanisms causing LLM hallucinations',
          'Execute a 4-step Authority Verification Protocol for every AI-generated legal assertion',
          'Audit quotations, docket numbers, pincites, and court designations against official reporters'
        ],
        lessons: [
          {
            id: 'l9-1',
            slug: 'the-mechanics-of-legal-hallucinations',
            title: '9.1 Anatomy of a Legal Hallucination: Why LLMs Invent Cases',
            type: 'reading',
            duration: '35 min',
            summary: 'Detailed post-mortem analysis of high-profile court sanctions (Mata v. Avianca, etc.).'
          },
          {
            id: 'l9-2',
            slug: 'the-4-step-authority-verification-protocol',
            title: '9.2 The Lawxy 4-Step Verification Protocol (AVP)',
            type: 'interactive',
            duration: '45 min',
            summary: '1. Existence Check -> 2. Quote Match -> 3. Holding Validation -> 4. Good Law Status.'
          },
          {
            id: 'l9-3',
            slug: 'spotting-subtle-distortions-and-overstatements',
            title: '9.3 Subtle Distortions: Real Cases with Invented Holdings',
            type: 'video',
            duration: '30 min',
            videoUrl: 'https://player.vimeo.com/video/890123463',
            summary: 'How LLMs subtly overstate holdings to match the user prompt desideratum.'
          },
          {
            id: 'l9-4',
            slug: 'verification-checklists-for-litigation-and-transactions',
            title: '9.4 Standardized Verification Checklists for Law Firms',
            type: 'reading',
            duration: '30 min',
            summary: 'Firm-wide quality control SOPs to prevent unverified AI filings.'
          },
          {
            id: 'l9-5',
            slug: 'module-9-verification-assessment',
            title: '9.5 Module 9 High-Stakes Verification Assessment',
            type: 'assessment',
            duration: '40 min',
            summary: 'Audit an AI-generated motion to dismiss and flag all 5 fabricated citations and misquoted holdings.'
          }
        ]
      },
      {
        id: 'm10',
        slug: 'confidentiality-privacy-and-data-security',
        title: 'Module 10: Confidentiality, Privacy & Data Security (CRITICAL)',
        estimatedMinutes: 120,
        competencyCode: 'L1-CONFID',
        isCritical: true,
        description: 'Safeguarding attorney-client privilege, work-product doctrine, and international data protection laws (GDPR, CCPA/CPRA, HIPAA) in AI systems.',
        learningObjectives: [
          'Evaluate privilege waiver risks when inputting confidential client matters into public vs enterprise AI tools',
          'Audit vendor security documentation (SOC 2 Type II, ISO 27001, HIPAA BAA, encryption in transit and at rest)',
          'Implement data anonymization and PII redaction workflows'
        ],
        lessons: [
          {
            id: 'l10-1',
            slug: 'attorney-client-privilege-and-third-party-disclosure',
            title: '10.1 Privilege Waiver & Third-Party Disclosure Doctrine',
            type: 'reading',
            duration: '30 min',
            summary: 'How entering client facts into consumer AI models risks waiver of evidentiary privilege.'
          },
          {
            id: 'l10-2',
            slug: 'vendor-vetting-and-enterprise-security-standards',
            title: '10.2 Vendor Due Diligence & Security Architecture',
            type: 'interactive',
            duration: '30 min',
            summary: 'Zero Data Retention (ZDR), customer-managed encryption keys (CMEK), and isolated tenant environments.'
          },
          {
            id: 'l10-3',
            slug: 'automated-pii-redaction-and-anonymization',
            title: '10.3 Pre-Inference PII Redaction & Data Sanitization',
            type: 'video',
            duration: '30 min',
            videoUrl: 'https://player.vimeo.com/video/890123464',
            summary: 'Best practices for anonymizing names, addresses, SSNs, and trade secrets before prompt execution.'
          },
          {
            id: 'l10-4',
            slug: 'module-10-security-audit-assessment',
            title: '10.4 Module 10 Security & Confidentiality Assessment',
            type: 'assessment',
            duration: '30 min',
            summary: 'Conduct a risk assessment of a proposed firm-wide AI implementation policy.'
          }
        ]
      },
      {
        id: 'm11',
        slug: 'professional-responsibility-and-ethics',
        title: 'Module 11: Professional Responsibility, Ethics & Human Oversight (CRITICAL)',
        estimatedMinutes: 150,
        competencyCode: 'L1-ETHICS',
        isCritical: true,
        description: 'ABA Model Rules 1.1 (Competence), 1.6 (Confidentiality), 5.1/5.3 (Supervisory Obligations), 8.4 (Misconduct), court standing orders, and ethical AI billing.',
        learningObjectives: [
          'Apply ABA Model Rules and state bar ethics opinions on generative AI to daily practice',
          'Comply with federal and state court standing orders requiring mandatory AI disclosure certifications',
          'Establish ethical, transparent client billing models for AI-assisted legal services'
        ],
        lessons: [
          {
            id: 'l11-1',
            slug: 'aba-model-rules-and-technological-competence',
            title: '11.1 ABA Model Rules 1.1, 1.6, and 5.3 in the AI Era',
            type: 'reading',
            duration: '30 min',
            summary: 'Duty of technological competence, non-delegable duty of supervision, and ethical communication.'
          },
          {
            id: 'l11-2',
            slug: 'court-standing-orders-and-mandatory-certifications',
            title: '11.2 Judicial Standing Orders & Mandatory AI Disclosures',
            type: 'reading',
            duration: '30 min',
            summary: 'Complying with federal district court orders requiring attorney verification of AI-assisted filings.'
          },
          {
            id: 'l11-3',
            slug: 'ethical-billing-and-value-pricing-with-ai',
            title: '11.3 Ethical Billing, Efficiency Dividends, and Alternative Fee Arrangements',
            type: 'video',
            duration: '30 min',
            videoUrl: 'https://player.vimeo.com/video/890123465',
            summary: 'Navigating hourly billing vs value pricing when AI reduces a 10-hour research task to 30 minutes.'
          },
          {
            id: 'l11-4',
            slug: 'bias-fairness-and-algorithmic-transparency',
            title: '11.4 Algorithmic Bias, Sentencing Models, and Fairness',
            type: 'interactive',
            duration: '30 min',
            summary: 'Recognizing demographic and jurisdictional biases in commercial AI models.'
          },
          {
            id: 'l11-5',
            slug: 'module-11-ethics-board-assessment',
            title: '11.5 Module 11 Ethics & Professional Responsibility Assessment',
            type: 'assessment',
            duration: '30 min',
            summary: 'Analyze 3 complex professional responsibility dilemmas involving AI use in litigation and transaction work.'
          }
        ]
      },
      {
        id: 'capstone',
        slug: 'level-1-capstone',
        title: 'Capstone: End-to-End AI-Assisted Legal Matter',
        estimatedMinutes: 240,
        competencyCode: 'L1-CAPSTONE',
        isCritical: true,
        description: 'Comprehensive practical simulation: Given an intricate corporate breach of contract dispute, conduct AI research, draft pleadings, review counterparty agreements, execute source verification, and deliver an audited client deliverable.',
        learningObjectives: [
          'Execute a complete real-world legal matter integrating all Level 1 competencies',
          'Produce clean, citation-verified, ethically sound legal work products under time constraints',
          'Document the full AI audit trail demonstrating human supervision at every junction'
        ],
        lessons: [
          {
            id: 'capstone-1',
            slug: 'capstone-matter-instructions-and-docket',
            title: 'Capstone Project: Apex Tech vs. Meridian Logistics Matter',
            type: 'exercise',
            duration: '240 min',
            summary: 'Complete multi-part practical submission evaluated against the official Lawxy Rubric.'
          }
        ]
      }
    ]
  },
  {
    id: 'level-2',
    slug: 'level-2',
    title: 'AI-Native Lawyer Certification — Level 2: Advanced Practice',
    level: 2,
    credentialCode: 'AINL-L2',
    credentialTitle: 'Lawxy Certified AI-Native Lawyer (Advanced Practice)',
    duration: '45 Hours',
    modulesCount: 11,
    lessonsCount: 52,
    passingScore: 75,
    shortDescription: 'Advanced mastery for senior counsel, partners, and legal innovators: complex multi-agent workflows, custom RAG pipelines, litigation analytics, and institutional AI governance.',
    longDescription: 'Level 2 is designed for practitioners who have mastered foundational AI tools and are ready to lead institutional legal transformation. This curriculum focuses on multi-agent legal reasoning, specialized litigation support, advanced transactional diligence, proprietary legal knowledge graph integration, automated compliance engines, and legal team governance.',
    prerequisites: ['Lawxy Certified AI-Native Lawyer — Level 1 Foundation (Earned Credential)'],
    lawxyIntegrations: [
      { tool: 'JurisMind Enterprise', description: 'Cross-jurisdictional automated brief cross-examination' },
      { tool: 'Case Lens Pro', description: 'Mass-tort discovery graph synthesis and deposition copiloting' },
      { tool: 'Contract Studio API', description: 'Automated high-throughput M&A diligence pipelines' },
      { tool: 'AgentFlow Studio', description: 'Custom multi-agent legal logic with conditional branching' }
    ],
    modules: [
      { id: 'l2m1', slug: 'advanced-legal-research', title: 'Module 1: Advanced Legal Research with AI', estimatedMinutes: 240, competencyCode: 'L2-RESEARCH' },
      { id: 'l2m2', slug: 'ai-assisted-contract-review-advanced', title: 'Module 2: Advanced Contract Review & Negotiation Intelligence', estimatedMinutes: 240, competencyCode: 'L2-CONTRACT' },
      { id: 'l2m3', slug: 'ai-assisted-litigation', title: 'Module 3: AI-Assisted Litigation Strategy & Brief Optimization', estimatedMinutes: 210, competencyCode: 'L2-LITIGATION' },
      { id: 'l2m4', slug: 'ai-due-diligence-at-scale', title: 'Module 4: Enterprise Due Diligence & M&A Data Room Analytics', estimatedMinutes: 180, competencyCode: 'L2-DD' },
      { id: 'l2m5', slug: 'advanced-legal-drafting', title: 'Module 5: Complex Transactional & Legislative Drafting', estimatedMinutes: 210, competencyCode: 'L2-DRAFT' },
      { id: 'l2m6', slug: 'legal-knowledge-bases-and-rag', title: 'Module 6: Building Firm-Specific RAG Knowledge Bases', estimatedMinutes: 180, competencyCode: 'L2-RAG' },
      { id: 'l2m7', slug: 'ai-agents-for-lawyers', title: 'Module 7: Autonomous Legal Agents & Orchestration', estimatedMinutes: 240, competencyCode: 'L2-AGENTS' },
      { id: 'l2m8', slug: 'multi-step-workflows-supervision', title: 'Module 8: Multi-Step Workflows & Supervisory Frameworks', estimatedMinutes: 210, competencyCode: 'L2-WORKFLOW' },
      { id: 'l2m9', slug: 'ai-quality-control-advanced-verification', title: 'Module 9: Institutional AI Quality Control & Automated Auditing', estimatedMinutes: 150, competencyCode: 'L2-QC', isCritical: true },
      { id: 'l2m10', slug: 'ai-governance-for-legal-teams', title: 'Module 10: AI Governance, Risk Management & Policy Formulation', estimatedMinutes: 150, competencyCode: 'L2-GOVERN' },
      { id: 'l2capstone', slug: 'level-2-capstone', title: 'Level 2 Capstone: Enterprise Legal AI Workflow Deployment', estimatedMinutes: 360, competencyCode: 'L2-CAPSTONE', isCritical: true }
    ]
  }
];
