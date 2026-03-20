'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const SUGGESTED: Record<string, string[]> = {
  tenant: [
    'Can my landlord evict me without a reason?',
    'How much notice must my landlord give for a rent increase?',
    'What are my rights if my landlord refuses repairs?',
    'Can my landlord say no to pets?',
  ],
  landlord: [
    'How do I increase rent under the new Act?',
    'What grounds can I use to evict a tenant now?',
    'What certificates do I legally need to have?',
    'When do I need to register on the PRS database?',
  ],
}

interface Message { role: 'user' | 'ai'; text: string }

function QAChat() {
  const params = useSearchParams()
  const role = (params.get('role') ?? 'tenant') as 'tenant' | 'landlord'
  const backHref = role === 'landlord' ? '/landlord' : '/tenant'
  const persona = role === 'landlord' ? 'David (Landlord)' : 'Sarah (Tenant)'

  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: `Hi ${role === 'landlord' ? 'David' : 'Sarah'}! I'm your Rent Smart AI assistant. Ask me anything about the Renters' Rights Act 2025 or your ${role === 'landlord' ? 'compliance obligations' : 'rights as a tenant'}.` },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const ask = async (q: string) => {
    if (!q.trim() || loading) return
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, role }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.answer ?? data.error ?? 'Something went wrong.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Unable to connect. Please try again.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ background: 'var(--bg)', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <div className="app-header" style={{ paddingBottom: '1rem' }}>
        <div className="flex items-center justify-between">
          <Link href={backHref} className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">{persona}</span>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">🤖</div>
          <div>
            <div className="text-white font-bold">Rent Smart AI</div>
            <div className="text-white/60 text-xs">Renters' Rights Act 2025 · Powered by Claude</div>
          </div>
          <span className="badge badge-green ml-auto">Live</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ paddingBottom: '140px' }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {m.role === 'ai' && <div className="w-7 h-7 rounded-full bg-lloyds-green flex items-center justify-center text-white text-xs shrink-0 mt-1">AI</div>}
            <div className={m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
              {m.text.split('\n').map((line, li) => (
                <span key={li}>{line}{li < m.text.split('\n').length - 1 && <br />}</span>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start gap-2">
            <div className="w-7 h-7 rounded-full bg-lloyds-green flex items-center justify-center text-white text-xs shrink-0 mt-1">AI</div>
            <div className="chat-bubble-ai flex gap-1 items-center">
              <span className="w-2 h-2 bg-lloyds-grey-dark rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-lloyds-grey-dark rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-lloyds-grey-dark rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested + Input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-lloyds-grey-mid px-4 pt-3 pb-4" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        {messages.length < 3 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-hide">
            {(SUGGESTED[role] ?? []).map((q, i) => (
              <button key={i} onClick={() => ask(q)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-lloyds-green text-lloyds-green bg-white whitespace-nowrap">
                {q}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            className="flex-1 border border-lloyds-grey-mid rounded-xl px-4 py-3 text-sm outline-none focus:border-lloyds-green"
            placeholder="Ask about the Renters' Rights Act..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && ask(input)}
            disabled={loading}
          />
          <button
            className="btn btn-primary px-4 py-3 rounded-xl"
            onClick={() => ask(input)}
            disabled={loading || !input.trim()}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}

export default function QAPage() {
  return <Suspense><QAChat /></Suspense>
}
