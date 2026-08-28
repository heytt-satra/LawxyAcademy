'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', organization: '', title: '', agreeTerms: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!form.agreeTerms) {
      setError('You must agree to the terms');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #02212e 0%, #01374d 100%)', padding: 24 }}>
        <div style={{ maxWidth: 480, width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 48, textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2 style={{ marginBottom: 12 }}>Account Created!</h2>
          <p style={{ color: 'var(--lxy-text-secondary)', marginBottom: 8 }}>
            Welcome to the Lawxy Certification Platform, {form.fullName.split(' ')[0]}.
          </p>
          <p style={{ color: 'var(--lxy-text-muted)', fontSize: '0.85rem', marginBottom: 32 }}>
            All learning content is free. Begin your journey to becoming a Lawxy Certified AI-Native Lawyer.
          </p>
          <a href="/dashboard" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}>Go to Dashboard</a>
          <a href="/courses" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Browse Courses</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #02212e 0%, #01374d 50%, #02212e 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(128,229,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Left Brand */}
      <div className="hide-mobile" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 80px', maxWidth: 550 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 48 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: '#02212e' }}>L</div>
          <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#fff' }}>Lawxy <span style={{ color: 'var(--lxy-cyan-accent)', fontWeight: 400 }}>Certification</span></span>
        </a>
        <h1 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.15, marginBottom: 20, letterSpacing: '-0.03em' }}>
          Begin your journey to<br />
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, color: 'var(--lxy-cyan-accent)' }}>AI-native legal practice</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 32 }}>
          Create a free account to access the complete curriculum. No payment required to learn.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            '55+ lessons across 12 modules — completely free',
            'Practical exercises with real legal scenarios',
            'Earn a verifiable professional credential',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
              <span style={{ color: 'var(--lxy-cyan-accent)' }}>✓</span> {item}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 460, backgroundColor: '#fff', borderRadius: 16, padding: 40, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Create Account</h2>
          <p style={{ color: 'var(--lxy-text-secondary)', fontSize: '0.9rem', marginBottom: 28 }}>
            Free access to all learning content
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label" htmlFor="fullName">Full Name</label>
              <input id="fullName" type="text" className="input" placeholder="Jane Smith" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="regEmail">Email Address</label>
              <input id="regEmail" type="email" className="input" placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="label" htmlFor="org">Organization <span style={{ color: 'var(--lxy-text-muted)', fontWeight: 400 }}>(optional)</span></label>
                <input id="org" type="text" className="input" placeholder="Firm / Company" value={form.organization} onChange={(e) => update('organization', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="title">Title <span style={{ color: 'var(--lxy-text-muted)', fontWeight: 400 }}>(optional)</span></label>
                <input id="title" type="text" className="input" placeholder="Associate" value={form.title} onChange={(e) => update('title', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="label" htmlFor="regPassword">Password</label>
              <input id="regPassword" type="password" className="input" placeholder="Min 8 characters" value={form.password} onChange={(e) => update('password', e.target.value)} required minLength={8} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" type="password" className="input" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} required />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 20 }}>
              <input type="checkbox" id="terms" checked={form.agreeTerms} onChange={(e) => update('agreeTerms', e.target.checked)} style={{ marginTop: 3 }} />
              <label htmlFor="terms" style={{ fontSize: '0.8rem', color: 'var(--lxy-text-secondary)', cursor: 'pointer' }}>
                I agree to the <a href="#" style={{ color: 'var(--lxy-teal-accent)' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--lxy-teal-accent)' }}>Privacy Policy</a>
              </label>
            </div>

            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 8, backgroundColor: 'rgba(255,101,45,0.06)', border: '1px solid rgba(255,101,45,0.15)', fontSize: '0.8rem', color: 'var(--lxy-orange-alert)', marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 16 }} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Free Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--lxy-text-secondary)' }}>
            Already have an account? <a href="/login" style={{ color: 'var(--lxy-teal-accent)', fontWeight: 500 }}>Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
