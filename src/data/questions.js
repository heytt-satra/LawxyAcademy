export const QUESTION_BANK = [
  // ==========================================================
  // TYPE A: SCENARIO-BASED MCQs (Auto-graded with reasoning)
  // ==========================================================
  {
    id: 'Q-MCQ-001',
    code: 'L1-CONFID-MCQ-1',
    competencyCode: 'L1-CONFID',
    questionType: 'mcq',
    difficulty: 'medium',
    title: 'Client Privilege and Free Consumer AI Web Interfaces',
    isCritical: true,
    stem: `An associate is preparing for an urgent patent litigation hearing. Under severe time pressure, the associate pastes an unredacted draft patent claim and confidential correspondence from the client's chief scientist into a free, publicly accessible AI chatbot to generate cross-examination questions. 

Under the ABA Model Rules of Professional Conduct and standard evidentiary principles regarding attorney-client privilege, what is the primary legal consequence of this action?`,
    options: [
      {
        text: 'A. No risk occurs because generative AI companies are legally categorized as common communications carriers exempt from confidentiality disclosures.',
        explanation: 'Incorrect. AI providers are commercial third parties governed by terms of service, not common carriers.'
      },
      {
        text: 'B. The disclosure may constitute a waiver of the attorney-client privilege and violates Model Rule 1.6(c) (failing to make reasonable efforts to prevent inadvertent disclosure), because consumer terms typically grant the vendor rights to retain and train on user prompts.',
        explanation: 'Correct. Commercial consumer AI services routinely log prompts and use them for model training, destroying confidentiality expectations necessary for privilege.'
      },
      {
        text: 'C. The associate is immune from sanctions as long as the AI-generated questions are reviewed by a senior partner before trial.',
        explanation: 'Incorrect. The breach of confidentiality occurred immediately upon transmission to the third-party server.'
      },
      {
        text: 'D. It is permissible provided the associate deletes the chat history from their local browser cache within 24 hours.',
        explanation: 'Incorrect. Browser history deletion has no effect on server-side logs and training pipelines.'
      }
    ],
    correctAnswerIndex: 1,
    weight: 5
  },
  {
    id: 'Q-MCQ-002',
    code: 'L1-VERIFY-MCQ-1',
    competencyCode: 'L1-VERIFY',
    questionType: 'mcq',
    difficulty: 'hard',
    title: 'Recognizing Subtly Hallucinated Case Holdings',
    isCritical: true,
    stem: `You prompt a legal AI tool to find Second Circuit precedent regarding whether a cryptocurrency token qualifies as an investment contract under the Howey test. The tool returns a citation: "SEC v. Nexus Digital Corp., 894 F.3d 112 (2d Cir. 2018), holding that algorithmic token issuance without managerial promises categorically avoids Howey scrutiny."

When you verify the citation in an official reporter:
1. Volume 894 F.3d at page 112 exists.
2. The case is actually titled "United States v. O'Brien", which is a criminal sentencing appeal unrelated to securities.

What specific phenomenon occurred, and what should be your immediate procedural response?`,
    options: [
      {
        text: 'A. This is a "Citation Co-Optation" hallucination where the model paired a real volume/page coordinate with a synthesized case name and fictional holding; the authority must be discarded and reported as invalid.',
        explanation: 'Correct. LLMs frequently generate plausible-sounding reporter citations that map to unrelated published decisions.'
      },
      {
        text: 'B. The reporter is out of date; file an emergency motion for judicial notice of the Nexus Digital ruling.',
        explanation: 'Incorrect. Doing so would violate Rule 11 and risk immediate judicial sanctions.'
      },
      {
        text: 'C. Re-prompt the AI asking "Are you sure?" and accept the citation if the AI re-confirms it.',
        explanation: 'Incorrect. Re-prompting without independent external retrieval often causes recursive hallucination.'
      },
      {
        text: 'D. Cite the case using "sub nom." notation to indicate that the court reporter used an alias.',
        explanation: 'Incorrect. Fabricating procedural designations is unethical and sanctionable.'
      }
    ],
    correctAnswerIndex: 0,
    weight: 5
  },
  {
    id: 'Q-MCQ-003',
    code: 'L1-ETHICS-MCQ-1',
    competencyCode: 'L1-ETHICS',
    questionType: 'mcq',
    difficulty: 'medium',
    title: 'Ethical Billing for AI Efficiency Gains',
    isCritical: false,
    stem: `A law firm bills a corporate client on an hourly basis at $600/hour. Historically, drafting a custom Commercial Licensing Agreement required 8 hours of associate time ($4,800). Using an enterprise legal AI workflow (Lawxy Contract Studio), the associate drafts, customizes, and verifies the entire agreement in 45 minutes (0.75 hours).

Under ABA Formal Opinion 93-379 and Model Rule 1.5 (Fees), how should the firm ethically bill the client for this work?`,
    options: [
      {
        text: 'A. Bill the client for the traditional 8 hours ($4,800) because that represents the true economic market value of the contract.',
        explanation: 'Incorrect. Under ABA Formal Op. 93-379, an attorney billing on an hourly basis may only bill for hours actually expended.'
      },
      {
        text: 'B. Bill 0.75 hours of attorney time ($450) plus an unannounced $4,000 "AI Technology Fee".',
        explanation: 'Incorrect. Surcharges for technological overhead cannot be billed at profit unless agreed in advance in the engagement letter.'
      },
      {
        text: 'C. Bill 0.75 hours ($450) for the actual time expended, or agree in advance with the client on a fixed-fee / value-based pricing structure in the engagement agreement.',
        explanation: 'Correct. Hourly billing strictly requires reporting actual time; firms seeking value dividends must shift to alternative fee arrangements.'
      },
      {
        text: 'D. Bill 4 hours as a compromise between actual time and historical time.',
        explanation: 'Incorrect. Fabricating intermediate billing records is unethical under Rule 8.4(c).'
      }
    ],
    correctAnswerIndex: 2,
    weight: 5
  },

  // ==========================================================
  // TYPE C: AI OUTPUT VERIFICATION EXERCISES (Hybrid Graded)
  // ==========================================================
  {
    id: 'Q-VERIFY-001',
    code: 'L1-VERIFY-EX-1',
    competencyCode: 'L1-VERIFY',
    questionType: 'output_verification',
    difficulty: 'hard',
    title: 'Audit AI-Generated Motion to Dismiss Legal Memorandum',
    isCritical: true,
    instructions: 'Review the following AI-generated section of a brief seeking dismissal of a breach of fiduciary duty claim under Delaware Chancery practice. Identify and categorize the 4 material errors, hallucinations, or misrepresentations.',
    contextDocument: `DELAWARE CHANCERY COURT BRIEF EXCERPT (AI GENERATED):
"Under Delaware General Corporation Law (DGCL) § 102(b)(7), corporate directors and senior executive officers have always enjoyed identical exculpation protections against direct claims for breach of the duty of care since the statute's enactment in 1986. See Smith v. Van Gorkom, 488 A.2d 858 (Del. 1985).

Furthermore, in In re Caremark International Inc. Derivative Litigation, 698 A.2d 959 (Del. Ch. 1996), Chancellor Allen held that directors face strict liability whenever corporate employees violate federal regulations, regardless of whether a reporting system was established. 

Most recently, in Tornetta v. Musk, 310 A.3d 430 (Del. Ch. 2024), the court held that the business judgment rule unconditionally applies to controlling stockholder compensation plans without requiring MFW framework compliance."`,
    rubric: {
      maxPoints: 20,
      scoringCriteria: [
        {
          key: 'dgcl-officers',
          description: 'Identified that § 102(b)(7) was only amended in August 2022 to permit officer exculpation, and officers are NOT protected for direct stockholder/company claims (only certain derivative/third-party claims, distinct from directors).',
          points: 5
        },
        {
          key: 'caremark-holding',
          description: 'Identified that Caremark explicitly rejects strict liability; it established one of the highest pleading burdens in Delaware law (bad faith failure of oversight).',
          points: 5
        },
        {
          key: 'van-gorkom-date',
          description: 'Noted that Van Gorkom was decided prior to the enactment of § 102(b)(7) (in fact, Van Gorkom spurred the 1986 legislative adoption of director exculpation).',
          points: 5
        },
        {
          key: 'tornetta-mfw',
          description: 'Identified that Tornetta held the exact opposite: entire fairness applied because the defendant was a conflicted controller and did not employ cleansing dual-MFW protections.',
          points: 5
        }
      ]
    }
  },

  // ==========================================================
  // TYPE E: CONTRACT ANALYSIS & RISK AUDIT (Evaluator Graded)
  // ==========================================================
  {
    id: 'Q-CONTRACT-001',
    code: 'L1-CONTRACT-EX-1',
    competencyCode: 'L1-CONTRACT',
    questionType: 'contract_analysis',
    difficulty: 'hard',
    title: 'Enterprise AI Vendor Agreement Playbook Audit',
    isCritical: false,
    instructions: 'You are reviewing a cloud AI service agreement on behalf of a financial services client. The vendor provided the clause below. Evaluate the provision against enterprise risk standards, identify 3 critical exposures, and provide a revised redline.',
    contextDocument: `PROPOSED VENDOR CLAUSE:
"Section 8.2 (Data Usage & Model Improvements). Customer hereby grants Vendor a perpetual, irrevocable, royalty-free, worldwide license to utilize all Customer Data, input prompts, output completions, and metadata submitted through the Service to train, fine-tune, enhance, and commercialize Vendor's machine learning models and related service offerings. Vendor shall implement reasonable commercial efforts to remove identifiable person names from public model outputs."`,
    rubric: {
      maxPoints: 25,
      scoringCriteria: [
        {
          key: 'zero-retention',
          description: 'Flagged lack of Zero Data Retention (ZDR) and customer data being utilized for model training.',
          points: 8
        },
        {
          key: 'confidentiality-conflict',
          description: 'Identified breach of non-disclosure obligations and regulatory data sharing violations (GLBA/GDPR).',
          points: 8
        },
        {
          key: 'precise-redline',
          description: 'Provided precise redline establishing that Customer retains exclusive IP ownership with strict prohibition on vendor training.',
          points: 9
        }
      ]
    }
  },

  // ==========================================================
  // TYPE G: WORKFLOW DESIGN & HITL GOVERNANCE (Evaluator Graded)
  // ==========================================================
  {
    id: 'Q-WORKFLOW-001',
    code: 'L1-WORKFLOW-EX-1',
    competencyCode: 'L1-WORKFLOW',
    questionType: 'workflow_design',
    difficulty: 'expert',
    title: 'Architecting an Automated High-Volume Subpoena Response Workflow',
    isCritical: true,
    instructions: 'Design an end-to-end AI-assisted subpoena response pipeline for an enterprise litigation department receiving 50 third-party subpoenas per month. Specify the AI tool tasks, automated data sanitization, document clustering, privilege log generation, and mandatory Human-In-The-Loop (HITL) checkpoints.',
    rubric: {
      maxPoints: 30,
      scoringCriteria: [
        {
          key: 'triage-intake',
          description: 'Clear ingestion step with automated deadline extraction and jurisdictional validity checking.',
          points: 6
        },
        {
          key: 'pii-privilege',
          description: 'Automated privilege filter with human review escalation for attorney-client communications.',
          points: 8
        },
        {
          key: 'hitl-gates',
          description: 'Mandatory attorney sign-off before document production and protective order filings.',
          points: 8
        },
        {
          key: 'audit-trail',
          description: 'Comprehensive logging mechanism tracking model versions, prompts, and reviewer decisions.',
          points: 8
        }
      ]
    }
  }
];
