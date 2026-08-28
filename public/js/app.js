/**
 * Lawxy Academy — Client Application & Course Progression Architecture
 * Exact Harvey Academy UI & Flow (Lecture -> Tough Quiz -> Final Exam -> Certificate / Retry)
 */

// ============================================================================
// STATE STORE
// ============================================================================

const STATE = {
  currentView: 'landing',
  user: {
    name: 'Sarah Chen, Esq.',
    email: 'sarah.chen@lexispartner.com',
    org: 'Chen & Morrison LLP',
    role: 'learner',
    earnedCertificates: [
      {
        credentialId: 'LXY-AINL-2026-000184',
        title: 'Lawxy Certified AI-Native Lawyer (Foundation)',
        courseId: 'level-1',
        issuedAt: '2026-01-28T10:00:00Z',
        scorePercentage: 94.2
      }
    ],
    inProgress: {
      'level-1': { currentLessonId: 'l1-2', completedLessons: ['l1-1'], progressPct: 62 },
      'legal-engineering': { currentLessonId: 'le-1', completedLessons: [], progressPct: 15 },
      'workflow-agents': { currentLessonId: 'wa-1', completedLessons: [], progressPct: 0 }
    }
  },
  currentCourseId: 'level-1',
  currentLessonId: 'l1-2',
  video: {
    isPlaying: false,
    currentTime: 564, // 09:24
    duration: 1500,   // 25:00
    playbackRate: 1.0,
    interval: null
  },
  lectureQuiz: {
    answers: {},
    isPassed: false
  },
  exam: {
    currentCourseId: 'level-1',
    currentQuestionIndex: 0,
    answers: {},
    timeLeft: 7200,
    timerInterval: null
  }
};

// ============================================================================
// COURSES & LECTURES DATASET
// ============================================================================

const COURSES_DATA = {
  'level-1': {
    id: 'level-1',
    title: 'Level 1 Foundations',
    badge: 'Foundational Certification',
    description: 'Build AI literacy before trusting generative AI output in this foundational certification.',
    modulesCount: 12,
    lessonsCount: 55,
    duration: '32 Hours',
    passingScore: 70,
    lessons: [
      { id: 'l1-1', title: '1.1 Generative AI in the Legal Ecosystem', duration: '20m', type: 'reading' },
      { id: 'l1-2', title: '1.2 Tokens, Context Windows, and Memory in Legal Practice', duration: '25m', type: 'video' },
      { id: 'l1-3', title: '1.3 Probabilistic Models in a Deterministic Profession', duration: '35m', type: 'interactive' },
      { id: 'l1-4', title: '1.4 Taxonomy of Legal AI Tools (Generic vs Lawxy JurisMind)', duration: '30m', type: 'reading' },
      { id: 'l1-5', title: '1.5 Citation Auditing & 4-Step Verification Protocol (AVP)', duration: '40m', type: 'reading' }
    ]
  },
  'legal-engineering': {
    id: 'legal-engineering',
    title: 'Legal Engineering Certification',
    badge: 'Specialized Track',
    description: 'Learn the core competencies of a legal engineer in this specialized certification.',
    modulesCount: 6,
    lessonsCount: 28,
    duration: '18 Hours',
    passingScore: 75,
    lessons: [
      { id: 'le-1', title: '1.1 Prompt Injection Defense & Data Sanitization', duration: '30m', type: 'reading' },
      { id: 'le-2', title: '1.2 Building Custom Legal Knowledge Graphs & RAG', duration: '45m', type: 'video' },
      { id: 'le-3', title: '1.3 Automated Due Diligence & M&A Redline Tables', duration: '40m', type: 'interactive' }
    ]
  },
  'workflow-agents': {
    id: 'workflow-agents',
    title: 'Building Workflow Agents',
    badge: 'Advanced Matter',
    description: 'Learn to turn ad hoc prompts into reliable Workflow agents your whole team can run — covering building, grounding, and sharing for consistent results.',
    modulesCount: 4,
    lessonsCount: 16,
    duration: '6 min demo · 12 Hours',
    passingScore: 75,
    lessons: [
      { id: 'wa-1', title: '1.1 AgentFlow Architecture: Multi-Step Reasoning', duration: '25m', type: 'video' },
      { id: 'wa-2', title: '1.2 Enforcing Mandatory Human Review Checkpoints', duration: '30m', type: 'reading' }
    ]
  }
};

