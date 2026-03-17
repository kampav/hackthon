export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <div className="glass p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Hackathon Skeleton
        </h1>
        <p className="text-slate-400 mb-8">
          Paste your PRD and start building. Firebase + Cloud Run + GitHub Actions ready.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Frontend', desc: 'Next.js 14 + Tailwind' },
            { label: 'Database', desc: 'Firestore (Firebase)' },
            { label: 'Auth', desc: 'Firebase Auth' },
            { label: 'Deploy', desc: 'GCP Cloud Run' },
          ].map(({ label, desc }) => (
            <div key={label} className="glass p-4 text-left">
              <div className="text-purple-400 font-semibold">{label}</div>
              <div className="text-slate-400">{desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <a
            href="/api/health"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
          >
            Check API Health
          </a>
        </div>
      </div>
    </main>
  )
}
