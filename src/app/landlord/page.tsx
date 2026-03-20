'use client'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/ui/BottomNav'
import { LANDLORD_DATA } from '@/lib/seed/data'

const NAV = [
  { label: 'Home',       icon: '📊', href: '/landlord' },
  { label: 'Properties', icon: '🏠', href: '/landlord/properties' },
  { label: 'Compliance', icon: '✅', href: '/landlord/compliance' },
  { label: 'AI Help',    icon: '🤖', href: '/qa?role=landlord' },
]

const statusColor: Record<string, string> = {
  ok:      'badge-green',
  warning: 'badge-amber',
  urgent:  'badge-red',
}
const statusLabel: Record<string, string> = {
  ok: '✓ Current', warning: '⏰ Due soon', urgent: '🚨 Urgent',
}

export default function LandlordDashboard() {
  const d = LANDLORD_DATA
  const [voidProp, setVoidProp] = useState<string | null>(null)

  const urgentCompliance = d.properties.flatMap(p =>
    p.compliance.filter(c => c.status !== 'ok').map(c => ({ ...c, address: p.address.split(',')[0] }))
  )

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="app-header">
        <div className="flex items-center justify-between mb-1">
          <Link href="/" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">🏠 David</span>
        </div>
        <div className="text-white/80 text-sm mt-2">Portfolio overview · 20 Mar 2026</div>
        <div className="text-white text-3xl font-bold mt-1">£{d.netMonthlyIncome.toLocaleString()}</div>
        <div className="text-white/70 text-xs mt-0.5">Net monthly income · {d.propertiesCount} properties</div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            { label: 'Gross rent', value: `£${d.totalMonthlyRent.toLocaleString()}` },
            { label: 'Total costs', value: `£${d.totalMonthlyCosts.toLocaleString()}` },
            { label: 'Gross yield', value: `${d.portfolioYield}%` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/15 rounded-xl p-2.5 text-center">
              <div className="text-white font-bold text-base">{value}</div>
              <div className="text-white/60 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-content">
        {/* Compliance alerts */}
        {urgentCompliance.length > 0 && (
          <>
            {urgentCompliance.map((c, i) => (
              <div key={i} className={`alert ${c.status === 'urgent' ? 'alert-red' : 'alert-amber'}`}>
                <span className="text-xl shrink-0">{c.status === 'urgent' ? '🚨' : '⏰'}</span>
                <div>
                  <div className="font-bold text-sm">{c.cert} – {c.address}</div>
                  <div className="text-xs text-lloyds-text-2 mt-0.5">
                    Expires {c.expiry} · {c.status === 'urgent' ? 'Book a tradesperson now to avoid £40,000 fine' : 'Action needed within 60 days'}
                  </div>
                  <Link href="/tradesperson" className="btn btn-secondary mt-2 py-1.5 px-3 text-xs no-underline inline-block">Find tradesperson →</Link>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Properties */}
        <div className="section-title">Properties</div>
        {d.properties.map(p => (
          <div key={p.id} className="card mb-3">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold text-sm">{p.address.split(',')[0]}</div>
                <div className="text-xs text-lloyds-grey-dark">{p.address.split(',').slice(1).join(',').trim()}</div>
              </div>
              <span className={`badge ${p.status === 'void' ? 'badge-amber' : 'badge-green'}`}>
                {p.status === 'void' ? 'Void' : 'Occupied'}
              </span>
            </div>

            {p.tenant && <div className="text-xs text-lloyds-grey-dark mb-2">👤 {p.tenant}</div>}

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-lloyds-grey rounded-lg p-2 text-center">
                <div className="font-bold text-lloyds-green text-sm">£{p.rent.toLocaleString()}</div>
                <div className="text-xs text-lloyds-grey-dark">Rent</div>
              </div>
              <div className="bg-lloyds-grey rounded-lg p-2 text-center">
                <div className="font-bold text-sm" style={{ color: 'var(--red)' }}>£{p.costs}</div>
                <div className="text-xs text-lloyds-grey-dark">Costs</div>
              </div>
              <div className="bg-lloyds-grey rounded-lg p-2 text-center">
                <div className="font-bold text-lloyds-green text-sm">£{p.net}</div>
                <div className="text-xs text-lloyds-grey-dark">Net</div>
              </div>
            </div>

            {/* Compliance summary */}
            <div className="flex gap-1.5 flex-wrap">
              {p.compliance.map(c => (
                <span key={c.cert} className={`badge ${statusColor[c.status]} text-xs`}>
                  {statusLabel[c.status]} {c.cert}
                </span>
              ))}
            </div>

            {/* Void simulation */}
            {p.status === 'void' && (
              <div className="mt-3">
                <button
                  className="btn btn-outline btn-full text-sm"
                  onClick={() => setVoidProp(voidProp === p.id ? null : p.id)}
                >
                  {voidProp === p.id ? '▲ Hide' : '▼ Run void simulation'}
                </button>
                {voidProp === p.id && (
                  <div className="mt-2 bg-amber-50 rounded-xl p-3 border border-amber-200">
                    <div className="font-semibold text-sm text-amber-800 mb-2">Void period impact</div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between"><span className="text-lloyds-text-2">Monthly rent lost</span><span className="font-semibold text-red-600">−£{d.voidSimulation.monthlyRentLost}</span></div>
                      <div className="flex justify-between"><span className="text-lloyds-text-2">3-month impact</span><span className="font-semibold text-red-600">−£{(d.voidSimulation.monthlyRentLost * 3).toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-lloyds-text-2">Recommended reserve</span><span className="font-semibold text-lloyds-green">£{d.voidSimulation.recommendedReserve.toLocaleString()}</span></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Cash flow chart */}
        <div className="card">
          <div className="font-semibold text-sm mb-3">6-month net income</div>
          <div className="bar-chart mb-2">
            {d.cashFlowHistory.map((m) => {
              const max = 3000
              const h = Math.max(8, (m.net / max) * 72)
              return (
                <div key={m.month} className="flex flex-col items-center gap-1 flex-1">
                  <div className="bar w-full" style={{ height: h, background: m.net < 1500 ? 'var(--amber)' : 'var(--green)' }} />
                  <span className="text-xs text-lloyds-grey-dark">{m.month}</span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-lloyds-grey-dark mt-1">
            <span>Oct 2025</span><span>Mar 2026</span>
          </div>
        </div>

        {/* AI Q&A CTA */}
        <Link href="/qa?role=landlord" className="block no-underline">
          <div className="card flex items-center gap-3" style={{ background: 'var(--green)' }}>
            <span className="text-2xl">🤖</span>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm">Ask about compliance & the Act</div>
              <div className="text-white/70 text-xs">Renters' Rights Act · Section 13 · EICR · EPC</div>
            </div>
            <span className="text-white text-lg">›</span>
          </div>
        </Link>
      </div>

      <BottomNav items={NAV} role="landlord" />
    </div>
  )
}