// ============================================================================
// TOUGH END-OF-LECTURE QUESTIONS (MANDATORY TO UNLOCK NEXT LECTURE)
// ============================================================================

const LECTURE_QUIZZES = {
  'l1-2': [
    {
      id: 'lq1',
      prompt: '1. Sub-word Tokenization Vulnerability: An associate uploads a 120-page merger agreement to generate an indemnification summary. The target clause is located on page 68. Under standard attention dynamics without RAG indexing, what specific risk occurs?',
      options: [
        'The model will generate an HTTP 404 resource unallocated error code.',
        'The model suffers from "Lost in the Middle" attention degradation and is statistically most likely to omit or distort indemnification exclusions placed in the central 40–60% of the context window.',
        'The clause is automatically validated by the jurisdiction’s commercial court registry.',
        'The sub-word token count compresses the entire document into 1,000 deterministic tokens.'
      ],
      correctIndex: 1,
      explanation: 'Empirical research on transformer attention confirms that information positioned in the middle of long contexts experiences significant retrieval degradation compared to content at the extreme beginning or end.'
    },
    {
      id: 'lq2',
      prompt: '2. Token Multiplier Calculation: Why does specialized Latin legal terminology (e.g., "inter alia", "quantum meruit", "stare decisis") consume context window capacity faster than general standard English?',
      options: [
        'Latin characters require 16-bit unicode serialization while English uses 8-bit ASCII.',
        'Sub-word tokenizers trained primarily on general web text fragment uncommon legal and Latin root words into multiple sub-tokens (e.g., "in-ter", "a-lia"), inflating token count by 35–50%.',
        'Legal language models automatically double the temperature on Latin words.',
        'Court reporters restrict Latin characters from being parsed by commercial APIs.'
      ],
      correctIndex: 1,
      explanation: 'Byte-Pair Encoding (BPE) algorithms split non-standard or foreign language phrases into small sub-word units, drastically increasing token consumption.'
    },
    {
      id: 'lq3',
      prompt: '3. Defensive Negative Constraints: When designing a prompt to audit liability caps, which constraint prevents the LLM from inventing a 30-day cure period if none exists in the contract?',
      options: [
        'Setting the model temperature to 1.0.',
        'Prompting: "If the provided agreement does not explicitly define a cure period, you must explicitly state \'NO CURE PERIOD SPECIFIED\' rather than inferring standard commercial terms."',
        'Asking the model "Are you 100% positive?" after initial completion.',
        'Removing all punctuation from the contractual exhibit.'
      ],
      correctIndex: 1,
      explanation: 'Explicit negative boundary constraints prevent models from defaulting to probabilistic priors when key facts are absent from the context.'
    }
  ]
};

// ============================================================================
// FINAL HIGH-STAKES CERTIFICATION EXAM QUESTIONS
// ============================================================================

