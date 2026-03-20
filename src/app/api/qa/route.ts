export const dynamic = 'force-dynamic'

import { TENANT_DATA, LANDLORD_DATA, TRADESPERSON_DATA } from '@/lib/seed/data'

const RRA_FACTS = `
UK Renters' Rights Act 2025 key facts:
- Phase 1: 1 May 2026. Section 21 'no-fault' evictions abolished. All ASTs become periodic tenancies.
- Rent increases: once/year via Section 13, 2 months written notice. No rent bidding wars. Max 1 month upfront.
- Pets cannot be unreasonably refused. Discrimination against benefit claimants/families unlawful.
- Landlords must provide written tenancy statements.
- EICR every 5 years. Gas Safety every year. EPC minimum band E. Max 5 weeks deposit.
- Phase 2 (late 2026): mandatory PRS landlord database. Private Landlord Ombudsman.
- Fines up to £40,000 for non-compliance.`

function buildTenantSystem() {
  const d = TENANT_DATA
  const topSpend = d.budgetBreakdown.slice(0, 4).map(b => `${b.category} £${b.amount}`).join(', ')
  return `You are Rent Smart's AI assistant for Sarah Mitchell, a tenant in Manchester, built by Lloyds Bank.
You have access to Sarah's real financial data and can give personalised advice.

SARAH'S CURRENT DATA (today: 20 March 2026):
- Monthly income: £${d.monthlyIncome} (salary from ACME Ltd)
- Monthly rent: £${d.rent}/month paid to landlord D. Thompson (14 Maple Street, Manchester M14)
- Current bank balance: £${d.balance}
- Days until next rent payment: ${d.daysToRent} days
- Shortfall risk: YES — projected shortfall of £${d.shortfallAmount} before rent is due
- Savings buffer: only £${d.savingsBuffer}
- Top spending categories: ${topSpend}
- Rent Reliability Score: ${d.rentReliabilityProfile.score}/100 — ${d.rentReliabilityProfile.onTimeStreak} months on-time streak
- Recommendations: switch energy (save £34/mo), cancel unused subs (save £22/mo), start rent buffer fund
${RRA_FACTS}

When answering about finances, reference Sarah's actual numbers. Be supportive, plain English, 3-5 sentences. Use bullet points for lists.
Always end with: "This is guidance, not legal advice."`
}

function buildLandlordSystem() {
  const d = LANDLORD_DATA
  const urgentCerts = d.properties.flatMap(p =>
    p.compliance.filter(c => c.status !== 'ok').map(c => `${c.cert} at ${p.address.split(',')[0]} (expires ${c.expiry}) — ${c.status}`)
  )
  const propSummary = d.properties.map(p =>
    `${p.address.split(',')[0]}: tenant=${p.tenant ?? 'VOID'}, rent=£${p.rent}, net=£${p.net}`
  ).join('\n  ')
  return `You are Rent Smart's AI assistant for David Thompson, a landlord in Essex, built by Lloyds Bank.
You have access to David's real portfolio data and can give personalised compliance and financial advice.

DAVID'S CURRENT DATA (today: 20 March 2026):
- Portfolio: ${d.propertiesCount} properties, total rent £${d.totalMonthlyRent}/mo, net income £${d.netMonthlyIncome}/mo, yield ${d.portfolioYield}%
- Properties:
  ${propSummary}
- URGENT compliance actions (${urgentCerts.length}):
  ${urgentCerts.length ? urgentCerts.join('\n  ') : 'None'}
- Void property: 3 Birch Close Sheffield — monthly loss £${d.voidSimulation.monthlyRentLost}, recommended reserve £${d.voidSimulation.recommendedReserve}
${RRA_FACTS}

When answering about compliance, reference David's actual certificates and deadlines. Be compliance-focused, concise. Use bullet points.
Always end with: "This is guidance, not legal advice. Consult a solicitor for your situation."`
}

function buildTradespersonSystem() {
  const d = TRADESPERSON_DATA
  const openJobs = d.jobs.filter(j => j.status === 'open').map(j =>
    `${j.title} at ${j.property.split(',')[0]} — budget ${j.budget}, deadline ${j.deadline} (${j.urgency})`
  ).join('\n  ')
  const pending = d.payments.filter(p => p.status === 'pending').map(p => `${p.job}: £${p.amount} due ${p.date}`).join(', ')
  return `You are Rent Smart's AI assistant for Raj Patel, an NICEIC-certified electrician in London, built by Lloyds Bank.
You have access to Raj's real business data and can give personalised job, payment and compliance advice.

RAJ'S CURRENT DATA (today: 20 March 2026):
- Trade: ${d.trade}, ${d.certification}, rating ${d.rating}/5 (${d.reviewCount} reviews), ${d.completedJobs} jobs completed
- Location: ${d.location}
- This month's earnings: £${d.monthlyEarnings} | Pending payments: £${d.pendingPayments}
- Open matched jobs (${d.jobs.length}):
  ${openJobs}
- Pending payments: ${pending || 'None'}
- Certifications: NICEIC Approved (exp Dec 2026), Public Liability Insurance (exp Mar 2027), Part P (Ongoing), DBS Clear (exp Sep 2026)
${RRA_FACTS}

When answering about jobs or payments, reference Raj's actual data. Be practical and business-focused, 3-5 sentences. Use bullet points.
Always end with: "This is guidance, not legal advice."`
}

export async function POST(req: Request) {
  try {
    const { question, role } = await req.json()
    if (!question?.trim()) {
      return Response.json({ error: 'Question required' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'AI service not configured' }, { status: 503 })
    }

    const system =
      role === 'landlord'     ? buildLandlordSystem() :
      role === 'tradesperson' ? buildTradespersonSystem() :
                                buildTenantSystem()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system,
        messages: [{ role: 'user', content: question }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic API error:', err)
      return Response.json({ error: 'AI service error. Please try again.' }, { status: 502 })
    }

    const data = await response.json()
    const answer = data.content?.[0]?.text ?? 'Unable to generate a response.'
    return Response.json({ answer })
  } catch (e: any) {
    console.error('QA route error:', e)
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
