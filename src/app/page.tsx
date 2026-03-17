'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [api, setApi] = useState<'checking' | 'ok' | 'error'>('checking')

  useEffect(() => {
    fetch('/api/health')
      .then(r => r.ok ? setApi('ok') : setApi('error'))
      .catch(() => setApi('error'))
  }, [])

  const dot = api === 'ok' ? 'bg-green-400' : api === 'error' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'
  const label = api === 'ok' ? 'API Online' : api === 'error' ? 'API Error' : 'Checking…'

  return (
    <main className="mesh-bg min-h-screen flex flex-col items-center justify-center px-6">
      <div className="glass p-10 max-w-lg w-full text-center space-y-6">

        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl"
             style={{ background: 'var(--lloyds-green)' }}>
          🐎
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold text-white">Hello, World!</h1>
          <p className="text-white/50 mt-2 text-sm">Hackathon Lab · Engineering Leadership Offsite</p>
        </div>

        {/* API status */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
          <span className="text-white/70">{label}</span>
        </div>

        {/* Stack badges */}
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {['Next.js 14', 'Firebase', 'Cloud Run', 'Claude AI', 'GitHub Actions'].map(t => (
            <span key={t} className="px-3 py-1 rounded-full border border-white/10 text-white/50">{t}</span>
          ))}
        </div>

        <p className="text-white/30 text-xs">Paste a PRD → build a full app in one day</p>
      </div>
    </main>
  )
}
