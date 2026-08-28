'use client';

import { useState } from 'react';

/* ---- Mock User Data ---- */
const USER = {
  name: 'Alex Thompson',
  email: 'alex.thompson@example.com',
  role: 'learner',
  joinedAt: '2026-01-15',
};

const ENROLLMENT = {
  courseId: 'level-1',
  courseTitle: 'AI-Native Lawyer Foundation',
  level: 1,
  status: 'active',
  enrolledAt: '2026-02-01',
  progress: 62,
  modulesCompleted: 7,
  totalModules: 12,
  lessonsCompleted: 34,
  totalLessons: 55,
  timeSpent: '28h 45m',
  currentModule: {
    id: 'm8',
    title: 'AI Workflows for Legal Practice',
    lessonProgress: 2,
    totalLessons: 4,
  },
  nextLesson: {
    id: 'l8-3',
    title: 'Designing Multi-Step AI Workflows',
    type: 'reading',
    estimatedTime: '25 min',
    moduleTitle: 'AI Workflows for Legal Practice',
  },
};

const COMPETENCIES = [
  { name: 'AI Fundamentals', code: 'L1-AIFUND', status: 'demonstrated', score: 88 },
  { name: 'LLM Understanding', code: 'L1-LLM', status: 'demonstrated', score: 82 },
  { name: 'Legal Prompting', code: 'L1-PROMPT', status: 'demonstrated', score: 91 },
  { name: 'Legal Research with AI', code: 'L1-RESEARCH', status: 'demonstrated', score: 76 },
  { name: 'AI-Assisted Drafting', code: 'L1-DRAFT', status: 'demonstrated', score: 79 },
  { name: 'Contract Analysis', code: 'L1-CONTRACT', status: 'demonstrated', score: 85 },
  { name: 'Case Analysis & Due Diligence', code: 'L1-CASEDD', status: 'demonstrated', score: 73 },
  { name: 'AI Workflows', code: 'L1-WORKFLOW', status: 'in_progress', score: null },
  { name: 'Verification & Hallucinations', code: 'L1-VERIFY', status: 'not_started', score: null },
  { name: 'Confidentiality & Privacy', code: 'L1-CONFID', status: 'not_started', score: null },
  { name: 'Ethics & Professional Responsibility', code: 'L1-ETHICS', status: 'not_started', score: null },
  { name: 'Practical Capstone', code: 'L1-CAPSTONE', status: 'not_started', score: null },
];

const ASSESSMENTS = [
  { id: 'a1', title: 'Module 1 Assessment', type: 'module', score: 88, passed: true, date: '2026-02-10' },
  { id: 'a2', title: 'Module 2 Assessment', type: 'module', score: 82, passed: true, date: '2026-02-18' },
  { id: 'a3', title: 'Module 3 Assessment', type: 'module', score: 91, passed: true, date: '2026-02-25' },
  { id: 'a4', title: 'Module 4 Assessment', type: 'module', score: 76, passed: true, date: '2026-03-05' },
  { id: 'a5', title: 'Module 5 Assessment', type: 'module', score: 79, passed: true, date: '2026-03-14' },
  { id: 'a6', title: 'Module 6 Assessment', type: 'module', score: 85, passed: true, date: '2026-03-22' },
  { id: 'a7', title: 'Module 7 Assessment', type: 'module', score: 73, passed: true, date: '2026-04-01' },
];

const CREDENTIALS = [];

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'learning', label: 'Learning', icon: '📚' },
  { id: 'skills', label: 'Skills', icon: '🎯' },
  { id: 'assessments', label: 'Assessments', icon: '📝' },
  { id: 'credentials', label: 'Credentials', icon: '🏆' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const certEligible = ENROLLMENT.modulesCompleted >= ENROLLMENT.totalModules;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--lxy-light-bg)' }}>
      {/* Dashboard Nav */}
      <nav style={{
        backgroundColor: 'var(--lxy-primary-dark)',
        padding: '0 24px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#02212e' }}>L</div>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>Lawxy <span style={{ color: 'var(--lxy-cyan-accent)', fontWeight: 400 }}>Learn</span></span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{USER.name}</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--lxy-teal-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.8rem', color: '#fff' }}>
            {USER.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 4 }}>
            Welcome back, {USER.name.split(' ')[0]}
          </h1>
          <p style={{ color: 'var(--lxy-text-secondary)', fontSize: '0.9rem' }}>
            Continue your path to becoming a Lawxy Certified AI-Native Lawyer.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 32, overflowX: 'auto', paddingBottom: 2 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: activeTab === item.id ? 600 : 400,
                background: activeTab === item.id ? 'var(--lxy-primary-dark)' : 'transparent',
                color: activeTab === item.id ? '#fff' : 'var(--lxy-text-secondary)',
                border: activeTab === item.id ? 'none' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                transition: 'all 200ms',
              }}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab enrollment={ENROLLMENT} certEligible={certEligible} competencies={COMPETENCIES} assessments={ASSESSMENTS} />}
        {activeTab === 'learning' && <LearningTab enrollment={ENROLLMENT} />}
        {activeTab === 'skills' && <SkillsTab competencies={COMPETENCIES} />}
        {activeTab === 'assessments' && <AssessmentsTab assessments={ASSESSMENTS} certEligible={certEligible} />}
        {activeTab === 'credentials' && <CredentialsTab credentials={CREDENTIALS} />}
      </div>
    </div>
  );
}

