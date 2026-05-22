import { useState } from 'react';

const TOOLS = {
  warning: {
    title: 'Warning Letter',
    fields: [
      { key: 'ename',    label: 'Employee Name',      placeholder: 'e.g. Rahul Sharma' },
      { key: 'incident', label: 'Incident / Violation', placeholder: 'e.g. repeated tardiness' },
      { key: 'date',     label: 'Date of Incident',    placeholder: 'e.g. 18 May 2026' },
      { key: 'company',  label: 'Company Name',        placeholder: 'e.g. Synctric Pvt Ltd' },
    ],
    buildPrompt: f =>
      `Draft a formal written warning letter. Employee: ${f.ename}, Incident: ${f.incident}, Date: ${f.date}, Company: ${f.company}. Professional, firm but fair, include acknowledgment section, use [PLACEHOLDER] for remaining details.`,
  },
  pip: {
    title: 'PIP Draft',
    fields: [
      { key: 'ename',    label: 'Employee Name',    placeholder: 'e.g. Priya Menon' },
      { key: 'role',     label: 'Designation',      placeholder: 'e.g. Senior Engineer' },
      { key: 'issue',    label: 'Performance Issue', placeholder: 'e.g. missed deadlines, poor quality' },
      { key: 'timeline', label: 'Duration',          placeholder: '', type: 'select', options: ['30 Days', '60 Days', '90 Days'] },
    ],
    buildPrompt: f =>
      `Create a Performance Improvement Plan. Employee: ${f.ename}, Role: ${f.role}, Issue: ${f.issue}, Duration: ${f.timeline}. Include: performance gaps, measurable goals, support provided, review checkpoints, consequence clause. Use [PLACEHOLDER] for specifics.`,
  },
  jd: {
    title: 'Job Description',
    fields: [
      { key: 'role',    label: 'Role Title',           placeholder: 'e.g. Product Manager' },
      { key: 'company', label: 'Company / Industry',   placeholder: 'e.g. FinTech startup' },
      { key: 'exp',     label: 'Experience Required',  placeholder: 'e.g. 4–6 years' },
    ],
    buildPrompt: f =>
      `Write a complete job description for: ${f.role}. Company: ${f.company}, Experience: ${f.exp}. Include: role overview, 8-10 responsibilities, required skills, good-to-have, qualifications. Specific and real — not generic corporate copy.`,
  },
  onboarding: {
    title: '30-60-90 Day Onboarding Plan',
    fields: [
      { key: 'role', label: 'Role / Designation', placeholder: 'e.g. Customer Success Manager' },
      { key: 'dept', label: 'Department',          placeholder: 'e.g. Sales & Partnerships' },
    ],
    buildPrompt: f =>
      `Create a detailed 30-60-90 day onboarding plan for a new ${f.role} joining ${f.dept}. For each phase: goals, activities, people to meet, deliverables, success metrics. Practical and specific.`,
  },
  exit: {
    title: 'Exit Interview Questions',
    fields: [
      { key: 'role',   label: 'Departing Role',      placeholder: 'e.g. Senior Analyst' },
      { key: 'reason', label: 'Known Reason (optional)', placeholder: 'e.g. better offer' },
    ],
    buildPrompt: f =>
      `Generate a comprehensive exit interview question set for a departing ${f.role}. Reason: ${f.reason || 'not specified'}. Cover: reasons for leaving, job satisfaction, manager relationship, team dynamics, culture, suggestions. Mix open-ended and scaled questions.`,
  },
};

const inputStyle = {
  width: '100%', background: 'var(--bg4)',
  border: '1px solid var(--border2)', borderRadius: 8,
  padding: '8px 11px', fontSize: 13, color: 'var(--text)',
  fontFamily: 'DM Sans, sans-serif', outline: 'none',
};

export default function QuickToolModal({ toolKey, onClose }) {
  const tool = TOOLS[toolKey];
  const [fields, setFields] = useState(
    Object.fromEntries(tool.fields.map(f => [f.key, f.options ? f.options[0] : '']))
  );
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!tool) return null;

  const setField = (key, val) => setFields(prev => ({ ...prev, [key]: val }));

  const handleGenerate = async () => {
    setLoading(true);
    setOutput('');
    try {
      const toolPrompt = tool.buildPrompt(fields);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolPrompt }),
      });
      const data = await res.json();
      // Strip suggestion comment if present
      const cleaned = (data.reply || '').replace(/<!--SUGGESTIONS:\[.*?\]-->/s, '').trim();
      setOutput(cleaned);
    } catch {
      setOutput('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 999,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 460, background: 'var(--bg3)',
          border: '1px solid var(--border2)', borderRadius: 16, padding: 20,
          display: 'flex', flexDirection: 'column', gap: 14,
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 500 }}>{tool.title}</span>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text3)', padding: 4, borderRadius: 6, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <i className="ti ti-x" style={{ fontSize: 16 }} />
          </button>
        </div>

        {/* Fields */}
        {tool.fields.map(f => (
          <div key={f.key}>
            <label style={{ display: 'block', fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>{f.label}</label>
            {f.type === 'select' ? (
              <select
                value={fields[f.key]}
                onChange={e => setField(f.key, e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                onBlur={e => e.target.style.borderColor = 'var(--border2)'}
              >
                {f.options.map(o => <option key={o} value={o} style={{ background: 'var(--bg3)' }}>{o}</option>)}
              </select>
            ) : (
              <input
                type="text"
                value={fields[f.key]}
                onChange={e => setField(f.key, e.target.value)}
                placeholder={f.placeholder}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                onBlur={e => e.target.style.borderColor = 'var(--border2)'}
              />
            )}
          </div>
        ))}

        {/* Output */}
        {output && (
          <div>
            <div style={{
              maxHeight: 200, overflowY: 'auto',
              background: 'var(--bg)', border: '1px solid var(--border)',
              borderRadius: 8, padding: 12, fontSize: 13,
              color: 'var(--text2)', whiteSpace: 'pre-wrap',
              fontFamily: 'DM Sans, sans-serif', lineHeight: 1.65,
            }}>
              {output}
            </div>
            <button
              onClick={handleCopy}
              style={{
                marginTop: 8, display: 'flex', alignItems: 'center', gap: 5,
                background: 'transparent', border: '1px solid var(--border2)',
                borderRadius: 8, padding: '5px 12px', fontSize: 12.5,
                color: 'var(--text2)', cursor: 'pointer',
              }}
            >
              <i className="ti ti-copy" style={{ fontSize: 14 }} />
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: '1px solid var(--border2)',
              borderRadius: 8, padding: '7px 16px', fontSize: 13,
              color: 'var(--text3)', cursor: 'pointer',
            }}
          >
            Close
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              background: loading ? 'var(--bg5)' : 'var(--indigo)',
              border: 'none', borderRadius: 8, padding: '7px 16px',
              fontSize: 13, color: loading ? 'var(--text3)' : '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Generating…' : output ? 'Regenerate' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
}
