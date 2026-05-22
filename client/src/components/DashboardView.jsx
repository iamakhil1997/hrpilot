import { motion } from 'framer-motion';

const ACTIVITY_FEED = [
  {
    icon: 'ti-file-text',
    color: 'text-amber-400 bg-amber-500/10',
    title: 'Warning letter calibrated',
    desc: 'Drafted formal warning for Rahul Sharma.',
    time: '2 mins ago'
  },
  {
    icon: 'ti-shield-check',
    color: 'text-blue-400 bg-blue-500/10',
    title: 'POSH Committee audited',
    desc: 'Pune HQ compliance verified at 100%.',
    time: '24 mins ago'
  },
  {
    icon: 'ti-file-code',
    color: 'text-purple-400 bg-purple-500/10',
    title: 'handbook.pdf uploaded',
    desc: 'Maternity policy flagged as out of date.',
    time: '1 hour ago'
  },
  {
    icon: 'ti-rocket',
    color: 'text-emerald-400 bg-emerald-500/10',
    title: 'PIP Roadmap scheduled',
    desc: 'Sprint goals loaded for Junior Engineer.',
    time: '2 hours ago'
  }
];

export default function DashboardView({ activeModule, setActiveModal }) {
  const weeklyData = [
    { day: 'SUN', val: 40 },
    { day: 'MON', val: 65 },
    { day: 'TUE', val: 80 },
    { day: 'WED', val: 55 },
    { day: 'THU', val: 90 },
    { day: 'FRI', val: 35 },
    { day: 'SAT', val: 75 }
  ];

  return (
    <div className="w-[340px] h-full flex flex-col bg-[#070b1a]/95 border-l border-white/5 p-4 gap-4 overflow-y-auto scrollbar-hide shrink-0 z-10 select-none">
      
      {/* Panel Header */}
      <div className="flex flex-col border-b border-white/5 pb-3">
        <span className="text-[12px] font-medium text-white tracking-wide">Live Workforce Insights</span>
        <span className="text-[9.5px] text-slate-500 font-mono tracking-wider uppercase mt-0.5">Real-time HRBP Diagnostics</span>
      </div>

      {/* Widget 1: HR Risk Score Dial */}
      <div className="bg-white/2 border border-white/5 rounded-xl p-3.5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-[11.5px] font-medium text-slate-300">Corporate Risk Audit</span>
          <span className="px-1.5 py-0.5 rounded bg-green-500/10 text-cyan-400 text-[9px] font-mono">SECURE</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Radial progress representation */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" className="stroke-white/5 fill-none" strokeWidth="3" />
              <circle cx="28" cy="28" r="24" className="stroke-[#3B82F6] fill-none" strokeWidth="3.5" strokeDasharray="150" strokeDashoffset="129" />
            </svg>
            <span className="absolute text-[11px] font-mono font-medium text-white">14%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400">Statutory Compliance</span>
            <span className="text-[12.5px] text-white font-medium mt-0.5">98% audit pass probability</span>
          </div>
        </div>
      </div>

      {/* Widget 2: Workforce Sentiment Gauge */}
      <div className="bg-white/2 border border-white/5 rounded-xl p-3.5 flex flex-col gap-3">
        <div className="flex justify-between items-baseline">
          <span className="text-[11.5px] font-medium text-slate-300">Team Sentiment Index</span>
          <span className="text-[15px] font-mono font-medium text-white">64%</span>
        </div>

        {/* Triple progress bar */}
        <div className="w-full h-1.5 rounded-full bg-white/5 flex overflow-hidden">
          <div className="bg-purple-500 h-full" style={{ width: '20%' }} />
          <div className="bg-[#3B82F6] h-full" style={{ width: '35%' }} />
          <div className="bg-cyan-400 h-full" style={{ width: '45%' }} />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-white/5 mt-1 text-center">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-white flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              8
            </span>
            <span className="text-[9px] text-slate-500">Stressed</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-white flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              12
            </span>
            <span className="text-[9px] text-slate-500">Neutral</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-white flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              14
            </span>
            <span className="text-[9px] text-slate-500">Positive</span>
          </div>
        </div>
      </div>

      {/* Widget 3: Compliance calibration bars */}
      <div className="bg-white/2 border border-white/5 rounded-xl p-3.5 flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-[11.5px] font-medium text-slate-300">Calibration Tracking</span>
          <span className="text-[9px] text-slate-500 mt-0.5">Weekly compliance monitoring</span>
        </div>

        <div className="flex items-end gap-2.5 h-[80px] justify-between px-1 mt-1">
          {weeklyData.map((data, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group relative">
              <span className="absolute -top-5 bg-[#0e1428] border border-white/10 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                {data.val}%
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${data.val}%` }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.05 }}
                className="w-3 rounded-full bg-gradient-to-t from-[#3B82F6]/50 to-[#3B82F6] group-hover:from-[#3B82F6] group-hover:to-cyan-400 transition-colors cursor-pointer"
              />
              <span className="text-[8.5px] text-slate-500 font-mono">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Widget 4: Smart Activity Feed */}
      <div className="flex flex-col gap-2.5 mt-1">
        <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase px-1">Operation Audit log</span>
        
        <div className="flex flex-col gap-2">
          {ACTIVITY_FEED.map((act, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-2.5 p-2 rounded-lg bg-white/1 hover:bg-white/3 border border-white/5 transition-colors"
            >
              <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${act.color}`}>
                <i className={`ti ${act.icon}`} />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-[11px] font-medium text-white truncate">{act.title}</span>
                <span className="text-[9.5px] text-slate-400 truncate mt-0.5">{act.desc}</span>
              </div>
              <span className="text-[8px] text-slate-500 shrink-0 ml-auto mt-0.5 font-mono">{act.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
