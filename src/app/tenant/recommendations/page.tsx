'use client'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/ui/BottomNav'
import { TENANT_DATA } from '@/lib/seed/data'

const NAV = [
  { label: 'Home',    icon: '💳', href: '/tenant' },
  { label: 'Budget',  icon: '📊', href: '/tenant/budget' },
  { label: 'Bills',   icon: '⚡', href: '/tenant/bills' },
  { label: 'AI Help', icon: '🤖', href: '/qa?role=tenant' },
]

const DETAIL: Record<string, {
  icon: string
  headline: string
  why: string
  steps: string[]
  saving: number
  cta: string
  ctaHref?: string
  badge: string
}> = {
  'Cancel unused subscriptions': {
    icon: '📱',
    headline: 'Cancel unused subscriptions',
    why: "You're paying for services you rarely use. Cutting these frees up cash before rent day.",
    steps: [
      'Spotify: £11.99/mo — check if you still use it',
      'Review Apple/Google subscriptions in your phone settings',
      'Cancel anything unused for 30+ days',
    ],
    saving: 22,
    cta: 'View bills & subscriptions',
    ctaHref: '/tenant/bills',
    badge: 'Quick win',
  },
  'Switch energy to Octopus Flux': {
    icon: '⚡',
    headline: 'Switch energy tariff',
    why: "You're on a standard Octopus tariff. Switching to Octopus Flux or Tracker could save £34/mo based on your usage.",
    steps: [
      'Log in to octopus.energy',
      'Go to Tariff → Compare tariffs',
      'Switch to Flux or Tracker — no exit fee',
      'Takes effect from next billing cycle',
    ],
    saving: 34,
    cta: 'Go to Octopus Energy',
    badge: 'Biggest saving',
  },
  'Start a rent buffer fund': {
    icon: '🐷',
    headline: 'Build a rent buffer fund',
    why: "You only have £120 saved — less than two weeks of expenses. A buffer of £500+ means you'll never risk a shortfall.",
    steps: [
      'Open a Lloyds Easy Saver or similar instant-access account',
      'Set up a standing order for £50–£100/mo on payday',
      'Target: 1 month rent (£1,050) within 10 months',
      'Keep it separate from your current account',
    ],
    saving: 0,
    cta: 'Set up savings',
    badge: 'Long-term safety',
  },
}

export default function RecommendationsPage() {
  const d = TENANT_DATA
  const [done, setDone] = useState<string[]>([])

  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="app-header">
        <div className="flex items-center justify-between">
          <Link href="/tenant" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">Recommendations</span>
        </div>
        <div className="text-white text-2xl font-bold mt-3">3 ways to stay rent-safe</div>
        <div className="text-white/70 text-xs">Save up to £{d.recommendations.reduce((s, r) => s + r.saving, 0)}/month · Rent due in {d.daysToRent} days</div>
      </div>

      <div className="page-content">
        <div className="alert alert-red mb-4">
          <span className="text-xl shrink-0">⚠️</span>
          <div>
            <div className="font-bold text-sm" style={{ color: 'var(--red)' }}>£{d.shortfallAmount} shortfall risk</div>
            <div className="text-xs text-lloyds-text-2 mt-0.5">Act on these before your rent payment in {d.daysToRent} days.</div>
          </div>
        </div>

        {d.recommendations.map((r, i) => {
          const det = DETAIL[r.title]
          if (!det) return null
          const isDone = done.includes(r.title)
          return (
            <div key={i} className="card mb-3">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{det.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-bold text-sm">{det.headline}</div>
                    <span className="badge badge-blue text-xs">{det.badge}</span>
                  </div>
                  {r.saving > 0 && (
                    <div className="text-lloyds-green font-semibold text-sm mt-0.5">Save ~£{r.saving}/month</div>
                  )}
                </div>
              </div>

              <div className="text-xs text-lloyds-text-2 mb-3 leading-relaxed">{det.why}</div>

              <div className="bg-lloyds-grey rounded-xl p-3 mb-3">
                <div className="font-semibold text-xs mb-2 text-lloyds-grey-dark">STEPS</div>
                {det.steps.map((step, si) => (
                  <div key={si} className="flex gap-2 mb-1.5">
                    <span className="text-lloyds-green font-bold text-xs mt-0.5 shrink-0">{si + 1}.</span>
                    <span className="text-xs text-lloyds-text">{step}</span>
                  </div>
                ))}
              </div>

              {isDone ? (
                <div className="bg-green-50 rounded-xl p-3 text-center border border-green-200">
                  <div className="text-lloyds-green font-semibold text-sm">✓ Marked as done</div>
                </div>
              ) : (
                <div className="flex gap-2">
                  {det.ctaHref ? (
                    <Link href={det.ctaHref} className="btn btn-primary flex-1 text-sm text-center no-underline">{det.cta}</Link>
                  ) : (
                    <button className="btn btn-primary flex-1 text-sm">{det.cta}</button>
                  )}
                  <button
                    className="btn btn-outline px-3 text-sm"
                    onClick={() => setDone(p => [...p, r.title])}
                  >
                    Done ✓
                  </button>
                </div>
              )}
            </div>
          )
        })}

        <div className="alert alert-green mt-2">
          <span className="text-xl shrink-0">🤖</span>
          <div>
            <div className="font-bold text-sm text-lloyds-green">Ask Rent Smart AI</div>
            <div className="text-xs text-lloyds-text-2 mt-0.5 mb-2">Get personalised advice on your spending and rent shortfall.</div>
            <Link href="/qa?role=tenant" className="btn btn-secondary py-1.5 px-3 text-xs no-underline inline-block">Chat with AI →</Link>
          </div>
        </div>
      </div>
      <BottomNav items={NAV} role="tenant" />
    </div>
  )
}