const EXAM_QUESTIONS = [
  {
    id: 'eq1',
    section: 'Section A: Confidentiality & Privilege (ABA Model Rule 1.6)',
    prompt: 'An associate pastes unredacted internal correspondence from a corporate client’s chief scientist detailing an unpatented trade secret into a consumer web AI interface to draft deposition outlines. Under ABA Model Rule 1.6(c) and privilege doctrine, what is the primary consequence?',
    options: [
      'No legal risk occurs because generative AI vendors are categorized as common carriers exempt from confidentiality obligations.',
      'The disclosure constitutes a potential waiver of the attorney-client privilege because consumer terms of service typically reserve rights to log and train future models on user prompts.',
      'The associate is fully immune as long as a partner reviews the generated questions before the deposition.',
      'The client cannot be held liable if the associate deleted their local browser history within 24 hours.'
    ],
    correctIndex: 1,
    explanation: 'Submitting confidential matter data to consumer tools without enterprise zero-data-retention agreements waives confidentiality and privilege under Rule 1.6(c).'
  },
  {
    id: 'eq2',
    section: 'Section B: Citation Forensics & Hallucination Defense',
    prompt: 'An AI-generated research memorandum cites "Mata v. Avianca, Inc., 678 F. Supp. 3d 443" for the proposition that maritime statutes of limitations are automatically tolled during bankruptcy. When cross-referenced against Federal Reporters, Mata v. Avianca is a Rule 11 sanctions ruling regarding fabricated citations. What error occurred?',
    options: [
      'A typography transposition in the Federal Supplement reporter numbering.',
      'A Citation Co-Optation hallucination: the model used a real, high-frequency case caption but attributed an entirely fabricated holding to it.',
      'The court clerk entered a nunc pro tunc amendment to the docket.',
      'The judge overruled the holding in a non-precedential bench memorandum.'
    ],
    correctIndex: 1,
    explanation: 'Citation Co-Optation occurs when an LLM pairs a real case name with a fictional legal principle, making human verification against the primary text essential.'
  },
  {
    id: 'eq3',
    section: 'Section C: Ethical Billing & Efficiency Dividends (ABA Op. 93-379)',
    prompt: 'Using Lawxy Contract Review Studio, an attorney completes a complex commercial redline in 45 minutes (0.75 hours) that historically required 8 hours ($4,800). Under ABA Formal Ethics Opinion 93-379, how must the attorney bill an hourly engagement?',
    options: [
      'Bill 8 hours because that reflects the historical market value of the contract review.',
      'Bill the 0.75 hours of actual attorney time expended, or negotiate an agreed-upon fixed fee / value pricing model with the client in advance.',
      'Bill 0.75 hours plus an undisclosed $4,000 "AI Efficiency Surcharge" on the invoice.',
      'Bill 4 hours as a compromise between actual time and historical time.'
    ],
    correctIndex: 1,
    explanation: 'Under Model Rule 1.5 and Formal Op. 93-379, attorneys billing hourly cannot bill for unexpended time resulting from technological efficiencies without prior client agreement.'
  },
  {
    id: 'eq4',
    section: 'Section D: Judicial Standing Orders & Rule 11 Certifications',
    prompt: 'A federal district judge enters a mandatory standing order requiring counsel to certify that all citations in submitted briefs were verified by a human attorney. Which protocol strictly complies?',
    options: [
      'Asking the generative AI model to verify that its own citations exist in official databases.',
      'Having a licensed human attorney retrieve the primary reporter PDF, match quotation text, and confirm good law status via Shepard’s/KeyCite.',
      'Having an administrative assistant perform an automated spell-check on case names.',
      'Attaching a general footnote disclaimer stating that AI was used during initial drafting.'
    ],
    correctIndex: 1,
    explanation: 'Rule 11 requires personal human verification of factual and legal assertions against authoritative primary sources.'
  },
  {
    id: 'eq5',
    section: 'Section E: Legal Workflow Orchestration (Lawxy AgentFlow)',
    prompt: 'When building an automated multi-step AI workflow for high-volume third-party subpoena compliance, where is human-in-the-loop (HITL) mandatory?',
    options: [
      'Only during the initial optical character recognition (OCR) scan.',
      'Prior to producing any documents, communications, or privilege logs to opposing counsel.',
      'Never; modern enterprise legal AI workflows are fully autonomous.',
      'Only if the opposing party files a formal motion to compel.'
    ],
    correctIndex: 1,
    explanation: 'Final production of documents and privilege assertions requires licensed attorney review to prevent inadvertent waiver.'
  }
];

const TRANSCRIPT_DATA = [
  { time: 0, title: 'Introduction to Legal Tokenization', text: 'Welcome to Level 1 Foundations. Today we examine the computational foundations of legal language models: tokenization, attention mechanisms, and context memory.' },
  { time: 180, title: 'Latin Terminology & Sub-word Fragmentation', text: 'In legal practice, terms like "inter alia", "force majeure", and "promissory estoppel" break into multiple sub-word tokens, consuming context faster than standard prose.' },
  { time: 540, title: 'Lost in the Middle Phenomenon', text: 'When uploading a 50-page credit agreement, models suffer from attention degradation. Important covenants placed in the middle 40% of the context window experience higher omission rates.' },
  { time: 900, title: 'Grounding with Retrieval-Augmented Generation (RAG)', text: 'This is why Lawxy breaks documents into structured semantic chunks, querying primary authorities and docket records before producing completions.' },
  { time: 1260, title: 'Defensive Prompting & Negative Constraints', text: 'Always specify boundary conditions: "If the provided contract does not define the cure period, state that it is omitted rather than assuming 30 days."' }
];