/* ---- Overview Tab ---- */
function OverviewTab({ enrollment, certEligible, competencies, assessments }) {
  const demonstrated = competencies.filter(c => c.status === 'demonstrated').length;
  const inProgress = competencies.filter(c => c.status === 'in_progress').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Continue Learning Card */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: 12 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--lxy-border-light)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-teal-accent)', marginBottom: 8 }}>Continue Learning</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>{enrollment.nextLesson.title}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--lxy-text-muted)', margin: 0 }}>
              {enrollment.nextLesson.moduleTitle} · {enrollment.nextLesson.type} · {enrollment.nextLesson.estimatedTime}
            </p>
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="progress-bar" style={{ width: 160 }}>
                <div className="progress-bar-fill" style={{ width: `${enrollment.progress}%` }} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--lxy-teal-accent)' }}>{enrollment.progress}%</span>
            </div>
            <a href="#" className="btn btn-primary btn-sm">Resume Lesson →</a>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { value: `${enrollment.modulesCompleted}/${enrollment.totalModules}`, label: 'Modules', color: 'var(--lxy-teal-accent)' },
            { value: `${enrollment.lessonsCompleted}/${enrollment.totalLessons}`, label: 'Lessons', color: 'var(--lxy-cyan-accent)' },
            { value: enrollment.timeSpent, label: 'Time Spent', color: 'var(--lxy-purple)' },
            { value: `${demonstrated}/${competencies.length}`, label: 'Skills', color: 'var(--lxy-green-success)' },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ padding: 16, textAlign: 'center', borderRadius: 10 }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: stat.color, fontFamily: 'var(--font-heading)', marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--lxy-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Skills Quick View */}
        <div className="card" style={{ padding: 24, borderRadius: 12 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-text-muted)', marginBottom: 16 }}>Competency Progress</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {competencies.slice(0, 8).map((c) => (
              <div key={c.code} className="competency-indicator">
                <div className={`competency-dot competency-${c.status === 'demonstrated' ? 'demonstrated' : c.status === 'in_progress' ? 'in-progress' : 'not-started'}`} />
                <span style={{ flex: 1, fontSize: '0.85rem' }}>{c.name}</span>
                {c.score !== null && (
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: c.score >= 70 ? 'var(--lxy-green-success)' : 'var(--lxy-orange-alert)' }}>{c.score}%</span>
                )}
                {c.status === 'not_started' && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>—</span>
                )}
              </div>
            ))}
            {competencies.length > 8 && (
              <div style={{ fontSize: '0.8rem', color: 'var(--lxy-teal-accent)', cursor: 'pointer', marginTop: 4 }}>
                View all {competencies.length} competencies →
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Certification Status */}
        <div className="card" style={{ padding: 24, borderRadius: 12, borderLeft: `3px solid ${certEligible ? 'var(--lxy-green-success)' : 'var(--lxy-gold)'}` }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-text-muted)', marginBottom: 12 }}>Certification Status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>{certEligible ? '✅' : '⏳'}</span>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
              {certEligible ? 'Eligible for Exam' : 'Not Yet Eligible'}
            </span>
          </div>
          {!certEligible && (
            <>
              <p style={{ fontSize: '0.8rem', color: 'var(--lxy-text-secondary)', marginBottom: 12 }}>
                Complete all {ENROLLMENT.totalModules} modules and pass their assessments to unlock the certification exam.
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--lxy-text-muted)' }}>
                {ENROLLMENT.totalModules - ENROLLMENT.modulesCompleted} modules remaining
              </div>
            </>
          )}
          {certEligible && (
            <a href="#" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              Take Certification Exam
            </a>
          )}
        </div>

        {/* Recommended Next Step */}
        <div className="card" style={{ padding: 24, borderRadius: 12, backgroundColor: 'var(--lxy-cyan-bg)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-teal-accent)', marginBottom: 12 }}>Recommended Next Step</div>
          <h4 style={{ fontSize: '0.95rem', marginBottom: 8 }}>Complete Module 8</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--lxy-text-secondary)', margin: 0 }}>
            Finish "AI Workflows for Legal Practice" — you have 2 lessons remaining.
          </p>
        </div>

        {/* Recent Assessments */}
        <div className="card" style={{ padding: 24, borderRadius: 12 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-text-muted)', marginBottom: 16 }}>Recent Assessments</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {assessments.slice(-3).reverse().map((a) => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span>{a.title}</span>
                <span style={{ fontWeight: 600, color: a.passed ? 'var(--lxy-green-success)' : 'var(--lxy-orange-alert)' }}>{a.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Learning Tab ---- */
function LearningTab({ enrollment }) {
  const MODULES = [
    { id: 'm1', title: 'AI Fundamentals for Legal Professionals', lessons: 5, status: 'completed', progress: 100 },
    { id: 'm2', title: 'LLMs & How They Work in Legal Context', lessons: 4, status: 'completed', progress: 100 },
    { id: 'm3', title: 'Prompting for Legal Professionals', lessons: 5, status: 'completed', progress: 100 },
    { id: 'm4', title: 'Legal Research with AI', lessons: 6, status: 'completed', progress: 100 },
    { id: 'm5', title: 'AI-Assisted Legal Drafting & Summarization', lessons: 5, status: 'completed', progress: 100 },
    { id: 'm6', title: 'Contract Analysis with AI', lessons: 5, status: 'completed', progress: 100 },
    { id: 'm7', title: 'Case Analysis & Due Diligence', lessons: 5, status: 'completed', progress: 100 },
    { id: 'm8', title: 'AI Workflows for Legal Practice', lessons: 4, status: 'in_progress', progress: 50 },
    { id: 'm9', title: 'Hallucinations, Verification & Source Validation', lessons: 5, status: 'locked', progress: 0, prereqs: ['m1', 'm2', 'm4'] },
    { id: 'm10', title: 'Confidentiality, Privacy & Data Security', lessons: 4, status: 'locked', progress: 0 },
    { id: 'm11', title: 'Professional Responsibility, Ethics & Human Oversight', lessons: 5, status: 'locked', progress: 0 },
    { id: 'capstone', title: 'Level 1 Capstone: AI-Assisted Legal Matter', lessons: 1, status: 'locked', progress: 0 },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.2rem' }}>{enrollment.courseTitle}</h2>
        <span className="badge badge-free">Free Access</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MODULES.map((mod, i) => (
          <div key={mod.id} className="card" style={{
            padding: '16px 20px',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity: mod.status === 'locked' ? 0.5 : 1,
            borderLeft: mod.status === 'completed' ? '3px solid var(--lxy-green-success)' : mod.status === 'in_progress' ? '3px solid var(--lxy-teal-accent)' : undefined,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 600,
              backgroundColor: mod.status === 'completed' ? 'rgba(104,204,88,0.1)' : mod.status === 'in_progress' ? 'rgba(40,119,150,0.1)' : 'var(--lxy-light-bg)',
              color: mod.status === 'completed' ? 'var(--lxy-green-success)' : mod.status === 'in_progress' ? 'var(--lxy-teal-accent)' : 'var(--lxy-text-muted)',
            }}>
              {mod.status === 'completed' ? '✓' : mod.status === 'locked' ? '🔒' : (i + 1)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: 2 }}>{mod.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>{mod.lessons} lessons</div>
            </div>
            {mod.progress > 0 && mod.progress < 100 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
                <div className="progress-bar" style={{ flex: 1 }}>
                  <div className="progress-bar-fill" style={{ width: `${mod.progress}%` }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--lxy-teal-accent)' }}>{mod.progress}%</span>
              </div>
            )}
            {mod.status === 'completed' && (
              <span style={{ fontSize: '0.75rem', color: 'var(--lxy-green-success)', fontWeight: 500 }}>Completed</span>
            )}
            {mod.status === 'in_progress' && (
              <a href="#" className="btn btn-primary btn-sm">Continue</a>
            )}
            {mod.status === 'locked' && (
              <span style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>Locked</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Skills Tab ---- */
function SkillsTab({ competencies }) {
  const demonstrated = competencies.filter(c => c.status === 'demonstrated');
  const inProgress = competencies.filter(c => c.status === 'in_progress');
  const notStarted = competencies.filter(c => c.status === 'not_started');

  return (
    <div>
      <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Competency Map</h2>
      <p style={{ color: 'var(--lxy-text-secondary)', fontSize: '0.9rem', marginBottom: 24 }}>
        Track the skills you have demonstrated through module assessments.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {competencies.map((c) => (
          <div key={c.code} className="card" style={{
            padding: 20, borderRadius: 10,
            borderLeft: `3px solid ${c.status === 'demonstrated' ? 'var(--lxy-green-success)' : c.status === 'in_progress' ? 'var(--lxy-gold)' : 'var(--lxy-border)'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.name}</div>
              {c.score !== null && (
                <div style={{
                  fontSize: '0.85rem', fontWeight: 700,
                  color: c.score >= 70 ? 'var(--lxy-green-success)' : 'var(--lxy-orange-alert)',
                }}>{c.score}%</div>
              )}
            </div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--lxy-text-muted)', marginBottom: 8 }}>{c.code}</div>
            <div style={{
              fontSize: '0.75rem', fontWeight: 600,
              color: c.status === 'demonstrated' ? 'var(--lxy-green-success)' : c.status === 'in_progress' ? '#c49340' : 'var(--lxy-text-muted)',
            }}>
              {c.status === 'demonstrated' ? '✓ Demonstrated' : c.status === 'in_progress' ? '◷ In Progress' : '○ Not Yet Demonstrated'}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--lxy-green-success)' }} />
          Demonstrated ({demonstrated.length})
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--lxy-gold)' }} />
          In Progress ({inProgress.length})
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--lxy-border)' }} />
          Not Yet Demonstrated ({notStarted.length})
        </div>
      </div>
    </div>
  );
}

/* ---- Assessments Tab ---- */
function AssessmentsTab({ assessments, certEligible }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 4 }}>Assessments</h2>
          <p style={{ color: 'var(--lxy-text-secondary)', fontSize: '0.85rem' }}>Module assessments and certification exam</p>
        </div>
        {certEligible && (
          <a href="#" className="btn btn-primary">Take Certification Exam</a>
        )}
      </div>

      {/* Certification Exam Card */}
      <div className="card" style={{ padding: 24, borderRadius: 12, marginBottom: 24, borderLeft: `3px solid ${certEligible ? 'var(--lxy-green-success)' : 'var(--lxy-border)'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>Level 1 Certification Exam</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--lxy-text-muted)' }}>
              120 minutes · 29 questions · 7 assessment types · Passing score: 70%
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {certEligible ? (
              <span className="badge badge-active">Eligible</span>
            ) : (
              <span className="badge" style={{ backgroundColor: 'var(--lxy-light-bg)', color: 'var(--lxy-text-muted)' }}>Not Yet Eligible</span>
            )}
            <div style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)', marginTop: 4 }}>0 / 3 attempts used</div>
          </div>
        </div>
      </div>

      {/* Module Assessments */}
      <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-text-muted)', marginBottom: 12 }}>Module Assessments</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {assessments.map((a) => (
          <div key={a.id} className="card" style={{ padding: '14px 20px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{a.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: a.passed ? 'var(--lxy-green-success)' : 'var(--lxy-orange-alert)' }}>{a.score}%</span>
              <span className={`badge ${a.passed ? 'badge-active' : 'badge-revoked'}`}>{a.passed ? 'Passed' : 'Failed'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Credentials Tab ---- */
function CredentialsTab({ credentials }) {
  if (credentials.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 64 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🏆</div>
        <h3 style={{ marginBottom: 8, fontSize: '1.1rem' }}>No Credentials Yet</h3>
        <p style={{ color: 'var(--lxy-text-secondary)', fontSize: '0.9rem', maxWidth: 400, margin: '0 auto 24px' }}>
          Complete all modules and pass the certification exam to earn your 
          Lawxy Certified AI-Native Lawyer credential.
        </p>
        <a href="#" className="btn btn-secondary">View Certification Requirements</a>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.2rem', marginBottom: 24 }}>My Credentials</h2>
      {/* Would render credential cards here */}
    </div>
  );
}
