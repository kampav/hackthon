'use client'
import { useState } from 'react'
import Link from 'next/link'
import BottomNav from '@/components/ui/BottomNav'
import { TRADESPERSON_DATA } from '@/lib/seed/data'

const NAV = [
  { label: 'Home',     icon: '🔧', href: '/tradesperson' },
  { label: 'Jobs',     icon: '📋', href: '/tradesperson/jobs' },
  { label: 'Payments', icon: '💳', href: '/tradesperson/payments' },
  { label: 'Profile',  icon: '👤', href: '/tradesperson/profile' },
]

export default function TradespersonDashboard() {
  const d = TRADESPERSON_DATA
  const [quoteJob, setQuoteJob] = useState<string | null>(null)
  const [quoteAmount, setQuoteAmount] = useState('')
  const [quoteSubmitted, setQuoteSubmitted] = useState<string[]>(['j1'])

  const submitQuote = (jobId: string) => {
    if (!quoteAmount) return
    setQuoteSubmitted(prev => [...prev, jobId])
    setQuoteJob(null)
    setQuoteAmount('')
  }

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="app-header">
        <div className="flex items-center justify-between mb-1">
          <Link href="/" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">⚡ Raj</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
          <div>
            <div className="text-white font-bold">{d.name}</div>
            <div className="text-white/70 text-xs">{d.certification} · ⭐ {d.rating} ({d.reviewCount} reviews)</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            { label: 'This month', value: `£${d.monthlyEarnings.toLocaleString()}` },
            { label: 'Pending pay', value: `£${d.pendingPayments}` },
            { label: 'Jobs done', value: d.completedJobs },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/15 rounded-xl p-2.5 text-center">
              <div className="text-white font-bold text-base">{value}</div>
              <div className="text-white/60 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-content">
        {/* Bank verified badge */}
        <div className="alert alert-green mb-3">
          <span className="text-xl shrink-0">🏦</span>
          <div>
            <div className="font-bold text-sm text-lloyds-green">Bank-verified SME</div>
            <div className="text-xs text-lloyds-text-2 mt-0.5">Your NICEIC certification and insurance are verified. Landlords trust bank-verified tradespeople.</div>
          </div>
        </div>

        {/* Matched jobs */}
        <div className="section-title">Matched jobs for you ({d.jobs.length})</div>
        {d.jobs.map(job => (
          <div key={job.id} className="card mb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="font-semibold text-sm">{job.title}</div>
                <div className="text-xs text-lloyds-grey-dark mt-0.5">📍 {job.property}</div>
              </div>
              <span className={`badge ${job.urgency === 'urgent' ? 'badge-red' : 'badge-blue'} ml-2 shrink-0`}>
                {job.urgency === 'urgent' ? '🚨 Urgent' : '📋 Normal'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-lloyds-grey rounded-lg p-2">
                <div className="text-xs text-lloyds-grey-dark">Budget</div>
                <div className="font-semibold text-sm text-lloyds-green">{job.budget}</div>
              </div>
              <div className="bg-lloyds-grey rounded-lg p-2">
                <div className="text-xs text-lloyds-grey-dark">Deadline</div>
                <div className="font-semibold text-sm">{job.deadline}</div>
              </div>
            </div>

            <p className="text-xs text-lloyds-text-2 mb-3 leading-relaxed">{job.description}</p>

            <div className="flex gap-1.5 mb-3 flex-wrap">
              <span className="badge badge-blue">{job.type}</span>
              <span className="badge badge-green">✓ {job.certRequired}</span>
              <span className="badge badge-grey">👤 {job.landlord}</span>
            </div>

            {quoteSubmitted.includes(job.id) ? (
              <div className="bg-green-50 rounded-xl p-3 border border-green-200 text-center">
                <div className="text-lloyds-green font-semibold text-sm">✓ Quote submitted</div>
                <div className="text-xs text-lloyds-text-2 mt-0.5">Awaiting landlord response</div>
              </div>
            ) : quoteJob === job.id ? (
              <div className="bg-lloyds-grey rounded-xl p-3">
                <div className="font-semibold text-sm mb-2">Your quote (£)</div>
                <input
                  type="number"
                  className="w-full border border-lloyds-grey-mid rounded-lg px-3 py-2 text-sm mb-2 outline-none focus:border-lloyds-green"
                  placeholder="Enter amount e.g. 220"
                  value={quoteAmount}
                  onChange={e => setQuoteAmount(e.target.value)}
                />
                <div className="flex gap-2">
                  <button className="btn btn-primary flex-1 text-sm py-2" onClick={() => submitQuote(job.id)}>Submit quote</button>
                  <button className="btn btn-outline flex-1 text-sm py-2" onClick={() => setQuoteJob(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <button className="btn btn-primary btn-full text-sm" onClick={() => setQuoteJob(job.id)}>
                Submit quote
              </button>
            )}
          </div>
        ))}

        {/* Payments */}
        <div className="section-title">Payments</div>
        <div className="card">
          {d.payments.map(p => (
            <div key={p.id} className="list-item">
              <div>
                <div className="text-sm font-medium">{p.job}</div>
                <div className="text-xs text-lloyds-grey-dark">{p.date}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm text-lloyds-green">£{p.amount}</div>
                <span className={`badge ${p.status === 'paid' ? 'badge-green' : 'badge-amber'} text-xs`}>
                  {p.status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Earnings bar chart */}
        <div className="card">
          <div className="font-semibold text-sm mb-1">Monthly earnings</div>
          <div className="text-xs text-lloyds-grey-dark mb-3">Fast bank payment on completion</div>
          <div className="bar-chart mb-2">
            {[3200, 4100, 2800, 4800, 3900, 4200].map((v, i) => {
              const months = ['Oct','Nov','Dec','Jan','Feb','Mar']
              const h = Math.max(8, (v / 5000) * 72)
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div className="bar w-full" style={{ height: h, background: 'var(--green)' }} />
                  <span className="text-xs text-lloyds-grey-dark">{months[i]}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <BottomNav items={NAV} role="tradesperson" />
    </div>
  )
}
