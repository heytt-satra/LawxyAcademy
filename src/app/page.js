'use client';

import { useState, useEffect, useRef } from 'react';

/* =========================================================
   DATA: Curriculum, Competencies, Scoring, FAQ
   ========================================================= */

const LEVEL_1_MODULES = [
  { id: 'm1', title: 'AI Fundamentals for Legal Professionals', lessons: 5, hours: 2.5, competency: 'Knowledge', icon: '🧠' },
  { id: 'm2', title: 'LLMs & How They Work in Legal Context', lessons: 4, hours: 2, competency: 'Knowledge', icon: '⚙️' },
  { id: 'm3', title: 'Prompting for Legal Professionals', lessons: 5, hours: 3, competency: 'AI Application', icon: '💬' },
  { id: 'm4', title: 'Legal Research with AI', lessons: 6, hours: 3.5, competency: 'AI Application', icon: '🔍' },
  { id: 'm5', title: 'AI-Assisted Legal Drafting & Summarization', lessons: 5, hours: 3, competency: 'AI Application', icon: '✍️' },
  { id: 'm6', title: 'Contract Analysis with AI', lessons: 5, hours: 3, competency: 'Legal Workflows', icon: '📋' },
  { id: 'm7', title: 'Case Analysis & Due Diligence', lessons: 5, hours: 3, competency: 'Legal Workflows', icon: '⚖️' },
  { id: 'm8', title: 'AI Workflows for Legal Practice', lessons: 4, hours: 2.5, competency: 'Legal Workflows', icon: '🔄' },
  { id: 'm9', title: 'Hallucinations, Verification & Source Validation', lessons: 5, hours: 3, competency: 'Verification', icon: '🔬' },
  { id: 'm10', title: 'Confidentiality, Privacy & Data Security', lessons: 4, hours: 2, competency: 'Ethics', icon: '🔒' },
  { id: 'm11', title: 'Professional Responsibility, Ethics & Human Oversight', lessons: 5, hours: 2.5, competency: 'Ethics', icon: '🏛️' },
  { id: 'capstone', title: 'Level 1 Capstone: AI-Assisted Legal Matter', lessons: 1, hours: 4, competency: 'Practical', icon: '🎯' },
];

const LEVEL_2_MODULES = [
  { id: 'l2m1', title: 'Advanced Legal Research with AI', lessons: 6, hours: 4, competency: 'Research', icon: '🔎' },
  { id: 'l2m2', title: 'AI-Assisted Contract Review', lessons: 6, hours: 4, competency: 'Contract', icon: '📝' },
  { id: 'l2m3', title: 'AI-Assisted Litigation', lessons: 5, hours: 3.5, competency: 'Litigation', icon: '⚖️' },
  { id: 'l2m4', title: 'AI Due Diligence', lessons: 5, hours: 3, competency: 'Due Diligence', icon: '🏢' },
  { id: 'l2m5', title: 'AI Legal Drafting (Advanced)', lessons: 5, hours: 3.5, competency: 'Drafting', icon: '📄' },
  { id: 'l2m6', title: 'Legal Knowledge Bases & RAG', lessons: 5, hours: 3, competency: 'Workflows', icon: '📚' },
  { id: 'l2m7', title: 'AI Agents for Lawyers', lessons: 6, hours: 4, competency: 'Workflows', icon: '🤖' },
  { id: 'l2m8', title: 'Multi-Step Legal Workflows & Agent Supervision', lessons: 5, hours: 3.5, competency: 'Workflows', icon: '🔗' },
  { id: 'l2m9', title: 'AI Quality Control & Advanced Verification', lessons: 4, hours: 2.5, competency: 'Verification', icon: '✅' },
  { id: 'l2m10', title: 'AI Governance for Legal Teams', lessons: 4, hours: 2.5, competency: 'Governance', icon: '📊' },
  { id: 'l2capstone', title: 'Level 2 Capstone: End-to-End AI Legal Workflow', lessons: 1, hours: 6, competency: 'Practical', icon: '🏆' },
];

