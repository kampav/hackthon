'use client'
import Link from 'next/link'
import BottomNav from '@/components/ui/BottomNav'
import { LANDLORD_DATA } from '@/lib/seed/data'

const NAV = [
  { label: 'Home',       icon: '📊', href: '/landlord' },
  { label: 'Properties', icon: '🏠', href: '/landlord/properties' },
  { label: 'Compliance', icon: '✅', href: '/landlord/compliance' },
  { label: 'AI Help',    icon: '🤖', href: '/qa?role=landlord' },
]

export default function PropertiesPage() {
  const d = LANDLORD_DATA
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="app-header">
        <div className="flex items-center justify-between">
          <Link href="/landlord" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">Properties</span>
        </div>
        <div className="text-white text-2xl font-bold mt-3">{d.propertiesCount} Properties</div>
        <div className="text-white/70 text-xs">£{d.totalMonthlyRent.toLocaleString()}/mo gross · £{d.netMonthlyIncome.toLocaleString()}/mo net</div>
      </div>
      <div className="page-content">
        {d.properties.map(p => (
          <div key={p.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-bold">{p.address.split(',')[0]}</div>
                <div className="text-xs text-lloyds-grey-dark mt-0.5">{p.address.split(',').slice(1).join(',').trim()}</div>
              </div>
              <span className={`badge ${p.status === 'void' ? 'badge-amber' : 'badge-green'}`}>
                {p.status === 'void' ? '🔴 Void' : '🟢 Occupied'}
              </span>
            </div>
            {p.tenant && <div className="text-sm text-lloyds-text-2 mb-3">👤 Tenant: {p.tenant}</div>}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-lloyds-grey rounded-lg p-2 text-center">
                <div className="font-bold text-lloyds-green">£{p.rent.toLocaleString()}</div>
                <div className="text-xs text-lloyds-grey-dark">Rent/mo</div>
              </div>
              <div className="bg-lloyds-grey rounded-lg p-2 text-center">
                <div className="font-bold" style={{ color: 'var(--red)' }}>£{p.costs}</div>
                <div className="text-xs text-lloyds-grey-dark">Costs/mo</div>
              </div>
              <div className="bg-lloyds-grey rounded-lg p-2 text-center">
                <div className="font-bold text-lloyds-green">£{p.net}</div>
                <div className="text-xs text-lloyds-grey-dark">Net/mo</div>
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {p.compliance.map(c => (
                <span key={c.cert} className={`badge ${c.status === 'ok' ? 'badge-green' : c.status === 'urgent' ? 'badge-red' : 'badge-amber'}`}>
                  {c.cert} {c.status === 'ok' ? '✓' : c.status === 'urgent' ? '🚨' : '⏰'}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="card" style={{ background: 'var(--green)' }}>
          <div className="text-white font-semibold text-sm">Portfolio yield</div>
          <div className="text-white text-2xl font-bold mt-1">{d.portfolioYield}%</div>
          <div className="text-white/70 text-xs mt-0.5">Gross yield across all properties</div>
        </div>
      </div>
      <BottomNav items={NAV} role="landlord" />
    </div>
  )
}
