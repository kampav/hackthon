export default function Home() {
  const features = [
    { icon: '🗄️', label: 'Database',    desc: 'Firestore (NoSQL)',       color: '#00b09b' },
    { icon: '🔐', label: 'Auth',         desc: 'Firebase Auth',           color: '#006a4d' },
    { icon: '⚙️', label: 'API',          desc: 'Next.js Route Handlers',  color: '#c8963e' },
    { icon: '☁️', label: 'Cloud',        desc: 'GCP Cloud Run',           color: '#00856b' },
    { icon: '🤖', label: 'AI',           desc: 'Claude API (Anthropic)',  color: '#7c3aed' },
    { icon: '🚀', label: 'CI/CD',        desc: 'GitHub Actions',          color: '#1a73e8' },
  ]

  const steps = [
    { n: '1', title: 'Paste PRD',         desc: 'Drop your product requirements into Claude Code' },
    { n: '2', title: 'Generate Features', desc: 'AI scaffolds pages, API routes, and Firestore schema' },
    { n: '3', title: 'Push to main',      desc: 'GitHub Actions builds, tests, and deploys automatically' },
    { n: '4', title: 'Live in minutes',   desc: 'Cloud Run serves your app globally at scale' },
  ]

  return (
    <main className="mesh-bg min-h-screen">
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-black/30">
        <div className="flex items-center gap-3">
          {/* Lloyds-style black horse icon placeholder */}
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xl"
               style={{ background: 'var(--lloyds-green)' }}>
            🐎
          </div>
          <span className="font-bold text-lg tracking-tight">Hackathon Lab</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-white/70">
          <a href="/api/health" className="hover:text-white transition-colors">API Health</a>
          <a href="#features"   className="hover:text-white transition-colors">Stack</a>
          <a href="#workflow"   className="hover:text-white transition-colors">Workflow</a>
        </div>
        <a href="/api/health"
           className="btn-primary text-sm py-2 px-4">
          API Status
        </a>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="px-6 py-16 sm:py-24 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-6 border"
             style={{ borderColor: 'var(--lloyds-green)', color: 'var(--accent-teal)', background: 'rgba(0,106,77,.15)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-teal)' }} />
          Engineering Leadership Offsite · 24 March 2026
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
          From{' '}
          <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #00b09b, #006a4d)' }}>
            PRD to Live App
          </span>
          <br />in One Day
        </h1>

        <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-powered hackathon skeleton. Paste your requirements, generate full-stack features,
          and deploy to production — all within the offsite.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/api/health" className="btn-primary text-base">
            Check API Health ↗
          </a>
          <a href="#workflow"
             className="px-6 py-3 rounded-xl font-semibold border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-all duration-200">
            See Workflow
          </a>
        </div>
      </section>

      {/* ── Stack cards ─────────────────────────────────────────── */}
      <section id="features" className="px-6 pb-16 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-white/50 uppercase tracking-widest text-center mb-8 text-sm">
          Full Stack · Production Ready
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {features.map(({ icon, label, desc, color }) => (
            <div key={label} className="glass card-hover p-5">
              <div className="text-2xl mb-3">{icon}</div>
              <div className="font-semibold text-white mb-1" style={{ color }}>{label}</div>
              <div className="text-sm text-white/50">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Workflow ────────────────────────────────────────────── */}
      <section id="workflow" className="px-6 pb-20 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-white/50 uppercase tracking-widest text-center mb-8 text-sm">
          Hackathon Workflow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map(({ n, title, desc }) => (
            <div key={n} className="glass card-hover p-6 flex gap-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 text-white"
                   style={{ background: 'var(--lloyds-green)' }}>
                {n}
              </div>
              <div>
                <div className="font-semibold text-white mb-1">{title}</div>
                <div className="text-sm text-white/50 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/30">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span style={{ color: 'var(--lloyds-green)' }}>●</span>
          <span>Hackathon Lab · Engineering Leadership · 2026</span>
        </div>
        <div>Next.js 14 · Firebase · Cloud Run · Claude AI</div>
      </footer>
    </main>
  )
}