const ASSESSMENT_TYPES = [
  { letter: 'A', name: 'Scenario MCQs', desc: 'Judgment-testing multiple choice based on realistic legal scenarios', icon: '📝' },
  { letter: 'B', name: 'Scenario Analysis', desc: 'Written analysis of realistic legal situations involving AI', icon: '📋' },
  { letter: 'C', name: 'AI Output Verification', desc: 'Identify errors, fabrications, and unsupported claims in AI-generated legal output', icon: '🔬' },
  { letter: 'D', name: 'Practical Research', desc: 'Conduct AI-assisted legal research with verified authorities', icon: '🔍' },
  { letter: 'E', name: 'Contract Analysis', desc: 'Identify risks, missing provisions, and draft improvements', icon: '📋' },
  { letter: 'F', name: 'Legal Drafting', desc: 'Produce legal documents using AI with proper verification', icon: '✍️' },
  { letter: 'G', name: 'Workflow Design', desc: 'Design AI-assisted legal workflows with human checkpoints', icon: '🔄' },
];

const SCORING_L1 = [
  { area: 'Knowledge', weight: 20, min: 50, color: '#287796' },
  { area: 'AI Application', weight: 20, min: 50, color: '#80e5ff' },
  { area: 'Legal Workflows', weight: 15, min: 50, color: '#7584d6' },
  { area: 'Verification & Hallucination Detection', weight: 15, min: 60, color: '#ff652d', critical: true },
  { area: 'Ethics & Professional Responsibility', weight: 15, min: 60, color: '#e6c08e', critical: true },
  { area: 'Practical Assessment', weight: 15, min: 60, color: '#68cc58', critical: true },
];

const FAQS = [
  { q: 'Is the learning content really free?', a: 'Yes. All courses, lessons, videos, exercises, and knowledge checks are completely free. Lawxy believes education should be accessible. The certification exam validates your competence — that is where the value lies.' },
  { q: 'What does the certification exam test?', a: 'The exam tests practical competence, not memorization. You will face scenario-based MCQs, AI output verification exercises, contract analysis, legal research tasks, drafting assignments, and workflow design problems. The exam tests whether you can actually use AI responsibly in legal work.' },
  { q: 'How difficult is the certification exam?', a: 'The exam is deliberately rigorous. Level 1 requires a 70% overall score with minimum thresholds per competency area. You cannot pass if you demonstrate dangerous gaps in verification, ethics, or confidentiality — even if your overall score is high.' },
  { q: 'Can I retake the exam if I fail?', a: 'Yes, up to 3 attempts with a 14-day cooldown between each. After 3 failed attempts, you must wait 90 days. Each attempt draws from a large randomized question bank, so you cannot simply memorize answers.' },
  { q: 'How long is the certification valid?', a: 'Credentials are valid for 24 months. AI evolves rapidly, so renewal ensures your skills remain current. Renewal is available via an abbreviated assessment or continuing education.' },
  { q: 'Can employers verify my credential?', a: 'Yes. Every credential has a unique Credential ID and a public verification URL. Employers, law firms, and universities can verify in seconds without creating an account.' },
  { q: 'What is the difference between Level 1 and Level 2?', a: 'Level 1 (Foundation) covers the fundamentals every lawyer needs to safely use AI. Level 2 (Advanced) tests whether you can apply AI to complex legal workflows including contract review, litigation, due diligence, agent supervision, and governance.' },
  { q: 'Do I need to use Lawxy products to complete the certification?', a: 'No. The certification teaches transferable AI skills applicable to any legal AI tool. Lawxy products are referenced as practical examples where appropriate, but the curriculum is tool-agnostic.' },
];

