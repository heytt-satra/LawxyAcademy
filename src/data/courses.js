/**
 * Lawxy Academy — 3 Distinct Certifications Curriculum Blueprint
 * Task-led, SuperDemo-centric, Three-Layer Testing Framework
 */

export const CERTIFICATIONS = [
  {
    id: 'cert-1',
    slug: 'legal-ai-fundamentals',
    code: 'LXY-FND',
    title: 'Lawxy Legal AI Fundamentals',
    level: 'Certification 1',
    tagline: '“I can use Legal AI correctly.”',
    badge: 'Foundational Track',
    targetAudience: 'Lawyers, legal teams, law students, legal operations professionals, and anyone beginning to use AI for legal work.',
    coreOutcome: 'The learner understands how to use Lawxy effectively, safely, and ethically for everyday legal work.',
    duration: '18 Hours',
    modulesCount: 10,
    passingScore: 80,
    shortDescription: 'Master the core mechanics, prompting techniques, verification workflows, and ethical guardrails required to safely use AI in daily legal practice.',
    modules: [
      {
        id: 'c1-m1',
        number: 1,
        title: 'Introduction to Legal AI',
        learningObjective: 'Understand what Legal AI is, where it creates leverage, where it fails, and how foundation models differ from previous legal tech.',
        superDemo: {
          title: 'Basic Lawxy Orientation & Grounding',
          context: 'A junior associate receives 4 distinct legal tasks (case summary, contract redline, cite check, discovery draft). We assess which tasks are safe for zero-shot LLMs and which require grounded legal AI.',
          methodology: 'Evaluate task risk profile, determinism requirements, and error tolerance before initiating AI generation.',
          action: 'Navigate Lawxy interface, set matter parameters, and initiate grounded query.',
          aiExplanation: 'Why closed-system retrieval with authoritative legal corpora prevents generic LLM hallucinations.',
          verify: 'Check retrieved docket numbers against official state reporter indices.',
          judgment: 'The lawyer determines if the research scope requires jurisdictional filtering.',
          takeaway: 'Rule of thumb: Never use open consumer chat for confidential matters or citation discovery.'
        },
        quiz: [
          {
            prompt: 'Under what circumstances is zero-shot consumer AI strictly inappropriate in legal practice?',
            options: [
              'When drafting an internal informal brainstorming outline.',
              'When handling confidential client communications, non-public trade secrets, or unverified case law citations.',
              'When looking up the public address of a federal courthouse.',
              'When adjusting the font size of a legal memorandum.'
            ],
            correctIndex: 1,
            explanation: 'Consumer AI terms often log user inputs for training, risking ABA Rule 1.6 confidentiality and attorney-client privilege waiver.'
          },
          {
            prompt: 'How does Lawxy JurisMind differ fundamentally from general-purpose generative models?',
            options: [
              'It operates without any underlying transformer architecture.',
              'It anchors generation exclusively to verified, primary legal databases via Retrieval-Augmented Generation (RAG) with source attribution.',
              'It guarantees 100% human-free autonomous brief filing.',
              'It only runs on offline mainframe servers.'
            ],
            correctIndex: 1,
            explanation: 'Specialized legal AI utilizes domain-specific RAG to ground every statement directly into primary court records and statutes.'
          },
          {
            prompt: 'What is the primary operational cause of "Lost in the Middle" attention loss in long legal documents?',
            options: [
              'Hardware overheating in cloud data centers.',
              'Transformer attention mechanisms tend to weigh initial and final tokens more heavily than tokens in the middle 40–60% of long contexts.',
              'The document contains scanned watermark images.',
              'The court reporter applied a protective order.'
            ],
            correctIndex: 1,
            explanation: 'Long-context models experience retrieval degradation in the central portions of large documents unless structured chunking is applied.'
          }
        ]
      },
      {
        id: 'c1-m2',
        number: 2,
        title: 'Getting Started with Lawxy',
        learningObjective: 'Set up Lawxy workspaces, organize matter documents, configure security parameters, and execute core project workflows.',
        superDemo: {
          title: 'Complete Basic Workflow in Lawxy',
          context: 'Opening a new commercial litigation file: ingest complaint, answer, and 3 key exhibits into a secure matter workspace.',
          methodology: 'Structure matter hierarchy, apply client privilege tags, and verify OCR extraction fidelity.',
          action: 'Create workspace, upload 85-page record, and query timeline of operative breach dates.',
          aiExplanation: 'How semantic search parses definitions across multiple uploaded exhibits simultaneously.',
          verify: 'Cross-reference generated breach timeline against Exhibit C date stamps.',
          judgment: 'Lawyer confirms tolling agreements that alter statutory limitation calculations.',
          takeaway: 'Structured workspace ingestion creates an immutable audit trail for discovery compliance.'
        },
        quiz: [
          {
            prompt: 'Why must client privilege and matter tags be configured prior to ingesting multi-party discovery files?',
            options: [
              'To comply with local file naming conventions only.',
              'To prevent cross-matter data leakage and ensure enterprise access controls restrict unauthorized firm personnel.',
              'To reduce cloud storage bandwidth costs.',
              'To automatically format headings into Bluebook style.'
            ],
            correctIndex: 1,
            explanation: 'Matter tagging enforces role-based access control and prevents cross-contamination across confidential firm files.'
          }
        ]
      },
      {
        id: 'c1-m3',
        number: 3,
        title: 'Prompting for Legal Work',
        learningObjective: 'Master role definition, context framing, negative constraints, and structured output formatting for legal artifacts.',
        superDemo: {
          title: 'Write & Improve Legal Prompts',
          context: 'Transforming a vague prompt ("Summarize this indemnification clause") into a bulletproof legal instruction.',
          methodology: 'Define role, jurisdiction, explicit negative constraints, and structured tabular JSON/markdown output.',
          action: 'Apply Lawxy Prompt Builder to enforce negative boundary rules on liability exceptions.',
          aiExplanation: 'Explicit constraints eliminate probabilistic hallucinations and compel the model to admit missing facts.',
          verify: 'Inspect generated table to ensure no inferred terms were introduced.',
          judgment: 'Lawyer assesses whether the liability cap matches client risk tolerance.',
          takeaway: 'Always state: "If the clause does not specify X, state \'UNSPECIFIED\'—do not infer standard terms."'
        },
        quiz: [
          {
            prompt: 'Which prompt construction best prevents an AI model from inventing missing contract terms?',
            options: [
              '“Please be very accurate and do not make mistakes.”',
              '“If the provided text does not explicitly define a notice period, state \'NOT SPECIFIED\'—do not assume standard 30-day terms.”',
              '“Summarize this agreement like a senior partner.”',
              '“Repeat the prompt twice before answering.”'
            ],
            correctIndex: 1,
            explanation: 'Negative boundary constraints explicitly instruct the model on how to handle omissions, stopping speculative generation.'
          }
        ]
      },
      {
        id: 'c1-m4',
        number: 4,
        title: 'Legal Research & Search',
        learningObjective: 'Conduct precision legal research, narrow search queries, filter by jurisdiction, and validate primary authorities.',
        superDemo: {
          title: 'Research a Legal Issue Using Lawxy',
          context: 'Researching whether promissory estoppel applies against a non-signatory parent company in Delaware Chancery Court.',
          methodology: 'Formulate boolean-semantic queries, isolate controlling precedents, and check negative treatment flags.',
          action: 'Execute multi-jurisdiction query, filter to DE Chancery 2018–2025, and extract majority holdings.',
          aiExplanation: 'Lawxy cross-indexes statutory text with Shepardized case law vectors.',
          verify: 'Verify docket citations directly against Delaware Court of Chancery official slip opinions.',
          judgment: 'Lawyer determines whether an unpublished bench decision is persuasive or binding.',
          takeaway: 'Always check KeyCite/Shepard’s status on any case law surfaced by AI.'
        },
        quiz: [
          {
            prompt: 'What step is mandatory before citing an AI-surfaced case holding in a formal court brief?',
            options: [
              'Checking that the case has more than 50 Google citations.',
              'Retrieving the full-text primary reporter PDF, verifying quotation accuracy, and confirming good law status on KeyCite/Shepard’s.',
              'Asking the AI if it is confident in the citation.',
              'Submitting the citation without checking if the judge uses AI.'
            ],
            correctIndex: 1,
            explanation: 'Federal Rule 11 and state ethics rules require counsel to personally certify the validity and accuracy of cited authorities.'
          }
        ]
      },
      {
        id: 'c1-m5',
        number: 5,
        title: 'Legal Drafting with AI',
        learningObjective: 'Draft, rewrite, summarize, and adapt legal instruments while preserving precise statutory definitions and tone.',
        superDemo: {
          title: 'Create a Legal Document (Cease & Desist / Memo)',
          context: 'Drafting a formal Demand for Arbitration and Breach of Non-Disclosure Agreement based on deposition transcripts.',
          methodology: 'Define statutory claims, cite specific breach facts from evidence, and maintain adversarial yet professional tone.',
          action: 'Generate draft demand in Lawxy Drafting Studio with pinpoint factual citations.',
          aiExplanation: 'How Lawxy anchors draft paragraphs to specific page/line coordinates in the record.',
          verify: 'Audit paragraph claims against the deposition transcript timestamps.',
          judgment: 'Lawyer selects appropriate remedy (injunctive relief vs liquidated damages).',
          takeaway: 'Use AI for initial drafting velocity; retain exclusive human control over tactical legal claims.'
        },
        quiz: [
          {
            prompt: 'When using AI to draft a contract amendment, why should you avoid asking the AI to "make it sound more legal"?',
            options: [
              'It causes the server to run out of RAM.',
              'It prompts the AI to introduce archaic legalese (e.g. "heretofore", "witnesseth") that adds ambiguity rather than substantive precision.',
              'It automatically invalidates the signature block.',
              'It increases document file size by 500%.'
            ],
            correctIndex: 1,
            explanation: 'Modern legal drafting prioritizes plain, unambiguous operative language over decorative legalese.'
          }
        ]
      },
      {
        id: 'c1-m6',
        number: 6,
        title: 'Document Analysis',
        learningObjective: 'Extract key facts, summarize complex dockets, identify latent legal issues, and generate structured comparative tables.',
        superDemo: {
          title: 'Analyse a Complex Legal Document',
          context: 'Analyzing a 65-page Software as a Service (SaaS) Master Services Agreement to isolate data security and audit rights.',
          methodology: 'Scan definitions, parse cross-references, identify indemnification carve-outs, and flag ambiguous triggers.',
          action: 'Run Lawxy Document Analyzer to generate a structured obligation matrix.',
          aiExplanation: 'Hierarchical parsing maps section dependencies to avoid missing distant cross-references.',
          verify: 'Confirm section 14.3 cross-reference targets the correct definition in section 1.8.',
          judgment: 'Lawyer advises client whether audit response turnaround of 48 hours is operationally feasible.',
          takeaway: 'Always verify cross-referenced clause numbering when reviewing AI summaries.'
        },
        quiz: [
          {
            prompt: 'When an AI summary states "The agreement contains standard indemnification," what must a lawyer do?',
            options: [
              'Accept the summary because modern AI models understand commercial standards.',
              'Review the actual text to check for uncapped intellectual property indemnity, gross negligence carve-outs, and defense control triggers.',
              'Delete the clause from the final contract.',
              'Notify the counterparty that the clause is standard.'
            ],
            correctIndex: 1,
            explanation: 'There is no universal "standard" indemnification; liability caps, defense obligations, and carve-outs vary significantly.'
          }
        ]
      },
      {
        id: 'c1-m7',
        number: 7,
        title: 'Verification & Quality Control',
        learningObjective: 'Deploy the 4-Step Authority Verification Protocol (AVP), identify hallucination patterns, and audit AI outputs.',
        superDemo: {
          title: 'Verify an AI-Generated Answer',
          context: 'Auditing an AI memorandum that cites 3 federal appellate decisions on trademark secondary meaning.',
          methodology: 'Apply the 4-Step AVP: 1) Verify Case Existence, 2) Verify Pinpoint Citation, 3) Verify Quoted Text, 4) Verify Substantive Holding.',
          action: 'Identify a Citation Co-Optation error and replace with authentic 2nd Circuit authority.',
          aiExplanation: 'Why high-temperature probabilistic generation hallucinates realistic-sounding reporter volume numbers.',
          verify: 'Match exact quotation strings against official Westlaw / Lexis / court docket slip opinions.',
          judgment: 'Lawyer determines whether the modified holding supports the client\'s motion.',
          takeaway: 'Memorize the 4-Step AVP: Case -> Reporter -> Quote -> Holding.'
        },
        quiz: [
          {
            prompt: 'What constitutes "Citation Co-Optation" in legal AI outputs?',
            options: [
              'When two attorneys cite the same precedent in their briefs.',
              'When an AI uses a real, prominent case name (e.g. Brown v. Board) but attributes an entirely fabricated legal holding to it.',
              'When a court changes the reporter page numbering after publication.',
              'When a citation uses Bluebook instead of ALWD format.'
            ],
            correctIndex: 1,
            explanation: 'Citation Co-Optation is a deceptive hallucination where the case title is real, but the attributed rule of law is invented.'
          }
        ]
      },
      {
        id: 'c1-m8',
        number: 8,
        title: 'AI Ethics & Professional Responsibility',
        learningObjective: 'Apply ABA Model Rules 1.1, 1.6, 5.1, 5.3, and 8.4 to everyday legal AI usage; safeguard privilege and confidentiality.',
        superDemo: {
          title: 'Identify & Handle Ethical Risks',
          context: 'An enterprise client asks about AI usage guidelines and billing for AI-assisted contract review.',
          methodology: 'Evaluate ABA Formal Opinion 512, Model Rule 1.5 (Reasonable Fees), and Rule 1.6 (Confidentiality).',
          action: 'Configure Lawxy enterprise zero-data-retention compliance policies and client disclosure memo.',
          aiExplanation: 'Enterprise agreements prohibit vendor data logging and model training on customer prompts.',
          verify: 'Audit API privacy agreements against firm cyber-insurance policy requirements.',
          judgment: 'Managing partner approves transparent client billing model (value billing vs actual time).',
          takeaway: 'Never bill 5 hours for a task that took 15 minutes with AI without prior alternative fee arrangements.'
        },
        quiz: [
          {
            prompt: 'Under ABA Formal Ethics Opinion 512 (2024), what is required regarding supervisory responsibility (Rule 5.1/5.3) when lawyers use AI tools?',
            options: [
              'Lawyers may delegate all research to AI as long as the software is licensed.',
              'Lawyers with managerial authority must establish organizational policies and ensure non-lawyer personnel and AI outputs are adequately supervised and verified.',
              'Law firms must ban all generative AI tools completely.',
              'Supervision is only required for pro bono matters.'
            ],
            correctIndex: 1,
            explanation: 'Rule 5.1 and 5.3 require managerial lawyers to implement reasonable measures ensuring all AI outputs comply with professional ethics.'
          }
        ]
      },
      {
        id: 'c1-m9',
        number: 9,
        title: 'Practical Legal AI Workflow',
        learningObjective: 'Synthesize prompting, research, analysis, drafting, and verification into an integrated, repeatable legal workflow.',
        superDemo: {
          title: 'Complete an End-to-End Legal Task',
          context: 'Full litigation workflow: analyze complaint -> research affirmative defenses -> draft answer and cross-claims -> verify all citations.',
          methodology: 'Execute linear 5-stage legal pipeline with human validation gates between each stage.',
          action: 'Run complete Lawxy workflow from raw PDF to finalized court filing package.',
          aiExplanation: 'How Lawxy maintains matter state across multi-step drafting pipelines.',
          verify: 'Execute automated pre-flight integrity audit on all Bluebook citations.',
          judgment: 'Lead counsel reviews and signs court verification pleading.',
          takeaway: 'A complete AI workflow always embeds human approval gates between draft stages.'
        },
        quiz: [
          {
            prompt: 'In an end-to-end AI litigation workflow, at what stage is human verification non-negotiable?',
            options: [
              'Only during optical character recognition.',
              'Before any document, citation, or factual representation is finalized, filed with a court, or delivered to a client.',
              'Only if the opposing party objects.',
              'Human review is optional if the model confidence score exceeds 95%.'
            ],
            correctIndex: 1,
            explanation: 'Human verification is non-negotiable before any filing or delivery; algorithmic confidence does not eliminate professional liability.'
          }
        ]
      },
      {
        id: 'c1-m10',
        number: 10,
        title: 'Certification Assessment',
        learningObjective: 'Demonstrate independent competence in prompt architecture, legal research, hallucination auditing, and ethical compliance.',
        superDemo: {
          title: 'Practical Assessment Sandbox & Capstone Exam',
          context: 'Comprehensive 120-minute proctored assessment testing practical ability in the Lawxy environment.',
          methodology: 'Complete multi-part scenario tasks, audit deliberate citation traps, and submit final work product.',
          action: 'Execute practical assessment and submit for automated and peer review.',
          aiExplanation: 'Real-time proctoring monitors tab blur and integrity telemetry.',
          verify: 'System evaluates submission against master legal rubric.',
          judgment: 'Candidate earns official Lawxy Legal AI Fundamentals Credential.',
          takeaway: 'Certification is earned through proven execution, not passive video completion.'
        },
        quiz: [
          {
            prompt: 'What constitutes the passing standard for the Lawxy Certification Assessment?',
            options: [
              'Clicking through all video chapters without taking any tests.',
              'Achieving at least 70% overall score with mandatory 100% compliance on ethical non-negotiables (confidentiality & citation validation).',
              'Paying the optional certification fee.',
              'Submitting a single prompt to the community forum.'
            ],
            correctIndex: 1,
            explanation: 'Rigorous assessment requires demonstrated competence in legal knowledge, practical execution, and zero ethical violations.'
          }
        ]
      }
    ]
  },

  {
    id: 'cert-2',
    slug: 'advanced-legal-ai-practitioner',
    code: 'LXY-ADV',
    title: 'Advanced Legal AI Practitioner',
    level: 'Certification 2',
    tagline: '“I can use Legal AI for substantive legal work.”',
    badge: 'Professional Track',
    targetAudience: 'Practicing lawyers, litigation counsel, transactional attorneys, and experienced legal professionals.',
    coreOutcome: 'The learner can use Lawxy for complex, substantive legal workflows rather than simply generating text.',
    duration: '26 Hours',
    modulesCount: 12,
    passingScore: 80,
    shortDescription: 'Master case analysis, multi-document synthesis, cross-border translation, due diligence at scale, and high-stakes litigation strategy.',
    modules: [
      {
        id: 'c2-m1',
        number: 1,
        title: 'Advanced Legal Reasoning & Architecture',
        learningObjective: 'Construct multi-step legal reasoning pipelines, chain-of-thought prompting, and knowledge graph queries for complex litigation.',
        superDemo: { title: 'Build Multi-Layer Legal Chain-of-Thought Pipeline', context: 'Setting up an architectural reasoning tree for complex antitrust liability.', methodology: 'Deconstruct statutory elements into sequential logical dependencies.', action: 'Execute chain-of-thought pipeline in Lawxy AgentFlow.', aiExplanation: 'Iterative reasoning isolates intermediate legal fallacies.', verify: 'Confirm each intermediate premise is supported by record evidence.', judgment: 'Counsel decides whether to pursue per se or rule of reason claims.', takeaway: 'Decompose complex legal questions into sequential deductive steps.' },
        quiz: [{ prompt: 'Why is Chain-of-Thought (CoT) prompting superior for complex statutory interpretations?', options: ['It uses 90% less cloud bandwidth.', 'It forces the model to articulate intermediate legal reasoning steps, exposing logical gaps before concluding.', 'It makes the output immune to court objections.', 'It translates English statutes into Latin.'], correctIndex: 1, explanation: 'CoT prompting breaks multi-element statutory tests into transparent intermediate steps, significantly reducing analytical errors.' }]
      },
      {
        id: 'c2-m2',
        number: 2,
        title: 'Case Analysis with AI',
        learningObjective: 'Analyze facts, legal issues, procedural histories, holdings, and judicial dicta across multi-jurisdictional case dockets.',
        superDemo: { title: 'Analyse a Complex Multi-Party Case', context: 'Evaluating a 140-page federal appellate decision with dissenting and concurring opinions.', methodology: 'Extract majority rationale, distinguish binding holdings from non-binding obiter dicta.', action: 'Run Lawxy Case Lens to generate comprehensive case synthesis matrix.', aiExplanation: 'Vector clustering separates majority arguments from dissenting critiques.', verify: 'Cross-examine quote fragments against official federal slip opinion.', judgment: 'Counsel determines how dissent arguments may influence pending en banc petition.', takeaway: 'Always clearly separate binding holding from persuasive judicial dicta in case syntheses.' },
        quiz: [{ prompt: 'What is the danger of relying on an AI summary that does not distinguish holding from obiter dictum?', options: ['The brief will automatically exceed court page limits.', 'Counsel may mistakenly cite non-binding musings of a judge as mandatory precedent, undermining credibility with the court.', 'The court clerk will reject the filing for improper font.', 'The AI model will lock the workspace.'], correctIndex: 1, explanation: 'Dicta is non-binding; citing it as controlling law is a fundamental legal error that opposing counsel will exploit.' }]
      },
      {
        id: 'c2-m3',
        number: 3,
        title: 'Case Strategy Creation',
        learningObjective: 'Develop affirmative litigation arguments, identify vulnerabilities in client claims, and anticipate opposing counterarguments.',
        superDemo: { title: 'Create Adversarial Case Strategy & Red Team Memo', context: 'Simulating opposing counsel arguments in a high-stakes trade secret preliminary injunction.', methodology: 'Perform adversarial red-teaming to find evidentiary gaps in client affidavits.', action: 'Deploy Lawxy Adversarial Simulator to pressure-test client claims.', aiExplanation: 'Dual-agent debate simulates plaintiff and defense arguments iteratively.', verify: 'Audit surfaced counterarguments against governing circuit precedent.', judgment: 'Lead trial attorney decides whether to supplement expert witness declaration.', takeaway: 'Use AI to stress-test your case from the opposing perspective before filing.' },
        quiz: [{ prompt: 'How should an attorney utilize AI for litigation strategy preparation?', options: ['Adopt AI-generated strategies without modification to save research time.', 'Use AI as an adversarial "red team" to simulate opposing arguments and identify weaknesses in your own factual record.', 'Allow the AI to determine settlement value autonomously.', 'Submit the AI strategy directly to the judge as an exhibit.'], correctIndex: 1, explanation: 'AI excels at adversarial red-teaming, exposing weaknesses in your arguments before the opposing party does.' }]
      },
      {
        id: 'c2-m4',
        number: 4,
        title: 'Advanced Legal Research',
        learningObjective: 'Solve difficult, unsettled legal issues, resolve circuit splits, and evaluate non-precedential authority weight.',
        superDemo: { title: 'Research a Difficult / Unsettled Legal Issue', context: 'Navigating an active circuit split regarding AI-generated code copyrightability.', methodology: 'Synthesize competing circuit rationales and historical patent precedents.', action: 'Query Lawxy JurisMind with cross-circuit comparison matrix.', aiExplanation: 'RAG pipeline maps conflicting appellate holdings side-by-side.', verify: 'Confirm grant of certiorari status on pending Supreme Court dockets.', judgment: 'Counsel frames arguments for potential Supreme Court appeal.', takeaway: 'When researching unsettled law, map conflicting jurisdictions in parallel.' },
        quiz: [{ prompt: 'When an AI tool identifies a "split in authority," what must counsel verify?', options: ['Whether both circuits have equal numbers of active judges.', 'Whether the identified split represents genuine conflicting holdings or merely distinguishable factual contexts.', 'Whether the AI model preferred the liberal or conservative circuit.', 'Whether the decisions were published in the same calendar year.'], correctIndex: 1, explanation: 'Many apparent splits are factually distinguishable; counsel must analyze the underlying records to confirm a true legal division.' }]
      },
      {
        id: 'c2-m5',
        number: 5,
        title: 'Complex Contract Review',
        learningObjective: 'Analyze enterprise master agreements beyond simple clause extraction; assess risk cascading and indemnity interdependencies.',
        superDemo: { title: 'Review a Complex Cross-Border Master Agreement', context: 'Auditing a 120-page cross-border joint venture agreement involving GDPR and FCPA covenants.', methodology: 'Track liability waterfalls across schedules, exhibits, and parent guarantees.', action: 'Run Lawxy Contract Review Studio on multi-part transaction package.', aiExplanation: 'Cross-document dependency graphs track definitions across schedules.', verify: 'Verify indemnity caps in Schedule 4 align with Section 18 aggregate limits.', judgment: 'Transactional counsel negotiates reciprocal governing law compromise.', takeaway: 'Never analyze liability caps in isolation from warranty and indemnity carve-outs.' },
        quiz: [{ prompt: 'Why is clause extraction alone insufficient for complex enterprise contract review?', options: ['Clause extraction cannot format text into PDF.', 'Modern commercial contracts contain interdependencies where liability caps, indemnities, warranties, and termination remedies modify each other across disparate sections.', 'Clause extraction only works on contracts under 5 pages.', 'Enterprise contracts cannot be parsed by OCR.'], correctIndex: 1, explanation: 'Enterprise agreements are systemic; an indemnity is meaningless without cross-referencing its governing liability cap and insurance clauses.' }]
      },
      {
        id: 'c2-m6',
        number: 6,
        title: 'Legal Due Diligence',
        learningObjective: 'Extract, classify, and assess risks across thousands of virtual data room (VDR) documents during M&A transactions.',
        superDemo: { title: 'Conduct AI-Assisted M&A Due Diligence', context: 'Screening 450 commercial supplier contracts for change-of-control assignment restrictions.', methodology: 'Define threshold materiality triggers, batch process VDR files, and generate redline risk dashboard.', action: 'Deploy Lawxy Batch Ingestion Engine across 450 contracts in parallel.', aiExplanation: 'High-throughput semantic parsing tags assignment clauses by severity.', verify: 'Manually review all "High Risk" flagged change-of-control clauses.', judgment: 'M&A partner prepares disclosure schedule carve-outs for merger agreement.', takeaway: 'Always conduct human verification on all flagged high-risk due diligence items.' },
        quiz: [{ prompt: 'What is the primary operational objective of AI-assisted M&A due diligence?', options: ['Replacing junior associates completely to eliminate payroll costs.', 'Accelerating document classification and flagging high-risk change-of-control, non-compete, or termination triggers across large volumes of data room files.', 'Guaranteeing zero tax liability for the buyer.', 'Drafting the final purchase agreement automatically.'], correctIndex: 1, explanation: 'AI acts as a force multiplier, classifying hundreds of documents rapidly so lawyers can focus on high-risk negotiation points.' }]
      },
      {
        id: 'c2-m7',
        number: 7,
        title: 'Notice & Response Drafting',
        learningObjective: 'Deconstruct hostile legal notices, identify breach assertions, and draft persuasive, legally precise response letters.',
        superDemo: { title: 'Draft a Formal Notice Response & Cure Defense', context: 'Responding to a 10-day notice of default alleging material breach of commercial lease terms.', methodology: 'Analyze lease default triggers, verify notice delivery compliance, and frame cure defense.', action: 'Draft formal response denying default and citing cure compliance records.', aiExplanation: 'Lawxy matches tenant maintenance logs against landlord notice claims.', verify: 'Check statutory notice cure periods under state property code.', judgment: 'Real estate counsel advises tenant on filing emergency injunction.', takeaway: 'Scrutinize whether the initial notice complied with contractual delivery protocols.' },
        quiz: [{ prompt: 'When responding to a default notice, what procedural defense should always be checked first?', options: ['Whether the notice was printed in full color.', 'Whether the notice was delivered in strict accordance with the contract’s notice clause (method, address, designated recipient, cure window).', 'Whether the sender used conversational language.', 'Whether the notice was reviewed by a third-party mediator.'], correctIndex: 1, explanation: 'Improper notice delivery or defective cure calculations frequently render default claims legally ineffective.' }]
      },
      {
        id: 'c2-m8',
        number: 8,
        title: 'Legal Translation & Cross-Border Nuance',
        learningObjective: 'Translate foreign legal documents while preserving exact civil law vs common law statutory terms and definitions.',
        superDemo: { title: 'Translate & Validate Cross-Border Agreement', context: 'Translating a German commercial distribution agreement (BGB framework) into New York law format.', methodology: 'Identify civil law concepts (e.g. "Treu und Glauben", "Verschulden") and map to common law equivalents.', action: 'Execute legal translation in Lawxy Cross-Border Studio with legal glossary.', aiExplanation: 'Domain-specific translation models preserve statutory term-of-art definitions.', verify: 'Dual-language review by bilingual counsel of indemnification clauses.', judgment: 'International counsel adds jurisdictional dispute resolution clause.', takeaway: 'Never use generic machine translation for binding cross-border legal obligations.' },
        quiz: [{ prompt: 'Why does generic machine translation fail on civil law contractual terms?', options: ['Foreign languages use different alphabet encodings.', 'Civil law concepts (like "good faith" or "force majeure") carry distinct statutory definitions that do not map directly to common law without precise legal adaptation.', 'Machine translation cannot parse PDF headers.', 'Court systems only accept Latin translations.'], correctIndex: 1, explanation: 'Legal concepts carry distinct statutory baggage across civil and common law traditions that generic translation distorts.' }]
      },
      {
        id: 'c2-m9',
        number: 9,
        title: 'Multi-Document Analysis',
        learningObjective: 'Connect facts, timeline inconsistencies, and contractual obligations across multi-party document sets and email archives.',
        superDemo: { title: 'Analyze Multi-Document Ingestion Set', context: 'Synthesizing 12 interrelated project contracts, change orders, and side letters in a construction dispute.', methodology: 'Build chronological obligation timeline, track amendment overrides and priority order.', action: 'Query Lawxy Multi-Doc Graph to identify conflicting payment milestones.', aiExplanation: 'Entity relationship graphs detect contradictions between master contract and side letters.', verify: 'Confirm which document contains the controlling "Order of Precedence" clause.', judgment: 'Construction litigation partner prepares claim for unpaid change orders.', takeaway: 'Always identify and enforce the governing contract\'s Order of Precedence clause.' },
        quiz: [{ prompt: 'When multiple agreements in a single transaction conflict, what clause controls?', options: ['The clause with the largest font size.', 'The Order of Precedence clause, which explicitly ranks the hierarchy of contracts, schedules, and change orders.', 'The clause in the most recently opened file.', 'The clause located in the signature block.'], correctIndex: 1, explanation: 'The Order of Precedence clause explicitly dictates which document governs in the event of an irreconcilable conflict.' }]
      },
      {
        id: 'c2-m10',
        number: 10,
        title: 'Verification & Professional Judgment',
        learningObjective: 'Conduct exhaustive audits of complex AI outputs and establish clear boundaries between automated tasks and lawyer judgment.',
        superDemo: { title: 'Audit AI-Generated Work Product for Senior Partner Review', context: 'Auditing a complex 30-page summary judgment brief drafted with AI assistance.', methodology: 'Check procedural standards, Bluebook formatting, factual accuracy, and tactical viability.', action: 'Deploy Lawxy Verification Protocol and generate compliance score.', aiExplanation: 'Automated verification flags uncited factual assertions and ambiguous case citations.', verify: 'Retrieve original docket exhibits to match deposition page/line citations.', judgment: 'Partner signs Rule 11 certification with total confidence in accuracy.', takeaway: 'Professional judgment cannot be automated; AI assists drafting, lawyers certify truth.' },
        quiz: [{ prompt: 'What is the ultimate dividing line between AI assistance and lawyer professional responsibility?', options: ['AI handles cases under $100k; lawyers handle cases over $100k.', 'AI assists in information extraction, synthesis, and initial drafting; the licensed lawyer exercises final independent professional judgment and bears sole accountability.', 'AI makes the legal decision; the lawyer merely notarizes the filing.', 'There is no dividing line under modern bar rules.'], correctIndex: 1, explanation: 'The lawyer remains solely and non-delegably accountable for all factual assertions and legal arguments submitted under their name.' }]
      },
      {
        id: 'c2-m11',
        number: 11,
        title: 'AI Ethics & Professional Responsibility — Advanced',
        learningObjective: 'Handle complex ethical scenarios involving client communication, AI audit trails, privilege preservation, and ethical billing.',
        superDemo: { title: 'Handle Complex Ethical & Privilege Scenarios', context: 'Managing client disclosure requirements and AI audit trails during federal regulatory investigation.', methodology: 'Apply ABA Formal Op. 512, state bar guidelines on generative AI disclosure, and work-product doctrine.', action: 'Configure tamper-evident audit logs and client engagement letter addendum.', aiExplanation: 'Cryptographic logs prove human-in-the-loop review at every revision step.', verify: 'Confirm zero client-confidential metadata is exposed in public filings.', judgment: 'Ethics partner approves engagement letter terms for AI-assisted representation.', takeaway: 'Transparency, confidentiality safeguards, and verifiable human oversight protect client privilege.' },
        quiz: [{ prompt: 'When must a law firm disclose its use of AI to a client according to modern ethics guidance?', options: ['Never under any circumstances.', 'When required by the client’s outside counsel guidelines, where AI usage is material to the representation, or when sensitive client data is processed.', 'Only if the client specifically asks in writing during billing.', 'Only in criminal defense cases.'], correctIndex: 1, explanation: 'Client outside counsel guidelines and Model Rule 1.4 (Communication) may require disclosure depending on materiality and data handling.' }]
      },
      {
        id: 'c2-m12',
        number: 12,
        title: 'Capstone: Full Legal Workflow',
        learningObjective: 'Execute an end-to-end complex legal assignment in Lawxy demonstrating mastery of substantive legal workflows.',
        superDemo: { title: 'Complete Complex Legal Assignment Capstone', context: 'Full real-world case: ingest 300-page record -> analyze claims -> research unsettled law -> draft complete motion -> audit all citations.', methodology: 'Synthesize all Level 2 competencies into an integrated, high-rigor legal work product.', action: 'Submit final comprehensive capstone project for faculty evaluation.', aiExplanation: 'Automated telemetry monitors reasoning depth, verification rigor, and speed.', verify: 'Multi-layer rubric evaluates legal accuracy, citation integrity, and ethical compliance.', judgment: 'Faculty awards Lawxy Advanced Legal AI Practitioner Credential.', takeaway: 'True AI mastery is evidenced by rigorous, defensible, professional-grade work product.' },
        quiz: [{ prompt: 'What criteria define a successful Level 2 Capstone submission?', options: ['Finishing the exam in under 15 minutes.', 'Producing an accurate, fully-grounded, citation-verified legal work product that demonstrates independent professional judgment and zero ethical lapses.', 'Using the maximum number of AI prompts possible.', 'Generating a brief of over 100 pages.'], correctIndex: 1, explanation: 'The capstone tests comprehensive legal competence, grounded research, verified citations, and sound strategic judgment.' }]
      }
    ]
  },

  {
    id: 'cert-3',
    slug: 'ai-contract-review-specialist',
    code: 'LXY-CRS',
    title: 'AI Contract Review Specialist',
    level: 'Certification 3',
    tagline: '“I can use AI to perform professional-grade contract review.”',
    badge: 'Specialist Track',
    targetAudience: 'Lawyers, contract managers, in-house legal counsel, procurement teams, legal operations, and contract review specialists.',
    coreOutcome: 'The learner can conduct a structured contract review using Lawxy, identify risks, suggest changes, and produce a usable reviewed/redlined agreement.',
    duration: '22 Hours',
    modulesCount: 15,
    passingScore: 80,
    shortDescription: 'Master structured contract review, automated risk detection, playbook enforcement, multi-party redlining, and negotiation position generation.',
    modules: [
      {
        id: 'c3-m1',
        number: 1,
        title: 'Contract Review Fundamentals',
        learningObjective: 'Establish review objectives, parse client instructions, evaluate risk appetite, and configure review methodology.',
        superDemo: { title: 'Set Up a Structured Contract Review in Lawxy', context: 'Receiving a 40-page vendor agreement with strict client risk boundaries (capped liability, no automatic renewal, strict GDPR).', methodology: 'Define review objectives, establish risk thresholds, and select review playbook.', action: 'Configure Lawxy Contract Review Studio workspace with matter playbook.', aiExplanation: 'Playbook rules parameterize risk detection thresholds for the LLM.', verify: 'Check that custom liability thresholds ($1M cap) are loaded into system prompts.', judgment: 'Reviewer confirms whether client risk appetite is aggressive or conservative.', takeaway: 'Always calibrate AI review settings against specific client risk appetite before reviewing.' },
        quiz: [{ prompt: 'Why must client risk appetite be parameterized before starting an AI-assisted contract review?', options: ['To speed up PDF rendering.', 'Because what constitutes an "acceptable risk" varies drastically between a seed startup and an enterprise Fortune 500 company.', 'To bypass contract signature requirements.', 'To convert currency amounts automatically.'], correctIndex: 1, explanation: 'Risk tolerance defines redlining severity; an aggressive growth company accepts provisions an enterprise procurement team would reject.' }]
      },
      {
        id: 'c3-m2',
        number: 2,
        title: 'Understanding Contract Structure',
        learningObjective: 'Analyze contract anatomy: recitals, definitions, operative covenants, representations, warranties, schedules, and boilerplate.',
        superDemo: { title: 'Analyse Contract Structure & Document Anatomy', context: 'Deconstructing an unfamiliar multi-tiered master services agreement with 6 attached statement of work schedules.', methodology: 'Map structural layout, identify defined term locations, and parse operative vs boilerplate divisions.', action: 'Run Lawxy Structure Mapper to generate interactive contract tree.', aiExplanation: 'Semantic structure parsing classifies sections by legal function.', verify: 'Verify Schedule B is incorporated by reference in Section 3.2.', judgment: 'Contract specialist identifies missing standard data processing addendum (DPA).', takeaway: 'Confirm all referenced schedules and exhibits are physically attached before reviewing.' },
        quiz: [{ prompt: 'What risk arises when reviewing a contract without checking defined terms?', options: ['The file will not save.', 'A seemingly innocent clause may use a defined term (e.g. "Customer Data" or "Affiliates") that secretly broadens liability exposure across the entire enterprise.', 'The page numbers will change.', 'The font will become unreadable.'], correctIndex: 1, explanation: 'Defined terms are the engine of a contract; definitions can expand or restrict liability far beyond the plain reading of a single clause.' }]
      },
      {
        id: 'c3-m3',
        number: 3,
        title: 'Clause Identification & Extraction',
        learningObjective: 'Automatically find, extract, and classify standard and non-standard contract clauses across commercial agreements.',
        superDemo: { title: 'Identify & Extract Clauses Automatically', context: 'Scanning a 55-page distribution agreement to locate all indemnification, limitation of liability, and IP assignment clauses.', methodology: 'Deploy semantic clause classifiers to detect non-standard titles (e.g. "Allocation of Risk").', action: 'Extract 18 key risk clauses into Lawxy Clause Matrix.', aiExplanation: 'Vector similarity finds target provisions even when hidden under obscure section headings.', verify: 'Confirm clause text captures all subsections and sub-bullets.', judgment: 'Lawyer notes absence of reciprocal intellectual property indemnity.', takeaway: 'Do not rely on section titles alone; search for operative legal concepts.' },
        quiz: [{ prompt: 'Why do semantic clause extractors outperform simple keyword searches in contract review?', options: ['They use more electricity.', 'They identify legal concepts (e.g., limitation of liability) even when disguised under unusual headings like "Allocation of Certain Risks" or "Sole Remedies".', 'They change the contract wording automatically.', 'They only work on English documents.'], correctIndex: 1, explanation: 'Drafting attorneys often rename contentious clauses; semantic search understands the underlying legal meaning regardless of title.' }]
      },
      {
        id: 'c3-m4',
        number: 4,
        title: 'Clause-by-Clause Review',
        learningObjective: 'Evaluate individual contractual provisions against client instructions, market standards, and legal enforceability.',
        superDemo: { title: 'Review Individual Clauses Against Policy Standards', context: 'Auditing an indemnification clause requiring the customer to indemnify the vendor for vendor negligence.', methodology: 'Compare clause terms against firm playbook standard (vendor indemnifies for own fault).', action: 'Generate clause evaluation score and flag unacceptable vendor negligence language.', aiExplanation: 'Playbook rule engine evaluates clause against balance of risk criteria.', verify: 'Check state law enforceability on pre-injury negligence indemnification.', judgment: 'Lawyer determines whether to strike clause or rewrite reciprocally.', takeaway: 'Never accept unilateral indemnity for the counterparty\'s own gross negligence or willful misconduct.' },
        quiz: [{ prompt: 'When reviewing an indemnity clause, what is the most critical question to ask?', options: ['Is the font size at least 12pt?', 'Who indemnifies whom, for what specific claims (IP, breach, negligence), under what caps, and who controls the legal defense?', 'Was the contract signed with a blue pen?', 'Does the clause mention the current calendar year?'], correctIndex: 1, explanation: 'Indemnification requires checking scope, triggers, liability caps, carve-outs, and control of legal defense.' }]
      },
      {
        id: 'c3-m5',
        number: 5,
        title: 'Risk Identification & Classification',
        learningObjective: 'Categorize legal, commercial, and operational risks into High, Medium, and Low severity tiers with clear rationale.',
        superDemo: { title: 'Generate Structured Risk Findings & Severity Matrix', context: 'Evaluating risk exposure across a software vendor agreement with uncapped consequential damages.', methodology: 'Apply risk triage framework: High (existential liability), Medium (commercial friction), Low (administrative).', action: 'Generate Lawxy Risk Report with actionable partner executive summary.', aiExplanation: 'Risk engine classifies clauses based on financial and operational impact.', verify: 'Confirm consequential damages waiver lacks mutual protection.', judgment: 'Contract counsel highlights uncapped consequential damages as "Deal-Breaker".', takeaway: 'Group review findings into actionable severity tiers to streamline executive decision-making.' },
        quiz: [{ prompt: 'In a risk triage framework, which clause typically constitutes a "High / Deal-Breaker" risk?', options: ['A clause requiring invoices to be submitted in PDF format.', 'An uncapped indemnification for indirect/consequential damages combined with a unilateral limitation of liability favoring the counterparty.', 'A clause specifying payment terms of net-45 instead of net-30.', 'A clause stating that English is the governing language.'], correctIndex: 1, explanation: 'Uncapped consequential damages expose an organization to catastrophic, open-ended financial liability.' }]
      },
      {
        id: 'c3-m6',
        number: 6,
        title: 'Clause Suggestions & Drafting',
        learningObjective: 'Generate fallback and alternative contract language tailored to specific negotiation stances and client leverage.',
        superDemo: { title: 'Suggest Replacement Clauses Based on Playbook', context: 'Replacing an aggressive non-compete clause with a reasonable non-solicitation restriction.', methodology: 'Generate Primary Stance (client-preferred) and Fallback Stance (compromise).', action: 'Use Lawxy Clause Suggester to insert balanced fallback language.', aiExplanation: 'Model tailors draft language to market standard compromise positions.', verify: 'Ensure replacement clause preserves valid defined terms from Section 1.', judgment: 'Contract manager approves fallback position for next negotiation round.', takeaway: 'Always prepare primary and fallback positions before entering contract negotiations.' },
        quiz: [{ prompt: 'Why is it advantageous to prepare both a primary and a fallback replacement clause?', options: ['To make the document twice as long.', 'It gives negotiators an immediate, pre-approved compromise position when the counterparty rejects the aggressive primary stance.', 'It satisfies court filing rules.', 'It reduces lawyer billable hours to zero.'], correctIndex: 1, explanation: 'Fallback language ensures commercial deals keep moving forward without needing repeated partner escalation.' }]
      },
      {
        id: 'c3-m7',
        number: 7,
        title: 'Obligations & Responsibilities',
        learningObjective: 'Extract and analyze affirmative, negative, and conditional obligations: who must do what, when, and under what conditions.',
        superDemo: { title: 'Build Complete Obligation & SLA Analysis', context: 'Extracting all reporting deadlines, audit notifications, and data deletion obligations from an MSA.', methodology: 'Parse modal verbs ("shall", "must", "may", "will") and conditional triggers ("upon", "in the event of").', action: 'Generate Lawxy Obligation Matrix with assigned responsible parties.', aiExplanation: 'Semantic parsing isolates obligor, action, timeline, and breach consequence.', verify: 'Cross-check 72-hour breach notification requirement against GDPR Article 33.', judgment: 'Operations manager confirms firm IT team can meet 24-hour disaster recovery SLA.', takeaway: 'Convert abstract contractual promises into concrete operational task calendars.' },
        quiz: [{ prompt: 'What is the practical danger of agreeing to an obligation with an undefined timeline (e.g. "promptly")?', options: ['The contract automatically terminates in 30 days.', 'It creates legal ambiguity that can lead to breach claims if the counterparty expects action within 24 hours while you assume 30 days.', 'The clause cannot be read by OCR software.', 'It violates local notarization guidelines.'], correctIndex: 1, explanation: 'Vague terms like "promptly" or "reasonable efforts" invite litigation; defining precise business day timelines prevents disputes.' }]
      },
      {
        id: 'c3-m8',
        number: 8,
        title: 'Commercial Terms & Pricing',
        learningObjective: 'Review payment schedules, price escalation formulas, benchmark audits, late interest, renewals, and taxes.',
        superDemo: { title: 'Review Commercial Provisions & Price Escalations', context: 'Auditing a 5-year cloud infrastructure contract with a compound 8% annual price escalation clause.', methodology: 'Calculate 5-year compound cost impact and benchmark against CPI indices.', action: 'Run Lawxy Commercial Analyzer to project total contract value (TCV).', aiExplanation: 'Financial formula extraction calculates cumulative price increases.', verify: 'Confirm late fee interest rate (2.5% per month) does not violate state usury laws.', judgment: 'Procurement director caps annual escalation at lower of 3% or CPI.', takeaway: 'Always calculate cumulative compounding costs for multi-year contract renewals.' },
        quiz: [{ prompt: 'Why should automatic renewal (evergreen) clauses be flagged during contract review?', options: ['They make contracts expire too quickly.', 'They can lock a company into unwanted multi-year financial commitments if strict notice windows (e.g. 90 days prior to expiry) are missed.', 'They prevent electronic signatures.', 'They change the contract currency.'], correctIndex: 1, explanation: 'Evergreen clauses with narrow cancellation windows lead to inadvertent lock-ins and budget overruns.' }]
      },
      {
        id: 'c3-m9',
        number: 9,
        title: 'Redlining with AI',
        learningObjective: 'Convert risk findings and playbook standards into clean, professional track-changes / redline markup.',
        superDemo: { title: 'Generate & Assess Professional Redlines', context: 'Applying standard markup to a 30-page vendor NDA and Services Agreement.', methodology: 'Generate precise strikethroughs and insertions preserving document formatting.', action: 'Execute automated redline in Lawxy Redline Studio and export DOCX with tracked changes.', aiExplanation: 'Diffing engine applies edits cleanly into Word XML format.', verify: 'Inspect redline to confirm no unintentional deletions or formatting corruptions.', judgment: 'Lead counsel reviews redline comment notes explaining business rationale to counterparty.', takeaway: 'Accompany every substantive redline with a concise, non-adversarial explanatory comment.' },
        quiz: [{ prompt: 'When delivering a redlined agreement to opposing counsel, what should accompany major edits?', options: ['An invoice for review time.', 'A concise, professional comment bubble explaining the business or legal rationale for the proposed change.', 'A demand for immediate signature.', 'A copy of the AI prompt used to generate the edit.'], correctIndex: 1, explanation: 'Explanatory comments explain the commercial justification, drastically increasing counterparty acceptance rates.' }]
      },
      {
        id: 'c3-m10',
        number: 10,
        title: 'Negotiation Support & Playbooks',
        learningObjective: 'Prepare negotiation cheat-sheets, identify trade-off priorities, and anticipate counterparty pushback.',
        superDemo: { title: 'Prepare Negotiation Points & Trade-Off Strategy', context: 'Preparing for a live contract negotiation call on liability caps and audit frequency.', methodology: 'Rank issues by priority (Must-Have, Nice-to-Have, Tradeable) and link to fallback language.', action: 'Generate Lawxy Negotiation Briefing Sheet with strategic talking points.', aiExplanation: 'Negotiation intelligence maps concessions against counterpart priorities.', verify: 'Confirm fallback cap ($2M) remains within approved board risk limits.', judgment: 'Negotiator trades audit frequency (semi-annual to annual) for uncapped IP indemnity.', takeaway: 'Never enter a contract negotiation without pre-determined trade-off pairs.' },
        quiz: [{ prompt: 'What is a "Tradeable" term in a contract negotiation strategy?', options: ['A term that violates criminal law.', 'A non-critical point (e.g. audit notice window) that you are willing to concede in exchange for the counterparty accepting a vital point (e.g. liability cap).', 'A clause written in foreign currency.', 'A clause that changes every 30 days.'], correctIndex: 1, explanation: 'Strategic negotiators use low-cost tradeables to secure critical risk protections.' }]
      },
      {
        id: 'c3-m11',
        number: 11,
        title: 'Contract Comparison & Version Control',
        learningObjective: 'Compare executed agreements, standard templates, and multiple markup rounds to detect stealth modifications.',
        superDemo: { title: 'Compare Two Contracts & Detect Stealth Changes', context: 'Comparing counterparty\'s revised draft against firm standard template to detect unmarked deletions.', methodology: 'Run full-text semantic diff to expose un-tracked edits, punctuation shifts, and modified definitions.', action: 'Deploy Lawxy Version Comparator to generate comprehensive delta report.', aiExplanation: 'Byte-level comparison detects stealth text modifications hidden in tracked changes.', verify: 'Expose deleted comma that reversed the meaning of an indemnity exclusion.', judgment: 'Counsel reinserts omitted language and warns counterparty of stealth edit.', takeaway: 'Never sign a counterparty draft without running an independent digital delta comparison.' },
        quiz: [{ prompt: 'What is a "stealth change" in contract negotiation?', options: ['A change made in invisible digital ink.', 'A text modification made by the counterparty that was not marked in track changes or disclosed in the email summary.', 'A contract signed after midnight.', 'A change made by a court clerk.'], correctIndex: 1, explanation: 'Stealth edits occur when parties alter wording without marking tracked changes; automated comparison detects them instantly.' }]
      },
      {
        id: 'c3-m12',
        number: 12,
        title: 'Review by Contract Type',
        learningObjective: 'Apply distinct review methodologies to NDAs, MSAs, SaaS agreements, vendor contracts, employment, and commercial leases.',
        superDemo: { title: 'Apply Specialized Review to Diverse Contract Types', context: 'Reviewing an M&A NDA, a SaaS subscription, and an Executive Employment agreement in sequence.', methodology: 'Switch review lenses: confidentiality scope for NDAs, SLA/data for SaaS, non-compete for employment.', action: 'Configure specialized Lawxy review profiles for each contract type.', aiExplanation: 'Profile switches risk weightings based on contract category.', verify: 'Ensure employment non-compete complies with FTC and state non-compete bans.', judgment: 'Counsel customizes review depth based on contract materiality.', takeaway: 'Never apply a generic one-size-fits-all review playbook across distinct contract types.' },
        quiz: [{ prompt: 'Why must an NDA review focus on different priorities than a SaaS Master Services Agreement?', options: ['NDAs are only 1 page long.', 'An NDA focuses on definition of confidential information, carve-outs, and term of secrecy; an MSA focuses on service levels, warranties, liability caps, and IP ownership.', 'SaaS agreements do not contain confidential information.', 'NDAs are not legally enforceable contracts.'], correctIndex: 1, explanation: 'Different agreements serve completely different commercial functions and carry distinct risk profiles.' }]
      },
      {
        id: 'c3-m13',
        number: 13,
        title: 'Review Instructions & Playbooks',
        learningObjective: 'Ingest, customize, and enforce organization-specific contract playbooks and approval matrices in Lawxy.',
        superDemo: { title: 'Apply Custom Enterprise Review Playbook', context: 'Uploading a Fortune 500 corporate procurement playbook with 45 mandatory clause guidelines.', methodology: 'Encode playbook rules into Lawxy Playbook Engine with custom redline templates.', action: 'Run automated playbook compliance audit on 10 supplier agreements.', aiExplanation: 'Rule engine matches agreement clauses against playbook standard positions.', verify: 'Verify automated flags match internal legal department escalation rules.', judgment: 'Senior counsel approves playbook deployment for global procurement team.', takeaway: 'A standardized playbook ensures uniform negotiation quality across entire legal teams.' },
        quiz: [{ prompt: 'What is the primary benefit of an organizational contract review playbook?', options: ['It eliminates the need for contracts.', 'It standardizes risk assessment, provides uniform fallback language, and prevents inconsistent negotiation positions across the enterprise.', 'It guarantees 100% counterparty agreement.', 'It reduces contract length by 50%.'], correctIndex: 1, explanation: 'Playbooks institutionalize company risk standards, ensuring all reviewers apply consistent legal criteria.' }]
      },
      {
        id: 'c3-m14',
        number: 14,
        title: 'Final Contract Review Package',
        learningObjective: 'Produce a complete, executive-ready review package: clean agreement, redlined DOCX, risk matrix, and client email memo.',
        superDemo: { title: 'Produce Complete End-to-End Contract Review Package', context: 'Finalizing a complex 50-page enterprise software procurement agreement review.', methodology: 'Synthesize redlines, risk findings, and negotiation cheat-sheet into client delivery package.', action: 'Generate Lawxy Executive Review Package with 1-click export.', aiExplanation: 'Compilation engine bundles redlined DOCX, PDF summary, and negotiation points.', verify: 'Check that all redlines have matching client-facing comment notes.', judgment: 'General counsel approves delivery to Chief Information Officer.', takeaway: 'Deliver redlines alongside an executive summary that busy stakeholders can read in 2 minutes.' },
        quiz: [{ prompt: 'What should an executive contract review memo provide to business stakeholders?', options: ['A 50-page verbatim copy of the contract.', 'A concise summary of key business risks, financial exposure, operational obligations, and recommended negotiation positions in plain language.', 'A list of Latin legal terms.', 'An explanation of the lawyer’s hourly billing rate.'], correctIndex: 1, explanation: 'Business executives need clear risk summaries, financial impact analysis, and recommended decisions, not raw legal text.' }]
      },
      {
        id: 'c3-m15',
        number: 15,
        title: 'Certification Assessment: Contract Specialist',
        learningObjective: 'Conduct an independent, timed contract review of an unfamiliar commercial agreement and produce a professional redline.',
        superDemo: { title: 'Practical Contract Review Examination', context: 'Comprehensive practical assessment: receive 45-page unredacted commercial agreement -> conduct full review -> generate redlines -> submit review memo.', methodology: 'Execute end-to-end contract review under timed exam conditions.', action: 'Submit final redline DOCX and risk matrix for rigorous automated rubric grading.', aiExplanation: 'Rubric evaluates issue spotting, redline accuracy, fallback appropriateness, and business judgment.', verify: 'System audits identified risk clauses against master answer key.', judgment: 'Candidate earns official Lawxy AI Contract Review Specialist Credential.', takeaway: 'Specialist certification confirms professional-grade, independent contract review capability.' },
        quiz: [{ prompt: 'What determines successful completion of the Contract Review Specialist certification?', options: ['Watching all video chapters in double speed.', 'Demonstrating the practical ability to identify risks, apply playbook standards, generate professional redlines, and provide sound commercial advice on an unredacted agreement.', 'Paying a renewal fee every month.', 'Having 10 years of prior legal practice.'], correctIndex: 1, explanation: 'Specialist certification proves actual execution ability: finding hidden traps, redlining accurately, and protecting client interests.' }]
      }
    ]
  }
];
