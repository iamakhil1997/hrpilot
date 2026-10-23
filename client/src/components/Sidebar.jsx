import { useNavigate } from 'react-router-dom';

const MODULES = [
  { key: 'policy',      icon: 'ti-shield-check',    label: 'Policy & Compliance',    placeholder: 'Ask about policies, law, compliance, procedures.' },
  { key: 'performance', icon: 'ti-chart-line',       label: 'Performance Management', placeholder: 'KRAs, PIPs, appraisals, review conversations.' },
  { key: 'talent',      icon: 'ti-users',            label: 'Talent Acquisition',     placeholder: 'Hiring, JDs, interviews, offers, onboarding.' },
  { key: 'relations',   icon: 'ti-heart-handshake',  label: 'Employee Relations',     placeholder: 'Conflicts, grievances, disciplinary actions.' },
  { key: 'payroll',     icon: 'ti-credit-card',      label: 'Payroll & Benefits',     placeholder: 'Salary, CTC, PF, ESI, gratuity, benefits.' },
  { key: 'coach',       icon: 'ti-school',           label: 'Manager Coach',          placeholder: 'Burnout, feedback, team conflicts, reviews.' },
];

const QUICK_TOOLS = [
  { key: 'warning',    icon: 'ti-alert-triangle',  label: 'Warning Letter' },
  { key: 'pip',        icon: 'ti-clipboard-list',  label: 'PIP Draft' },
  { key: 'jd',         icon: 'ti-file-text',       label: 'Job Description' },
  { key: 'onboarding', icon: 'ti-rocket',           label: 'Onboarding Plan' },
  { key: 'exit',       icon: 'ti-door-exit',        label: 'Exit Interview' },
];

export default function Sidebar({ activeModule, setActiveModule, setActiveModal }) {
  const navigate = useNavigate();

  return (
    <div style={{
      width: 210, flexShrink: 0,
      background: 'var(--bg2)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', height: '100%',
      overflow: 'hidden',
    }}>
      {/* Logo block */}
      <div style={{ padding: '18px 14px 12px', borderBottom: '1px solid var(--border)' }}>
        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent', border: 'none', color: 'var(--text3)',
            fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center',
            gap: 4, marginBottom: 12, padding: 0,
          }}
        >
          <i className="ti ti-arrow-left" style={{ fontSize: 12 }} />
          Back to Home
        </button>

        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, color: 'var(--indigo2)', fontWeight: 500, marginBottom: 2 }}>
          HRPilot
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>AI HR Business Partner</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--green)', boxShadow: '0 0 0 2px var(--green-dim)',
            display: 'inline-block',
          }} />
          <span style={{ fontSize: 11, color: 'var(--green)' }}>Available now</span>
        </div>
      </div>

      {/* Modules */}
      <div style={{ padding: '14px 10px 0', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6, padding: '0 4px' }}>
          MODULES
        </div>
        {MODULES.map(m => (
          <button
            key={m.key}
            onClick={() => setActiveModule(m)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px', borderRadius: 10, marginBottom: 2,
              background: activeModule.key === m.key ? 'var(--indigo-dim)' : 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              color: activeModule.key === m.key ? 'var(--indigo2)' : 'var(--text2)',
              fontSize: 13, transition: 'background 150ms, color 150ms',
            }}
            onMouseEnter={e => { if (activeModule.key !== m.key) e.currentTarget.style.background = 'var(--bg4)'; }}
            onMouseLeave={e => { if (activeModule.key !== m.key) e.currentTarget.style.background = 'transparent'; }}
          >
            <i className={`ti ${m.icon}`} style={{ fontSize: 15, flexShrink: 0 }} />
            <span>{m.label}</span>
          </button>
        ))}

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} />

        {/* Quick Tools */}
        <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6, padding: '0 4px' }}>
          QUICK TOOLS
        </div>
        {QUICK_TOOLS.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveModal(t.key)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 7,
              padding: '7px 10px', borderRadius: 10, marginBottom: 2,
              background: 'transparent', border: 'none', cursor: 'pointer',
              textAlign: 'left', color: 'var(--text3)', fontSize: 12,
              transition: 'background 150ms, color 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg4)'; e.currentTarget.style.color = 'var(--text2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            <i className={`ti ${t.icon}`} style={{ fontSize: 14, flexShrink: 0 }} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: 'var(--green)' }}>Free to use · No limits</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>Only HR questions handled here.</div>
        <button
          onClick={() => navigate('/contact')}
          style={{
            marginTop: 10, padding: 0, background: 'transparent', border: 'none',
            color: 'var(--indigo2)', fontSize: 11, cursor: 'pointer', textAlign: 'left',
          }}
        >
          Contact developer
        </button>
      </div>
    </div>
  );
}

export { MODULES };
