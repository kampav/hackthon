import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ background: 'var(--green)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl">🐎</div>
          <div>
            <div className="font-bold text-lg leading-tight">Rent Smart</div>
            <div className="text-green-100 text-xs">by Lloyds Bank · Hackathon MVP</div>
          </div>
        </div>
        <h1 className="text-2xl font-bold leading-snug mb-2">
          AI-powered renting intelligence
        </h1>
        <p className="text-green-100 text-sm leading-relaxed">
          Protecting tenants, supporting landlords, and connecting tradespeople — built for the Renters' Rights Act 2026.
        </p>
      </div>

      {/* Persona cards */}
      <div className="bg-lloyds-grey rounded-t-3xl px-4 pt-6 pb-8 min-h-screen">
        <p className="text-xs font-bold text-lloyds-grey-dark uppercase tracking-wider mb-4 text-center">
          Hackathon Demo — Select a persona
        </p>

        <div className="space-y-3">
          <Link href="/tenant" className="block no-underline">
            <div className="card flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-lloyds-green-light flex items-center justify-center text-2xl shrink-0">👩</div>
              <div className="flex-1">
                <div className="font-bold text-lloyds-text">Sarah Mitchell</div>
                <div className="text-sm text-lloyds-grey-dark">Tenant · Manchester</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="badge badge-red">⚠ Shortfall risk</span>
                  <span className="badge badge-blue">AI Q&A</span>
                </div>
              </div>
              <span className="text-lloyds-grey-dark text-lg">›</span>
            </div>
          </Link>

          <Link href="/landlord" className="block no-underline">
            <div className="card flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-lloyds-green-light flex items-center justify-center text-2xl shrink-0">🏠</div>
              <div className="flex-1">
                <div className="font-bold text-lloyds-text">David Thompson</div>
                <div className="text-sm text-lloyds-grey-dark">Landlord · 3 properties</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="badge badge-amber">⏰ EICR expiring</span>
                  <span className="badge badge-blue">AI Q&A</span>
                </div>
              </div>
              <span className="text-lloyds-grey-dark text-lg">›</span>
            </div>
          </Link>

          <Link href="/tradesperson" className="block no-underline">
            <div className="card flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-lloyds-green-light flex items-center justify-center text-2xl shrink-0">⚡</div>
              <div className="flex-1">
                <div className="font-bold text-lloyds-text">Raj Patel</div>
                <div className="text-sm text-lloyds-grey-dark">NICEIC Electrician · London</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="badge badge-green">3 matched jobs</span>
                  <span className="badge badge-amber">£780 pending</span>
                </div>
              </div>
              <span className="text-lloyds-grey-dark text-lg">›</span>
            </div>
          </Link>
        </div>

        {/* Act notice */}
        <div className="alert alert-blue mt-4">
          <span className="text-xl shrink-0">⚖️</span>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--blue)' }}>Renters' Rights Act 2025</div>
            <div className="text-xs text-lloyds-text-2 mt-0.5">Section 21 abolished from 1 May 2026. All demos include real Act guidance.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
