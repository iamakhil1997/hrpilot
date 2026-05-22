import { useEffect } from 'react';

// Feature cards data (title, description, icon, key)
const FEATURE_INFO = [
  { id: 'policy', title: 'Policy & Compliance', description: 'Legal, POSH, statutory policies, warning letters.', icon: 'ti-shield-check' },
  { id: 'performance', title: 'Performance Management', description: 'PIPs, appraisals, KRAs, coaching.', icon: 'ti-chart-line' },
  { id: 'talent', title: 'Talent Acquisition', description: 'Hiring, JD creation, interview workflow.', icon: 'ti-users' },
  { id: 'relations', title: 'Employee Relations', description: 'Conflicts, grievances, burnout, exits.', icon: 'ti-heart-handshake' },
  { id: 'payroll', title: 'Payroll & Benefits', description: 'CTC structuring, PF, gratuity, benefits.', icon: 'ti-credit-card' },
  { id: 'coach', title: 'Manager Coach', description: 'Leadership, feedback, team wellbeing.', icon: 'ti-school' },
  { id: 'warning', title: 'Warning Letter Generator', description: 'Create formal warning letters instantly.', icon: 'ti-file-text' },
  { id: 'pip', title: 'PIP Assistant', description: 'Design performance improvement plans.', icon: 'ti-file-code' },
  { id: 'jd', title: 'Job Description AI', description: 'Generate tailored JD drafts.', icon: 'ti-briefcase' },
  { id: 'onboarding', title: 'Onboarding Planner', description: '30‑60‑90 day onboarding roadmaps.', icon: 'ti-rocket' }
];

export default function LandingPage({ setActiveModule, setCurrentView, onClearHistory }) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFeatureClick = (moduleId) => {
    onClearHistory(); // Reset any previous chat state
    setActiveModule(moduleId);
    setCurrentView('workspace');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-[#050816] to-blue-900 text-white">
      {/* Sticky Glass Navbar */}
      <nav className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">Akku</span>
          <span className="text-sm opacity-80">AI</span>
        </div>
        <ul className="flex gap-4 text-sm font-medium">
          <li><button className="hover:text-blue-300" onClick={() => setCurrentView('home')}>Home</button></li>
          <li><button className="hover:text-blue-300" onClick={() => setCurrentView('home')}>Features</button></li>
          <li><button className="hover:text-blue-300" onClick={() => setCurrentView('home')}>Pricing</button></li>
          <li><button className="hover:text-blue-300" onClick={() => setCurrentView('home')}>About</button></li>
        </ul>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <i className="ti ti-moon text-xl" />
          </button>
          <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition-colors">
            Login
          </button>
          <button className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition-colors" onClick={() => { setCurrentView('workspace'); setActiveModule('policy'); }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 py-24 px-6 text-center bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#0e0c31] via-[#151020] to-[#06061c]">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 animate-pulse">
          THE AI HR OPERATING SYSTEM FOR <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">MODERN TEAMS</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Autonomous HR intelligence for compliance, employee relations, hiring, payroll, and workforce management.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
            Explore Features
          </button>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-5 rounded-lg text-white font-medium" onClick={() => { setActiveModule('policy'); setCurrentView('workspace'); }}>
            Start AI Consultation
          </button>
        </div>
        {/* Ambient floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute top-10 left-10 w-2 h-2 rounded-full bg-blue-500 opacity-50 animate-pulse" />
          <span className="absolute bottom-20 right-20 w-3 h-3 rounded-full bg-purple-400 opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
          <span className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 bg-[#050816]/90">
        <h2 className="text-3xl font-semibold text-center mb-10">AI HR Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {FEATURE_INFO.map((feat) => (
            <button
              key={feat.id}
              onClick={() => handleFeatureClick(feat.id)}
              className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 text-left hover:shadow-xl hover:border-blue-400 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <i className={`ti ${feat.icon} text-2xl text-blue-400 group-hover:text-blue-300`} />
                <h3 className="text-xl font-medium text-white group-hover:text-blue-300">{feat.title}</h3>
              </div>
              <p className="text-sm text-gray-300 group-hover:text-gray-200">{feat.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#0a0a1f] text-center">
        <h2 className="text-3xl font-bold mb-8">Pricing Plans</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
          {['Free Trial', 'Pro', 'Enterprise'].map((plan, idx) => (
            <div key={idx} className="flex-1 bg-white/5 border border-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-4">{plan}</h3>
              <p className="text-gray-300 mb-6">{plan === 'Free Trial' ? 'Get started with limited features.' : plan === 'Pro' ? 'All core AI tools, priority support.' : 'Custom enterprise solutions.'}</p>
              <button className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white">
                {plan === 'Free Trial' ? 'Start Free' : 'Contact Sales'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020212] py-6 text-center text-sm text-gray-400">
        <p>© 2026 Akku AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
