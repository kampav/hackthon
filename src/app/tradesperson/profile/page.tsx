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

export default function ProfilePage() {
  const d = TRADESPERSON_DATA
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="app-header">
        <div className="flex items-center justify-between">
          <Link href="/tradesperson" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">Profile</span>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">⚡</div>
          <div>
            <div className="text-white font-bold text-lg">{d.name}</div>
            <div className="text-white/70 text-sm">{d.trade}</div>
            <div className="flex gap-1.5 mt-1">
              <span className="badge badge-green text-xs">🏦 Bank-verified</span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>⭐ {d.rating}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Jobs done', value: d.completedJobs },
            { label: 'Reviews',   value: d.reviewCount },
            { label: 'Rating',    value: `${d.rating}/5` },
          ].map(({ label, value }) => (
            <div key={label} className="metric-tile">
              <div className="value">{value}</div>
              <div className="label">{label}</div>
            </div>
          ))}
        </div>

        <div className="section-title">Certifications & credentials</div>
        <div className="card">
          {[
            { name: 'NICEIC Approved Contractor', icon: '🏅', status: 'Verified', exp: 'Dec 2026' },
            { name: 'Public Liability Insurance', icon: '🛡️', status: 'Active',   exp: 'Mar 2027' },
            { name: 'Part P Registered',          icon: '📋', status: 'Verified', exp: 'Ongoing' },
            { name: 'DBS Check',                  icon: '✅', status: 'Clear',    exp: 'Sep 2026' },
          ].map(c => (
            <div key={c.name} className="list-item">
              <div className="flex items-center gap-2">
                <span className="text-xl">{c.icon}</span>
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-lloyds-grey-dark">Expires: {c.exp}</div>
                </div>
              </div>
              <span className="badge badge-green text-xs">{c.status}</span>
            </div>
          ))}
        </div>

        <div className="section-title">Service area</div>
        <div className="card">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <div className="font-semibold text-sm">{d.location}</div>
              <div className="text-xs text-lloyds-grey-dark mt-0.5">Up to 40 miles from E1</div>
            </div>
          </div>
        </div>

        <div className="section-title">Recent reviews</div>
        {[
          { reviewer: 'David T.', rating: 5, text: 'Raj did a thorough EICR, very professional and fast.', date: 'Mar 2026' },
          { reviewer: 'Emma C.', rating: 5, text: 'Great work on the consumer unit upgrade. Would use again.', date: 'Feb 2026' },
          { reviewer: 'Priya S.', rating: 4, text: 'Good quality work, arrived on time. Highly recommend.', date: 'Jan 2026' },
        ].map((r, i) => (
          <div key={i} className="card-sm mb-2">
            <div className="flex justify-between items-start mb-1">
              <div className="font-semibold text-sm">{r.reviewer}</div>
              <div className="text-xs text-lloyds-grey-dark">{r.date}</div>
            </div>
            <div className="text-amber-500 text-sm mb-1">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
            <div className="text-xs text-lloyds-text-2">{r.text}</div>
          </div>
        ))}

        <div className="alert alert-green mt-2">
          <span className="text-xl shrink-0">🏦</span>
          <div>
            <div className="font-bold text-sm text-lloyds-green">Bank-verified SME</div>
            <div className="text-xs text-lloyds-text-2 mt-0.5">Your credentials are verified by Lloyds Bank. Landlords trust bank-verified tradespeople 3× more.</div>
          </div>
        </div>
      </div>
      <BottomNav items={NAV} role="tradesperson" />
    </div>
  )
}