const CREDENTIAL_EXAMPLE = {
  name: 'Sarah Chen',
  credential: 'Lawxy Certified AI-Native Lawyer',
  id: 'LXY-AINL-2026-000184',
  level: 'Level 1 — Foundation',
  issued: 'March 15, 2026',
  expires: 'March 15, 2028',
  status: 'Active',
  skills: [
    'AI Fundamentals for Legal Practice',
    'Legal Research with AI',
    'AI-Assisted Drafting',
    'Contract Analysis',
    'Hallucination Detection & Verification',
    'AI Ethics & Professional Responsibility',
    'Confidentiality & Data Security',
  ],
  verifyUrl: 'lawxyai.com/verify/LXY-AINL-2026-000184',
};

/* =========================================================
   COMPONENTS
   ========================================================= */

/* ----- Navigation ----- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 50,
      backgroundColor: scrolled ? 'rgba(2, 33, 46, 0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 300ms ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#02212e' }}>L</div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.1rem', color: '#fff', letterSpacing: '-0.02em' }}>Lawxy<span style={{ color: 'var(--lxy-cyan-accent)', fontWeight: 400, marginLeft: 4 }}>Certification</span></span>
        </a>
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#curriculum" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', transition: 'color 200ms' }}>Curriculum</a>
          <a href="#assessment" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}>Assessment</a>
          <a href="#credential" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}>Credential</a>
          <a href="#faq" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}>FAQ</a>
          <a href="/login" className="btn btn-ghost" style={{ fontSize: '0.8rem', padding: '8px 18px' }}>Log In</a>
          <a href="/register" className="btn btn-accent" style={{ fontSize: '0.8rem', padding: '8px 18px' }}>Start Learning — Free</a>
        </div>
        <button className="hide-desktop" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: '#fff', fontSize: 24 }} aria-label="Menu">
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>
      {mobileOpen && (
        <div style={{ background: 'rgba(2,33,46,0.98)', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a href="#curriculum" style={{ color: '#fff', fontSize: '0.95rem' }} onClick={() => setMobileOpen(false)}>Curriculum</a>
          <a href="#assessment" style={{ color: '#fff', fontSize: '0.95rem' }} onClick={() => setMobileOpen(false)}>Assessment</a>
          <a href="#credential" style={{ color: '#fff', fontSize: '0.95rem' }} onClick={() => setMobileOpen(false)}>Credential</a>
          <a href="#faq" style={{ color: '#fff', fontSize: '0.95rem' }} onClick={() => setMobileOpen(false)}>FAQ</a>
          <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
            <a href="/login" className="btn btn-ghost" style={{ flex: 1, textAlign: 'center' }}>Log In</a>
            <a href="/register" className="btn btn-accent" style={{ flex: 1, textAlign: 'center' }}>Start Free</a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ----- Hero Section ----- */
function HeroSection() {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #02212e 0%, #01374d 50%, #02212e 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '160px 24px 100px',
      textAlign: 'center',
    }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(128,229,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 20% 80%, rgba(43,120,150,0.15) 0%, transparent 50%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '6px 16px', borderRadius: 9999, border: '1px solid rgba(128,229,255,0.2)', background: 'rgba(128,229,255,0.05)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#68cc58' }} />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 500, fontFamily: 'var(--font-ui)' }}>Professional Certification Program</span>
        </div>

        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: 24,
          fontFamily: 'var(--font-heading)',
        }}>
          Lawxy Certified<br />
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, color: 'var(--lxy-cyan-accent)' }}>AI-Native Lawyer</span>
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          lineHeight: 1.7,
          maxWidth: 650,
          margin: '0 auto 40px',
          fontFamily: 'var(--font-body)',
        }}>
          Demonstrate real competence in AI-assisted legal practice. 
          Free education. Rigorous assessment. A credential that means something.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <a href="/register" className="btn btn-accent btn-lg" style={{ minWidth: 200 }}>
            Start Learning — Free
          </a>
          <a href="#curriculum" className="btn btn-ghost btn-lg" style={{ minWidth: 200 }}>
            View Curriculum
          </a>
        </div>

        <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { value: '12', label: 'Modules' },
            { value: '55+', label: 'Lessons' },
            { value: '7', label: 'Assessment Types' },
            { value: '24 mo', label: 'Credential Validity' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-heading)' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Philosophy Section ----- */