// ============================================================================
// ROUTER
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
// COURSE PROGRESSION & DETAIL
// ============================================================================

function openCourse(courseId) {
  STATE.currentCourseId = courseId;
  const course = COURSES_DATA[courseId];
  if (!course) return;

  switchView('course-detail');

  document.getElementById('cd-badge').innerText = course.badge;
  document.getElementById('cd-title').innerText = course.title;
  document.getElementById('cd-desc').innerText = course.description;
  document.getElementById('cd-meta').innerText = `${course.modulesCount} Modules · ${course.lessonsCount} Lessons · ${course.duration}`;

  const tree = document.getElementById('cd-syllabus-tree');
  tree.innerHTML = course.lessons.map((l, idx) => `
    <div style="border: 1px solid var(--lx-border); border-radius: var(--radius-card); padding: 20px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: transform 150ms;" onclick="openLesson('${l.id}')">
      <div style="display: flex; align-items: center; gap: 14px;">
        <span style="width: 28px; height: 28px; border-radius: 50%; background: var(--lx-bg-subtle); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; color: #111827;">${idx + 1}</span>
        <div>
          <div style="font-weight: 700; font-size: 15px; color: #111827;">${l.title}</div>
          <div style="font-size: 13px; color: #6b7280;">Includes Lecture, Interactive Prompt Sandbox, and 3 Tough Formative Questions</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 12.5px; color: #6b7280;">${l.duration}</span>
        <button class="btn-harvey-primary" style="padding: 6px 14px; font-size: 12.5px;" onclick="event.stopPropagation(); openLesson('${l.id}')">Launch Lecture 🎬</button>
      </div>
    </div>
  `).join('') + `
    <div style="border: 1.5px dashed var(--lx-primary); border-radius: var(--radius-card); padding: 24px; background: var(--lx-bg-subtle); display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--lx-primary);">Final Milestone</span>
        <h4 style="font-size: 17px; font-weight: 700; color: #111827; margin: 2px 0;">Final High-Stakes Certification Examination</h4>
        <p style="font-size: 13.5px; color: #4b5563;">Score 70% or higher to earn your official Lawxy Academy Certificate of Completion.</p>
      </div>
      <button class="btn-harvey-primary" onclick="startFinalExam()">Take Final Exam 🔒</button>
    </div>
  `;
}

function startCurrentCourse() {
  const course = COURSES_DATA[STATE.currentCourseId];
  if (course && course.lessons[0]) {
    openLesson(course.lessons[0].id);
  }
}

// ============================================================================
// LECTURE & END-OF-LECTURE TOUGH QUESTIONS
// ============================================================================

function openLesson(lessonId) {
  STATE.currentLessonId = lessonId;
  STATE.lectureQuiz.answers = {};
  STATE.lectureQuiz.isPassed = false;

  switchView('lesson');

  const course = COURSES_DATA[STATE.currentCourseId] || COURSES_DATA['level-1'];
  const lesson = course.lessons.find(l => l.id === lessonId) || course.lessons[0];

  document.getElementById('lecture-nav-title').innerText = `${course.title} — ${lesson.title}`;
  document.getElementById('lecture-content-title').innerText = lesson.title;
  document.getElementById('sidebar-course-title').innerText = course.title;

  // Render Sidebar
  document.getElementById('sidebar-lessons-list').innerHTML = course.lessons.map(l => {
    const isActive = l.id === lessonId;
    return `
      <div style="padding: 8px 10px; border-radius: 4px; background: ${isActive ? '#f0f7fa' : 'var(--lx-bg-subtle)'}; border-left: ${isActive ? '3px solid var(--lx-primary)' : '3px solid transparent'}; font-weight: ${isActive ? '700' : '400'}; color: ${isActive ? 'var(--lx-primary)' : '#4b5563'}; display: flex; justify-content: space-between; cursor: pointer;" onclick="openLesson('${l.id}')">
        <span>${l.title}</span>
        <span style="font-size: 11.5px; color: #9ca3af;">${l.duration}</span>
      </div>
    `;
  }).join('');

  renderTranscript();
  setupVideoCanvas();
  renderTokenLab();
  renderLectureQuiz(lessonId);
}

