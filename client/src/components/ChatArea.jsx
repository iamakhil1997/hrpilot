import MessageList from './MessageList';
import InputBar from './InputBar';
import { MODULES } from '../App';

export default function ChatArea({ 
  activeModule, 
  messages, 
  setMessages, 
  setConversationHistory, 
  isTyping, 
  showChips, 
  onSendMessage, 
  onClearHistory, 
  mobileSidebarOpen, 
  setMobileSidebarOpen,
  rightPanelOpen,
  setRightPanelOpen,
  sidebarCollapsed,
  setSidebarCollapsed
}) {
  const currentMod = MODULES.find(m => m.id === activeModule) || MODULES[0];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-grid-pattern aurora-bg bg-[#050816] relative">
      
      {/* Dynamic Header Row */}
      <header className="flex h-[56px] items-center justify-between border-b border-white/5 px-4 shrink-0 bg-[#070b1a]/80 backdrop-blur-md z-20 select-none">
        <div className="flex items-center gap-3">
          
          {/* Mobile hamburger menu */}
          <button 
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden text-slate-400 hover:text-white hover:bg-white/5 w-[32px] h-[32px] flex items-center justify-center rounded-lg transition-transform active:scale-95 cursor-pointer"
            aria-label="Open sidebar drawer"
          >
            <i className="ti ti-menu-2 text-[19px]" />
          </button>
          
          {/* Desktop Expand Sidebar shortcut when collapsed */}
          {sidebarCollapsed && (
            <button 
              onClick={() => setSidebarCollapsed(false)}
              className="hidden md:flex text-slate-400 hover:text-white hover:bg-white/5 w-[32px] h-[32px] items-center justify-center rounded-lg cursor-pointer"
              title="Expand left sidebar"
            >
              <i className="ti ti-layout-sidebar-left-expand text-base" />
            </button>
          )}

          <div className="flex items-center gap-2.5">
            {/* Neural pulsative indicator */}
            <div className="relative w-6.5 h-6.5 flex items-center justify-center shrink-0">
              <span className="absolute w-full h-full rounded-full bg-gradient-to-tr from-[#3B82F6] to-cyan-400 opacity-60 animate-orb-pulse" />
              <span className="w-3 h-3 rounded-full bg-slate-950 flex items-center justify-center z-10 text-[6.5px] text-[#60A5FA] font-mono font-bold">
                AI
              </span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-[13px] font-medium text-white leading-tight">{currentMod.label}</h2>
              <span className="text-[9.5px] text-[#60A5FA] leading-none mt-0.5 font-medium tracking-wide">SECURE HR COGNITIVE WORKSPACE</span>
            </div>
          </div>
        </div>

        {/* Actions Group (Refresh and right analytics toggle) */}
        <div className="flex items-center gap-2">
          
          {/* Refresh chat */}
          <button 
            onClick={onClearHistory}
            title="Reset conversation memory"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 cursor-pointer transition-colors"
          >
            <i className="ti ti-refresh text-[12.5px]" />
          </button>

          {/* Toggle right analytics panel */}
          <button 
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            title={rightPanelOpen ? "Collapse Analytics Panel" : "Expand Analytics Panel"}
            className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors cursor-pointer ${
              rightPanelOpen 
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-white/5'
            }`}
          >
            <i className="ti ti-chart-bar text-[13px]" />
          </button>

        </div>
      </header>

      {/* Messages Feed Viewport */}
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={messages} 
          setMessages={setMessages} 
          setConversationHistory={setConversationHistory}
          isTyping={isTyping} 
          onSendMessage={onSendMessage}
        />
      </div>

      {/* Prompt inputs bar */}
      <InputBar 
        activeModule={activeModule}
        showChips={showChips}
        isTyping={isTyping}
        onSendMessage={onSendMessage}
      />
    </div>
  );
}
