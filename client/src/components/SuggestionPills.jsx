import { useState } from 'react';

export default function SuggestionPills({ suggestions, onSend, onEdit }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  if (!suggestions || suggestions.length === 0) return null;

  // Editing mode for a specific pill
  if (editingIndex !== null) {
    return (
      <div style={{ alignSelf: 'flex-end', maxWidth: '88%', marginTop: 4 }}>
        <textarea
          value={editText}
          onChange={e => setEditText(e.target.value)}
          autoFocus
          rows={2}
          style={{
            width: '100%', minWidth: 280,
            background: 'var(--bg4)', border: '1px solid var(--indigo)',
            borderRadius: 10, padding: '8px 11px',
            color: 'var(--text)', fontSize: 13,
            fontFamily: 'DM Sans, sans-serif',
            resize: 'none', outline: 'none',
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (editText.trim()) { onSend(editText.trim()); setEditingIndex(null); }
            }
            if (e.key === 'Escape') setEditingIndex(null);
          }}
        />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 6 }}>
          <button
            onClick={() => setEditingIndex(null)}
            style={{
              background: 'transparent', border: '1px solid var(--border2)',
              borderRadius: 8, padding: '5px 12px', fontSize: 12.5,
              color: 'var(--text3)', cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => { if (editText.trim()) { onSend(editText.trim()); setEditingIndex(null); } }}
            style={{
              background: 'var(--indigo)', border: 'none',
              borderRadius: 8, padding: '5px 12px', fontSize: 12.5,
              color: '#fff', cursor: 'pointer',
            }}
          >
            Send ↗
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, maxWidth: '88%', alignSelf: 'flex-end' }}>
      <span style={{ fontSize: 10.5, color: 'var(--text3)' }}>suggested follow-ups</span>
      {suggestions.map((s, i) => (
        <SuggestionPill
          key={i}
          text={s}
          onSend={() => onSend(s)}
          onEdit={() => {
            setEditText(s);
            setEditingIndex(i);
          }}
        />
      ))}
    </div>
  );
}

function SuggestionPill({ text, onSend, onEdit }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSend}
      style={{
        background: hovered ? 'var(--bg5)' : 'var(--bg4)',
        border: `1px solid ${hovered ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.25)'}`,
        borderRadius: 20, padding: '7px 13px', fontSize: 12.5,
        color: 'var(--text2)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6, textAlign: 'right',
      }}
    >
      <span>{text}</span>
      <i
        className="ti ti-pencil"
        style={{ fontSize: 12, opacity: hovered ? 1 : 0, transition: 'opacity 150ms', color: 'var(--text3)' }}
        onClick={e => { e.stopPropagation(); onEdit(); }}
      />
    </button>
  );
}