function renderLectureQuiz(lessonId) {
  const container = document.getElementById('lecture-quiz-questions-list');
  const questions = LECTURE_QUIZZES[lessonId] || LECTURE_QUIZZES['l1-2'];

  container.innerHTML = questions.map((q, qIdx) => `
    <div class="quiz-question-card" id="lq-card-${q.id}">
      <div style="font-weight: 700; font-size: 14.5px; color: #111827; margin-bottom: 12px; line-height: 1.45;">
        ${escapeHtml(q.prompt)}
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${q.options.map((opt, optIdx) => `
          <label style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; border: 1px solid var(--lx-border); border-radius: 6px; cursor: pointer; font-size: 13.5px; line-height: 1.45; background: #ffffff;">
            <input type="radio" name="lq_choice_${q.id}" value="${optIdx}" onchange="selectLectureQuizAnswer('${q.id}', ${optIdx})" style="margin-top: 3px;">
            <span>${escapeHtml(opt)}</span>
          </label>
        `).join('')}
      </div>
      <div id="lq-fb-${q.id}" style="margin-top: 10px; font-size: 13px; display: none;"></div>
    </div>
  `).join('');

  document.getElementById('lecture-quiz-overall-feedback').innerHTML = '';
}

function selectLectureQuizAnswer(qId, optIdx) {
  STATE.lectureQuiz.answers[qId] = optIdx;
}

