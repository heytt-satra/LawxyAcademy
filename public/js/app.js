/**
 * Lawxy Academy — Client Application & 3-Tier Certification Architecture
 * Task-Led SuperDemo Engine & Three-Layer Testing Framework
 */

// ============================================================================
// 3 CERTIFICATIONS MASTER DATASET
// ============================================================================

const CERTIFICATIONS_DATA = {
  'cert-1': {
    id: 'cert-1',
    code: 'LXY-FND',
    title: 'Lawxy Legal AI Fundamentals',
    tagline: '“I can use Legal AI correctly.”',
    badge: 'Certification 1 · Foundational',
    target: 'Lawyers, legal teams, law students, and legal ops professionals.',
    outcome: 'The learner understands how to use Lawxy effectively, safely, and ethically for everyday legal work.',
    duration: '18 Hours',
    modulesCount: 10,
    passingScore: 70,
    shortDesc: 'Master the core mechanics, prompting techniques, verification workflows, and ethical guardrails required to safely use AI in daily legal practice.',
    modules: [
      {
        id: 'c1-m1',
        title: '1. Introduction to Legal AI',
        learningObjective: 'Understand what Legal AI is, where it creates leverage, where it fails, and why closed legal models differ from generic chat.',
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
        title: '2. Getting Started with Lawxy',
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
        title: '3. Prompting for Legal Work',
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
        title: '4. Legal Research & Search',
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
        title: '5. Legal Drafting with AI',
        learningObjective: 'Draft, rewrite, summarize, and adapt legal instruments while preserving precise statutory definitions and tone.',
        superDemo: {
          title: 'Create a Legal Document (Demand / Response Memo)',
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
              'It prompts the AI to introduce archaic legalese that adds ambiguity rather than substantive precision.',
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
        title: '6. Document Analysis',
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
        title: '7. Verification & Quality Control',
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
        title: '8. AI Ethics & Professional Responsibility',
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
        title: '9. Practical Legal AI Workflow',
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
        title: '10. Certification Assessment',
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

  'cert-2': {
    id: 'cert-2',
    code: 'LXY-ADV',
    title: 'Advanced Legal AI Practitioner',
    tagline: '“I can use Legal AI for substantive legal work.”',
    badge: 'Certification 2 · Professional',
    target: 'Practicing lawyers and experienced legal professionals.',
    outcome: 'The learner can use Lawxy for complex, substantive legal workflows rather than simply generating text.',
    duration: '26 Hours',
    modulesCount: 12,
    passingScore: 75,
    shortDesc: 'Master case analysis, multi-document synthesis, cross-border translation, due diligence at scale, and high-stakes litigation strategy.',
    modules: [
      { id: 'c2-m1', title: '1. Advanced Reasoning & Architectures', learningObjective: 'Construct multi-step legal reasoning pipelines and knowledge graph queries for complex litigation.', superDemo: { title: 'Build Multi-Layer Legal Chain-of-Thought Pipeline', context: 'Setting up an architectural reasoning tree for complex antitrust liability.', methodology: 'Deconstruct statutory elements into sequential logical dependencies.', action: 'Execute chain-of-thought pipeline in Lawxy AgentFlow.', aiExplanation: 'Iterative reasoning isolates intermediate legal fallacies.', verify: 'Confirm each intermediate premise is supported by record evidence.', judgment: 'Counsel decides whether to pursue per se or rule of reason claims.', takeaway: 'Decompose complex legal questions into sequential deductive steps.' }, quiz: [{ prompt: 'Why is Chain-of-Thought prompting superior for complex statutory interpretations?', options: ['It uses 90% less cloud bandwidth.', 'It forces the model to articulate intermediate legal reasoning steps, exposing logical gaps before concluding.', 'It makes the output immune to court objections.', 'It translates English statutes into Latin.'], correctIndex: 1, explanation: 'CoT prompting breaks multi-element statutory tests into transparent intermediate steps, significantly reducing analytical errors.' }] },
      { id: 'c2-m2', title: '2. Case Analysis with AI', learningObjective: 'Analyze facts, issues, law, arguments, and authorities across multi-volume litigation dockets.', superDemo: { title: 'Analyse a Complex Multi-Party Case', context: 'Evaluating a 140-page federal appellate decision with dissenting and concurring opinions.', methodology: 'Extract majority rationale, distinguish binding holdings from non-binding obiter dicta.', action: 'Run Lawxy Case Lens to generate comprehensive case synthesis matrix.', aiExplanation: 'Vector clustering separates majority arguments from dissenting critiques.', verify: 'Cross-examine quote fragments against official federal slip opinion.', judgment: 'Counsel determines how dissent arguments may influence pending en banc petition.', takeaway: 'Always clearly separate binding holding from persuasive judicial dicta in case syntheses.' }, quiz: [{ prompt: 'What is the danger of relying on an AI summary that does not distinguish holding from obiter dictum?', options: ['The brief will automatically exceed court page limits.', 'Counsel may mistakenly cite non-binding musings of a judge as mandatory precedent, undermining credibility with the court.', 'The court clerk will reject the filing for improper font.', 'The AI model will lock the workspace.'], correctIndex: 1, explanation: 'Dicta is non-binding; citing it as controlling law is a fundamental legal error that opposing counsel will exploit.' }] },
      { id: 'c2-m3', title: '3. Case Strategy Creation', learningObjective: 'Develop arguments, identify weaknesses, and anticipate counterarguments using adversarial AI simulation.', superDemo: { title: 'Create Adversarial Case Strategy & Red Team Memo', context: 'Simulating opposing counsel arguments in a high-stakes trade secret preliminary injunction.', methodology: 'Perform adversarial red-teaming to find evidentiary gaps in client affidavits.', action: 'Deploy Lawxy Adversarial Simulator to pressure-test client claims.', aiExplanation: 'Dual-agent debate simulates plaintiff and defense arguments iteratively.', verify: 'Audit surfaced counterarguments against governing circuit precedent.', judgment: 'Lead trial attorney decides whether to supplement expert witness declaration.', takeaway: 'Use AI to stress-test your case from the opposing perspective before filing.' }, quiz: [{ prompt: 'How should an attorney utilize AI for litigation strategy preparation?', options: ['Adopt AI-generated strategies without modification to save research time.', 'Use AI as an adversarial "red team" to simulate opposing arguments and identify weaknesses in your own factual record.', 'Allow the AI to determine settlement value autonomously.', 'Submit the AI strategy directly to the judge as an exhibit.'], correctIndex: 1, explanation: 'AI excels at adversarial red-teaming, exposing weaknesses in your arguments before the opposing party does.' }] },
      { id: 'c2-m4', title: '4. Advanced Legal Research', learningObjective: 'Resolve circuit splits, evaluate conflicting authorities, and synthesize multi-jurisdictional legal rules.', superDemo: { title: 'Research a Difficult / Unsettled Legal Issue', context: 'Navigating an active circuit split regarding AI-generated code copyrightability.', methodology: 'Synthesize competing circuit rationales and historical patent precedents.', action: 'Query Lawxy JurisMind with cross-circuit comparison matrix.', aiExplanation: 'RAG pipeline maps conflicting appellate holdings side-by-side.', verify: 'Confirm grant of certiorari status on pending Supreme Court dockets.', judgment: 'Counsel frames arguments for potential Supreme Court appeal.', takeaway: 'When researching unsettled law, map conflicting jurisdictions in parallel.' }, quiz: [{ prompt: 'When an AI tool identifies a "split in authority," what must counsel verify?', options: ['Whether both circuits have equal numbers of active judges.', 'Whether the identified split represents genuine conflicting holdings or merely distinguishable factual contexts.', 'Whether the AI model preferred the liberal or conservative circuit.', 'Whether the decisions were published in the same calendar year.'], correctIndex: 1, explanation: 'Many apparent splits are factually distinguishable; counsel must analyze the underlying records to confirm a true legal division.' }] },
      { id: 'c2-m5', title: '5. Complex Contract Review', learningObjective: 'Review complex agreements beyond clause extraction, analyzing liability cascades and indemnity cross-effects.', superDemo: { title: 'Review a Complex Cross-Border Master Agreement', context: 'Auditing a 120-page cross-border joint venture agreement involving GDPR and FCPA covenants.', methodology: 'Track liability waterfalls across schedules, exhibits, and parent guarantees.', action: 'Run Lawxy Contract Review Studio on multi-part transaction package.', aiExplanation: 'Cross-document dependency graphs track definitions across schedules.', verify: 'Verify indemnity caps in Schedule 4 align with Section 18 aggregate limits.', judgment: 'Transactional counsel negotiates reciprocal governing law compromise.', takeaway: 'Never analyze liability caps in isolation from warranty and indemnity carve-outs.' }, quiz: [{ prompt: 'Why is clause extraction alone insufficient for complex enterprise contract review?', options: ['Clause extraction cannot format text into PDF.', 'Modern commercial contracts contain interdependencies where liability caps, indemnities, warranties, and termination remedies modify each other across disparate sections.', 'Clause extraction only works on contracts under 5 pages.', 'Enterprise contracts cannot be parsed by OCR.'], correctIndex: 1, explanation: 'Enterprise agreements are systemic; an indemnity is meaningless without cross-referencing its governing liability cap and insurance clauses.' }] },
      { id: 'c2-m6', title: '6. Legal Due Diligence', learningObjective: 'Extract, classify, and assess risks across hundreds of virtual data room documents during M&A transactions.', superDemo: { title: 'Conduct AI-Assisted M&A Due Diligence', context: 'Screening 450 commercial supplier contracts for change-of-control assignment restrictions.', methodology: 'Define threshold materiality triggers, batch process VDR files, and generate redline risk dashboard.', action: 'Deploy Lawxy Batch Ingestion Engine across 450 contracts in parallel.', aiExplanation: 'High-throughput semantic parsing tags assignment clauses by severity.', verify: 'Manually review all "High Risk" flagged change-of-control clauses.', judgment: 'M&A partner prepares disclosure schedule carve-outs for merger agreement.', takeaway: 'Always conduct human verification on all flagged high-risk due diligence items.' }, quiz: [{ prompt: 'What is the primary operational objective of AI-assisted M&A due diligence?', options: ['Replacing junior associates completely to eliminate payroll costs.', 'Accelerating document classification and flagging high-risk change-of-control, non-compete, or termination triggers across large volumes of data room files.', 'Guaranteeing zero tax liability for the buyer.', 'Drafting the final purchase agreement automatically.'], correctIndex: 1, explanation: 'AI acts as a force multiplier, classifying hundreds of documents rapidly so lawyers can focus on high-risk negotiation points.' }] },
      { id: 'c2-m7', title: '7. Notice & Response Drafting', learningObjective: 'Analyze incoming legal notices, identify breach claims, and construct legally robust response letters.', superDemo: { title: 'Draft a Formal Notice Response & Cure Defense', context: 'Responding to a 10-day notice of default alleging material breach of commercial lease terms.', methodology: 'Analyze lease default triggers, verify notice delivery compliance, and frame cure defense.', action: 'Draft formal response denying default and citing cure compliance records.', aiExplanation: 'Lawxy matches tenant maintenance logs against landlord notice claims.', verify: 'Check statutory notice cure periods under state property code.', judgment: 'Real estate counsel advises tenant on filing emergency injunction.', takeaway: 'Scrutinize whether the initial notice complied with contractual delivery protocols.' }, quiz: [{ prompt: 'When responding to a default notice, what procedural defense should always be checked first?', options: ['Whether the notice was printed in full color.', 'Whether the notice was delivered in strict accordance with the contract’s notice clause (method, address, designated recipient, cure window).', 'Whether the sender used conversational language.', 'Whether the notice was reviewed by a third-party mediator.'], correctIndex: 1, explanation: 'Improper notice delivery or defective cure calculations frequently render default claims legally ineffective.' }] },
      { id: 'c2-m8', title: '8. Legal Translation & Cross-Border Nuance', learningObjective: 'Translate foreign legal documents while preserving exact civil law vs common law statutory terms and definitions.', superDemo: { title: 'Translate & Validate Cross-Border Agreement', context: 'Translating a German commercial distribution agreement (BGB framework) into New York law format.', methodology: 'Identify civil law concepts (e.g. "Treu und Glauben", "Verschulden") and map to common law equivalents.', action: 'Execute legal translation in Lawxy Cross-Border Studio with legal glossary.', aiExplanation: 'Domain-specific translation models preserve statutory term-of-art definitions.', verify: 'Dual-language review by bilingual counsel of indemnification clauses.', judgment: 'International counsel adds jurisdictional dispute resolution clause.', takeaway: 'Never use generic machine translation for binding cross-border legal obligations.' }, quiz: [{ prompt: 'Why does generic machine translation fail on civil law contractual terms?', options: ['Foreign languages use different alphabet encodings.', 'Civil law concepts carry distinct statutory definitions that do not map directly to common law without precise legal adaptation.', 'Machine translation cannot parse PDF headers.', 'Court systems only accept Latin translations.'], correctIndex: 1, explanation: 'Legal concepts carry distinct statutory baggage across civil and common law traditions that generic translation distorts.' }] },
      { id: 'c2-m9', title: '9. Multi-Document Analysis', learningObjective: 'Connect facts, obligations, and timelines across multi-party document sets and email archives.', superDemo: { title: 'Analyze Multi-Document Ingestion Set', context: 'Synthesizing 12 interrelated project contracts, change orders, and side letters in a construction dispute.', methodology: 'Build chronological obligation timeline, track amendment overrides and priority order.', action: 'Query Lawxy Multi-Doc Graph to identify conflicting payment milestones.', aiExplanation: 'Entity relationship graphs detect contradictions between master contract and side letters.', verify: 'Confirm which document contains the controlling "Order of Precedence" clause.', judgment: 'Construction litigation partner prepares claim for unpaid change orders.', takeaway: 'Always identify and enforce the governing contract\'s Order of Precedence clause.' }, quiz: [{ prompt: 'When multiple agreements in a single transaction conflict, what clause controls?', options: ['The clause with the largest font size.', 'The Order of Precedence clause, which explicitly ranks the hierarchy of contracts, schedules, and change orders.', 'The clause in the most recently opened file.', 'The clause located in the signature block.'], correctIndex: 1, explanation: 'The Order of Precedence clause explicitly dictates which document governs in the event of an irreconcilable conflict.' }] },
      { id: 'c2-m10', title: '10. Verification & Professional Judgment', learningObjective: 'Validate complex AI outputs and establish clear boundaries between automated tasks and lawyer judgment.', superDemo: { title: 'Audit AI-Generated Work Product for Senior Partner Review', context: 'Auditing a complex 30-page summary judgment brief drafted with AI assistance.', methodology: 'Check procedural standards, Bluebook formatting, factual accuracy, and tactical viability.', action: 'Deploy Lawxy Verification Protocol and generate compliance score.', aiExplanation: 'Automated verification flags uncited factual assertions and ambiguous case citations.', verify: 'Retrieve original docket exhibits to match deposition page/line citations.', judgment: 'Partner signs Rule 11 certification with total confidence in accuracy.', takeaway: 'Professional judgment cannot be automated; AI assists drafting, lawyers certify truth.' }, quiz: [{ prompt: 'What is the ultimate dividing line between AI assistance and lawyer professional responsibility?', options: ['AI handles cases under $100k; lawyers handle cases over $100k.', 'AI assists in information extraction, synthesis, and initial drafting; the licensed lawyer exercises final independent professional judgment and bears sole accountability.', 'AI makes the legal decision; the lawyer merely notarizes the filing.', 'There is no dividing line under modern bar rules.'], correctIndex: 1, explanation: 'The lawyer remains solely and non-delegably accountable for all factual assertions and legal arguments submitted under their name.' }] },
      { id: 'c2-m11', title: '11. AI Ethics & Professional Responsibility — Advanced', learningObjective: 'Handle complex ethical scenarios involving client communication, AI audit trails, privilege preservation, and supervision.', superDemo: { title: 'Handle Complex Ethical & Privilege Scenarios', context: 'Managing client disclosure requirements and AI audit trails during federal regulatory investigation.', methodology: 'Apply ABA Formal Op. 512, state bar guidelines on generative AI disclosure, and work-product doctrine.', action: 'Configure tamper-evident audit logs and client engagement letter addendum.', aiExplanation: 'Cryptographic logs prove human-in-the-loop review at every revision step.', verify: 'Confirm zero client-confidential metadata is exposed in public filings.', judgment: 'Ethics partner approves engagement letter terms for AI-assisted representation.', takeaway: 'Transparency, confidentiality safeguards, and verifiable human oversight protect client privilege.' }, quiz: [{ prompt: 'When must a law firm disclose its use of AI to a client according to modern ethics guidance?', options: ['Never under any circumstances.', 'When required by the client’s outside counsel guidelines, where AI usage is material to the representation, or when sensitive client data is processed.', 'Only if the client specifically asks in writing during billing.', 'Only in criminal defense cases.'], correctIndex: 1, explanation: 'Client outside counsel guidelines and Model Rule 1.4 (Communication) may require disclosure depending on materiality and data handling.' }] },
      { id: 'c2-m12', title: '12. Capstone: Complex Legal Assignment', learningObjective: 'Complete an end-to-end complex legal assignment using Lawxy demonstrating mastery of substantive legal workflows.', superDemo: { title: 'Complete Complex Legal Assignment Capstone', context: 'Full real-world case: ingest 300-page record -> analyze claims -> research unsettled law -> draft complete motion -> audit all citations.', methodology: 'Synthesize all Level 2 competencies into an integrated, high-rigor legal work product.', action: 'Submit final comprehensive capstone project for faculty evaluation.', aiExplanation: 'Automated telemetry monitors reasoning depth, verification rigor, and speed.', verify: 'Multi-layer rubric evaluates legal accuracy, citation integrity, and ethical compliance.', judgment: 'Faculty awards Lawxy Advanced Legal AI Practitioner Credential.', takeaway: 'True AI mastery is evidenced by rigorous, defensible, professional-grade work product.' }, quiz: [{ prompt: 'What criteria define a successful Level 2 Capstone submission?', options: ['Finishing the exam in under 15 minutes.', 'Producing an accurate, fully-grounded, citation-verified legal work product that demonstrates independent professional judgment and zero ethical lapses.', 'Using the maximum number of AI prompts possible.', 'Generating a brief of over 100 pages.'], correctIndex: 1, explanation: 'The capstone tests comprehensive legal competence, grounded research, verified citations, and sound strategic judgment.' }] }
    ]
  },

  'cert-3': {
    id: 'cert-3',
    code: 'LXY-CRS',
    title: 'AI Contract Review Specialist',
    tagline: '“I can use AI to perform professional-grade contract review.”',
    badge: 'Certification 3 · Specialist',
    target: 'Lawyers, contract managers, in-house legal teams, and procurement/ops specialists.',
    outcome: 'The learner can conduct a structured contract review using Lawxy, identify risks, suggest changes, and produce a usable reviewed/redlined agreement.',
    duration: '22 Hours',
    modulesCount: 15,
    passingScore: 75,
    shortDesc: 'Master structured contract review, automated risk detection, playbook enforcement, multi-party redlining, and negotiation position generation.',
    modules: [
      { id: 'c3-m1', title: '1. Contract Review Fundamentals', learningObjective: 'Set up review objectives, risk appetite, and review methodology.', superDemo: { title: 'Set Up a Structured Contract Review in Lawxy', context: 'Receiving a 40-page vendor agreement with strict client risk boundaries.', methodology: 'Define review objectives, establish risk thresholds, and select review playbook.', action: 'Configure Lawxy Contract Review Studio workspace with matter playbook.', aiExplanation: 'Playbook rules parameterize risk detection thresholds for the LLM.', verify: 'Check that custom liability thresholds ($1M cap) are loaded into system prompts.', judgment: 'Reviewer confirms whether client risk appetite is aggressive or conservative.', takeaway: 'Always calibrate AI review settings against specific client risk appetite before reviewing.' }, quiz: [{ prompt: 'Why must client risk appetite be parameterized before starting an AI-assisted contract review?', options: ['To speed up PDF rendering.', 'Because what constitutes an acceptable risk varies drastically between a startup and an enterprise company.', 'To bypass contract signature requirements.', 'To convert currency amounts automatically.'], correctIndex: 1, explanation: 'Risk tolerance defines redlining severity; an aggressive growth company accepts provisions an enterprise procurement team would reject.' }] },
      { id: 'c3-m2', title: '2. Understanding Contract Structure', learningObjective: 'Analyze parties, definitions, operative covenants, schedules, and boilerplate divisions.', superDemo: { title: 'Analyse Contract Structure & Document Anatomy', context: 'Deconstructing an unfamiliar multi-tiered master services agreement with 6 attached statement of work schedules.', methodology: 'Map structural layout, identify defined term locations, and parse operative vs boilerplate divisions.', action: 'Run Lawxy Structure Mapper to generate interactive contract tree.', aiExplanation: 'Semantic structure parsing classifies sections by legal function.', verify: 'Verify Schedule B is incorporated by reference in Section 3.2.', judgment: 'Contract specialist identifies missing standard data processing addendum (DPA).', takeaway: 'Confirm all referenced schedules and exhibits are physically attached before reviewing.' }, quiz: [{ prompt: 'What risk arises when reviewing a contract without checking defined terms?', options: ['The file will not save.', 'A seemingly innocent clause may use a defined term that secretly broadens liability exposure across the entire enterprise.', 'The page numbers will change.', 'The font will become unreadable.'], correctIndex: 1, explanation: 'Defined terms are the engine of a contract; definitions can expand or restrict liability far beyond the plain reading of a single clause.' }] },
      { id: 'c3-m3', title: '3. Clause Identification & Extraction', learningObjective: 'Automatically find, extract, and classify standard and non-standard contract clauses.', superDemo: { title: 'Identify & Extract Clauses Automatically', context: 'Scanning a 55-page distribution agreement to locate all indemnification, limitation of liability, and IP assignment clauses.', methodology: 'Deploy semantic clause classifiers to detect non-standard titles.', action: 'Extract 18 key risk clauses into Lawxy Clause Matrix.', aiExplanation: 'Vector similarity finds target provisions even when hidden under obscure section headings.', verify: 'Confirm clause text captures all subsections and sub-bullets.', judgment: 'Lawyer notes absence of reciprocal intellectual property indemnity.', takeaway: 'Do not rely on section titles alone; search for operative legal concepts.' }, quiz: [{ prompt: 'Why do semantic clause extractors outperform simple keyword searches in contract review?', options: ['They use more electricity.', 'They identify legal concepts even when disguised under unusual headings like "Allocation of Certain Risks" or "Sole Remedies".', 'They change the contract wording automatically.', 'They only work on English documents.'], correctIndex: 1, explanation: 'Drafting attorneys often rename contentious clauses; semantic search understands the underlying legal meaning regardless of title.' }] },
      { id: 'c3-m4', title: '4. Clause-by-Clause Review', learningObjective: 'Assess whether provisions meet the review criteria and enforceability standards.', superDemo: { title: 'Review Individual Clauses Against Policy Standards', context: 'Auditing an indemnification clause requiring the customer to indemnify the vendor for vendor negligence.', methodology: 'Compare clause terms against firm playbook standard.', action: 'Generate clause evaluation score and flag unacceptable vendor negligence language.', aiExplanation: 'Playbook rule engine evaluates clause against balance of risk criteria.', verify: 'Check state law enforceability on pre-injury negligence indemnification.', judgment: 'Lawyer determines whether to strike clause or rewrite reciprocally.', takeaway: 'Never accept unilateral indemnity for the counterparty\'s own gross negligence or willful misconduct.' }, quiz: [{ prompt: 'When reviewing an indemnity clause, what is the most critical question to ask?', options: ['Is the font size at least 12pt?', 'Who indemnifies whom, for what specific claims, under what caps, and who controls the legal defense?', 'Was the contract signed with a blue pen?', 'Does the clause mention the current calendar year?'], correctIndex: 1, explanation: 'Indemnification requires checking scope, triggers, liability caps, carve-outs, and control of legal defense.' }] },
      { id: 'c3-m5', title: '5. Risk Identification & Classification', learningObjective: 'Categorize legal, commercial, and operational risks into High, Medium, and Low severity tiers.', superDemo: { title: 'Generate Structured Risk Findings & Severity Matrix', context: 'Evaluating risk exposure across a software vendor agreement with uncapped consequential damages.', methodology: 'Apply risk triage framework: High (existential liability), Medium (commercial friction), Low (administrative).', action: 'Generate Lawxy Risk Report with actionable partner executive summary.', aiExplanation: 'Risk engine classifies clauses based on financial and operational impact.', verify: 'Confirm consequential damages waiver lacks mutual protection.', judgment: 'Contract counsel highlights uncapped consequential damages as "Deal-Breaker".', takeaway: 'Group review findings into actionable severity tiers to streamline executive decision-making.' }, quiz: [{ prompt: 'In a risk triage framework, which clause typically constitutes a "High / Deal-Breaker" risk?', options: ['A clause requiring invoices to be submitted in PDF format.', 'An uncapped indemnification for indirect/consequential damages combined with a unilateral limitation of liability favoring the counterparty.', 'A clause specifying payment terms of net-45 instead of net-30.', 'A clause stating that English is the governing language.'], correctIndex: 1, explanation: 'Uncapped consequential damages expose an organization to catastrophic, open-ended financial liability.' }] },
      { id: 'c3-m6', title: '6. Clause Suggestions & Drafting', learningObjective: 'Generate fallback and alternative language based on client instructions and leverage.', superDemo: { title: 'Suggest Replacement Clauses Based on Playbook', context: 'Replacing an aggressive non-compete clause with a reasonable non-solicitation restriction.', methodology: 'Generate Primary Stance (client-preferred) and Fallback Stance (compromise).', action: 'Use Lawxy Clause Suggester to insert balanced fallback language.', aiExplanation: 'Model tailors draft language to market standard compromise positions.', verify: 'Ensure replacement clause preserves valid defined terms from Section 1.', judgment: 'Contract manager approves fallback position for next negotiation round.', takeaway: 'Always prepare primary and fallback positions before entering contract negotiations.' }, quiz: [{ prompt: 'Why is it advantageous to prepare both a primary and a fallback replacement clause?', options: ['To make the document twice as long.', 'It gives negotiators an immediate, pre-approved compromise position when the counterparty rejects the aggressive primary stance.', 'It satisfies court filing rules.', 'It reduces lawyer billable hours to zero.'], correctIndex: 1, explanation: 'Fallback language ensures commercial deals keep moving forward without needing repeated partner escalation.' }] },
      { id: 'c3-m7', title: '7. Obligations & Responsibilities', learningObjective: 'Identify who must do what, when, and under what conditions across complex agreements.', superDemo: { title: 'Build Complete Obligation & SLA Analysis', context: 'Extracting all reporting deadlines, audit notifications, and data deletion obligations from an MSA.', methodology: 'Parse modal verbs and conditional triggers to build responsibility matrix.', action: 'Generate Lawxy Obligation Matrix with assigned responsible parties.', aiExplanation: 'Semantic parsing isolates obligor, action, timeline, and breach consequence.', verify: 'Cross-check 72-hour breach notification requirement against GDPR Article 33.', judgment: 'Operations manager confirms firm IT team can meet 24-hour disaster recovery SLA.', takeaway: 'Convert abstract contractual promises into concrete operational task calendars.' }, quiz: [{ prompt: 'What is the practical danger of agreeing to an obligation with an undefined timeline (e.g. "promptly")?', options: ['The contract automatically terminates in 30 days.', 'It creates legal ambiguity that can lead to breach claims if the counterparty expects action within 24 hours while you assume 30 days.', 'The clause cannot be read by OCR software.', 'It violates local notarization guidelines.'], correctIndex: 1, explanation: 'Vague terms like "promptly" or "reasonable efforts" invite litigation; defining precise business day timelines prevents disputes.' }] },
      { id: 'c3-m8', title: '8. Commercial Terms & Pricing', learningObjective: 'Review payment schedules, liability caps, price escalations, termination, and renewals.', superDemo: { title: 'Review Commercial Provisions & Price Escalations', context: 'Auditing a 5-year cloud infrastructure contract with a compound 8% annual price escalation clause.', methodology: 'Calculate 5-year compound cost impact and benchmark against CPI indices.', action: 'Run Lawxy Commercial Analyzer to project total contract value (TCV).', aiExplanation: 'Financial formula extraction calculates cumulative price increases.', verify: 'Confirm late fee interest rate (2.5% per month) does not violate state usury laws.', judgment: 'Procurement director caps annual escalation at lower of 3% or CPI.', takeaway: 'Always calculate cumulative compounding costs for multi-year contract renewals.' }, quiz: [{ prompt: 'Why should automatic renewal (evergreen) clauses be flagged during contract review?', options: ['They make contracts expire too quickly.', 'They can lock a company into unwanted multi-year financial commitments if strict notice windows are missed.', 'They prevent electronic signatures.', 'They change the contract currency.'], correctIndex: 1, explanation: 'Evergreen clauses with narrow cancellation windows lead to inadvertent lock-ins and budget overruns.' }] },
      { id: 'c3-m9', title: '9. Redlining with AI', learningObjective: 'Convert findings into professional proposed amendments and tracked-changes redlines.', superDemo: { title: 'Generate & Assess Professional Redlines', context: 'Applying standard markup to a 30-page vendor NDA and Services Agreement.', methodology: 'Generate precise strikethroughs and insertions preserving document formatting.', action: 'Execute automated redline in Lawxy Redline Studio and export DOCX with tracked changes.', aiExplanation: 'Diffing engine applies edits cleanly into Word XML format.', verify: 'Inspect redline to confirm no unintentional deletions or formatting corruptions.', judgment: 'Lead counsel reviews redline comment notes explaining business rationale to counterparty.', takeaway: 'Accompany every substantive redline with a concise, non-adversarial explanatory comment.' }, quiz: [{ prompt: 'When delivering a redlined agreement to opposing counsel, what should accompany major edits?', options: ['An invoice for review time.', 'A concise, professional comment bubble explaining the business or legal rationale for the proposed change.', 'A demand for immediate signature.', 'A copy of the AI prompt used to generate the edit.'], correctIndex: 1, explanation: 'Explanatory comments explain the commercial justification, drastically increasing counterparty acceptance rates.' }] },
      { id: 'c3-m10', title: '10. Negotiation Support', learningObjective: 'Identify negotiation priorities, trade-off pairs, and fallback positions.', superDemo: { title: 'Prepare Negotiation Points & Trade-Off Strategy', context: 'Preparing for a live contract negotiation call on liability caps and audit frequency.', methodology: 'Rank issues by priority (Must-Have, Nice-to-Have, Tradeable) and link to fallback language.', action: 'Generate Lawxy Negotiation Briefing Sheet with strategic talking points.', aiExplanation: 'Negotiation intelligence maps concessions against counterpart priorities.', verify: 'Confirm fallback cap ($2M) remains within approved board risk limits.', judgment: 'Negotiator trades audit frequency for uncapped IP indemnity.', takeaway: 'Never enter a contract negotiation without pre-determined trade-off pairs.' }, quiz: [{ prompt: 'What is a "Tradeable" term in a contract negotiation strategy?', options: ['A term that violates criminal law.', 'A non-critical point that you are willing to concede in exchange for the counterparty accepting a vital point.', 'A clause written in foreign currency.', 'A clause that changes every 30 days.'], correctIndex: 1, explanation: 'Strategic negotiators use low-cost tradeables to secure critical risk protections.' }] },
      { id: 'c3-m11', title: '11. Contract Comparison', learningObjective: 'Compare agreements, standard templates, and multiple markup rounds to detect stealth modifications.', superDemo: { title: 'Compare Two Contracts & Detect Stealth Changes', context: 'Comparing counterparty\'s revised draft against firm standard template to detect unmarked deletions.', methodology: 'Run full-text semantic diff to expose un-tracked edits, punctuation shifts, and modified definitions.', action: 'Deploy Lawxy Version Comparator to generate comprehensive delta report.', aiExplanation: 'Byte-level comparison detects stealth text modifications hidden in tracked changes.', verify: 'Expose deleted comma that reversed the meaning of an indemnity exclusion.', judgment: 'Counsel reinserts omitted language and warns counterparty of stealth edit.', takeaway: 'Never sign a counterparty draft without running an independent digital delta comparison.' }, quiz: [{ prompt: 'What is a "stealth change" in contract negotiation?', options: ['A change made in invisible digital ink.', 'A text modification made by the counterparty that was not marked in track changes or disclosed in the email summary.', 'A contract signed after midnight.', 'A change made by a court clerk.'], correctIndex: 1, explanation: 'Stealth edits occur when parties alter wording without marking tracked changes; automated comparison detects them instantly.' }] },
      { id: 'c3-m12', title: '12. Review by Contract Type', learningObjective: 'Apply distinct review methodologies to NDAs, MSAs, vendor contracts, and employment agreements.', superDemo: { title: 'Apply Specialized Review to Diverse Contract Types', context: 'Reviewing an M&A NDA, a SaaS subscription, and an Executive Employment agreement in sequence.', methodology: 'Switch review lenses: confidentiality scope for NDAs, SLA/data for SaaS, non-compete for employment.', action: 'Configure specialized Lawxy review profiles for each contract type.', aiExplanation: 'Profile switches risk weightings based on contract category.', verify: 'Ensure employment non-compete complies with FTC and state non-compete bans.', judgment: 'Counsel customizes review depth based on contract materiality.', takeaway: 'Never apply a generic one-size-fits-all review playbook across distinct contract types.' }, quiz: [{ prompt: 'Why must an NDA review focus on different priorities than a SaaS Master Services Agreement?', options: ['NDAs are only 1 page long.', 'An NDA focuses on definition of confidential information, carve-outs, and term of secrecy; an MSA focuses on service levels, warranties, liability caps, and IP ownership.', 'SaaS agreements do not contain confidential information.', 'NDAs are not legally enforceable contracts.'], correctIndex: 1, explanation: 'Different agreements serve completely different commercial functions and carry distinct risk profiles.' }] },
      { id: 'c3-m13', title: '13. Review Instructions & Playbooks', learningObjective: 'Use and enforce company-specific standards, playbooks, and approval matrices.', superDemo: { title: 'Apply Custom Enterprise Review Playbook', context: 'Uploading a Fortune 500 corporate procurement playbook with 45 mandatory clause guidelines.', methodology: 'Encode playbook rules into Lawxy Playbook Engine with custom redline templates.', action: 'Run automated playbook compliance audit on 10 supplier agreements.', aiExplanation: 'Rule engine matches agreement clauses against playbook standard positions.', verify: 'Verify automated flags match internal legal department escalation rules.', judgment: 'Senior counsel approves playbook deployment for global procurement team.', takeaway: 'A standardized playbook ensures uniform negotiation quality across entire legal teams.' }, quiz: [{ prompt: 'What is the primary benefit of an organizational contract review playbook?', options: ['It eliminates the need for contracts.', 'It standardizes risk assessment, provides uniform fallback language, and prevents inconsistent negotiation positions across the enterprise.', 'It guarantees 100% counterparty agreement.', 'It reduces contract length by 50%.'], correctIndex: 1, explanation: 'Playbooks institutionalize company risk standards, ensuring all reviewers apply consistent legal criteria.' }] },
      { id: 'c3-m14', title: '14. Final Contract Review', learningObjective: 'Produce a complete, professional, executive-ready contract review package.', superDemo: { title: 'Produce Complete End-to-End Contract Review Package', context: 'Finalizing a complex 50-page enterprise software procurement agreement review.', methodology: 'Synthesize redlines, risk findings, and negotiation cheat-sheet into client delivery package.', action: 'Generate Lawxy Executive Review Package with 1-click export.', aiExplanation: 'Compilation engine bundles redlined DOCX, PDF summary, and negotiation points.', verify: 'Check that all redlines have matching client-facing comment notes.', judgment: 'General counsel approves delivery to Chief Information Officer.', takeaway: 'Deliver redlines alongside an executive summary that busy stakeholders can read in 2 minutes.' }, quiz: [{ prompt: 'What should an executive contract review memo provide to business stakeholders?', options: ['A 50-page verbatim copy of the contract.', 'A concise summary of key business risks, financial exposure, operational obligations, and recommended negotiation positions in plain language.', 'A list of Latin legal terms.', 'An explanation of the lawyer’s hourly billing rate.'], correctIndex: 1, explanation: 'Business executives need clear risk summaries, financial impact analysis, and recommended decisions, not raw legal text.' }] },
      { id: 'c3-m15', title: '15. Certification Assessment', learningObjective: 'Conduct an independent, practical contract review examination on an unfamiliar agreement.', superDemo: { title: 'Practical Contract Review Examination', context: 'Comprehensive practical assessment: receive 45-page unredacted commercial agreement -> conduct full review -> generate redlines -> submit review memo.', methodology: 'Execute end-to-end contract review under timed exam conditions.', action: 'Submit final redline DOCX and risk matrix for rigorous automated rubric grading.', aiExplanation: 'Rubric evaluates issue spotting, redline accuracy, fallback appropriateness, and business judgment.', verify: 'System audits identified risk clauses against master answer key.', judgment: 'Candidate earns official Lawxy AI Contract Review Specialist Credential.', takeaway: 'Specialist certification confirms professional-grade, independent contract review capability.' }, quiz: [{ prompt: 'What determines successful completion of the Contract Review Specialist certification?', options: ['Watching all video chapters in double speed.', 'Demonstrating the practical ability to identify risks, apply playbook standards, generate professional redlines, and provide sound commercial advice on an unredacted agreement.', 'Paying a renewal fee every month.', 'Having 10 years of prior legal practice.'], correctIndex: 1, explanation: 'Specialist certification proves actual execution ability: finding hidden traps, redlining accurately, and protecting client interests.' }] }
    ]
  }
};

// ============================================================================
// APP STATE
// ============================================================================

const STATE = {
  currentView: 'landing',
  user: {
    name: 'Sarah Chen, Esq.',
    email: 'sarah.chen@lexispartner.com',
    org: 'Chen & Morrison LLP',
    earnedCertificates: [
      {
        credentialId: 'LXY-FND-2026-000184',
        certId: 'cert-1',
        code: 'LXY-FND',
        title: 'Lawxy Legal AI Fundamentals',
        issuedAt: '2026-01-28T10:00:00Z',
        scorePercentage: 94.2
      }
    ],
    inProgress: {
      'cert-1': { currentModuleId: 'c1-m1', progressPct: 80 },
      'cert-2': { currentModuleId: 'c2-m1', progressPct: 25 },
      'cert-3': { currentModuleId: 'c3-m1', progressPct: 10 }
    }
  },
  currentCertId: 'cert-1',
  currentModuleId: 'c1-m1',
  video: {
    isPlaying: false,
    currentTime: 24,
    duration: 180,
    playbackRate: 1.0,
    interval: null
  },
  moduleQuiz: {
    answers: {},
    isPassed: false
  },
  exam: {
    currentCertId: 'cert-1',
    currentQuestionIndex: 0,
    answers: {},
    timeLeft: 7200,
    timerInterval: null
  }
};

// ============================================================================
// ROUTING
// ============================================================================

function switchView(viewId) {
  STATE.currentView = viewId;
  document.querySelectorAll('.app-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));

  const viewTarget = document.getElementById(`view-${viewId}`);
  if (viewTarget) viewTarget.classList.add('active');

  const navTarget = document.getElementById(`nav-${viewId}`);
  if (navTarget) navTarget.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewId === 'courses') renderCoursesCatalog();
  if (viewId === 'certifications') renderYourCertifications();
  if (viewId === 'admin') initAdminView();
}

function handleGlobalSearch(e) {
  if (e.key === 'Enter') {
    switchView('courses');
  }
}

// ============================================================================
// CERTIFICATION DETAIL & SYLLABUS
// ============================================================================

function openCourse(certId) {
  STATE.currentCertId = certId;
  const cert = CERTIFICATIONS_DATA[certId];
  if (!cert) return;

  switchView('course-detail');

  document.getElementById('cd-badge').innerText = cert.badge;
  document.getElementById('cd-title').innerText = cert.title;
  document.getElementById('cd-desc').innerText = `${cert.tagline} — ${cert.outcome}`;
  document.getElementById('cd-meta').innerText = `${cert.modulesCount} Modules · ${cert.duration} · Passing: ${cert.passingScore}%`;

  const tree = document.getElementById('cd-syllabus-tree');
  tree.innerHTML = cert.modules.map((m, idx) => `
    <div style="border: 1px solid var(--lx-border); border-radius: var(--radius-card); padding: 22px 28px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: transform 150ms;" onclick="openModule('${m.id}')">
      <div style="display: flex; align-items: flex-start; gap: 16px;">
        <span style="width: 32px; height: 32px; border-radius: 6px; background: #111827; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; flex-shrink: 0; margin-top: 2px;">${idx + 1}</span>
        <div>
          <div style="font-weight: 700; font-size: 16px; color: #111827; margin-bottom: 4px;">${m.title}</div>
          <div style="font-size: 13.5px; color: #4b5563; line-height: 1.5; margin-bottom: 6px;">${m.learningObjective}</div>
          <div style="font-size: 12px; color: var(--lx-teal); font-weight: 600;">⚡ SuperDemo: ${m.superDemo.title}</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 14px; flex-shrink: 0;">
        <button class="btn-harvey-primary" style="padding: 8px 16px; font-size: 13px;" onclick="event.stopPropagation(); openModule('${m.id}')">Launch Module 🎬</button>
      </div>
    </div>
  `).join('') + `
    <div style="border: 1.5px dashed var(--lx-primary); border-radius: var(--radius-card); padding: 28px; background: var(--lx-bg-subtle); display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
      <div>
        <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--lx-primary);">Final Milestone</span>
        <h4 style="font-family: var(--font-serif); font-size: 20px; color: #111827; margin: 4px 0;">Official ${cert.title} Examination</h4>
        <p style="font-size: 14px; color: #4b5563;">Demonstrate practical competence in the 120-minute proctored assessment. Passing score: <strong>${cert.passingScore}%</strong>.</p>
      </div>
      <button class="btn-harvey-primary" onclick="startFinalExam('${cert.id}')">Take Certification Exam 🔒</button>
    </div>
  `;
}

function startCurrentCourse() {
  const cert = CERTIFICATIONS_DATA[STATE.currentCertId];
  if (cert && cert.modules[0]) {
    openModule(cert.modules[0].id);
  }
}

// ============================================================================
// MODULE VIEW & 7-PART SUPERDEMO ENGINE
// ============================================================================

function openModule(moduleId) {
  STATE.currentModuleId = moduleId;
  STATE.moduleQuiz.answers = {};
  STATE.moduleQuiz.isPassed = false;

  const cert = CERTIFICATIONS_DATA[STATE.currentCertId] || CERTIFICATIONS_DATA['cert-1'];
  const mod = cert.modules.find(m => m.id === moduleId) || cert.modules[0];

  switchView('lesson');

  document.getElementById('lecture-nav-title').innerText = `${cert.title} — ${mod.title}`;
  document.getElementById('lecture-content-title').innerText = mod.title;
  document.getElementById('sidebar-course-title').innerText = cert.title;

  // Render Sidebar
  document.getElementById('sidebar-lessons-list').innerHTML = cert.modules.map(m => {
    const isActive = m.id === moduleId;
    return `
      <div style="padding: 10px 12px; border-radius: 6px; background: ${isActive ? '#f0f7fa' : 'var(--lx-bg-subtle)'}; border-left: ${isActive ? '3px solid var(--lx-primary)' : '3px solid transparent'}; font-weight: ${isActive ? '700' : '400'}; color: ${isActive ? 'var(--lx-primary)' : '#4b5563'}; cursor: pointer; line-height: 1.4;" onclick="openModule('${m.id}')">
        <div style="font-size: 13.5px;">${m.title}</div>
        <div style="font-size: 11.5px; color: #6b7280; margin-top: 2px;">SuperDemo: ${m.superDemo.title}</div>
      </div>
    `;
  }).join('');

  // Video Player / Canvas Handler
  const videoEl = document.getElementById('lecture-video-player');
  const canvasEl = document.getElementById('video-canvas');
  const customHud = document.getElementById('custom-video-hud');

  // Mapping of module IDs to video filenames
  const VIDEO_MAPPING = {
    'c1-m1': '/videos/Ask Lawxy.mp4',
    'c1-m2': '/videos/Word Add IN.mp4',
    'c1-m3': '/videos/Ask Lawxy.mp4',
    'c1-m4': '/videos/General research agent.mp4',
    'c1-m5': '/videos/Contract Drafting.mp4',
    'c1-m6': '/videos/Intelligent DMS.mp4',
    'c1-m7': '/videos/Research & Assignment Quality.mp4',
    'c1-m9': '/videos/Word Add IN.mp4',
    'c2-m1': '/videos/General research agent.mp4',
    'c2-m2': '/videos/Case Analyser.mp4',
    'c2-m3': '/videos/Moot-court-end-to-end (2).mp4',
    'c2-m4': '/videos/Past Precedence Research .mp4',
    'c2-m5': '/videos/Redling and Review.mp4',
    'c2-m6': '/videos/Dino Room.mp4',
    'c2-m7': '/videos/Contract Drafting (2).mp4',
    'c2-m8': '/videos/Translex.mp4',
    'c2-m9': '/videos/Intelligent DMS.mp4',
    'c2-m10': '/videos/Research & Assignment Quality.mp4',
    'c2-m12': '/videos/Moot-court-end-to-end (2).mp4',
    'c3-m1': '/videos/Intelligent DMS.mp4',
    'c3-m2': '/videos/Intelligent DMS.mp4',
    'c3-m3': '/videos/Redling and Review.mp4',
    'c3-m4': '/videos/Redling and Review.mp4',
    'c3-m5': '/videos/Redling and Review.mp4',
    'c3-m6': '/videos/Contract Drafting.mp4',
    'c3-m7': '/videos/Intelligent DMS.mp4',
    'c3-m8': '/videos/Redling and Review.mp4',
    'c3-m9': '/videos/Word Add IN.mp4',
    'c3-m10': '/videos/Contract Drafting (2).mp4',
    'c3-m11': '/videos/Compare Lens.mp4',
    'c3-m12': '/videos/Dino Room.mp4',
    'c3-m13': '/videos/Dino Room.mp4',
    'c3-m14': '/videos/Word Add IN.mp4'
  };

  const targetVideo = VIDEO_MAPPING[mod.id];

  if (targetVideo && videoEl) {
    // Check if video file exists by testing fetch or loading
    videoEl.src = targetVideo;
    videoEl.style.display = 'block';
    if (canvasEl) canvasEl.style.display = 'none';
    if (customHud) customHud.style.display = 'none';
  } else {
    if (videoEl) {
      videoEl.pause();
      videoEl.style.display = 'none';
    }
    if (canvasEl) canvasEl.style.display = 'block';
    if (customHud) customHud.style.display = 'flex';
    setupSuperDemoCanvas(mod);
  }

  renderSuperDemoNotes(mod);
  renderModuleQuiz(mod);
}

function renderSuperDemoNotes(mod) {
  const sd = mod.superDemo;
  const target = document.getElementById('tab-reading');
  target.innerHTML = `
    <div style="margin-bottom: 24px;">
      <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--lx-teal); letter-spacing: 0.08em; margin-bottom: 4px;">Task-Led SuperDemo Blueprint</div>
      <h2 style="font-family: var(--font-serif); font-size: 26px; color: #111827; margin-bottom: 8px;">${sd.title}</h2>
      <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">${mod.learningObjective}</p>
    </div>

    <!-- 7-Part SuperDemo Structure -->
    <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px;">
      
      <!-- 1. Context -->
      <div style="border: 1px solid var(--lx-border); border-radius: 6px; padding: 18px; background: #ffffff;">
        <div style="font-size: 11.5px; font-weight: 800; color: var(--lx-primary); text-transform: uppercase; margin-bottom: 4px;">1. Real-World Legal Context (30–60s)</div>
        <div style="font-size: 14.5px; color: #111827; line-height: 1.5;">${sd.context}</div>
      </div>

      <!-- 2. Legal Methodology -->
      <div style="border: 1px solid var(--lx-border); border-radius: 6px; padding: 18px; background: #ffffff;">
        <div style="font-size: 11.5px; font-weight: 800; color: var(--lx-primary); text-transform: uppercase; margin-bottom: 4px;">2. Legal Methodology & Analysis</div>
        <div style="font-size: 14.5px; color: #111827; line-height: 1.5;">${sd.methodology}</div>
      </div>

      <!-- 3. SuperDemo Action -->
      <div style="border: 1.5px solid var(--lx-primary); border-radius: 6px; padding: 18px; background: #f0f7fa;">
        <div style="font-size: 11.5px; font-weight: 800; color: var(--lx-primary); text-transform: uppercase; margin-bottom: 4px;">3. SuperDemo Execution in Lawxy</div>
        <div style="font-size: 14.5px; color: #111827; line-height: 1.5;">${sd.action}</div>
      </div>

      <!-- 4. Explain AI Interaction -->
      <div style="border: 1px solid var(--lx-border); border-radius: 6px; padding: 18px; background: #ffffff;">
        <div style="font-size: 11.5px; font-weight: 800; color: var(--lx-primary); text-transform: uppercase; margin-bottom: 4px;">4. Explain the AI Interaction</div>
        <div style="font-size: 14.5px; color: #111827; line-height: 1.5;">${sd.aiExplanation}</div>
      </div>

      <!-- 5. Verification Protocol -->
      <div style="border: 1px solid var(--lx-border); border-radius: 6px; padding: 18px; background: #ffffff;">
        <div style="font-size: 11.5px; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 4px;">5. Verification & Source Audit</div>
        <div style="font-size: 14.5px; color: #111827; line-height: 1.5;">${sd.verify}</div>
      </div>

      <!-- 6. Professional Judgment -->
      <div style="border: 1px solid var(--lx-border); border-radius: 6px; padding: 18px; background: #ffffff;">
        <div style="font-size: 11.5px; font-weight: 800; color: #dc2626; text-transform: uppercase; margin-bottom: 4px;">6. Human Professional Judgment (Mandatory)</div>
        <div style="font-size: 14.5px; color: #111827; line-height: 1.5;">${sd.judgment}</div>
      </div>

      <!-- 7. Repeatable Takeaway -->
      <div style="background: var(--lx-bg-subtle); border-left: 3px solid var(--lx-primary); padding: 16px 20px; border-radius: 4px;">
        <div style="font-size: 11.5px; font-weight: 800; color: var(--lx-primary); text-transform: uppercase; margin-bottom: 4px;">7. Repeatable Practice Takeaway</div>
        <div style="font-size: 14.5px; font-weight: 600; color: #111827;">${sd.takeaway}</div>
      </div>

    </div>
  `;
}

function setupSuperDemoCanvas(mod) {
  const canvas = document.getElementById('video-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 960;
  canvas.height = 540;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fbfbfa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Top Brand Tag
    ctx.fillStyle = '#02212e';
    ctx.font = '700 22px "DM Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Lawxy SuperDemo Masterclass', canvas.width / 2, 120);

    ctx.fillStyle = '#287796';
    ctx.font = '600 15px "DM Sans", sans-serif';
    ctx.fillText(mod.title, canvas.width / 2, 150);

    // Active SuperDemo Card Frame
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e6e6e6';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(120, 200, 720, 200, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#059669';
    ctx.font = '700 11px "DM Sans", sans-serif';
    ctx.fillText('⚡ LIVE TASK DEMONSTRATION', canvas.width / 2, 240);

    ctx.fillStyle = '#111827';
    ctx.font = '700 20px "Libre Caslon Text", serif';
    ctx.fillText(mod.superDemo.title, canvas.width / 2, 280);

    ctx.fillStyle = '#4b5563';
    ctx.font = '400 14px "DM Sans", sans-serif';
    ctx.fillText(`“${mod.superDemo.takeaway}”`, canvas.width / 2, 320);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '500 12px "DM Sans", sans-serif';
    ctx.fillText('Lawxy Enterprise Workspace Active · Zero Data Retention Mode', canvas.width / 2, 360);

    if (STATE.video.isPlaying) {
      // Waveform animation
      ctx.strokeStyle = '#287796';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 120; i < 840; i += 8) {
        const freq = Math.sin((i * 0.04) + (Date.now() * 0.008)) * 14;
        const yPos = 385 + freq;
        if (i === 120) ctx.moveTo(i, yPos);
        else ctx.lineTo(i, yPos);
      }
      ctx.stroke();
      requestAnimationFrame(draw);
    }
  }

  draw();
  window._drawVideoFrame = draw;
}

function toggleVideoPlayback() {
  STATE.video.isPlaying = !STATE.video.isPlaying;
  const playBtn = document.getElementById('btn-play-pause');

  if (STATE.video.isPlaying) {
    if (playBtn) playBtn.innerHTML = '⏸';
    STATE.video.interval = setInterval(() => {
      STATE.video.currentTime += STATE.video.playbackRate;
      if (STATE.video.currentTime >= STATE.video.duration) {
        STATE.video.currentTime = 0;
      }
      updateVideoUI();
    }, 1000);
    if (window._drawVideoFrame) window._drawVideoFrame();
  } else {
    if (playBtn) playBtn.innerHTML = '▶';
    clearInterval(STATE.video.interval);
  }
}

function updateVideoUI() {
  const fill = document.getElementById('video-scrubber-fill');
  const timeDisplay = document.getElementById('video-time-indicator');
  const pct = (STATE.video.currentTime / STATE.video.duration) * 100;
  
  if (fill) fill.style.width = `${pct}%`;
  if (timeDisplay) timeDisplay.innerText = `${formatTime(STATE.video.currentTime)} / ${formatTime(STATE.video.duration)}`;
}

function handleVideoScrub(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const pct = Math.max(0, Math.min(1, clickX / rect.width));
  STATE.video.currentTime = Math.floor(pct * STATE.video.duration);
  updateVideoUI();
  if (window._drawVideoFrame) window._drawVideoFrame();
}

function seekToTime(seconds) {
  STATE.video.currentTime = seconds;
  updateVideoUI();
  if (!STATE.video.isPlaying) toggleVideoPlayback();
}

function toggleSpeed() {
  const rates = [1.0, 1.25, 1.5, 2.0];
  const nextIdx = (rates.indexOf(STATE.video.playbackRate) + 1) % rates.length;
  STATE.video.playbackRate = rates[nextIdx];
  const btn = document.getElementById('btn-speed-toggle');
  if (btn) btn.innerText = `${STATE.video.playbackRate}x`;
}

function switchStudioTab(tabId, btn) {
  document.querySelectorAll('.tab-content-panel').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-nav-btn').forEach(el => el.classList.remove('active'));
  
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');
}

// ============================================================================
// TOUGH END-OF-LECTURE QUESTIONS (MANDATORY CHECKPOINT)
// ============================================================================

function renderModuleQuiz(mod) {
  const container = document.getElementById('lecture-quiz-questions-list');
  const questions = mod.quiz || [];

  if (questions.length === 0) {
    container.innerHTML = `<div style="color: #6b7280; font-size: 14px;">Review complete. Proceed to next module.</div>`;
    return;
  }

  container.innerHTML = questions.map((q, qIdx) => `
    <div class="quiz-question-card" id="lq-card-${qIdx}">
      <div style="font-weight: 700; font-size: 15px; color: #111827; margin-bottom: 12px; line-height: 1.45;">
        ${escapeHtml(q.prompt)}
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${q.options.map((opt, optIdx) => `
          <label style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 16px; border: 1px solid var(--lx-border); border-radius: 6px; cursor: pointer; font-size: 14px; line-height: 1.45; background: #ffffff;">
            <input type="radio" name="lq_choice_${qIdx}" value="${optIdx}" onchange="selectModuleQuizAnswer(${qIdx}, ${optIdx})" style="margin-top: 3px;">
            <span>${escapeHtml(opt)}</span>
          </label>
        `).join('')}
      </div>
      <div id="lq-fb-${qIdx}" style="margin-top: 10px; font-size: 13.5px; display: none;"></div>
    </div>
  `).join('');

  document.getElementById('lecture-quiz-overall-feedback').innerHTML = '';
}

function selectModuleQuizAnswer(qIdx, optIdx) {
  STATE.moduleQuiz.answers[qIdx] = optIdx;
}

function evaluateLectureQuiz() {
  const cert = CERTIFICATIONS_DATA[STATE.currentCertId] || CERTIFICATIONS_DATA['cert-1'];
  const mod = cert.modules.find(m => m.id === STATE.currentModuleId) || cert.modules[0];
  const questions = mod.quiz || [];

  let correctCount = 0;
  questions.forEach((q, idx) => {
    const selected = STATE.moduleQuiz.answers[idx];
    const fb = document.getElementById(`lq-fb-${idx}`);
    fb.style.display = 'block';

    if (selected === q.correctIndex) {
      correctCount++;
      fb.innerHTML = `<div style="color: #059669; padding: 8px 12px; background: #ecfdf5; border-radius: 4px; border: 1px solid #a7f3d0;">✓ <strong>Correct:</strong> ${escapeHtml(q.explanation)}</div>`;
    } else {
      fb.innerHTML = `<div style="color: #dc2626; padding: 8px 12px; background: #fef2f2; border-radius: 4px; border: 1px solid #fecaca;">✕ <strong>Incorrect:</strong> ${escapeHtml(q.explanation)}</div>`;
    }
  });

  const overall = document.getElementById('lecture-quiz-overall-feedback');
  if (correctCount === questions.length) {
    STATE.moduleQuiz.isPassed = true;
    overall.innerHTML = `<span style="color: #059669; font-weight: 700;">✓ Checkpoint Validated (${correctCount}/${questions.length})! Ready for next module.</span>`;
    document.getElementById('btn-next-lecture-top').style.background = 'var(--lx-emerald)';
  } else {
    STATE.moduleQuiz.isPassed = false;
    overall.innerHTML = `<span style="color: #dc2626; font-weight: 700;">Score: ${correctCount}/${questions.length}. Please review incorrect answers to unlock the next module.</span>`;
  }
}

function proceedToNextStep() {
  if (!STATE.moduleQuiz.isPassed) {
    alert('Please complete and pass the end-of-lecture formative questions to validate this checkpoint before moving forward.');
    return;
  }

  const cert = CERTIFICATIONS_DATA[STATE.currentCertId] || CERTIFICATIONS_DATA['cert-1'];
  const currentIdx = cert.modules.findIndex(m => m.id === STATE.currentModuleId);

  if (currentIdx < cert.modules.length - 1) {
    const nextMod = cert.modules[currentIdx + 1];
    openModule(nextMod.id);
  } else {
    startFinalExam(cert.id);
  }
}

// ============================================================================
// FINAL CERTIFICATION EXAM (PASS -> HARVEY CERTIFICATE / FAIL -> RETRY)
// ============================================================================

const EXAM_QUESTION_BANK = {
  'cert-1': [
    { section: 'Section A: Confidentiality & Privilege (ABA Rule 1.6)', prompt: 'An associate submits an unredacted confidential patent disclosure letter into a free online chatbot to format bullet points. Under Model Rule 1.6(c), what is the legal consequence?', options: ['No consequence because the AI is an automated machine.', 'Potential waiver of attorney-client privilege due to third-party vendor data logging and training rights.', 'Immunity from sanctions if a partner signs the filing.', 'The client receives automatic treble damages.'], correctIndex: 1, explanation: 'Entering confidential matter information into tools without zero-data-retention agreements waives confidentiality and privilege.' },
    { section: 'Section B: Citation Forensics & Verification', prompt: 'An AI research output cites a case for an issue, but when checked against the Federal Reporter, the quoted holding does not exist. What type of hallucination occurred?', options: ['Citation Co-Optation / Fabricated Precedent.', 'A court reporter typo.', 'A nunc pro tunc docket change.', 'A non-precedential bench memo.'], correctIndex: 0, explanation: 'Citation Co-Optation occurs when an LLM invents a legal rule and attributes it to a real or fictional case caption.' },
    { section: 'Section C: Ethical Billing & Efficiency (ABA Formal Op. 93-379)', prompt: 'An attorney completes an 8-hour contract review in 45 minutes using Lawxy. How must they bill an hourly client?', options: ['Bill the full 8 historical market hours.', 'Bill the actual 0.75 hours expended, or establish an agreed-upon fixed fee / value pricing model in advance.', 'Add a hidden $3,000 AI surcharge.', 'Bill 4 hours as a compromise.'], correctIndex: 1, explanation: 'Under Model Rule 1.5, hourly attorneys cannot bill unexpended time resulting from technological efficiency without prior client agreement.' }
  ],
  'cert-2': [
    { section: 'Section A: Multi-Document Analysis & Precedence', prompt: 'In a construction dispute with 5 change orders, Exhibit B conflicts with Section 14.1 of the Master Agreement. What controls?', options: ['The Order of Precedence clause explicitly defined in the Master Agreement.', 'The document with the most signatures.', 'The document signed most recently in time regardless of contract terms.', 'The document with the largest dollar value.'], correctIndex: 0, explanation: 'The governing agreement’s Order of Precedence clause strictly dictates the hierarchy of controlling documents.' },
    { section: 'Section B: Cross-Border Translation & Civil Law Nuance', prompt: 'When translating German BGB commercial terms into New York law, why does generic machine translation fail?', options: ['It cannot parse Cyrillic letters.', 'Civil law statutory terms (e.g. Treu und Glauben) carry distinct legal definitions that require specialized common law legal adaptation.', 'European courts prohibit English translations.', 'Translation doubles the contract length.'], correctIndex: 1, explanation: 'Civil law statutory concepts carry deep doctrinal baggage that generic translation distorts.' }
  ],
  'cert-3': [
    { section: 'Section A: Risk Triage & Liability Caps', prompt: 'When auditing a SaaS MSA, the vendor limits liability to fees paid in the last 12 months, but makes customer indemnification for IP breach uncapped. How should you classify this risk?', options: ['Low / Administrative friction.', 'High / Critical Deal-Breaker requiring reciprocal liability caps or equal mutual exclusions.', 'Acceptable without edits.', 'Standard boilerplate.'], correctIndex: 1, explanation: 'Uncapped unilateral exposure paired with a one-sided counterparty limitation creates severe, asymmetrical financial risk.' },
    { section: 'Section B: Stealth Modification Defense', prompt: 'How does an AI Contract Review Specialist detect stealth changes made by opposing counsel without track changes?', options: ['Rely on opposing counsel’s email summary.', 'Run an automated byte-level digital delta comparison between original template and returned draft.', 'Print the document on heavy paper.', 'Ask the counterparty to re-sign.'], correctIndex: 1, explanation: 'Automated digital delta comparison identifies all text modifications, deletions, and punctuation shifts instantly.' }
  ]
};

function startFinalExam(certId) {
  STATE.exam.currentCertId = certId || STATE.currentCertId || 'cert-1';
  STATE.exam.currentQuestionIndex = 0;
  STATE.exam.answers = {};
  STATE.exam.timeLeft = 7200;

  switchView('exam');

  document.getElementById('exam-question-viewport').style.display = 'block';
  document.getElementById('exam-result-viewport').style.display = 'none';

  renderExamQuestion();
  startExamTimer();
}

function startExamTimer() {
  if (STATE.exam.timerInterval) clearInterval(STATE.exam.timerInterval);

  STATE.exam.timerInterval = setInterval(() => {
    STATE.exam.timeLeft--;
    const timerBox = document.getElementById('exam-hud-timer');
    if (timerBox) timerBox.innerText = formatTime(STATE.exam.timeLeft);
    if (STATE.exam.timeLeft <= 0) {
      clearInterval(STATE.exam.timerInterval);
      submitExam();
    }
  }, 1000);
}

function renderExamQuestion() {
  const certId = STATE.exam.currentCertId;
  const questions = EXAM_QUESTION_BANK[certId] || EXAM_QUESTION_BANK['cert-1'];
  const q = questions[STATE.exam.currentQuestionIndex];
  if (!q) return;

  document.getElementById('exam-q-section').innerText = q.section;
  document.getElementById('exam-q-counter').innerText = `Question ${STATE.exam.currentQuestionIndex + 1} of ${questions.length}`;
  document.getElementById('exam-q-prompt').innerText = q.prompt;

  const optionsContainer = document.getElementById('exam-options-container');
  optionsContainer.innerHTML = q.options.map((opt, idx) => {
    const isSelected = STATE.exam.answers[STATE.exam.currentQuestionIndex] === idx;
    return `
      <div class="exam-option-item ${isSelected ? 'selected' : ''}" onclick="selectExamAnswer(${idx})">
        <div style="width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid ${isSelected ? 'var(--lx-primary)' : '#d1d5db'}; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: ${isSelected ? 'var(--lx-primary)' : '#6b7280'}; flex-shrink: 0; background: ${isSelected ? '#f0f7fa' : 'transparent'};">
          ${String.fromCharCode(65 + idx)}
        </div>
        <span style="font-size: 14px; line-height: 1.5; color: #111827;">${opt}</span>
      </div>
    `;
  }).join('');

  const prevBtn = document.getElementById('btn-exam-prev');
  const nextBtn = document.getElementById('btn-exam-next');
  
  if (prevBtn) prevBtn.style.visibility = STATE.exam.currentQuestionIndex === 0 ? 'hidden' : 'visible';
  if (nextBtn) nextBtn.innerText = STATE.exam.currentQuestionIndex === questions.length - 1 ? 'Submit Assessment' : 'Next Question →';
}

function selectExamAnswer(optionIdx) {
  STATE.exam.answers[STATE.exam.currentQuestionIndex] = optionIdx;
  renderExamQuestion();
}

function nextExamQuestion() {
  const certId = STATE.exam.currentCertId;
  const questions = EXAM_QUESTION_BANK[certId] || EXAM_QUESTION_BANK['cert-1'];

  if (STATE.exam.currentQuestionIndex < questions.length - 1) {
    STATE.exam.currentQuestionIndex++;
    renderExamQuestion();
  } else {
    submitExam();
  }
}

function prevExamQuestion() {
  if (STATE.exam.currentQuestionIndex > 0) {
    STATE.exam.currentQuestionIndex--;
    renderExamQuestion();
  }
}

async function submitExam() {
  if (STATE.exam.timerInterval) clearInterval(STATE.exam.timerInterval);

  const certId = STATE.exam.currentCertId;
  const cert = CERTIFICATIONS_DATA[certId] || CERTIFICATIONS_DATA['cert-1'];
  const questions = EXAM_QUESTION_BANK[certId] || EXAM_QUESTION_BANK['cert-1'];

  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (STATE.exam.answers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  const scorePct = Math.round((correctCount / questions.length) * 100);
  const isPassed = scorePct >= cert.passingScore;

  document.getElementById('exam-question-viewport').style.display = 'none';
  const resultViewport = document.getElementById('exam-result-viewport');
  resultViewport.style.display = 'block';

  if (isPassed) {
    const credentialId = `${cert.code}-2026-` + Math.floor(100000 + Math.random() * 900000);
    const newCert = {
      credentialId,
      certId: cert.id,
      code: cert.code,
      title: cert.title,
      issuedAt: new Date().toISOString(),
      scorePercentage: scorePct
    };

    STATE.user.earnedCertificates.push(newCert);

    const certSvgUrl = `/api/certificate/${credentialId}.svg`;
    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    resultViewport.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 32px;">
        <div style="text-align: center;">
          <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #059669; letter-spacing: 0.08em;">Official Credential Earned</span>
          <h1 class="section-heading-serif" style="font-size: 36px; margin: 4px 0 8px;">Congratulations, ${STATE.user.name}!</h1>
          <p style="color: #4b5563; font-size: 15px;">You passed the <strong>${cert.title}</strong> examination with a score of <strong>${scorePct}%</strong>.</p>
        </div>

        <!-- Harvey Styled Certificate Box -->
        <div style="width: 100%; max-width: 860px; background: #ffffff; border: 1px solid var(--lx-border); border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); padding: 12px; overflow: hidden;">
          <div style="width: 100%; aspect-ratio: 10 / 7; position: relative;">
            <iframe src="${certSvgUrl}" style="width: 100%; height: 100%; border: none; border-radius: 4px; pointer-events: none;" title="Lawxy Academy Certificate"></iframe>
          </div>
        </div>

        <!-- Metadata Table -->
        <div style="width: 100%; max-width: 580px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14.5px;">
            <tbody>
              <tr style="border-top: 1px solid var(--lx-border); border-bottom: 1px solid var(--lx-border);">
                <td style="padding: 14px 0; font-weight: 700; color: #111827; width: 40%;">Student</td>
                <td style="padding: 14px 0; color: #374151;">${STATE.user.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--lx-border);">
                <td style="padding: 14px 0; font-weight: 700; color: #111827;">Certificate Link</td>
                <td style="padding: 14px 0;"><a style="color: var(--lx-teal); text-decoration: underline; cursor: pointer;" onclick="copyVerifyUrl('${credentialId}')">Copy verify url</a></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--lx-border);">
                <td style="padding: 14px 0; font-weight: 700; color: #111827;">Completion Date</td>
                <td style="padding: 14px 0; color: #374151;">${formattedDate}</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--lx-border);">
                <td style="padding: 14px 0; font-weight: 700; color: #111827;">Course Completed</td>
                <td style="padding: 14px 0; color: #374151;">${cert.title}</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--lx-border);">
                <td style="padding: 14px 0; font-weight: 700; color: #111827;">Offered By</td>
                <td style="padding: 14px 0; color: #374151;">Lawxy Academy</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Actions -->
        <div style="display: flex; gap: 14px;">
          <a href="${certSvgUrl}" download="Lawxy_Certificate_${credentialId}.svg" target="_blank" class="btn-harvey-primary" style="padding: 12px 28px;">
            📥 Download as PDF
          </a>
          <button class="btn-harvey-secondary" onclick="switchView('certifications')">View Your Certifications →</button>
        </div>
      </div>
    `;
  } else {
    // Fail Screen with Try Again Button
    resultViewport.innerHTML = `
      <div class="exam-result-box">
        <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
        <h2 style="font-family: var(--font-serif); font-size: 28px; color: #111827; margin-bottom: 8px;">Assessment Not Passed</h2>
        <p style="color: #4b5563; font-size: 15px; max-width: 500px; margin: 0 auto 24px;">
          Your final score was <strong>${scorePct}%</strong> (${correctCount}/${questions.length} correct). Passing requires a minimum of <strong>${cert.passingScore}%</strong>.
        </p>

        <div style="background: var(--lx-bg-subtle); border: 1px solid var(--lx-border); border-radius: 6px; padding: 20px; max-width: 560px; margin: 0 auto 32px; text-align: left; font-size: 13.5px;">
          <div style="font-weight: 700; margin-bottom: 8px; color: #111827;">Core Competency Review Required:</div>
          <ul style="padding-left: 18px; color: #4b5563; display: flex; flex-direction: column; gap: 6px;">
            <li>Review SuperDemo task execution and verify legal source methodology.</li>
            <li>Re-evaluate ethical constraints and 4-step authority verification.</li>
          </ul>
        </div>

        <div style="display: flex; justify-content: center; gap: 14px;">
          <button class="btn-harvey-primary" style="padding: 12px 28px;" onclick="startFinalExam('${cert.id}')">
            🔄 Retake Exam (Try Again)
          </button>
          <button class="btn-harvey-secondary" onclick="openCourse('${cert.id}')">Review Modules</button>
        </div>
      </div>
    `;
  }
}

// ============================================================================
// YOUR CERTIFICATIONS VIEW
// ============================================================================

function renderYourCertifications() {
  const earnedContainer = document.getElementById('earned-certificates-container');
  const inProgressContainer = document.getElementById('user-inprogress-courses');

  // Earned Certificates
  if (STATE.user.earnedCertificates.length > 0) {
    earnedContainer.innerHTML = STATE.user.earnedCertificates.map(cert => `
      <div style="border: 1px solid var(--lx-border); border-radius: var(--radius-card); padding: 28px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="width: 48px; height: 48px; border-radius: 8px; background: #111827; color: var(--lx-cyan); font-weight: 800; font-size: 20px; display: flex; align-items: center; justify-content: center;">L</div>
          <div>
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #059669;">Verified Credential</div>
            <h3 style="font-family: var(--font-serif); font-size: 20px; color: #111827; margin: 2px 0;">${cert.title}</h3>
            <div style="font-family: var(--font-mono); font-size: 12.5px; color: #6b7280;">ID: ${cert.credentialId} · Issued: ${new Date(cert.issuedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <a href="/api/certificate/${cert.credentialId}.svg" target="_blank" class="btn-harvey-secondary" style="font-size: 13px;">View Certificate SVG</a>
          <button class="btn-harvey-primary" style="font-size: 13px;" onclick="lookupCredential('${cert.credentialId}')">Inspect Verification</button>
        </div>
      </div>
    `).join('');
  } else {
    earnedContainer.innerHTML = `
      <div style="border: 1px dashed var(--lx-border); border-radius: var(--radius-card); padding: 32px; text-align: center; color: #6b7280; font-size: 14.5px;">
        No earned certificates yet. Complete a course and pass the final exam to earn your official Lawxy credential.
      </div>
    `;
  }

  // In-Progress Certifications
  inProgressContainer.innerHTML = Object.keys(CERTIFICATIONS_DATA).map(cKey => {
    const c = CERTIFICATIONS_DATA[cKey];
    const userProgress = STATE.user.inProgress[cKey] || { progressPct: 0 };
    return `
      <div class="harvey-card" onclick="openCourse('${c.id}')">
        <div class="card-thumbnail-box">
          <div class="card-typography-poster">
            <div style="font-size: 10.5px; font-weight: 700; color: var(--lx-primary); margin-bottom: 4px;">${c.badge}</div>
            <div class="card-typography-title" style="font-size: 18px;">${c.title}</div>
          </div>
          <div class="card-thumb-badge-l">L</div>
        </div>
        <div class="card-info">
          <h3 class="card-title">${c.title}</h3>
          <p class="card-desc">${c.tagline}</p>
          <div style="width: 100%; height: 5px; background: var(--lx-border); border-radius: 999px; overflow: hidden; margin: 8px 0;">
            <div style="width: ${userProgress.progressPct}%; height: 100%; background: var(--lx-primary);"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280;">
            <span>Progress: ${userProgress.progressPct}%</span>
            <span style="font-weight: 700; color: var(--lx-primary);">Resume Track →</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleUserAuth() {
  const name = prompt('Enter candidate name to sign in:', STATE.user.name);
  if (name && name.trim()) {
    STATE.user.name = name.trim();
    document.getElementById('auth-user-name').innerText = STATE.user.name;
    document.getElementById('header-auth-trigger').innerText = STATE.user.name.split(' ')[0];
    renderYourCertifications();
  }
}

// ============================================================================
// COURSES CATALOG VIEW
// ============================================================================

function renderCoursesCatalog() {
  const container = document.getElementById('courses-catalog-container');
  if (!container) return;

  container.innerHTML = Object.keys(CERTIFICATIONS_DATA).map(cKey => {
    const c = CERTIFICATIONS_DATA[cKey];
    return `
      <div class="harvey-card" onclick="openCourse('${c.id}')">
        <div class="card-thumbnail-box">
          <div class="card-typography-poster">
            <div style="font-size: 10.5px; font-weight: 700; color: var(--lx-primary); margin-bottom: 4px;">${c.badge}</div>
            <div class="card-typography-title" style="font-size: 19px;">${c.title}</div>
          </div>
          <div class="card-thumb-badge-l">L</div>
        </div>
        <div class="card-info">
          <h3 class="card-title">${c.title}</h3>
          <div style="font-weight: 700; font-size: 13.5px; color: var(--lx-primary); margin-bottom: 6px;">${c.tagline}</div>
          <p class="card-desc">${c.shortDesc}</p>
          <div class="card-meta">${c.modulesCount} Task-Led Modules · ${c.duration}</div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================================
// VERIFICATION REGISTRY LOOKUP
// ============================================================================

async function lookupCredential(id) {
  if (!id) return;
  switchView('certifications');
  
  const target = document.getElementById('earned-certificates-container');
  target.innerHTML = `<div style="text-align: center; padding: 40px; color: #6b7280;">Querying Lawxy Official Registry for ID <code>${id}</code>...</div>`;

  try {
    const res = await fetch(`/api/verify/${id.trim()}`);
    if (!res.ok) {
      target.innerHTML = `
        <div style="border: 1px solid var(--lx-border); border-radius: var(--radius-card); padding: 36px; text-align: center;">
          <h3 style="font-size: 18px; margin-bottom: 6px;">Credential Record Not Found</h3>
          <p style="color: #6b7280; font-size: 14px;">No certified practitioner matches ID <code>${escapeHtml(id)}</code> in the active registry.</p>
        </div>
      `;
      return;
    }

    const data = await res.json();
    const cred = data.credential;
    const certSvgUrl = `/api/certificate/${cred.credentialId}.svg`;
    const formattedDate = new Date(cred.issuedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    target.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 32px; margin-bottom: 36px;">
        
        <!-- Certificate Canvas Card Box -->
        <div style="width: 100%; max-width: 860px; background: #ffffff; border: 1px solid var(--lx-border); border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); padding: 12px; overflow: hidden;">
          <div style="width: 100%; aspect-ratio: 10 / 7; position: relative;">
            <iframe src="${certSvgUrl}" style="width: 100%; height: 100%; border: none; border-radius: 4px; pointer-events: none;" title="Lawxy Academy Certificate"></iframe>
          </div>
        </div>

        <!-- Verification Detail Key-Value Table -->
        <div style="width: 100%; max-width: 580px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14.5px;">
            <tbody>
              <tr style="border-top: 1px solid var(--lx-border); border-bottom: 1px solid var(--lx-border);">
                <td style="padding: 14px 0; font-weight: 700; color: #111827; width: 40%;">Student</td>
                <td style="padding: 14px 0; color: #374151;">${cred.holderName}</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--lx-border);">
                <td style="padding: 14px 0; font-weight: 700; color: #111827;">Certificate Link</td>
                <td style="padding: 14px 0;"><a style="color: var(--lx-teal); text-decoration: underline; cursor: pointer;" onclick="copyVerifyUrl('${cred.credentialId}')">Copy verify url</a></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--lx-border);">
                <td style="padding: 14px 0; font-weight: 700; color: #111827;">Completion Date</td>
                <td style="padding: 14px 0; color: #374151;">${formattedDate}</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--lx-border);">
                <td style="padding: 14px 0; font-weight: 700; color: #111827;">Course Completed</td>
                <td style="padding: 14px 0; color: #374151;">${cred.title}</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--lx-border);">
                <td style="padding: 14px 0; font-weight: 700; color: #111827;">Offered By</td>
                <td style="padding: 14px 0; color: #374151;">Lawxy Academy</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Download Action Button -->
        <div>
          <a href="${certSvgUrl}" download="Lawxy_Certificate_${cred.credentialId}.svg" target="_blank" class="btn-harvey-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; font-size: 14.5px;">
            <span>📥</span> Download as PDF
          </a>
        </div>

      </div>
    `;
  } catch (err) {
    console.error('Verification query failed:', err);
  }
}

function copyVerifyUrl(credId) {
  const url = `${window.location.origin}/verify/${credId}`;
  navigator.clipboard.writeText(url).then(() => {
    alert(`✓ Certificate verification URL copied to clipboard:\n${url}`);
  }).catch(() => {
    prompt('Copy certificate URL:', url);
  });
}

// ============================================================================
// TOKENIZER & SANDBOX
// ============================================================================

const PRESET_CLAUSES = {
  indemnity: 'The Supplier shall indemnify, defend, and hold harmless the Customer and its directors, officers, employees, and agents from and against all third-party claims, liabilities, and expenses arising out of intellectual property infringement or gross negligence.',
  precedent: 'In Cohen v. Cowles Media Co., 501 U.S. 663 (1991), the Supreme Court held that the First Amendment does not bar a promissory estoppel claim against a publisher who breached a confidentiality promise.'
};

function loadPresetClause(key) {
  const input = document.getElementById('token-input');
  if (input && PRESET_CLAUSES[key]) {
    input.value = PRESET_CLAUSES[key];
    runTokenAnalysis();
  }
}

function runTokenAnalysis() {
  const input = document.getElementById('token-input');
  if (!input) return;
  const text = input.value.trim();
  
  const words = text ? text.split(/\s+/) : [];
  const tokenChips = [];
  const bgColors = ['#e0f2fe', '#f3e8ff', '#fef3c7', '#ecfdf5', '#fee2e2'];

  let tokenCount = 0;
  words.forEach(w => {
    if (w.length > 7) {
      const part1 = w.slice(0, 4);
      const part2 = w.slice(4);
      tokenChips.push(`<span style="display:inline-block; padding:2px 6px; margin:2px; background:${bgColors[tokenCount % 5]}; border-radius:4px; font-family:var(--font-mono); font-size:12px;">${escapeHtml(part1)}</span>`);
      tokenChips.push(`<span style="display:inline-block; padding:2px 6px; margin:2px; background:${bgColors[(tokenCount + 1) % 5]}; border-radius:4px; font-family:var(--font-mono); font-size:12px;">${escapeHtml(part2)}</span>`);
      tokenCount += 2;
    } else {
      tokenChips.push(`<span style="display:inline-block; padding:2px 6px; margin:2px; background:${bgColors[tokenCount % 5]}; border-radius:4px; font-family:var(--font-mono); font-size:12px;">${escapeHtml(w)}</span>`);
      tokenCount += 1;
    }
  });

  const display = document.getElementById('token-chips-display');
  if (display) display.innerHTML = tokenChips.join('') || '<span style="color:#9ca3af;">Enter legal text to inspect tokens...</span>';

  const wordCount = words.length;
  const multiplier = wordCount > 0 ? (tokenCount / wordCount).toFixed(2) : '1.00';

  if (document.getElementById('stat-word-count')) document.getElementById('stat-word-count').innerText = `${wordCount}`;
  if (document.getElementById('stat-token-count')) document.getElementById('stat-token-count').innerText = `${tokenCount}`;
  if (document.getElementById('stat-multiplier')) document.getElementById('stat-multiplier').innerText = `${multiplier}x`;
  if (document.getElementById('stat-risk-level')) document.getElementById('stat-risk-level').innerText = tokenCount > 100 ? 'Moderate (RAG Chunking Required)' : 'Low (Safe for Zero-Shot)';
}

// ============================================================================
// ADMIN TELEMETRY
// ============================================================================

async function initAdminView() {
  try {
    const res = await fetch('/api/admin/overview');
    const data = await res.json();

    const tiles = document.getElementById('admin-kpi-tiles');
    if (tiles) {
      tiles.innerHTML = `
        <div style="border: 1px solid var(--lx-border); border-radius: var(--radius-card); padding: 20px; background: #ffffff;">
          <div style="font-size: 28px; font-weight: 800; color: #111827;">${data.kpis.totalLearners}</div>
          <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Active Candidates</div>
        </div>
        <div style="border: 1px solid var(--lx-border); border-radius: var(--radius-card); padding: 20px; background: #ffffff;">
          <div style="font-size: 28px; font-weight: 800; color: #059669;">${data.kpis.certifiedLawyers}</div>
          <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Earned Credentials</div>
        </div>
        <div style="border: 1px solid var(--lx-border); border-radius: var(--radius-card); padding: 20px; background: #ffffff;">
          <div style="font-size: 28px; font-weight: 800; color: var(--lx-primary);">${data.kpis.passRatePercentage}%</div>
          <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Pass Rate</div>
        </div>
        <div style="border: 1px solid var(--lx-border); border-radius: var(--radius-card); padding: 20px; background: #ffffff;">
          <div style="font-size: 28px; font-weight: 800; color: #d97706;">${data.kpis.pendingEvaluations}</div>
          <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Pending Reviews</div>
        </div>
      `;
    }

    const tbody = document.getElementById('admin-registry-tbody');
    if (tbody) {
      tbody.innerHTML = data.recentCredentials.map(c => `
        <tr style="border-bottom: 1px solid var(--lx-border);">
          <td style="padding: 14px 20px; font-family: var(--font-mono); font-weight: 700; color: var(--lx-primary);">${c.credentialId}</td>
          <td style="padding: 14px 20px; font-weight: 600; color: #111827;">${c.holderName}</td>
          <td style="padding: 14px 20px;">${c.scorePercentage}%</td>
          <td style="padding: 14px 20px;"><span style="color: #059669; font-weight: 700;">${c.status}</span></td>
          <td style="padding: 14px 20px;">
            <button class="sign-in-btn" style="border: 1px solid var(--lx-border); padding: 4px 10px; border-radius: 4px;" onclick="lookupCredential('${c.credentialId}')">Inspect</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load admin telemetry:', err);
  }
}

// ============================================================================
// UTILITIES
// ============================================================================

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  switchView('landing');
});
