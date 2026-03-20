'use client'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/ui/BottomNav'
import { TENANT_DATA } from '@/lib/seed/data'

const NAV = [
  { label: 'Home',      icon: '🏠', href: '/tenant' },
  { label: 'Budget',    icon: '💰', href: '/tenant/budget' },
  { label: 'Bills',     icon: '⚡', href: '/tenant/bills' },
  { label: 'AI Help',   icon: '🤖', href: '/qa?role=tenant' },
]

export default function TenantDashboard() {
  const d = TENANT_DATA
  const [voidOpen, setVoidOpen] = useState(false)

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="app-header">
        <div className="flex items-center justify-between mb-1">
          <Link href="/" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">👩 Sarah</span>
        </div>
        <div className="text-white/80 text-sm mt-2">Good morning, Sarah 👋</div>
        <div className="text-white text-3xl font-bold mt-1">£{d.balance.toLocaleString()}</div>
        <div className="text-white/70 text-xs mt-0.5">Available balance · 20 Mar 2026</div>

        {/* Rent countdown */}
        <div className="mt-3 bg-white/15 rounded-xl p-3 flex items-center justify-between">
          <div>
            <div className="text-white font-semibold text-sm">Rent due in {d.daysToRent} days</div>
            <div className="text-white/70 text-xs">£{d.rent.toLocaleString()} · 1st April</div>
          </div>
          <div className="text-right">
            <div className="text-white font-bold">£{(d.balance - d.rent + 0).toLocaleString()}</div>
            <div className="text-white/70 text-xs">after rent</div>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Shortfall Alert */}
        {d.shortfallRisk && (
          <div className="alert alert-red">
            <span className="text-xl shrink-0">⚠️</span>
            <div className="flex-1">
              <div className="font-bold text-sm" style={{ color: 'var(--red)' }}>Rent shortfall risk detected</div>
              <div className="text-xs text-lloyds-text-2 mt-0.5 leading-relaxed">
                Based on your spending, you may be <strong>£{d.shortfallAmount}</strong> short by rent day. We've spotted 3 ways to help.
              </div>
              <Link href="/tenant/recommendations" className="btn btn-secondary mt-2 py-1.5 px-3 text-sm no-underline inline-block">See recommendations →</Link>
            </div>
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="metric-tile">
            <div className="value text-xl">£{d.rent.toLocaleString()}</div>
            <div className="label">Monthly rent</div>
          </div>
          <div className="metric-tile">
            <div className="value text-xl" style={{ color: d.shortfallRisk ? 'var(--red)' : 'var(--green)' }}>
              {d.shortfallRisk ? 'At risk' : 'Safe'}
            </div>
            <div className="label">Rent status</div>
          </div>
          <div className="metric-tile">
            <div className="value text-xl">£{d.savingsBuffer}</div>
            <div className="label">Buffer</div>
          </div>
        </div>

        {/* 30-day forecast */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-sm">30-day cash flow forecast</span>
            <span className="badge badge-amber">Rent week ⚠</span>
          </div>
          <div className="bar-chart mb-2">
            {d.cashFlow.map((w, i) => {
              const max = 1200
              const h = Math.max(8, (w.balance / max) * 72)
              const isRentWeek = i === 3
              return (
                <div key={w.label} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="bar w-full"
                    style={{
                      height: h,
                      background: isRentWeek ? 'var(--amber)' : w.balance < 300 ? 'var(--red)' : 'var(--green)',
                      opacity: 0.85,
                    }}
                  />
                  <span className="text-xs text-lloyds-grey-dark">{w.label}</span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-lloyds-grey-dark mt-1">
            <span>Today</span>
            <span>+30 days</span>
          </div>
        </div>

        {/* Budget breakdown */}
        <div className="card">
          <div className="font-semibold text-sm mb-3">This month's spending</div>
          {d.budgetBreakdown.slice(0, 5).map(b => (
            <div key={b.category} className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{b.icon} {b.category}</span>
                <span className="font-semibold">£{b.amount}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${b.pct}%`, background: b.color }} />
              </div>
            </div>
          ))}
          <Link href="/tenant/budget" className="btn btn-secondary btn-full mt-3 text-sm no-underline">View full budget →</Link>
        </div>

        {/* Recommendations */}
        <div className="section-title">Recommendations to stay rent-safe</div>
        {TENANT_DATA.recommendations.map((r, i) => (
          <div key={i} className="card-sm flex items-center gap-3 mb-2">
            <span className="text-2xl">{r.icon}</span>
            <div className="flex-1">
              <div className="font-semibold text-sm">{r.title}</div>
              {r.saving > 0 && <div className="text-xs text-lloyds-green">Save ~£{r.saving}/month</div>}
            </div>
            <Link href="/tenant/recommendations" className="btn btn-secondary py-1.5 px-3 text-xs no-underline">{r.action}</Link>
          </div>
        ))}

        {/* Recent transactions */}
        <div className="section-title">Recent transactions</div>
        <div className="card">
          {d.transactions.slice(0, 6).map(t => (
            <div key={t.id} className="list-item">
              <div className="flex items-center gap-3">
                <span className="text-xl">{t.icon}</span>
                <div>
                  <div className="text-sm font-medium">{t.merchant}</div>
                  <div className="text-xs text-lloyds-grey-dark">{t.date} · {t.category}</div>
                </div>
              </div>
              <span className={`font-semibold text-sm ${t.amount > 0 ? 'text-lloyds-green' : 'text-lloyds-text'}`}>
                {t.amount > 0 ? '+' : ''}£{Math.abs(t.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Rent Reliability Profile */}
        <div className="card" style={{ border: '2px solid var(--green)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-sm">🏅 Rent Reliability Profile</div>
            <span className="badge badge-green">Score: {d.rentReliabilityProfile.score}/100</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="font-bold text-lloyds-green text-lg">{d.rentReliabilityProfile.onTimeStreak}</div>
              <div className="text-xs text-lloyds-grey-dark">On-time streak</div>
            </div>
            <div>
              <div className="font-bold text-lloyds-green text-sm">{d.rentReliabilityProfile.incomeStability}</div>
              <div className="text-xs text-lloyds-grey-dark">Income stability</div>
            </div>
            <div>
              <div className="font-bold text-amber-600 text-sm">{d.rentReliabilityProfile.bufferAfterRent}</div>
              <div className="text-xs text-lloyds-grey-dark">Buffer level</div>
            </div>
          </div>
          <button className="btn btn-outline btn-full mt-3 text-sm">Share with landlord</button>
        </div>

        {/* AI Q&A CTA */}
        <Link href="/qa?role=tenant" className="block no-underline">
          <div className="card flex items-center gap-3" style={{ background: 'var(--green)' }}>
            <span className="text-2xl">🤖</span>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm">Ask about your rights</div>
              <div className="text-white/70 text-xs">Renters' Rights Act · AI-powered Q&A</div>
            </div>
            <span className="text-white text-lg">›</span>
          </div>
        </Link>
      </div>

      <BottomNav items={NAV} role="tenant" />
    </div>
  )
}
