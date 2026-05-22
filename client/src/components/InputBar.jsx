import { useState, useRef, useEffect } from 'react';

export default function InputBar({ onSend, isTyping, placeholder = 'Ask about policies, law, compliance, procedures.' }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 100) + 'px';
  }, [value]);

  const handleSend = () => {
    if (!value.trim() || isTyping) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      borderTop: '1px solid var(--border)', padding: '12px 14px',
      display: 'flex', gap: 9, alignItems: 'flex-end',
      background: 'var(--bg)',
    }}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        style={{
          flex: 1,
          background: 'var(--bg4)', border: '1px solid var(--border2)',
          borderRadius: 10, padding: '9px 12px',
          fontFamily: 'DM Sans, sans-serif', fontSize: 13.5,
          color: 'var(--text)', resize: 'none',
          minHeight: 40, maxHeight: 100, outline: 'none',
          lineHeight: 1.5,
          transition: 'border-color 150ms ease',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
        onBlur={e => e.target.style.borderColor = 'var(--border2)'}
      />
      <button
        onClick={handleSend}
        disabled={isTyping || !value.trim()}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: isTyping || !value.trim() ? 'var(--bg5)' : 'var(--indigo)',
          border: 'none', color: isTyping || !value.trim() ? 'var(--text3)' : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: isTyping || !value.trim() ? 'not-allowed' : 'pointer',
          flexShrink: 0,
          transition: 'background 150ms, transform 150ms',
        }}
        onMouseEnter={e => { if (!isTyping && value.trim()) { e.currentTarget.style.background = '#5254CC'; e.currentTarget.style.transform = 'scale(1.05)'; } }}
        onMouseLeave={e => { e.currentTarget.style.background = isTyping || !value.trim() ? 'var(--bg5)' : 'var(--indigo)'; e.currentTarget.style.transform = 'scale(1)'; }}
        onMouseDown={e => { if (!isTyping && value.trim()) e.currentTarget.style.transform = 'scale(0.95)'; }}
        onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <i className="ti ti-send" style={{ fontSize: 16 }} />
      </button>
    </div>
  );
}
