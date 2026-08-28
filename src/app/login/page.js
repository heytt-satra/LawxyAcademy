'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate login
    setTimeout(() => {
      if (email === 'demo@lawxyai.com' && password === 'demo123') {
        window.location.href = '/dashboard';
      } else {
        setError('Invalid email or password. Try demo@lawxyai.com / demo123');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #02212e 0%, #01374d 50%, #02212e 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '30%', left: '30%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(128,229,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Left Brand Panel */}
      <div className="hide-mobile" style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '64px 80px', maxWidth: 550,
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 48 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: '#02212e' }}>L</div>
          <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#fff' }}>Lawxy <span style={{ color: 'var(--lxy-cyan-accent)', fontWeight: 400 }}>Certification</span></span>
        </a>
        <h1 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.15, marginBottom: 20, letterSpacing: '-0.03em' }}>
          Welcome back to your<br />
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, color: 'var(--lxy-cyan-accent)' }}>certification journey</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.7 }}>
          Continue learning, track your progress, and earn your Lawxy Certified AI-Native Lawyer credential.
        </p>
      </div>

      {/* Right Form Panel */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}>
        <div style={{
          width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 16,
          padding: 40, boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        }}>
          <div className="hide-desktop" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #80e5ff, #287796)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#02212e' }}>L</div>
            <span style={{ fontWeight: 600, color: 'var(--lxy-text-dark)' }}>Lawxy Certification</span>
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Sign In</h2>
          <p style={{ color: 'var(--lxy-text-secondary)', fontSize: '0.9rem', marginBottom: 32 }}>
            Access your learning dashboard
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="label" htmlFor="password">Password</label>
                <a href="#" style={{ fontSize: '0.75rem', color: 'var(--lxy-teal-accent)' }}>Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 8, backgroundColor: 'rgba(255,101,45,0.06)', border: '1px solid rgba(255,101,45,0.15)', fontSize: '0.8rem', color: 'var(--lxy-orange-alert)', marginBottom: 20 }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 20 }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--lxy-text-secondary)' }}>
            Don&apos;t have an account? <a href="/register" style={{ color: 'var(--lxy-teal-accent)', fontWeight: 500 }}>Create one — it&apos;s free</a>
          </div>
        </div>
      </div>
    </div>
  );
}
