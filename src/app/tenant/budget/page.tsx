'use client'
import Link from 'next/link'
import BottomNav from '@/components/ui/BottomNav'
import { TENANT_DATA } from '@/lib/seed/data'

const NAV = [
  { label: 'Home',    icon: '🏠', href: '/tenant' },
  { label: 'Budget',  icon: '💰', href: '/tenant/budget' },
  { label: 'Bills',   icon: '⚡', href: '/tenant/bills' },
  { label: 'AI Help', icon: '🤖', href: '/qa?role=tenant' },
]

export default function BudgetPage() {
  const d = TENANT_DATA
  const total = d.budgetBreakdown.reduce((s, b) => s + b.amount, 0)
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="app-header">
        <div className="flex items-center justify-between">
          <Link href="/tenant" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">Budget</span>
        </div>
        <div className="text-white text-2xl font-bold mt-3">£{total.toLocaleString()}</div>
        <div className="text-white/70 text-xs">Total spend · March 2026</div>
      </div>
      <div className="page-content">
        <div className="section-title">Full budget breakdown</div>
        <div className="card">
          {d.budgetBreakdown.map(b => (
            <div key={b.category} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{b.icon} {b.category}</span>
                <span className="font-semibold">£{b.amount} <span className="text-lloyds-grey-dark font-normal">({b.pct}%)</span></span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${b.pct}%`, background: b.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ background: 'var(--green)' }}>
          <div className="text-white font-semibold text-sm">Rent-first budget principle</div>
          <div className="text-white/70 text-xs mt-1 leading-relaxed">Your rent (£{d.rent}) is prioritised before all discretionary spend. Remaining income: £{(d.monthlyIncome - d.rent).toLocaleString()}/month.</div>
        </div>
      </div>
      <BottomNav items={NAV} role="tenant" />
    </div>
  )
}
