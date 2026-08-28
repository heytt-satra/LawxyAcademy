'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/* ---- Mock Exam Data ---- */
const EXAM_CONFIG = {
  title: 'Level 1 Certification Exam',
  subtitle: 'Lawxy Certified AI-Native Lawyer — Foundation',
  totalTime: 7200, // 120 minutes in seconds
  sections: [
    { id: 's1', title: 'Section A: Knowledge', type: 'mcq', questionCount: 5, timeGuide: '30 min' },
    { id: 's2', title: 'Section B: Scenario Analysis', type: 'scenario', questionCount: 2, timeGuide: '30 min' },
    { id: 's3', title: 'Section C: Output Verification', type: 'verification', questionCount: 2, timeGuide: '25 min' },
    { id: 's4', title: 'Section D: Practical', type: 'practical', questionCount: 1, timeGuide: '35 min' },
  ],
};

const MOCK_QUESTIONS = [
  {
    id: 'q1', sectionIndex: 0, type: 'mcq',
    stem: 'A partner at your firm asks you to use an AI tool to summarize a lengthy contract for a client meeting happening in 30 minutes. The contract contains highly confidential merger details. Which of the following is the MOST appropriate first step?',
    options: [
      'Copy the full contract text into ChatGPT for a quick summary',
      'Verify that the AI tool has appropriate data processing agreements and security certifications before uploading any content',
      'Summarize only the non-confidential sections using AI and manually summarize the rest',
      'Decline to use AI since the contract is confidential',
    ],
    correctAnswer: 1,
  },
  {
    id: 'q2', sectionIndex: 0, type: 'mcq',
    stem: 'You receive an AI-generated research memo that cites "Smith v. Johnson, 542 U.S. 234 (2008)" as the leading authority on a constitutional issue. What should be your FIRST verification step?',
    options: [
      'Check whether the case name sounds plausible for the legal area',
      'Ask the AI to confirm the citation is correct',
      'Search for the exact citation in a verified legal database (e.g., Westlaw, LexisNexis, or a government court database)',
      'Check whether 542 U.S. reports exist for the year 2008',
    ],
    correctAnswer: 2,
  },
  {
    id: 'q3', sectionIndex: 0, type: 'mcq',
    stem: 'A client sends you a document and asks you to "run it through AI" to find any issues. The document is a standard commercial lease. Which approach best demonstrates AI-native legal practice?',
    options: [
      'Upload the document to an AI tool and send the output directly to the client',
      'Use AI to identify potential issues, then verify each flagged item against applicable law and your professional judgment before responding',
      'Tell the client that AI cannot be used for legal document review',
      'Use AI to generate a list of issues and include a disclaimer that the output has not been verified',
    ],
    correctAnswer: 1,
  },
  {
    id: 'q4', sectionIndex: 0, type: 'mcq',
    stem: 'An AI language model "hallucinates" most commonly in which of the following scenarios?',
    options: [
      'When summarizing long documents where the full text is provided in the context window',
      'When generating specific citations, case names, statute numbers, or dates without retrieval from a verified database',
      'When performing basic text formatting or document restructuring tasks',
      'When translating legal text between widely-spoken languages',
    ],
    correctAnswer: 1,
  },
  {
    id: 'q5', sectionIndex: 0, type: 'mcq',
    stem: 'Under most professional responsibility frameworks, which of the following statements about AI use in legal practice is MOST accurate?',
    options: [
      'AI tools can autonomously make legal decisions if the output is reviewed by a paralegal',
      'Lawyers who use AI tools remain personally responsible for the accuracy, completeness, and appropriateness of all work product',
      'Using AI to draft legal documents eliminates the need for independent legal research',
      'AI-generated legal opinions can be sent to clients if the AI has been fine-tuned on legal data',
    ],
    correctAnswer: 1,
  },
  {
    id: 'q6', sectionIndex: 1, type: 'scenario',
    stem: 'SCENARIO: You are a junior associate at a mid-sized firm. A senior partner asks you to use AI to prepare a memorandum on whether a force majeure clause in a client\'s supply contract covers disruptions caused by a new trade regulation. The partner says: "Just have the AI write it up — we need it by end of day."\n\nThe contract is governed by New York law. The client is a Fortune 500 company. The memo will be shared with the client\'s board.',
    prompt: 'Describe your complete workflow for this task. Include:\n1. How you would approach the AI-assisted research\n2. What verification steps you would take\n3. How you would handle the time pressure vs. quality trade-off\n4. What professional responsibility considerations apply\n5. What you would communicate to the senior partner about the AI-assisted process',
    maxWords: 800,
  },
  {
    id: 'q7', sectionIndex: 1, type: 'scenario',
    stem: 'SCENARIO: A colleague tells you they have been using a free online AI chatbot to review confidential client contracts. They upload full contract PDFs to the chatbot and ask it to identify risks. They say: "It works great — I\'ve been doing this for months and no one has complained."\n\nYou are both associates at the same firm. The firm has no formal AI usage policy.',
    prompt: 'Analyze this situation. Address:\n1. The specific professional responsibility and data security risks\n2. What you should do as a colleague\n3. What systemic changes the firm should implement\n4. How the colleague\'s approach could be modified to be safe and compliant',
    maxWords: 600,
  },
  {
    id: 'q8', sectionIndex: 2, type: 'verification',
    stem: 'VERIFICATION EXERCISE: Review the following AI-generated legal research output and identify ALL errors, fabrications, unsupported claims, and potential issues.\n\n--- AI OUTPUT ---\n"The doctrine of promissory estoppel in New York is governed by Section 90 of the Restatement (Second) of Contracts. Under New York law, as established in Cohen v. Cowles Media Co., 501 U.S. 663 (1991), a party may enforce a promise without consideration if they reasonably relied on the promise to their detriment.\n\nThe elements required under New York law are: (1) a clear and unambiguous promise, (2) reasonable and foreseeable reliance, (3) unconscionable injury, and (4) the reliance must be of a substantial character. See Cyberchron Corp. v. Calldata Systems Development, Inc., 47 F.3d 39 (2d Cir. 1995).\n\nNew York courts have consistently held that promissory estoppel can substitute for consideration in all types of contracts, including those governed by the Statute of Frauds. The recent case of Digital Health Corp. v. MedTech Solutions, No. 24-cv-1234 (S.D.N.Y. 2025) confirmed this broad application."\n--- END AI OUTPUT ---',
    prompt: 'List each error, fabrication, or unsupported claim you can identify. For each, explain WHY it is problematic and what the correct information or proper verification approach would be.',
    maxWords: 700,
  },
  {
    id: 'q9', sectionIndex: 2, type: 'verification',
    stem: 'VERIFICATION EXERCISE: An AI tool was asked to draft a confidentiality clause for an employment agreement. Review the output below and identify issues with legal accuracy, completeness, enforceability, and drafting quality.\n\n--- AI OUTPUT ---\n"CONFIDENTIALITY: Employee agrees to keep all Company information confidential forever. Employee shall not disclose any information learned during employment to any person or entity, including but not limited to trade secrets, business plans, customer lists, and any other information. Breach of this clause shall result in immediate termination and Employee shall pay liquidated damages of $1,000,000. This clause shall survive termination of employment indefinitely and shall be governed by the laws of all fifty states."\n--- END AI OUTPUT ---',
    prompt: 'Identify all legal, drafting, and enforceability issues with this clause. For each issue, explain the problem and suggest how it should be corrected.',
    maxWords: 600,
  },
  {
    id: 'q10', sectionIndex: 3, type: 'practical',
    stem: 'CAPSTONE PRACTICAL: Design an AI-assisted workflow for conducting initial due diligence review on a target company in a potential acquisition.\n\nContext:\n• Your client is a mid-market private equity firm\n• The target is a SaaS company with 200 employees\n• You have access to a virtual data room with 500+ documents\n• Timeline: preliminary findings needed within 5 business days\n• You have access to AI tools for document review, research, and analysis',
    prompt: 'Design and describe your complete AI-assisted due diligence workflow. Include:\n\n1. Document triage and categorization approach (how AI helps prioritize)\n2. Key risk areas to investigate and how AI assists in each\n3. Verification checkpoints — where human review is mandatory\n4. Quality control measures for AI-generated analysis\n5. Deliverable structure (what the preliminary report includes)\n6. Ethical and confidentiality safeguards throughout the workflow\n7. What AI CANNOT do in this process and where human judgment is essential\n\nBe specific about prompts, tools, verification steps, and handoff points.',
    maxWords: 1200,
  },
];

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export default function ExamPage() {
  const [examState, setExamState] = useState('intro'); // intro | exam | submitted
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_CONFIG.totalTime);
  const [flagged, setFlagged] = useState(new Set());
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (examState === 'exam' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setExamState('submitted');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [examState]);

  const startExam = () => setExamState('exam');

  const selectAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlag = (questionId) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const submitExam = () => {
    clearInterval(timerRef.current);
    setExamState('submitted');
  };

  const question = MOCK_QUESTIONS[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = MOCK_QUESTIONS.length;
  const timeWarning = timeLeft < 600; // <10 min
  const timeCritical = timeLeft < 180; // <3 min

  /* === INTRO SCREEN === */
  if (examState === 'intro') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--lxy-light-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ maxWidth: 700, width: '100%' }}>
          <div className="card" style={{ padding: 40, borderRadius: 16, textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 24, color: '#02212e', margin: '0 auto 24px' }}>L</div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: 8 }}>{EXAM_CONFIG.title}</h1>
            <p style={{ color: 'var(--lxy-text-secondary)', fontSize: '0.9rem', marginBottom: 32 }}>{EXAM_CONFIG.subtitle}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32, textAlign: 'left' }}>
              {EXAM_CONFIG.sections.map((s) => (
                <div key={s.id} style={{ padding: 16, borderRadius: 8, backgroundColor: 'var(--lxy-light-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>{s.questionCount} questions · {s.timeGuide}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: 16, borderRadius: 8, backgroundColor: 'rgba(255,101,45,0.05)', border: '1px solid rgba(255,101,45,0.1)', marginBottom: 24, textAlign: 'left' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--lxy-orange-alert)', marginBottom: 8 }}>Important Rules</div>
              <ul style={{ fontSize: '0.8rem', color: 'var(--lxy-text-secondary)', paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Time limit: <strong>120 minutes</strong>. Timer starts when you click "Begin Exam".</li>
                <li>All answers auto-save. Tab switches are logged.</li>
                <li>You cannot return to this exam once submitted.</li>
                <li>Practical sections require written responses and will be graded manually.</li>
                <li>Passing score: <strong>70% overall</strong> with minimum thresholds per competency area.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <a href="/dashboard" className="btn btn-secondary">← Back to Dashboard</a>
              <button onClick={startExam} className="btn btn-primary btn-lg">Begin Exam</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* === SUBMITTED SCREEN === */
  if (examState === 'submitted') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--lxy-light-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ maxWidth: 600, width: '100%', textAlign: 'center' }}>
          <div className="card" style={{ padding: 48, borderRadius: 16 }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📝</div>
            <h2 style={{ marginBottom: 12 }}>Exam Submitted</h2>
            <p style={{ color: 'var(--lxy-text-secondary)', marginBottom: 24 }}>
              Your answers have been recorded. Questions with written responses will be graded by our evaluation team.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
              <div style={{ padding: 16, backgroundColor: 'var(--lxy-light-bg)', borderRadius: 8 }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--lxy-teal-accent)' }}>{answeredCount}/{totalQuestions}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>Questions Answered</div>
              </div>
              <div style={{ padding: 16, backgroundColor: 'var(--lxy-light-bg)', borderRadius: 8 }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--lxy-teal-accent)' }}>5 days</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>Estimated Grading</div>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--lxy-text-muted)', marginBottom: 24 }}>
              You will receive an email when your results are ready. MCQ sections are auto-graded; written responses undergo manual review.
            </p>
            <a href="/dashboard" className="btn btn-primary">Return to Dashboard</a>
          </div>
        </div>
      </div>
    );
  }

  /* === EXAM INTERFACE === */
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--lxy-light-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Exam Top Bar */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid var(--lxy-border-light)',
        padding: '0 24px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 24, height: 24, borderRadius: 4, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: '#02212e' }}>L</div>
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{EXAM_CONFIG.title}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--lxy-text-muted)' }}>Question {currentQuestion + 1} of {totalQuestions}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Timer */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 8,
            backgroundColor: timeCritical ? 'rgba(255,101,45,0.08)' : timeWarning ? 'rgba(230,192,142,0.1)' : 'var(--lxy-light-bg)',
            border: `1px solid ${timeCritical ? 'rgba(255,101,45,0.2)' : timeWarning ? 'rgba(230,192,142,0.2)' : 'var(--lxy-border-light)'}`,
          }}>
            <span style={{ fontSize: 14 }}>⏱</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem',
              color: timeCritical ? 'var(--lxy-orange-alert)' : timeWarning ? '#c49340' : 'var(--lxy-text-dark)',
            }}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--lxy-text-muted)' }}>
            {answeredCount}/{totalQuestions} answered
          </span>
          <button onClick={submitExam} className="btn btn-primary btn-sm">Submit Exam</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Question Navigator (Left Sidebar) */}
        <div style={{
          width: 260, backgroundColor: '#fff', borderRight: '1px solid var(--lxy-border-light)',
          padding: 20, overflowY: 'auto', flexShrink: 0,
        }} className="hide-mobile">
          {EXAM_CONFIG.sections.map((section, si) => {
            const sectionQuestions = MOCK_QUESTIONS.filter(q => q.sectionIndex === si);
            return (
              <div key={section.id} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lxy-text-muted)', marginBottom: 8 }}>
                  {section.title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {sectionQuestions.map((q, qi) => {
                    const globalIndex = MOCK_QUESTIONS.indexOf(q);
                    const isActive = globalIndex === currentQuestion;
                    const isAnswered = answers[q.id] !== undefined;
                    const isFlagged = flagged.has(q.id);
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestion(globalIndex)}
                        style={{
                          width: 36, height: 36, borderRadius: 8,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.8rem', fontWeight: isActive ? 700 : 500,
                          backgroundColor: isActive ? 'var(--lxy-primary-dark)' : isAnswered ? 'rgba(104,204,88,0.1)' : 'var(--lxy-light-bg)',
                          color: isActive ? '#fff' : isAnswered ? 'var(--lxy-green-success)' : 'var(--lxy-text-secondary)',
                          border: isFlagged ? '2px solid var(--lxy-gold)' : '1px solid var(--lxy-border-light)',
                          cursor: 'pointer',
                          transition: 'all 150ms',
                          position: 'relative',
                        }}
                      >
                        {globalIndex + 1}
                        {isFlagged && <span style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, backgroundColor: 'var(--lxy-gold)', borderRadius: '50%' }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div style={{ borderTop: '1px solid var(--lxy-border-light)', paddingTop: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, backgroundColor: 'rgba(104,204,88,0.1)', border: '1px solid var(--lxy-border-light)' }} />
                Answered
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, backgroundColor: 'var(--lxy-light-bg)', border: '1px solid var(--lxy-border-light)' }} />
                Unanswered
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, backgroundColor: 'transparent', border: '2px solid var(--lxy-gold)' }} />
                Flagged for Review
              </div>
            </div>
          </div>
        </div>

        {/* Question Content Area */}
        <div style={{ flex: 1, padding: '32px 40px', maxWidth: 800, overflowY: 'auto' }}>
          {/* Section Label */}
          <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-teal-accent)', marginBottom: 12 }}>
            {EXAM_CONFIG.sections[question.sectionIndex].title}
          </div>

          {/* Question Number & Flag */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: '1.1rem' }}>Question {currentQuestion + 1}</h2>
            <button
              onClick={() => toggleFlag(question.id)}
              style={{
                fontSize: '0.8rem',
                color: flagged.has(question.id) ? 'var(--lxy-gold)' : 'var(--lxy-text-muted)',
                display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                padding: '6px 12px', borderRadius: 6,
                backgroundColor: flagged.has(question.id) ? 'rgba(230,192,142,0.1)' : 'transparent',
                border: 'none',
              }}
            >
              {flagged.has(question.id) ? '🚩 Flagged' : '⚐ Flag for Review'}
            </button>
          </div>

          {/* Question Stem */}
          <div style={{
            fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--lxy-text-dark)', marginBottom: 24,
            whiteSpace: 'pre-wrap',
          }}>
            {question.stem}
          </div>

          {/* MCQ Options */}
          {question.type === 'mcq' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {question.options.map((option, i) => {
                const isSelected = answers[question.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(question.id, i)}
                    style={{
                      display: 'flex', gap: 14, alignItems: 'flex-start',
                      padding: '16px 20px', borderRadius: 10, textAlign: 'left',
                      backgroundColor: isSelected ? 'rgba(40,119,150,0.06)' : '#fff',
                      border: `2px solid ${isSelected ? 'var(--lxy-teal-accent)' : 'var(--lxy-border-light)'}`,
                      cursor: 'pointer',
                      transition: 'all 150ms',
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--lxy-teal-accent)' : 'var(--lxy-border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      backgroundColor: isSelected ? 'var(--lxy-teal-accent)' : 'transparent',
                      transition: 'all 150ms',
                    }}>
                      {isSelected && <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>}
                      {!isSelected && <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--lxy-text-muted)' }}>{String.fromCharCode(65 + i)}</span>}
                    </div>
                    <span style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--lxy-text-dark)' }}>{option}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Written Response (Scenario, Verification, Practical) */}
          {(question.type === 'scenario' || question.type === 'verification' || question.type === 'practical') && (
            <div>
              <div style={{
                padding: 16, borderRadius: 8, backgroundColor: 'var(--lxy-cyan-bg)',
                border: '1px solid rgba(40,119,150,0.1)', marginBottom: 16,
                fontSize: '0.85rem', color: 'var(--lxy-text-secondary)', lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
              }}>
                {question.prompt}
              </div>
              <textarea
                value={answers[question.id] || ''}
                onChange={(e) => selectAnswer(question.id, e.target.value)}
                placeholder="Type your answer here..."
                style={{
                  width: '100%', minHeight: 300, padding: 20,
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.7,
                  border: '1px solid var(--lxy-border)', borderRadius: 10,
                  resize: 'vertical', outline: 'none',
                  transition: 'border-color 150ms',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--lxy-teal-accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--lxy-border)'}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>
                <span>{(answers[question.id] || '').split(/\s+/).filter(Boolean).length} words</span>
                <span>Max: {question.maxWords} words</span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--lxy-border-light)' }}>
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="btn btn-secondary"
              style={{ opacity: currentQuestion === 0 ? 0.4 : 1 }}
            >
              ← Previous
            </button>
            {currentQuestion < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="btn btn-primary"
              >
                Next →
              </button>
            ) : (
              <button onClick={submitExam} className="btn btn-accent">
                Submit Exam
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
