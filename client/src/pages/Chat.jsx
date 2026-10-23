import { useState, useEffect } from 'react';
import Sidebar, { MODULES } from '../components/Sidebar';
import MessageList from '../components/MessageList';
import InputBar from '../components/InputBar';
import QuickToolModal from '../components/QuickToolModal';
import KnowledgeBaseModal from '../components/KnowledgeBaseModal';
import { addIndiaHRStarterPack, addKnowledgeFiles, clearKnowledgeDocuments, loadKnowledgeDocuments, removeKnowledgeDocument, retrieveKnowledge } from '../lib/knowledgeBase';

const WELCOME =
  "Hey, what's going on? I'm here for anything HR — policies, performance, hiring, payroll, conflicts, compliance — whatever you need to work through. What's on your mind?";

const STARTER_CHIPS = [
  'Underperformance',
  'Termination process',
  'POSH complaint',
  'Salary revision',
  'Team burnout',
];

const callHR = async (messages, moduleKey, knowledgeContext) => {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, module: moduleKey, knowledgeContext }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'HRPilot could not reach its AI service. Please try again in a moment.');
  return data.reply;
};

export default function Chat() {
  const [activeModule, setActiveModuleRaw] = useState(MODULES[0]);
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }]);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [knowledgeDocuments, setKnowledgeDocuments] = useState(loadKnowledgeDocuments);
  const [showKnowledge, setShowKnowledge] = useState(false);

  // When module changes, reset chat
  const setActiveModule = (mod) => {
    setActiveModuleRaw(mod);
    setMessages([{ role: 'assistant', content: WELCOME }]);
    setConversationHistory([]);
    setShowChips(true);
  };

  const handleSend = async (text) => {
    if (!text.trim() || isTyping) return;

    setShowChips(false);

    const userMsg = { role: 'user', content: text.trim() };
    const newHistory = [...conversationHistory, userMsg];

    setMessages(prev => [...prev, userMsg]);
    setConversationHistory(newHistory);
    setIsTyping(true);

    try {
      const retrievalQuery = newHistory.filter(message => message.role === 'user').slice(-3).map(message => message.content).join(' ');
      const knowledgeContext = retrieveKnowledge(retrievalQuery, knowledgeDocuments);
      const rawReply = await callHR(newHistory, activeModule.key, knowledgeContext);
      setConversationHistory(prev => [...prev, { role: 'assistant', content: rawReply }]);
      setMessages(prev => [...prev, { role: 'assistant', content: rawReply }]);
    } catch (error) {
      const errMsg = { role: 'assistant', content: error.message || "Hit a snag — give it another shot." };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([{ role: 'assistant', content: WELCOME }]);
    setConversationHistory([]);
    setShowChips(true);
  };

  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100vw',
      background: 'var(--bg)', overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        setActiveModal={setActiveModal}
        knowledgeCount={knowledgeDocuments.length}
        onOpenKnowledge={() => setShowKnowledge(true)}
      />

      {/* Main chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

        {/* Topbar */}
        <div style={{
          height: 54, borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 500, color: 'var(--indigo2)',
            }}>
              HR
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{activeModule.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                {knowledgeDocuments.length ? `${knowledgeDocuments.length} company source${knowledgeDocuments.length === 1 ? '' : 's'} · matching excerpts go to Groq` : 'Messages go to Groq · avoid employee names and identifiers'}
              </div>
            </div>
          </div>
          <button
            onClick={handleReset}
            title="New chat"
            style={{
              background: 'transparent', border: 'none',
              color: 'var(--text3)', cursor: 'pointer',
              width: 32, height: 32, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg4)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            <i className="ti ti-refresh" style={{ fontSize: 17 }} />
          </button>
        </div>

        {/* Messages */}
        <MessageList messages={messages} isTyping={isTyping} onSend={handleSend} />

        {/* Starter chips */}
        {showChips && (
          <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {STARTER_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                style={{
                  background: 'transparent', border: '1px solid var(--border2)',
                  borderRadius: 20, padding: '5px 12px', fontSize: 12,
                  color: 'var(--text2)', cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--indigo-dim)';
                  e.currentTarget.style.borderColor = 'var(--pill-bdr)';
                  e.currentTarget.style.color = 'var(--indigo2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--border2)';
                  e.currentTarget.style.color = 'var(--text2)';
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <InputBar
          onSend={handleSend}
          isTyping={isTyping}
          placeholder={activeModule.placeholder}
        />
      </div>

      {/* Quick tool modal */}
      {activeModal && (
        <QuickToolModal toolKey={activeModal} onClose={() => setActiveModal(null)} />
      )}

      {showKnowledge && (
        <KnowledgeBaseModal
          documents={knowledgeDocuments}
          onAdd={async files => setKnowledgeDocuments(await addKnowledgeFiles(files))}
          onAddStarter={async () => setKnowledgeDocuments(await addIndiaHRStarterPack())}
          onRemove={id => setKnowledgeDocuments(removeKnowledgeDocument(id))}
          onClear={() => setKnowledgeDocuments(clearKnowledgeDocuments())}
          onClose={() => setShowKnowledge(false)}
        />
      )}
    </div>
  );
}
