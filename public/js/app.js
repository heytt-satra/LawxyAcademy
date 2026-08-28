/**
 * Lawxy Academy — Client Application
 * Modeled after Harvey Academy with Lawxy brand colors
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
    progress: 62,
    completedLessons: 34,
    totalLessons: 55,
    completedModules: 7,
    totalModules: 12
  },
  video: {
    isPlaying: false,
    currentTime: 564, // 09:24
    duration: 1500,   // 25:00
    playbackRate: 1.0,
    volume: 1.0,
    interval: null
  },
  exam: {
    attemptId: null,
    currentQuestionIndex: 0,
    answers: {},
    flagged: new Set(),
    timeLeft: 7200, // 120 mins in seconds
    tabViolations: 0,
    timerInterval: null
  }
};

// ============================================================================
// TRANSCRIPT & CURRICULUM DATA
// ============================================================================

const TRANSCRIPT_DATA = [
  { time: 0, title: 'Introduction to Legal Tokenization', text: 'Welcome to Level 1 Foundations. Today we examine the computational foundations of legal language models: tokenization, attention mechanisms, and context memory.' },
  { time: 180, title: 'Latin Terminology & Sub-word Fragmentation', text: 'In legal practice, terms like "inter alia", "force majeure", and "promissory estoppel" break into multiple sub-word tokens, consuming context faster than standard prose.' },
  { time: 540, title: 'Lost in the Middle Phenomenon', text: 'When uploading a 50-page credit agreement, models suffer from attention degradation. Important covenants placed in the middle 40% of the context window experience higher omission rates.' },
  { time: 900, title: 'Grounding with Retrieval-Augmented Generation (RAG)', text: 'This is why Lawxy breaks documents into structured semantic chunks, querying primary authorities and docket records before producing completions.' },
  { time: 1260, title: 'Defensive Prompting & Negative Constraints', text: 'Always specify boundary conditions: "If the provided contract does not define the cure period, state that it is omitted rather than assuming 30 days."' }
];

const EXAM_QUESTIONS = [
  {
    id: 'q1',
    section: 'Section A: Confidentiality & Privilege (ABA Model Rule 1.6)',
    isCritical: true,
    prompt: 'An associate pastes an unredacted confidential patent claim and internal correspondence from a client’s chief scientist into a publicly accessible, consumer AI web interface to generate deposition questions. Under ABA Model Rule 1.6(c) and attorney-client privilege doctrine, what is the primary legal consequence?',
    options: [
      'No legal risk occurs because generative AI vendors are categorized as common communications carriers exempt from disclosure.',
      'The transmission constitutes a potential waiver of the attorney-client privilege, because public consumer terms of service typically grant the vendor rights to log and train future models on user prompts.',
      'The associate is fully immune from judicial sanctions as long as a partner reviews the generated deposition questions before trial.',
      'It is permissible provided the associate clears their browser cache within 24 hours of prompt submission.'
    ],
    correctIndex: 1
  },
  {
    id: 'q2',
    section: 'Section B: Hallucination Detection & Citation Auditing',
    isCritical: true,
    prompt: 'An AI-generated research memo cites "Smith v. Johnson, 542 U.S. 234 (2008)" as holding that smart contracts categorically waive forum selection clauses. When verified against official Supreme Court reporters, Volume 542 at page 234 is an unrelated criminal sentencing appeal. What occurred, and what is the proper protocol?',
    options: [
      'The court reporter published an alias; cite the authority using "sub nom." notation.',
      'A Citation Co-Optation hallucination occurred; the authority is fabricated and must be discarded from the filing.',
      'Re-prompt the model asking "Are you sure?" and accept the citation if the AI re-confirms.',
      'File an emergency motion for judicial notice of the smart contract ruling.'
    ],
    correctIndex: 1
  },
  {
    id: 'q3',
    section: 'Section C: Ethical Billing & AI Efficiency (ABA Formal Op. 93-379)',
    isCritical: false,
    prompt: 'Using Lawxy Contract Review Studio, an associate completes a complex commercial contract redline in 45 minutes (0.75 hours) that historically required 8 hours ($4,800 at standard billable rates). How should the firm ethically bill an hourly client?',
    options: [
      'Bill 8 hours because that reflects the traditional economic market value of the contract.',
      'Bill 0.75 hours of actual attorney time expended, or agree in advance with the client on a fixed-fee / value-based pricing structure.',
      'Bill 0.75 hours plus an undisclosed $4,000 "AI Efficiency Surcharge" on the invoice.',
      'Bill 4 hours as a compromise between actual time and historical time.'
    ],
    correctIndex: 1
  },
  {
    id: 'q4',
    section: 'Section D: Judicial Standing Orders & Rule 11 Certifications',
    isCritical: true,
    prompt: 'A federal district court has entered a standing order requiring all counsel to certify that all citations in submitted briefs have been verified by a human attorney. Which protocol complies?',
    options: [
      'Asking the generative AI model to verify that its own citations exist.',
      'Having a licensed human attorney retrieve the primary reporter PDF, match quotation text, and confirm good law status via Shepard’s/KeyCite.',
      'Having an administrative assistant perform an automated spell-check on case names.',
      'Attaching a general footnote disclaimer stating that AI was used during initial drafting.'
    ],
    correctIndex: 1
  },
  {
    id: 'q5',
    section: 'Section E: Legal Workflow Orchestration (Lawxy AgentFlow)',
    isCritical: false,
    prompt: 'When designing a multi-step AI workflow for high-volume third-party subpoena compliance, where is human-in-the-loop (HITL) mandatory?',
    options: [
      'Only during the initial optical character recognition (OCR) scan.',
      'Prior to producing any documents, communications, or privilege logs to opposing counsel.',
      'Never; modern enterprise legal AI workflows are fully autonomous.',
      'Only if the opposing party files a formal motion to compel.'
    ],
    correctIndex: 1
  }
];

// ============================================================================
// APPLICATION ROUTER & LIFECYCLE
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

  // Route Initializers
  if (viewId === 'courses') initCoursesView();
  if (viewId === 'dashboard') initDashboardView();
  if (viewId === 'exam') initExamView();
  if (viewId === 'verify') initVerifyView();
  if (viewId === 'admin') initAdminView();
  if (viewId === 'lesson') initLessonView();
}

function handleGlobalSearch(e) {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) {
      switchView('courses');
    }
  }
}

// ============================================================================
// INTERACTIVE VIDEO MASTERCLASS ENGINE
// ============================================================================

function openLesson(lessonId) {
  switchView('lesson');
  initLessonView(lessonId);
}

function initLessonView(lessonId = 'l1-2') {
  renderTranscript();
  setupVideoCanvas();
  renderTokenLab();
}

function setupVideoCanvas() {
  const canvas = document.getElementById('video-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 960;
  canvas.height = 540;

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Warm Editorial Sketch Canvas Background
    ctx.fillStyle = '#fbfbfa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Graphite Grid
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

    // Dynamic Waveform / Audio Visualizer
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

    // Slide Content Text
    ctx.fillStyle = '#111827';
    ctx.font = '700 24px "DM Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Lawxy Academy — Level 1 Foundations', canvas.width / 2, 140);

    ctx.fillStyle = '#287796';
    ctx.font = '500 16px "DM Sans", sans-serif';
    ctx.fillText('Lesson 1.2: Context Windows & Sub-word Tokenization', canvas.width / 2, 175);

    // Topic Banner
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

  container.innerHTML = TRANSCRIPT_DATA.map((item, idx) => `
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
// TOKENIZER LAB
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

function checkLessonQuiz() {
  const selected = document.querySelector('input[name="lq_choice"]:checked');
  const fb = document.getElementById('lesson-quiz-feedback');
  if (!selected) {
    fb.innerHTML = '<span style="color: #ef4444; font-size: 13.5px;">Please select an answer choice.</span>';
    return;
  }

  if (selected.value === '1') {
    fb.innerHTML = '<div style="color: #059669; padding: 12px; background: #ecfdf5; border-radius: 6px; font-size: 13.5px; border: 1px solid #a7f3d0;">✓ <strong>Correct!</strong> Attention weights decay in the central 40–60% of large context windows ("Lost in the Middle").</div>';
  } else {
    fb.innerHTML = '<div style="color: #dc2626; padding: 12px; background: #fef2f2; border-radius: 6px; font-size: 13.5px; border: 1px solid #fecaca;">✕ <strong>Incorrect.</strong> Review the context memory section of the lecture notes.</div>';
  }
}

function markLessonComplete() {
  STATE.user.progress = Math.min(100, STATE.user.progress + 2);
  alert('Lesson completed. Your curriculum progress has been updated.');
  switchView('courses');
}

// ============================================================================
// PROCTORED EXAM ENGINE
// ============================================================================

function initExamView() {
  STATE.exam.currentQuestionIndex = 0;
  STATE.exam.timeLeft = 7200;
  renderExamQuestion();
  startExamTimer();
}

function startExamTimer() {
  if (STATE.exam.timerInterval) clearInterval(STATE.exam.timerInterval);

  STATE.exam.timerInterval = setInterval(() => {
    STATE.exam.timeLeft--;
    const timerBox = document.getElementById('exam-hud-timer');
    if (timerBox) {
      timerBox.innerText = formatTime(STATE.exam.timeLeft);
    }
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

  try {
    const res = await fetch('/api/exam/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: STATE.exam.answers,
        holderName: STATE.user.name,
        email: STATE.user.email
      })
    });
    const data = await res.json();

    if (data.passed) {
      alert(`🎉 CERTIFICATION EARNED!\n\nCandidate: ${STATE.user.name}\nScore: ${data.overallScore}%\nCredential ID: ${data.credential.credentialId}`);
      lookupCredential(data.credential.credentialId);
    } else {
      alert(`Assessment Evaluated.\nScore: ${data.overallScore}%\nPassing score required: 70%.`);
      switchView('dashboard');
    }
  } catch (err) {
    console.error('Submission error:', err);
    switchView('dashboard');
  }
}

// ============================================================================
// VERIFICATION REGISTRY
// ============================================================================

function initVerifyView() {
  const target = document.getElementById('verify-results-container');
  if (target && !target.hasChildNodes()) {
    lookupCredential('LXY-AINL-2026-000184');
  }
}

async function lookupCredential(id) {
  if (!id) return;
  switchView('verify');
  const target = document.getElementById('verify-results-container');
  target.innerHTML = `<div style="text-align: center; padding: 40px; color: #6b7280;">Querying Lawxy Official Registry for ID <code>${id}</code>...</div>`;

  try {
    const res = await fetch(`/api/verify/${id.trim()}`);
    if (!res.ok) {
      target.innerHTML = `
        <div style="border: 1px solid var(--lx-border); border-radius: var(--radius-card); padding: 40px; text-align: center;">
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
      <div style="display: flex; flex-direction: column; align-items: center; gap: 36px;">
        
        <!-- Certificate Canvas Card Box -->
        <div style="width: 100%; max-width: 860px; background: #ffffff; border: 1px solid var(--lx-border); border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); padding: 12px; overflow: hidden;" id="certificate-print-area">
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
          <a href="${certSvgUrl}" download="Lawxy_Certificate_${cred.credentialId}.svg" target="_blank" class="btn-harvey-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; font-size: 14.5px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
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
// CURRICULUM SYLLABUS & DASHBOARD INITIALIZERS
// ============================================================================

async function initCoursesView() {
  const container = document.getElementById('curriculum-module-tree');
  if (!container) return;

  try {
    const res = await fetch('/api/courses');
    const data = await res.json();
    const l1 = data.courses.find(c => c.level === 1);
    if (!l1) return;

    container.innerHTML = `
      <div class="cards-grid-3">
        ${l1.modules.map((m, idx) => `
          <div class="harvey-card" onclick="openLesson('${m.lessons[0]?.id || 'l1-2'}')">
            <div class="card-thumbnail-box">
              <div class="card-typography-poster">
                <div style="font-size: 11px; font-weight: 700; color: var(--lx-primary); margin-bottom: 6px;">Module ${idx + 1}</div>
                <div class="card-typography-title" style="font-size: 18px;">${m.title}</div>
              </div>
              <div class="card-thumb-badge-l">L</div>
              ${m.isCritical ? '<div class="card-thumb-lock">🔒</div>' : ''}
            </div>
            <div class="card-info">
              <h3 class="card-title">${m.title}</h3>
              <p class="card-desc">${m.lessons.length} core lessons covering legal prompt architecture, practice ethics, and hands-on workflows.</p>
              <div class="card-meta">${m.lessons.length} Lessons · ${m.duration}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (err) {
    console.error('Failed to load courses:', err);
  }
}

async function initDashboardView() {
  const container = document.getElementById('dashboard-skills-grid');
  if (!container) return;

  try {
    const res = await fetch('/api/competencies');
    const data = await res.json();
    
    container.innerHTML = data.competencies.map(c => `
      <div style="border: 1px solid var(--lx-border); border-radius: var(--radius-card); padding: 20px; background: #ffffff;">
        <div style="font-size: 10.5px; text-transform: uppercase; color: #6b7280; font-weight: 600;">${c.category}</div>
        <div style="font-weight: 700; font-size: 15px; color: #111827; margin: 4px 0 8px;">${c.name}</div>
        <div style="display: flex; justify-content: space-between; font-size: 12.5px;">
          <span style="color: #059669; font-weight: 700;">✓ Verified</span>
          <span style="font-family: var(--font-mono); color: #9ca3af;">${c.code}</span>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load competencies:', err);
  }
}

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
