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

const STATUS_INFO: Record<string, { cls: string; label: string; icon: string }> = {
  ok:      { cls: 'badge-green', label: 'Current',   icon: '✅' },
  warning: { cls: 'badge-amber', label: 'Due soon',  icon: '⏰' },
  urgent:  { cls: 'badge-red',   label: 'URGENT',    icon: '🚨' },
}

const CERT_INFO: Record<string, { freq: string; fine: string }> = {
  'Gas Safety': { freq: 'Annual',    fine: '£6,000 + criminal liability' },
  'EICR':       { freq: 'Every 5yr', fine: '£30,000 civil + criminal' },
  'EPC':        { freq: 'Every 10yr',fine: 'Cannot let property' },
}

export default function CompliancePage() {
  const d = LANDLORD_DATA
  const allCerts = d.properties.flatMap(p =>
    p.compliance.map(c => ({ ...c, property: p.address.split(',')[0], propId: p.id }))
  )
  const urgent  = allCerts.filter(c => c.status !== 'ok')
  const current = allCerts.filter(c => c.status === 'ok')

  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="app-header">
        <div className="flex items-center justify-between">
          <Link href="/landlord" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">Compliance</span>
        </div>
        <div className="text-white text-2xl font-bold mt-3">Compliance tracker</div>
        <div className="text-white/70 text-xs">{urgent.length} action required · {current.length} current</div>
      </div>
      <div className="page-content">
        {urgent.length > 0 && (
          <>
            <div className="section-title" style={{ color: 'var(--red)' }}>⚠ Action required</div>
            {urgent.map((c, i) => (
              <div key={i} className={`alert ${c.status === 'urgent' ? 'alert-red' : 'alert-amber'}`}>
                <span className="text-2xl shrink-0">{STATUS_INFO[c.status].icon}</span>
                <div className="flex-1">
                  <div className="font-bold text-sm">{c.cert} — {c.property}</div>
                  <div className="text-xs text-lloyds-text-2 mt-0.5">Expires: {c.expiry}</div>
                  <div className="text-xs text-lloyds-text-2">Frequency: {CERT_INFO[c.cert]?.freq}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--red)' }}>Non-compliance fine: {CERT_INFO[c.cert]?.fine}</div>
                  <Link href="/tradesperson" className="btn btn-secondary mt-2 py-1.5 px-3 text-xs no-underline inline-block">
                    Book tradesperson →
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="section-title">All certificates</div>
        {d.properties.map(p => (
          <div key={p.id} className="card mb-3">
            <div className="font-semibold text-sm mb-3">🏠 {p.address.split(',')[0]}</div>
            {p.compliance.map(c => (
              <div key={c.cert} className="list-item">
                <div>
                  <div className="text-sm font-medium">{c.cert}</div>
                  <div className="text-xs text-lloyds-grey-dark">{CERT_INFO[c.cert]?.freq} · Expires {c.expiry}</div>
                </div>
                <span className={`badge ${STATUS_INFO[c.status].cls}`}>
                  {STATUS_INFO[c.status].icon} {STATUS_INFO[c.status].label}
                </span>
              </div>
            ))}
          </div>
        ))}

        <div className="alert alert-blue">
          <span className="text-xl shrink-0">⚖️</span>
          <div>
            <div className="font-bold text-sm" style={{ color: 'var(--blue)' }}>Renters' Rights Act 2025</div>
            <div className="text-xs text-lloyds-text-2 mt-0.5">PRS Landlord Database registration required from late 2026. Fines up to £40,000 for non-compliance.</div>
          </div>
        </div>
      </div>
      <BottomNav items={NAV} role="landlord" />
    </div>
  )
}
