'use client'
import Link from 'next/link'
import BottomNav from '@/components/ui/BottomNav'

const NAV = [
  { label: 'Home',    icon: '🏠', href: '/tenant' },
  { label: 'Budget',  icon: '💰', href: '/tenant/budget' },
  { label: 'Bills',   icon: '⚡', href: '/tenant/bills' },
  { label: 'AI Help', icon: '🤖', href: '/qa?role=tenant' },
]

const BILLS = [
  { name: 'Octopus Energy', amount: 167, icon: '⚡', status: 'active', saving: 34, canSwitch: true },
  { name: 'Sky Broadband',  amount:  42, icon: '📶', status: 'active', saving: 12, canSwitch: true },
  { name: 'Council Tax',    amount: 142, icon: '🏛️', status: 'active', saving:  0, canSwitch: false },
  { name: 'Spotify',        amount:  12, icon: '🎵', status: 'active', saving:  0, canSwitch: false },
  { name: 'Netflix',        amount:  18, icon: '📺', status: 'active', saving:  0, canSwitch: false },
  { name: 'Amazon Prime',   amount:  10, icon: '📦', status: 'active', saving:  0, canSwitch: false },
]

export default function BillsPage() {
  const totalSavings = BILLS.reduce((s, b) => s + b.saving, 0)
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="app-header">
        <div className="flex items-center justify-between">
          <Link href="/tenant" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">Bills & subscriptions</span>
        </div>
        <div className="text-white text-2xl font-bold mt-3">£{BILLS.reduce((s,b) => s+b.amount,0)}/mo</div>
        <div className="text-white/70 text-xs">Total bills · potential saving £{totalSavings}/mo</div>
      </div>
      <div className="page-content">
        {totalSavings > 0 && (
          <div className="alert alert-green">
            <span className="text-xl">💡</span>
            <div>
              <div className="font-bold text-sm text-lloyds-green">Save up to £{totalSavings}/month</div>
              <div className="text-xs text-lloyds-text-2 mt-0.5">Better deals available on {BILLS.filter(b=>b.saving>0).length} of your bills</div>
            </div>
          </div>
        )}
        <div className="section-title">Your bills</div>
        {BILLS.map(b => (
          <div key={b.name} className="card-sm flex items-center gap-3 mb-2">
            <span className="text-2xl">{b.icon}</span>
            <div className="flex-1">
              <div className="font-semibold text-sm">{b.name}</div>
              <div className="text-xs text-lloyds-grey-dark">£{b.amount}/month</div>
              {b.saving > 0 && <div className="text-xs text-lloyds-green mt-0.5">Save ~£{b.saving}/mo by switching</div>}
            </div>
            {b.canSwitch && (
              <button className="btn btn-secondary py-1.5 px-3 text-xs">Compare</button>
            )}
          </div>
        ))}
      </div>
      <BottomNav items={NAV} role="tenant" />
    </div>
  )
}