function evaluateLectureQuiz() {
  const lessonId = STATE.currentLessonId;
  const questions = LECTURE_QUIZZES[lessonId] || LECTURE_QUIZZES['l1-2'];

  let correctCount = 0;
  questions.forEach(q => {
    const selected = STATE.lectureQuiz.answers[q.id];
    const fb = document.getElementById(`lq-fb-${q.id}`);
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
    STATE.lectureQuiz.isPassed = true;
    overall.innerHTML = `<span style="color: #059669; font-weight: 700;">✓ Checkpoint Passed (${correctCount}/${questions.length})! Ready for next step.</span>`;
    document.getElementById('btn-next-lecture-top').style.background = 'var(--lx-emerald)';
  } else {
    STATE.lectureQuiz.isPassed = false;
    overall.innerHTML = `<span style="color: #dc2626; font-weight: 700;">Score: ${correctCount}/${questions.length}. Please review incorrect answers to proceed.</span>`;
  }
}

function proceedToNextStep() {
  if (!STATE.lectureQuiz.isPassed) {
    alert('Please complete and pass the 3 End-of-Lecture questions to unlock the next lecture or final exam.');
    return;
  }

  const course = COURSES_DATA[STATE.currentCourseId] || COURSES_DATA['level-1'];
  const currentIdx = course.lessons.findIndex(l => l.id === STATE.currentLessonId);

  if (currentIdx < course.lessons.length - 1) {
    const nextLesson = course.lessons[currentIdx + 1];
    openLesson(nextLesson.id);
  } else {
    startFinalExam();
  }
}

// ============================================================================
// FINAL HIGH-STAKES CERTIFICATION EXAM (PASS -> CERTIFICATE / FAIL -> RETRY)
// ============================================================================

function startFinalExam() {
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
  const q = EXAM_QUESTIONS[STATE.exam.currentQuestionIndex];
  if (!q) return;

  document.getElementById('exam-q-section').innerText = q.section;
  document.getElementById('exam-q-counter').innerText = `Question ${STATE.exam.currentQuestionIndex + 1} of ${EXAM_QUESTIONS.length}`;
  document.getElementById('exam-q-prompt').innerText = q.prompt;

  const optionsContainer = document.getElementById('exam-options-container');
  optionsContainer.innerHTML = q.options.map((opt, idx) => {
    const isSelected = STATE.exam.answers[q.id] === idx;
    return `
      <div class="exam-option-item ${isSelected ? 'selected' : ''}" onclick="selectExamAnswer('${q.id}', ${idx})">
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
  if (nextBtn) nextBtn.innerText = STATE.exam.currentQuestionIndex === EXAM_QUESTIONS.length - 1 ? 'Submit Assessment' : 'Next Question →';
}

function selectExamAnswer(qId, optionIdx) {
  STATE.exam.answers[qId] = optionIdx;
  renderExamQuestion();
}

function nextExamQuestion() {
  if (STATE.exam.currentQuestionIndex < EXAM_QUESTIONS.length - 1) {
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

  let correctCount = 0;
  EXAM_QUESTIONS.forEach(q => {
    if (STATE.exam.answers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });

  const scorePct = Math.round((correctCount / EXAM_QUESTIONS.length) * 100);
  const isPassed = scorePct >= 70;

  document.getElementById('exam-question-viewport').style.display = 'none';
  const resultViewport = document.getElementById('exam-result-viewport');
  resultViewport.style.display = 'block';

  if (isPassed) {
    // Generate Credential
    const credentialId = 'LXY-AINL-2026-' + Math.floor(100000 + Math.random() * 900000);
    const newCert = {
      credentialId,
      title: COURSES_DATA[STATE.currentCourseId]?.title || 'Lawxy Certified AI-Native Lawyer',
      courseId: STATE.currentCourseId,
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
          <p style="color: #4b5563; font-size: 15px;">You passed the final certification examination with a score of <strong>${scorePct}%</strong>.</p>
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
                <td style="padding: 14px 0; color: #374151;">${COURSES_DATA[STATE.currentCourseId]?.title || 'Lawxy Certified AI-Native Lawyer'}</td>
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
          Your final score was <strong>${scorePct}%</strong> (${correctCount}/${EXAM_QUESTIONS.length} correct). Passing requires a minimum of <strong>70%</strong>.
        </p>

        <div style="background: var(--lx-bg-subtle); border: 1px solid var(--lx-border); border-radius: 6px; padding: 20px; max-width: 560px; margin: 0 auto 32px; text-align: left; font-size: 13.5px;">
          <div style="font-weight: 700; margin-bottom: 8px; color: #111827;">Key Areas to Review:</div>
          <ul style="padding-left: 18px; color: #4b5563; display: flex; flex-direction: column; gap: 6px;">
            <li>ABA Model Rule 1.6(c) Confidentiality & Privilege Waiver in Cloud LLMs</li>
            <li>Citation Co-Optation & 4-Step Authority Verification Protocol (AVP)</li>
            <li>Ethical Billing & Efficiency Dividends under ABA Formal Op. 93-379</li>
          </ul>
        </div>

        <div style="display: flex; justify-content: center; gap: 14px;">
          <button class="btn-harvey-primary" style="padding: 12px 28px;" onclick="startFinalExam()">
            🔄 Retake Exam (Try Again)
          </button>
          <button class="btn-harvey-secondary" onclick="openCourse('${STATE.currentCourseId}')">Review Lectures</button>
        </div>
      </div>
    `;
  }
}

// ============================================================================
// YOUR CERTIFICATIONS VIEW (LOGIN & CREDENTIALS PORTAL)
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

  // In-Progress Courses
  inProgressContainer.innerHTML = Object.keys(COURSES_DATA).map(cKey => {
    const c = COURSES_DATA[cKey];
    const userProgress = STATE.user.inProgress[cKey] || { progressPct: 0 };
    return `
      <div class="harvey-card" onclick="openCourse('${c.id}')">
        <div class="card-thumbnail-box">
          <div class="card-typography-poster">
            <div style="font-size: 10.5px; font-weight: 700; color: var(--lx-primary); margin-bottom: 4px;">In Progress</div>
            <div class="card-typography-title" style="font-size: 18px;">${c.title}</div>
          </div>
          <div class="card-thumb-badge-l">L</div>
        </div>
        <div class="card-info">
          <h3 class="card-title">${c.title}</h3>
          <div style="width: 100%; height: 5px; background: var(--lx-border); border-radius: 999px; overflow: hidden; margin: 8px 0;">
            <div style="width: ${userProgress.progressPct}%; height: 100%; background: var(--lx-primary);"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280;">
            <span>Progress: ${userProgress.progressPct}%</span>
            <span style="font-weight: 700; color: var(--lx-primary);">Continue →</span>
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

  container.innerHTML = Object.keys(COURSES_DATA).map(cKey => {
    const c = COURSES_DATA[cKey];
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
          <p class="card-desc">${c.description}</p>
          <div class="card-meta">${c.modulesCount} Modules · ${c.lessonsCount} Lessons · ${c.duration}</div>
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
// CANVAS VIDEO MASTERCLASS ENGINE & TOKENIZER
// ============================================================================

function setupVideoCanvas() {
  const canvas = document.getElementById('video-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 960;
  canvas.height = 540;

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fbfbfa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    if (STATE.video.isPlaying) {
      ctx.strokeStyle = '#02212e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 6) {
        const freq = Math.sin((i * 0.03) + (Date.now() * 0.006)) * 20;
        const yPos = (canvas.height / 2) + freq;
        if (i === 0) ctx.moveTo(i, yPos);
        else ctx.lineTo(i, yPos);
      }
      ctx.stroke();
    }

    ctx.fillStyle = '#111827';
    ctx.font = '700 24px "DM Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Lawxy Academy Masterclass', canvas.width / 2, 140);

    ctx.fillStyle = '#287796';
    ctx.font = '500 16px "DM Sans", sans-serif';
    ctx.fillText('Lesson 1.2: Context Windows & Sub-word Tokenization', canvas.width / 2, 175);

    const currentSegment = TRANSCRIPT_DATA.slice().reverse().find(t => STATE.video.currentTime >= t.time) || TRANSCRIPT_DATA[0];
    
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e6e6e6';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(140, 240, 680, 140, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#6b7280';
    ctx.font = '700 11px "DM Sans", sans-serif';
    ctx.fillText('ACTIVE TOPIC FOCUS', canvas.width / 2, 275);

    ctx.fillStyle = '#111827';
    ctx.font = '600 18px "Libre Caslon Text", serif';
    ctx.fillText(currentSegment.title, canvas.width / 2, 310);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '500 13px "DM Sans", sans-serif';
    ctx.fillText(`Timestamp: ${formatTime(STATE.video.currentTime)} · Faculty Instruction`, canvas.width / 2, 345);

    if (STATE.video.isPlaying) {
      requestAnimationFrame(drawFrame);
    }
  }

  drawFrame();
  window._drawVideoFrame = drawFrame;
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

  const activeIdx = TRANSCRIPT_DATA.findIndex((item, idx) => {
    const nextItem = TRANSCRIPT_DATA[idx + 1];
    return STATE.video.currentTime >= item.time && (!nextItem || STATE.video.currentTime < nextItem.time);
  });

  document.querySelectorAll('.transcript-line-item').forEach((el, idx) => {
    if (idx === activeIdx) {
      el.style.background = '#f0f7fa';
      el.style.borderLeft = '3px solid var(--lx-primary)';
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      el.style.background = 'transparent';
      el.style.borderLeft = '3px solid transparent';
    }
  });
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

function renderTranscript() {
  const container = document.getElementById('transcript-container');
  if (!container) return;

  container.innerHTML = TRANSCRIPT_DATA.map(item => `
    <div class="transcript-line-item" style="padding: 10px 14px; border-radius: 4px; cursor: pointer; transition: background 150ms; display: flex; gap: 12px;" onclick="seekToTime(${item.time})">
      <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: var(--lx-teal); min-width: 44px;">${formatTime(item.time)}</span>
      <div>
        <div style="font-weight: 700; font-size: 13.5px; color: #111827; margin-bottom: 2px;">${item.title}</div>
        <div style="font-size: 13.5px; color: #4b5563; line-height: 1.5;">${item.text}</div>
      </div>
    </div>
  `).join('');
}

function switchStudioTab(tabId, btn) {
  document.querySelectorAll('.tab-content-panel').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-nav-btn').forEach(el => el.classList.remove('active'));
  
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');
}

// ============================================================================
// TOKENIZER
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

function renderTokenLab() {
  runTokenAnalysis();
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
