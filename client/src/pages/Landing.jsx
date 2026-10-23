import { Link, useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const goToChat = () => navigate('/chat');

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 60,
        background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--indigo2)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, color: 'var(--indigo2)', fontWeight: 500 }}>HRPilot</span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 28, fontSize: 14, color: 'var(--text2)' }} className="nav-links">
          <a href="#" style={{ color: 'var(--text)' }}>Home</a>
          <a href="#features">Features</a>
          <a href="#modules">Modules</a>
          <a href="#howitworks">About</a>
          <Link to="/contact" style={{ color: 'var(--text2)', textDecoration: 'none' }}>Contact</Link>
        </div>

        {/* CTA */}
        <button
          onClick={goToChat}
          style={{
            background: 'var(--indigo)', color: '#fff', border: 'none',
            padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Start Free →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', paddingTop: 80,
        paddingBottom: 60, textAlign: 'center', position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.2)',
          color: 'var(--indigo3)', borderRadius: 20, padding: '5px 14px',
          fontSize: 12.5, marginBottom: 28, position: 'relative', zIndex: 1,
        }}>
          ✦ Free to use · No signup required
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 58, fontWeight: 500, letterSpacing: '-1.5px',
          lineHeight: 1.1, marginBottom: 20, position: 'relative', zIndex: 1,
          maxWidth: 680,
        }}>
          HR work,<br />
          supported by <span style={{ color: 'var(--indigo2)' }}>AI</span>
        </h1>

        {/* Sub-text */}
        <p style={{
          fontSize: 17, color: 'var(--text2)', fontWeight: 300,
          maxWidth: 520, lineHeight: 1.65, marginBottom: 36,
          position: 'relative', zIndex: 1,
        }}>
          An AI assistant for HR questions and first-draft documents, with clear limits for sensitive employee decisions.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <button
            onClick={goToChat}
            style={{
              background: 'var(--indigo)', color: '#fff', border: 'none',
              padding: '12px 26px', borderRadius: 10, fontSize: 15, fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Start Free Consultation →
          </button>
          <a
            href="#howitworks"
            style={{
              background: 'transparent', color: 'var(--text2)',
              border: '1px solid var(--border2)',
              padding: '12px 26px', borderRadius: 10, fontSize: 15,
              cursor: 'pointer', display: 'inline-block',
            }}
          >
            ▶ See How It Works
          </a>
        </div>

        {/* Trust strip */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', marginTop: 24, position: 'relative', zIndex: 1 }}>
          {['Indian Labour Law', 'POSH & Compliance', 'PF · ESI · Gratuity', '100% Free Forever'].map(t => (
            <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--text3)' }}>
              <i className="ti ti-circle-check" style={{ color: 'var(--green)', fontSize: 13 }} />
              {t}
            </span>
          ))}
        </div>

        {/* Chat preview card */}
        <div style={{
          maxWidth: 660, width: '100%', marginTop: 52, position: 'relative', zIndex: 1,
          background: 'var(--bg4)', border: '1px solid var(--border2)', borderRadius: 16,
          overflow: 'hidden', padding: '0 0 16px',
        }}>
          {/* Card topbar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px', borderBottom: '1px solid var(--border)',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 500, color: 'var(--indigo2)',
            }}>HR</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>HRPilot</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 2px var(--green-dim)' }} />
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>Online now</span>
            </div>
          </div>
          {/* Messages */}
          <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
            {/* Bot message 1 */}
            <div style={{ display: 'flex', gap: 9, maxWidth: '88%' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--indigo2)', flexShrink: 0, marginTop: 3 }}>HR</div>
              <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '4px 14px 14px 14px', padding: '10px 13px', fontSize: 13.5, lineHeight: 1.7, color: 'var(--text)' }}>
                Hey, what's going on? I'm here for anything HR — policies, performance, hiring, conflicts, compliance. What do you need to work through?
              </div>
            </div>
            {/* User message */}
            <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 9, maxWidth: '88%', alignSelf: 'flex-end' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(30,58,95,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#7DB3E8', flexShrink: 0, marginTop: 3 }}>You</div>
              <div style={{ background: '#1E3A5F', border: '1px solid rgba(56,115,190,0.3)', borderRadius: '14px 4px 14px 14px', padding: '10px 13px', fontSize: 13.5, lineHeight: 1.7, color: '#C9DEFF' }}>
                One of my employees has been missing targets for 3 months. How do I handle this?
              </div>
            </div>
            {/* Bot message 2 */}
            <div style={{ display: 'flex', gap: 9, maxWidth: '88%' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--indigo2)', flexShrink: 0, marginTop: 3 }}>HR</div>
              <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '4px 14px 14px 14px', padding: '10px 13px', fontSize: 13.5, lineHeight: 1.7, color: 'var(--text)' }}>
                Before going the formal route, have you had a direct conversation with them about it? Three months of consistent underperformance usually signals something specific — a skill gap, unclear expectations, or something personal. The first step is always an honest one-on-one where you lay out the numbers and ask them what's getting in the way...
              </div>
            </div>
          </div>
          {/* Suggestion pills */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', padding: '12px 16px 0', flexWrap: 'wrap' }}>
            {['How do I structure a PIP for them?', 'What if they deny the problem?'].map(p => (
              <button
                key={p}
                onClick={goToChat}
                style={{
                  background: 'var(--bg5)', border: '1px solid rgba(99,102,241,0.25)',
                  borderRadius: 16, padding: '6px 13px', fontSize: 12,
                  color: 'var(--text3)', cursor: 'pointer',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background: 'var(--bg2)', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--indigo2)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>WHAT HRPILOT DOES</div>
          <h2 style={{ fontSize: 38, fontWeight: 500, marginBottom: 14 }}>Practical support across HR</h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', fontWeight: 300, maxWidth: 580, margin: '0 auto 48px' }}>
            Get practical starting points for everyday HR work. Sensitive employee decisions need review by a qualified human.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="features-grid">
            {[
              { icon: 'ti-brain', title: 'Understands context', desc: 'Reads why you\'re asking, not just what you asked. Gives advice that fits your actual situation.' },
              { icon: 'ti-shield-check', title: 'India-focused HR guidance', desc: 'General HR guidance on common Indian workplace topics. Rules vary by location and change; verify current law before acting.' },
              { icon: 'ti-file-text', title: 'Document drafts', desc: 'Create first drafts of HR letters, plans, job descriptions, and policies. Review with qualified HR or legal support before use.' },
              { icon: 'ti-messages', title: 'Context within this chat', desc: 'HRPilot uses earlier messages in the current chat to answer follow-ups. Reset the chat to clear that context.' },
              { icon: 'ti-bulb', title: 'Smart follow-up suggestions', desc: 'After every answer, HRPilot suggests the questions you\'d naturally want to ask next. Click to send or edit freely.' },
              { icon: 'ti-lock', title: 'Privacy-aware by design', desc: 'Chat history is held in this page and is not saved to an HRPilot account. Messages are sent to our AI provider; avoid names and employee identifiers.' },
            ].map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.7, maxWidth: 760, margin: '22px auto 0' }}>
            This page keeps chat history in browser memory and does not save it to an HRPilot account. Messages are sent to Groq to generate replies. Groq says inference requests are not retained by default, but inputs and outputs may be temporarily logged for reliability or abuse review for up to 30 days. HRPilot has not verified its account-level retention settings. Avoid names and identifiable employee details.{' '}
            <a href="https://console.groq.com/docs/your-data" target="_blank" rel="noreferrer" style={{ color: 'var(--indigo2)' }}>Groq data handling</a>
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="howitworks" style={{ padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, color: 'var(--indigo2)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>HOW IT WORKS</div>
          <h2 style={{ fontSize: 38, fontWeight: 500, marginBottom: 14 }}>Simple as having a conversation</h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', fontWeight: 300, marginBottom: 60 }}>
            No setup. Ask a question and get a practical starting point. Verify consequential guidance before acting.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 0, position: 'relative' }} className="steps-row">
            {[
              { num: '01', title: 'Ask your question', desc: 'Type any HR situation — a policy question, a difficult employee, a compliance concern, a document you need.' },
              { num: '02', title: 'Get a practical response', desc: 'HRPilot uses the chat context to offer a clear starting point and notes when more information or human review is needed.' },
              { num: '03', title: 'Go deeper or act', desc: 'Use smart follow-up suggestions, generate a document, or refine the advice until you\'re ready to act.' },
            ].map((s, i) => (
              <div key={s.num} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, position: 'relative' }}>
                {/* Connector line */}
                {i < 2 && (
                  <div style={{
                    position: 'absolute', top: 28, left: '50%', width: '100%',
                    height: 1, background: 'var(--border2)', zIndex: 0,
                  }} />
                )}
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--bg4)', border: '1px solid var(--border2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 16, color: 'var(--indigo2)',
                  position: 'relative', zIndex: 1,
                }}>
                  {s.num}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13.5, color: 'var(--text3)', lineHeight: 1.65, maxWidth: 220, margin: '0 auto' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section id="modules" style={{ background: 'var(--bg2)', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ fontSize: 11, color: 'var(--indigo2)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>SPECIALIST MODULES</div>
          <h2 style={{ fontSize: 38, fontWeight: 500, marginBottom: 14 }}>Tools for common HR workflows</h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', fontWeight: 300, marginBottom: 40 }}>
            Switch between modules for context-aware advice in each area of HR.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 40 }} className="modules-grid">
            {[
              { icon: 'ti-shield-check', title: 'Policy & Compliance', desc: 'HR policies, labour law, POSH, statutory compliance, legal docs.' },
              { icon: 'ti-chart-line', title: 'Performance Management', desc: 'KRA setting, PIP execution, appraisal conversations, reviews.' },
              { icon: 'ti-users', title: 'Talent Acquisition', desc: 'JD writing, interview frameworks, offer structuring, onboarding.' },
              { icon: 'ti-heart-handshake', title: 'Employee Relations', desc: 'Conflict resolution, grievances, disciplinary procedures.' },
              { icon: 'ti-credit-card', title: 'Payroll & Benefits', desc: 'CTC structuring, PF/ESI, gratuity, salary revision guidance.' },
              { icon: 'ti-school', title: 'Manager Coach', desc: 'Burnout support, feedback coaching, team conflict handling.' },
            ].map(m => (
              <div key={m.title} style={{
                background: 'var(--bg4)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '16px 18px',
                display: 'flex', alignItems: 'center', gap: 13, textAlign: 'left',
                cursor: 'pointer',
              }}
                onClick={goToChat}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: 'var(--indigo-dim)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <i className={`ti ${m.icon}`} style={{ color: 'var(--indigo2)', fontSize: 18 }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{m.title}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text3)' }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick tools strip */}
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16 }}>
            Quick document tools — generate in seconds
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: 'ti-alert-triangle', label: 'Warning Letter' },
              { icon: 'ti-clipboard-list', label: 'PIP Draft' },
              { icon: 'ti-file-text', label: 'Job Description' },
              { icon: 'ti-rocket', label: 'Onboarding Plan' },
              { icon: 'ti-door-exit', label: 'Exit Interview Questions' },
            ].map(t => (
              <button
                key={t.label}
                onClick={goToChat}
                style={{
                  background: 'var(--bg4)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '9px 16px', fontSize: 13,
                  color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6,
                  cursor: 'pointer',
                }}
              >
                <i className={`ti ${t.icon}`} style={{ fontSize: 15 }} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          maxWidth: 640, width: '100%', textAlign: 'center',
          background: 'var(--bg4)', border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 20, padding: '52px 40px',
        }}>
          <h2 style={{ fontSize: 32, fontWeight: 500, marginBottom: 14 }}>Start your first HR conversation free</h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', fontWeight: 300, marginBottom: 8 }}>
            No signup. No limits. No credit card. Ask your toughest HR question right now.
          </p>
          <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 28 }}>
            Completely free · Built by Akhil P Kumar · Kochi, Kerala
          </p>
          <button
            onClick={goToChat}
            style={{
              background: 'var(--indigo)', color: '#fff', border: 'none',
              padding: '12px 28px', borderRadius: 10, fontSize: 15, fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Try HRPilot Now →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '28px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'var(--text3)',
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--indigo2)' }}>HRPilot</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="#" style={{ color: 'var(--text3)' }}>Privacy</a>
          <a href="#" style={{ color: 'var(--text3)' }}>Terms</a>
          <Link to="/contact" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Contact developer</Link>
        </div>
        <span>© 2025 HRPilot · Built by Akhil P Kumar · Kochi, Kerala</span>
      </footer>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          h1 { font-size: 34px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .modules-grid { grid-template-columns: 1fr !important; }
          .steps-row { flex-direction: column !important; align-items: center !important; gap: 32px !important; }
          .steps-row > div > div:first-child { position: static !important; width: 0 !important; }
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div style={{
      background: 'var(--bg4)', border: '1px solid var(--border)',
      borderRadius: 14, padding: 22, textAlign: 'left',
      transition: 'border-color 150ms ease',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'var(--indigo-dim)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', marginBottom: 14,
      }}>
        <i className={`ti ${icon}`} style={{ color: 'var(--indigo2)', fontSize: 18 }} />
      </div>
      <h3 style={{ fontSize: 14.5, fontWeight: 500, marginBottom: 7 }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}
