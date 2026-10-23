import { useRef, useState } from 'react';

export default function KnowledgeBaseModal({ documents, onAdd, onAddStarter, onRemove, onClear, onClose }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async event => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;
    setBusy(true);
    setError('');
    try {
      await onAdd(files);
    } catch (err) {
      setError(err.message || 'Could not add those files.');
    } finally {
      setBusy(false);
    }
  };

  const handleStarterPack = async () => {
    setBusy(true);
    setError('');
    try {
      await onAddStarter();
    } catch (err) {
      setError(err.message || 'Could not add the India HR starter pack.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,.68)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <section role="dialog" aria-modal="true" aria-labelledby="knowledge-title" onClick={event => event.stopPropagation()} style={{ width: 'min(540px, 100%)', maxHeight: '88vh', overflowY: 'auto', background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--indigo2)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Company knowledge</div>
            <h2 id="knowledge-title" style={{ fontSize: 20, fontWeight: 500, marginTop: 5 }}>Give HRPilot your policies</h2>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'transparent', border: 0, color: 'var(--text2)', fontSize: 20 }}>×</button>
        </header>

        <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65 }}>
          Add your handbook, leave rules, benefits guide, or process documents. HRPilot will search these files for relevant passages when you ask a question.
        </p>

        <button onClick={handleStarterPack} disabled={busy} style={{ border: '1px solid var(--pill-bdr)', borderRadius: 10, padding: '11px 14px', background: 'var(--indigo-dim)', color: 'var(--indigo2)', fontSize: 13, fontWeight: 500, cursor: busy ? 'wait' : 'pointer' }}>
          {busy ? 'Adding starter pack…' : '＋ Add India HR official-source starter pack'}
        </button>
        <p style={{ color: 'var(--text3)', fontSize: 11, lineHeight: 1.5, marginTop: -10 }}>Includes dated references for central labour codes, POSH confidentiality, and DPDP commencement. Not legal advice; State and sector rules may apply.</p>

        <div style={{ padding: 12, borderRadius: 10, background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)', color: '#fcdba0', fontSize: 12, lineHeight: 1.6 }}>
          Files stay in this browser on this device. Your conversation and matching passages are sent to Groq when you ask something. Do not upload employee names, payroll details, health information, grievance or POSH records, or other sensitive personal data. This is a shared public app without company accounts or access controls.
        </div>

        <input ref={inputRef} type="file" accept=".txt,.md,.csv,.json,text/plain,text/markdown,text/csv,application/json" multiple onChange={handleFiles} style={{ display: 'none' }} />
        <button onClick={() => inputRef.current?.click()} disabled={busy} style={{ border: '1px solid var(--pill-bdr)', borderRadius: 10, padding: '11px 14px', background: 'var(--indigo-dim)', color: 'var(--indigo2)', fontSize: 13, fontWeight: 500 }}>
          {busy ? 'Adding files…' : '＋ Add documents'}
        </button>
        <p style={{ color: 'var(--text3)', fontSize: 11, lineHeight: 1.5, marginTop: -10 }}>TXT, Markdown, CSV, or JSON · up to 1 MB per file · up to 20 files. Copy text out of PDFs or Word files into one of these formats first.</p>

        {error && <p role="alert" style={{ color: '#fca5a5', fontSize: 12 }}>{error}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>
            <span>Your documents ({documents.length})</span>
            {documents.length > 0 && <button onClick={onClear} style={{ border: 0, background: 'transparent', color: '#fca5a5', fontSize: 11 }}>Remove all</button>}
          </div>
          {documents.length === 0 ? <p style={{ color: 'var(--text3)', fontSize: 12, padding: '10px 0' }}>No documents added yet.</p> : documents.map(doc => (
            <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '9px 11px', background: 'var(--bg4)', borderRadius: 8 }}>
              <span title={doc.name} style={{ color: 'var(--text)', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</span>
              <button onClick={() => onRemove(doc.id)} aria-label={`Remove ${doc.name}`} style={{ border: 0, background: 'transparent', color: 'var(--text3)', fontSize: 17, flexShrink: 0 }}>×</button>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ border: 0, borderRadius: 9, padding: 10, background: 'var(--bg5)', color: 'var(--text)' }}>Done</button>
      </section>
    </div>
  );
}