function PhilosophySection() {
  return (
    <section style={{ padding: 'var(--section-padding)', backgroundColor: 'var(--lxy-off-white)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-teal-accent)', marginBottom: 12 }}>Our Philosophy</div>
          <h2 style={{ marginBottom: 20, fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>Learning is free.<br /><span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>Certification is earned.</span></h2>
          <p style={{ color: 'var(--lxy-text-secondary)', lineHeight: 1.75 }}>
            Anyone can access every lesson, video, exercise, and knowledge check at no cost. 
            But the Lawxy credential is not awarded for watching videos — it requires demonstrating 
            genuine competence through rigorous, scenario-based assessment.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { icon: '📚', title: 'Free Education', desc: 'Complete curriculum access at zero cost' },
            { icon: '🎯', title: 'Earned Credential', desc: 'Pass rigorous assessment to certify' },
            { icon: '🔍', title: 'Public Verification', desc: 'Employers verify in seconds' },
            { icon: '🔄', title: 'Stays Current', desc: '24-month validity with renewal' },
          ].map((item, i) => (
            <div key={i} className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--lxy-text-tertiary)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Certification Levels Section ----- */
function LevelsSection() {
  const [activeLevel, setActiveLevel] = useState(1);
  const modules = activeLevel === 1 ? LEVEL_1_MODULES : LEVEL_2_MODULES;
  const totalHours = modules.reduce((sum, m) => sum + m.hours, 0);
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons, 0);

  return (
    <section id="curriculum" style={{ padding: 'var(--section-padding)', backgroundColor: 'var(--lxy-light-bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-teal-accent)', marginBottom: 12 }}>Curriculum</div>
          <h2 style={{ marginBottom: 16 }}>Two Certification Levels</h2>
          <p style={{ color: 'var(--lxy-text-secondary)', maxWidth: 600, margin: '0 auto' }}>
            Progressively demonstrate your competence — from AI fundamentals to advanced legal workflows.
          </p>
        </div>

        {/* Level Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
          <button
            onClick={() => setActiveLevel(1)}
            style={{
              padding: '12px 28px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600,
              background: activeLevel === 1 ? 'var(--lxy-primary-dark)' : 'transparent',
              color: activeLevel === 1 ? '#fff' : 'var(--lxy-text-secondary)',
              border: activeLevel === 1 ? 'none' : '1px solid var(--lxy-border)',
              transition: 'all 200ms',
            }}
          >
            Level 1 — Foundation
          </button>
          <button
            onClick={() => setActiveLevel(2)}
            style={{
              padding: '12px 28px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600,
              background: activeLevel === 2 ? 'var(--lxy-purple-deep)' : 'transparent',
              color: activeLevel === 2 ? '#fff' : 'var(--lxy-text-secondary)',
              border: activeLevel === 2 ? 'none' : '1px solid var(--lxy-border)',
              transition: 'all 200ms',
            }}
          >
            Level 2 — Advanced
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 32, flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{modules.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)', textTransform: 'uppercase' }}>Modules</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalLessons}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)', textTransform: 'uppercase' }}>Lessons</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalHours}h</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)', textTransform: 'uppercase' }}>Est. Time</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{activeLevel === 1 ? '70%' : '75%'}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)', textTransform: 'uppercase' }}>Pass Score</div>
          </div>
        </div>

        <div className="badge-free" style={{ display: 'flex', justifyContent: 'center', width: 'fit-content', margin: '0 auto 32px', padding: '6px 16px' }}>
          100% Free to Learn
        </div>

        {/* Module Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
          {modules.map((mod, i) => (
            <div key={mod.id} className="card" style={{
              padding: '18px 20px',
              display: 'flex', gap: 14, alignItems: 'flex-start',
              opacity: 0, animation: `fadeIn 0.4s ease ${i * 0.05}s forwards`,
              borderLeft: mod.id.includes('capstone') ? '3px solid var(--lxy-gold)' : undefined,
            }}>
              <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{mod.icon}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{mod.title}</div>
                <div style={{ display: 'flex', gap: 12, fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>
                  <span>{mod.lessons} lessons</span>
                  <span>·</span>
                  <span>{mod.hours}h</span>
                  <span>·</span>
                  <span className={`tag`} style={{ padding: '1px 8px', fontSize: '0.65rem' }}>{mod.competency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Assessment Section ----- */
function AssessmentSection() {
  return (
    <section id="assessment" style={{ padding: 'var(--section-padding)', backgroundColor: 'var(--lxy-primary-dark)', color: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-cyan-accent)', marginBottom: 12 }}>Assessment</div>
          <h2 style={{ color: '#fff', marginBottom: 16 }}>Not a Quiz.<br /><span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400 }}>A Real Assessment.</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 650, margin: '0 auto' }}>
            Seven assessment types test judgment, reasoning, and practical application — not memorization. 
            The exam is designed so that AI competence cannot be faked.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {ASSESSMENT_TYPES.map((type, i) => (
            <div key={type.letter} style={{
              padding: 24, borderRadius: 12,
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'all 300ms',
              opacity: 0, animation: `fadeIn 0.4s ease ${i * 0.07}s forwards`,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(128,229,255,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(128,229,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--lxy-cyan-accent)', fontFamily: 'var(--font-mono)' }}>
                  {type.letter}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{type.name}</div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{type.desc}</p>
            </div>
          ))}
        </div>

        {/* Scoring Overview */}
        <div style={{ marginTop: 64, padding: 32, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ color: '#fff', marginBottom: 24, fontSize: '1.2rem' }}>Level 1 Scoring Weights</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SCORING_L1.map((s) => (
              <div key={s.area} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 180, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
                  {s.area} {s.critical && <span style={{ color: 'var(--lxy-orange-alert)', fontSize: '0.7rem' }}>⚠ Critical</span>}
                </div>
                <div style={{ flex: 1, height: 8, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.weight * 5}%`, backgroundColor: s.color, borderRadius: 4, transition: 'width 1s ease' }} />
                </div>
                <div style={{ width: 40, fontSize: '0.8rem', fontWeight: 600, color: s.color, textAlign: 'right' }}>{s.weight}%</div>
                <div style={{ width: 60, fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textAlign: 'right' }}>Min {s.min}%</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: '12px 16px', borderRadius: 8, backgroundColor: 'rgba(255,101,45,0.08)', border: '1px solid rgba(255,101,45,0.15)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
            <strong style={{ color: 'var(--lxy-orange-alert)' }}>Auto-fail:</strong> Scoring below the minimum on any critical area results in automatic failure, regardless of overall score.
          </div>
        </div>

        {/* Anti-cheat */}
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {[
            'Randomized from 200+ questions', 'Multiple question variants', 'Time-limited (120–180 min)',
            'Max 3 attempts, 14-day cooldown', 'Practical assessments', 'Tab-switch detection',
            'Response timing analysis', 'Tests reasoning, not facts',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ color: 'var(--lxy-cyan-accent)' }}>✓</span> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Credential Section ----- */
function CredentialSection() {
  return (
    <section id="credential" style={{ padding: 'var(--section-padding)', backgroundColor: 'var(--lxy-off-white)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-teal-accent)', marginBottom: 12 }}>Credential</div>
          <h2 style={{ marginBottom: 16 }}>A Credential That<br /><span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>Means Something</span></h2>
          <p style={{ color: 'var(--lxy-text-secondary)', maxWidth: 600, margin: '0 auto' }}>
            Every credential is verifiable, time-bound, and backed by a transparent competency framework.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 32, alignItems: 'start' }}>
          {/* Credential Card */}
          <div className="card-credential" style={{ padding: 40 }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: '#02212e' }}>L</div>
                <div>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>Lawxy AI</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Professional Credential</div>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>CREDENTIAL NAME</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{CREDENTIAL_EXAMPLE.credential}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginBottom: 2, textTransform: 'uppercase' }}>Holder</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{CREDENTIAL_EXAMPLE.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginBottom: 2, textTransform: 'uppercase' }}>Credential ID</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{CREDENTIAL_EXAMPLE.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginBottom: 2, textTransform: 'uppercase' }}>Issued</div>
                  <div style={{ fontSize: '0.85rem' }}>{CREDENTIAL_EXAMPLE.issued}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginBottom: 2, textTransform: 'uppercase' }}>Status</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--lxy-green-success)' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--lxy-green-success)' }}>{CREDENTIAL_EXAMPLE.status}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginBottom: 8, textTransform: 'uppercase' }}>Skills Demonstrated</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {CREDENTIAL_EXAMPLE.skills.map((skill, i) => (
                    <span key={i} style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: 4, backgroundColor: 'rgba(128,229,255,0.08)', border: '1px solid rgba(128,229,255,0.12)', color: 'var(--lxy-cyan-soft)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>🔗</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--lxy-cyan-accent)' }}>{CREDENTIAL_EXAMPLE.verifyUrl}</span>
              </div>
            </div>
          </div>

          {/* Verification Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card" style={{ padding: 24 }}>
              <h4 style={{ marginBottom: 12, fontSize: '1rem' }}>🔍 Instant Verification</h4>
              <p style={{ color: 'var(--lxy-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Employers, law firms, and universities can verify any credential instantly using the Credential ID. 
                No account required. Visit <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--lxy-teal-accent)', fontSize: '0.85rem' }}>lawxyai.com/verify/[ID]</span>
              </p>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h4 style={{ marginBottom: 12, fontSize: '1rem' }}>🔄 Credential Lifecycle</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { status: 'Active', color: '#68cc58', desc: 'Current and valid' },
                  { status: 'Expired', color: '#e6c08e', desc: 'Renewal required within grace period' },
                  { status: 'Renewed', color: '#287796', desc: 'Renewed with updated validity' },
                  { status: 'Revoked', color: '#ff652d', desc: 'Permanently invalidated' },
                  { status: 'Suspended', color: '#a1a1a1', desc: 'Temporarily paused pending review' },
                ].map((s) => (
                  <div key={s.status} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: s.color, flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, minWidth: 80 }}>{s.status}</span>
                    <span style={{ color: 'var(--lxy-text-tertiary)', fontSize: '0.8rem' }}>{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h4 style={{ marginBottom: 12, fontSize: '1rem' }}>📋 Credential ID Format</h4>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--lxy-teal-accent)', marginBottom: 12, letterSpacing: '0.02em' }}>
                LXY-AINL-2026-000184
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 12px', fontSize: '0.8rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--lxy-text-secondary)' }}>LXY</span>
                <span style={{ color: 'var(--lxy-text-tertiary)' }}>Lawxy issuer prefix</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--lxy-text-secondary)' }}>AINL</span>
                <span style={{ color: 'var(--lxy-text-tertiary)' }}>AI-Native Lawyer certification</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--lxy-text-secondary)' }}>2026</span>
                <span style={{ color: 'var(--lxy-text-tertiary)' }}>Year of issuance</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--lxy-text-secondary)' }}>000184</span>
                <span style={{ color: 'var(--lxy-text-tertiary)' }}>Sequential credential number</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----- Journey Section ----- */
function JourneySection() {
  const steps = [
    { num: '01', title: 'Explore', desc: 'Browse the curriculum, understand what the certification tests, and decide your level.' },
    { num: '02', title: 'Learn — Free', desc: 'Complete all modules, lessons, exercises, and knowledge checks at your own pace. No payment required.' },
    { num: '03', title: 'Practice', desc: 'Work through practical exercises, knowledge checks, and module assessments to build real competence.' },
    { num: '04', title: 'Qualify', desc: 'Complete all course requirements to become eligible for the certification exam.' },
    { num: '05', title: 'Certify', desc: 'Take the rigorous certification exam. Demonstrate competence across all assessment types.' },
    { num: '06', title: 'Credential', desc: 'Receive your unique Credential ID, downloadable certificate, and public verification page.' },
  ];

  return (
    <section style={{ padding: 'var(--section-padding)', backgroundColor: 'var(--lxy-light-bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-teal-accent)', marginBottom: 12 }}>Your Journey</div>
          <h2>From Learner to<br /><span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>Certified Professional</span></h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, var(--lxy-teal-accent), var(--lxy-cyan-accent), var(--lxy-green-success))', borderRadius: 1 }} />
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', gap: 24, paddingLeft: 4, paddingBottom: i < steps.length - 1 ? 32 : 0, position: 'relative' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: 'var(--lxy-primary-dark)', color: 'var(--lxy-cyan-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)', flexShrink: 0, border: '2px solid var(--lxy-teal-accent)', zIndex: 1 }}>
                {step.num}
              </div>
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>{step.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--lxy-text-secondary)', lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- FAQ Section ----- */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" style={{ padding: 'var(--section-padding)', backgroundColor: 'var(--lxy-off-white)' }}>
      <div style={{ maxWidth: 750, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-teal-accent)', marginBottom: 12 }}>FAQ</div>
          <h2>Common Questions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--lxy-border-light)' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%', padding: '18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  textAlign: 'left', fontSize: '0.95rem', fontWeight: 500, color: 'var(--lxy-text-dark)', background: 'none', border: 'none', cursor: 'pointer',
                }}
                aria-expanded={openIndex === i}
              >
                {faq.q}
                <span style={{ fontSize: '1.2rem', color: 'var(--lxy-text-muted)', transition: 'transform 200ms', transform: openIndex === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              <div style={{
                maxHeight: openIndex === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 300ms ease',
              }}>
                <p style={{ padding: '0 0 18px', fontSize: '0.9rem', color: 'var(--lxy-text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- CTA Section ----- */
function CTASection() {
  return (
    <section style={{
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #02212e 0%, #01374d 100%)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(128,229,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ color: '#fff', marginBottom: 16 }}>
          Ready to prove your <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--lxy-cyan-accent)' }}>AI competence</span>?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
          Start learning today. Take the assessment when you are ready. Earn a credential that speaks for itself.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/register" className="btn btn-accent btn-lg">Start Learning — Free</a>
          <a href="#curriculum" className="btn btn-ghost btn-lg">View Curriculum</a>
        </div>
      </div>
    </section>
  );
}

/* ----- Footer ----- */
function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--lxy-primary-dark)', padding: '48px 24px 32px', color: 'rgba(255,255,255,0.4)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#02212e' }}>L</div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>Lawxy Certification</span>
            </div>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>
              Professional certification for AI-native legal practice. Built by Lawxy.
            </p>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Certification</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
              <a href="#curriculum" style={{ color: 'rgba(255,255,255,0.5)' }}>Curriculum</a>
              <a href="#assessment" style={{ color: 'rgba(255,255,255,0.5)' }}>Assessment</a>
              <a href="#credential" style={{ color: 'rgba(255,255,255,0.5)' }}>Credential</a>
              <a href="/verify" style={{ color: 'rgba(255,255,255,0.5)' }}>Verify a Credential</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Lawxy</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
              <a href="https://www.lawxyai.com" style={{ color: 'rgba(255,255,255,0.5)' }} target="_blank" rel="noopener">Lawxy AI Platform</a>
              <a href="https://www.lawxyai.com" style={{ color: 'rgba(255,255,255,0.5)' }} target="_blank" rel="noopener">About Lawxy</a>
              <a href="https://www.lawxyai.com" style={{ color: 'rgba(255,255,255,0.5)' }} target="_blank" rel="noopener">Contact</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>Terms of Service</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>Credential Policy</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: '0.75rem' }}>© 2026 Lawxy AI. All rights reserved.</div>
          <div style={{ fontSize: '0.75rem' }}>Learning is free. Certification is earned.</div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function CertificationLandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PhilosophySection />
        <LevelsSection />
        <AssessmentSection />
        <CredentialSection />
        <JourneySection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
