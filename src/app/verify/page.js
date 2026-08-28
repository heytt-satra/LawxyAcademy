'use client';

import { useState } from 'react';

/* Mock credential data for demonstration */
const MOCK_CREDENTIALS = {
  'LXY-AINL-2026-000184': {
    holderName: 'Sarah Chen',
    credentialName: 'Lawxy Certified AI-Native Lawyer',
    credentialId: 'LXY-AINL-2026-000184',
    level: 'Level 1 — Foundation',
    issuedAt: '2026-03-15',
    expiresAt: '2028-03-15',
    status: 'active',
    assessmentCompleted: 'Certification Exam — Level 1 Foundation',
    scoreStatus: 'Passed',
    specializations: [],
    skills: [
      'AI Fundamentals for Legal Practice',
      'LLM Understanding & Limitations',
      'Legal Prompting',
      'AI-Assisted Legal Research',
      'AI-Assisted Drafting & Summarization',
      'Contract Analysis with AI',
      'Case Analysis & Due Diligence',
      'AI Legal Workflows',
      'Hallucination Detection & Source Verification',
      'Confidentiality & Data Security',
      'Professional Responsibility & AI Ethics',
      'Human Oversight in AI-Assisted Legal Work',
    ],
    issuer: 'Lawxy AI',
  },
  'LXY-AINL-2026-000042': {
    holderName: 'James Rodriguez',
    credentialName: 'Lawxy Certified AI-Native Lawyer',
    credentialId: 'LXY-AINL-2026-000042',
    level: 'Level 2 — Advanced',
    issuedAt: '2026-06-01',
    expiresAt: '2028-06-01',
    status: 'active',
    assessmentCompleted: 'Certification Exam — Level 2 Advanced',
    scoreStatus: 'Passed',
    specializations: ['AI Contracting'],
    skills: [
      'Advanced AI-Assisted Legal Research',
      'AI-Assisted Contract Review',
      'AI-Assisted Litigation',
      'AI Due Diligence',
      'Advanced AI Legal Drafting',
      'RAG for Legal Knowledge',
      'AI Agents for Legal Work',
      'Multi-Step AI Legal Workflows',
      'AI Quality Control & Verification',
      'AI Governance for Legal Teams',
    ],
    issuer: 'Lawxy AI',
  },
};

