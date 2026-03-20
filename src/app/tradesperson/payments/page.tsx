'use client'
import Link from 'next/link'
import BottomNav from '@/components/ui/BottomNav'
import { TRADESPERSON_DATA } from '@/lib/seed/data'

const NAV = [
  { label: 'Home',     icon: '🔧', href: '/tradesperson' },
  { label: 'Jobs',     icon: '📋', href: '/tradesperson/jobs' },
  { label: 'Payments', icon: '💳', href: '/tradesperson/payments' },
  { label: 'Profile',  icon: '👤', href: '/tradesperson/profile' },
]

export default function PaymentsPage() {
  const d = TRADESPERSON_DATA
  const paid    = d.payments.filter(p => p.status === 'paid')
  const pending = d.payments.filter(p => p.status === 'pending')

  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="app-header">
        <div className="flex items-center justify-between">
          <Link href="/tradesperson" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">Payments</span>
        </div>
        <div className="text-white text-2xl font-bold mt-3">£{d.monthlyEarnings.toLocaleString()}</div>
        <div className="text-white/70 text-xs">Earned this month</div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-white/15 rounded-xl p-2.5 text-center">
            <div className="text-white font-bold">£{d.pendingPayments}</div>
            <div className="text-white/60 text-xs">Pending</div>
          </div>
          <div className="bg-white/15 rounded-xl p-2.5 text-center">
            <div className="text-white font-bold">{paid.length}</div>
            <div className="text-white/60 text-xs">Paid this month</div>
          </div>
        </div>
      </div>
      <div className="page-content">
        {pending.length > 0 && (
          <>
            <div className="section-title">Pending</div>
            {pending.map(p => (
              <div key={p.id} className="card flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl shrink-0">⏳</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{p.job}</div>
                  <div className="text-xs text-lloyds-grey-dark">{p.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lloyds-green">£{p.amount}</div>
                  <span className="badge badge-amber text-xs">Pending</span>
                </div>
              </div>
            ))}
          </>
        )}
        <div className="section-title">Paid</div>
        <div className="card">
          {paid.map(p => (
            <div key={p.id} className="list-item">
              <div>
                <div className="text-sm font-medium">{p.job}</div>
                <div className="text-xs text-lloyds-grey-dark">{p.date}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm text-lloyds-green">£{p.amount}</div>
                <span className="badge badge-green text-xs">✓ Paid</span>
              </div>
            </div>
          ))}
        </div>

        <div className="alert alert-green">
          <span className="text-xl shrink-0">🏦</span>
          <div>
            <div className="font-bold text-sm text-lloyds-green">Fast bank payment</div>
            <div className="text-xs text-lloyds-text-2 mt-0.5">Get paid same day on job completion via Lloyds Bank rails. No more chasing invoices.</div>
          </div>
        </div>
      </div>
      <BottomNav items={NAV} role="tradesperson" />
    </div>
  )
}
