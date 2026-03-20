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
  { label: 'AI Help',  icon: '🤖', href: '/qa?role=tradesperson' },
]

export default function JobsPage() {
  const d = TRADESPERSON_DATA
  const [submitted, setSubmitted] = useState<string[]>(['j1'])
  const [quoteJob, setQuoteJob] = useState<string | null>(null)
  const [quoteAmount, setQuoteAmount] = useState('')

  const submit = (jobId: string) => {
    setSubmitted(p => [...p, jobId])
    setQuoteJob(null)
    setQuoteAmount('')
  }

  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="app-header">
        <div className="flex items-center justify-between">
          <Link href="/tradesperson" className="text-white/70 text-sm no-underline">← Back</Link>
          <span className="text-white/70 text-sm">Matched Jobs</span>
        </div>
        <div className="text-white text-2xl font-bold mt-3">{d.jobs.length} jobs matched</div>
        <div className="text-white/70 text-xs">Based on NICEIC cert · Greater London & Essex</div>
      </div>
      <div className="page-content">
        {d.jobs.map(job => (
          <div key={job.id} className="card">
            <div className="flex justify-between items-start mb-2">
              <div className="font-bold text-sm flex-1 pr-2">{job.title}</div>
              <span className={`badge shrink-0 ${job.urgency === 'urgent' ? 'badge-red' : 'badge-blue'}`}>
                {job.urgency === 'urgent' ? '🚨 Urgent' : '📋 Normal'}
              </span>
            </div>
            <div className="text-xs text-lloyds-grey-dark mb-2">📍 {job.property}</div>
            <p className="text-xs text-lloyds-text-2 mb-3 leading-relaxed">{job.description}</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-lloyds-grey rounded-lg p-2">
                <div className="text-xs text-lloyds-grey-dark">Budget</div>
                <div className="font-semibold text-sm text-lloyds-green">{job.budget}</div>
              </div>
              <div className="bg-lloyds-grey rounded-lg p-2">
                <div className="text-xs text-lloyds-grey-dark">Deadline</div>
                <div className="font-semibold text-sm">{job.deadline}</div>
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap mb-3">
              <span className="badge badge-blue">{job.type}</span>
              <span className="badge badge-green">✓ {job.certRequired}</span>
              <span className="badge badge-grey">👤 {job.landlord}</span>
            </div>
            {submitted.includes(job.id) ? (
              <div className="bg-green-50 rounded-xl p-3 border border-green-200 text-center">
                <div className="text-lloyds-green font-semibold text-sm">✓ Quote submitted</div>
                <div className="text-xs text-lloyds-text-2 mt-0.5">Awaiting landlord response</div>
              </div>
            ) : quoteJob === job.id ? (
              <div className="bg-lloyds-grey rounded-xl p-3">
                <div className="font-semibold text-sm mb-2">Enter your quote (£)</div>
                <input
                  type="number"
                  className="w-full border border-lloyds-grey-mid rounded-lg px-3 py-2 text-sm mb-2 outline-none focus:border-lloyds-green"
                  placeholder="e.g. 220"
                  value={quoteAmount}
                  onChange={e => setQuoteAmount(e.target.value)}
                />
                <div className="flex gap-2">
                  <button className="btn btn-primary flex-1 text-sm py-2" onClick={() => submit(job.id)}>Submit</button>
                  <button className="btn btn-outline flex-1 text-sm py-2" onClick={() => setQuoteJob(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <button className="btn btn-primary btn-full text-sm" onClick={() => setQuoteJob(job.id)}>Submit quote</button>
            )}
          </div>
        ))}
      </div>
      <BottomNav items={NAV} role="tradesperson" />
    </div>
  )
}