const STATUS_CONFIG = {
  active: { label: 'Active', color: '#68cc58', icon: '✓', bgColor: 'rgba(104, 204, 88, 0.08)' },
  expired: { label: 'Expired', color: '#e6c08e', icon: '⏰', bgColor: 'rgba(230, 192, 142, 0.08)' },
  renewed: { label: 'Renewed', color: '#287796', icon: '🔄', bgColor: 'rgba(40, 119, 150, 0.08)' },
  revoked: { label: 'Revoked', color: '#ff652d', icon: '✕', bgColor: 'rgba(255, 101, 45, 0.08)' },
  suspended: { label: 'Suspended', color: '#a1a1a1', icon: '⚠', bgColor: 'rgba(161, 161, 161, 0.08)' },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function VerifyPage({ params }) {
  const [searchId, setSearchId] = useState('');
  const [credential, setCredential] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleVerify = (id) => {
    const lookupId = id || searchId;
    if (!lookupId.trim()) return;
    const found = MOCK_CREDENTIALS[lookupId.trim().toUpperCase()];
    if (found) {
      setCredential(found);
      setNotFound(false);
    } else {
      setCredential(null);
      setNotFound(true);
    }
    setSearched(true);
  };

  const status = credential ? STATUS_CONFIG[credential.status] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Compact Nav */}
      <nav style={{ backgroundColor: 'var(--lxy-primary-dark)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#02212e' }}>L</div>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>Lawxy <span style={{ color: 'var(--lxy-cyan-accent)', fontWeight: 400 }}>Verification</span></span>
        </a>
      </nav>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: 8 }}>Credential Verification</h1>
          <p style={{ color: 'var(--lxy-text-secondary)', fontSize: '0.9rem' }}>
            Enter a Credential ID to verify a Lawxy certification.
          </p>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <input
            type="text"
            className="input"
            placeholder="e.g. LXY-AINL-2026-000184"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.03em', fontSize: '0.95rem' }}
            aria-label="Credential ID"
          />
          <button className="btn btn-primary" onClick={() => handleVerify()} style={{ flexShrink: 0, padding: '12px 28px' }}>
            Verify
          </button>
        </div>

        {/* Demo links */}
        {!searched && (
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--lxy-text-muted)', marginBottom: 8 }}>Try these examples:</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {Object.keys(MOCK_CREDENTIALS).map((id) => (
                <button
                  key={id}
                  onClick={() => { setSearchId(id); handleVerify(id); }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--lxy-teal-accent)', background: 'var(--lxy-cyan-bg)', padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(40,119,150,0.15)', cursor: 'pointer' }}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Not Found */}
        {notFound && (
          <div style={{ textAlign: 'center', padding: 48, backgroundColor: '#fff', borderRadius: 12, border: '1px solid var(--lxy-border-light)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 style={{ marginBottom: 8, fontSize: '1.1rem' }}>Credential Not Found</h3>
            <p style={{ color: 'var(--lxy-text-secondary)', fontSize: '0.9rem' }}>
              No credential matching this ID was found. Please check the ID and try again.
            </p>
            <p style={{ color: 'var(--lxy-text-muted)', fontSize: '0.8rem', marginTop: 12 }}>
              If you believe this is an error, please contact <a href="mailto:support@lawxyai.com" style={{ color: 'var(--lxy-teal-accent)' }}>support@lawxyai.com</a>
            </p>
          </div>
        )}

        {/* Credential Found */}
        {credential && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            {/* Status Banner */}
            <div style={{
              padding: '16px 24px', borderRadius: '12px 12px 0 0',
              backgroundColor: status.bgColor,
              border: `1px solid ${status.color}30`,
              borderBottom: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: status.color }} />
                <span style={{ fontWeight: 600, color: status.color, fontSize: '0.9rem' }}>Credential {status.label}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>
                Verified {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            {/* Credential Card */}
            <div style={{ backgroundColor: '#fff', borderRadius: '0 0 12px 12px', border: '1px solid var(--lxy-border-light)', padding: 32 }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid var(--lxy-border-light)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: '#02212e' }}>L</div>
                <div>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--lxy-text-muted)' }}>Issued by {credential.issuer}</div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{credential.credentialName}</div>
                </div>
              </div>

              {/* Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lxy-text-muted)', marginBottom: 4 }}>Holder Name</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>{credential.holderName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lxy-text-muted)', marginBottom: 4 }}>Credential ID</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--lxy-teal-accent)' }}>{credential.credentialId}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lxy-text-muted)', marginBottom: 4 }}>Level</div>
                  <div style={{ fontSize: '0.9rem' }}>{credential.level}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lxy-text-muted)', marginBottom: 4 }}>Assessment</div>
                  <div style={{ fontSize: '0.9rem' }}>{credential.scoreStatus}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lxy-text-muted)', marginBottom: 4 }}>Issue Date</div>
                  <div style={{ fontSize: '0.9rem' }}>{formatDate(credential.issuedAt)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lxy-text-muted)', marginBottom: 4 }}>Valid Until</div>
                  <div style={{ fontSize: '0.9rem' }}>{formatDate(credential.expiresAt)}</div>
                </div>
              </div>

              {/* Specializations */}
              {credential.specializations.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lxy-text-muted)', marginBottom: 8 }}>Specializations</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {credential.specializations.map((s, i) => (
                      <span key={i} className="badge badge-level-2">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              <div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lxy-text-muted)', marginBottom: 10 }}>Skills Demonstrated</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 6 }}>
                  {credential.skills.map((skill, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--lxy-text-secondary)' }}>
                      <span style={{ color: 'var(--lxy-green-success)', fontSize: '0.7rem' }}>✓</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification footer */}
            <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.75rem', color: 'var(--lxy-text-muted)' }}>
              This verification was performed on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}.
              <br />Credentials are issued by <a href="https://www.lawxyai.com" style={{ color: 'var(--lxy-teal-accent)' }}>Lawxy AI</a>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
