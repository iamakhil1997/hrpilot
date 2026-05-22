import { useEffect, useRef } from 'react';
import SuggestionPills from './SuggestionPills';

// Parse markdown-ish text to JSX
function renderText(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trimStart().startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} style={{
          background: 'var(--bg)', borderRadius: 8, padding: '10px 12px',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5,
          overflowX: 'auto', margin: '8px 0', whiteSpace: 'pre',
        }}>
          {codeLines.join('\n')}
        </pre>
      );
      i++;
      continue;
    }

    // Empty line → spacer
    if (line.trim() === '') {
      elements.push(<div key={`sp-${i}`} style={{ height: 6 }} />);
      i++;
      continue;
    }

    // Regular line — parse inline formatting
    elements.push(<div key={i}>{parseInline(line)}</div>);
    i++;
  }

  return elements;
}

function parseInline(text) {
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0, m;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));

    if (m[2] !== undefined) {
      // **bold**
      parts.push(<strong key={m.index} style={{ color: 'var(--indigo2)', fontWeight: 500 }}>{m[2]}</strong>);
    } else if (m[3] !== undefined) {
      // *italic*
      parts.push(<em key={m.index}>{m[3]}</em>);
    } else if (m[4] !== undefined) {
      // `code`
      parts.push(
        <code key={m.index} style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9em',
          background: 'var(--bg)', padding: '1px 5px', borderRadius: 4,
        }}>
          {m[4]}
        </code>
      );
    }

    last = m.index + m[0].length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function parseSuggestions(raw) {
  if (!raw) return { text: '', suggestions: [] };
  const match = raw.match(/<!--SUGGEST(?:ION|ATION)S?:(\[.*?\])-->/is);
  if (!match) return { text: raw, suggestions: [] };
  try {
    const suggestions = JSON.parse(match[1]);
    const text = raw.replace(/<!--SUGGEST(?:ION|ATION)S?:\[.*?\]-->/is, '').trim();
    return { text, suggestions };
  } catch {
    return { text: raw, suggestions: [] };
  }
}

function BotBubble({ content, isLast, onSend }) {
  const { text, suggestions } = parseSuggestions(content);

  return (
    <>
      <div style={{ display: 'flex', gap: 9, maxWidth: '88%' }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 500, color: 'var(--indigo2)',
          flexShrink: 0, marginTop: 3,
        }}>
          HR
        </div>
        <div style={{
          background: 'var(--bg3)', border: '1px solid var(--border)',
          borderRadius: '4px 14px 14px 14px',
          padding: '10px 13px', fontSize: 13.5, lineHeight: 1.7, color: 'var(--text)',
        }}>
          {renderText(text)}
        </div>
      </div>
      {isLast && suggestions.length > 0 && (
        <SuggestionPills suggestions={suggestions} onSend={onSend} />
      )}
    </>
  );
}

function UserBubble({ content }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 9, maxWidth: '88%', alignSelf: 'flex-end' }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'rgba(30,58,95,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, color: '#7DB3E8', flexShrink: 0, marginTop: 3,
      }}>
        You
      </div>
      <div style={{
        background: '#1E3A5F', border: '1px solid rgba(56,115,190,0.3)',
        borderRadius: '14px 4px 14px 14px',
        padding: '10px 13px', fontSize: 13.5, lineHeight: 1.7, color: '#C9DEFF',
      }}>
        {renderText(content)}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{ display: 'flex', gap: 9, maxWidth: '88%' }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 500, color: 'var(--indigo2)', flexShrink: 0, marginTop: 3,
      }}>
        HR
      </div>
      <div style={{
        background: 'var(--bg3)', border: '1px solid var(--border)',
        borderRadius: '4px 14px 14px 14px',
        padding: '13px 16px', display: 'flex', gap: 5, alignItems: 'center',
      }}>
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

export default function MessageList({ messages, isTyping, onSend }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div style={{
      flex: 1, overflowY: 'auto', padding: 16,
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      {messages.map((msg, i) =>
        msg.role === 'assistant'
          ? <BotBubble key={i} content={msg.content} isLast={i === messages.length - 1} onSend={onSend} />
          : <UserBubble key={i} content={msg.content} />
      )}
      {isTyping && <TypingBubble />}
      <div ref={endRef} />
    </div>
  );
}
