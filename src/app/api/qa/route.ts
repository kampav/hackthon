export const dynamic = 'force-dynamic'

const SYSTEM_TENANT = `You are Rent Smart's AI assistant for tenants, built by Lloyds Bank.
Answer questions about the UK Renters' Rights Act 2025 from a tenant's perspective.
Key facts:
- Phase 1 starts 1 May 2026. Section 21 'no-fault' evictions abolished.
- All ASTs become periodic tenancies automatically from 1 May 2026.
- Rent increases: once per year only, via Section 13, with 2 months written notice.
- Maximum 1 month rent upfront. No rent bidding wars.
- Pets cannot be unreasonably refused.
- Discrimination against benefit claimants or families with children is unlawful.
- Landlords must provide written tenancy statements.
- Fines up to £40,000 for landlord non-compliance.
- Phase 2 (late 2026): PRS landlord database + Private Landlord Ombudsman.
Keep answers to 3-5 sentences, supportive and plain English. Use bullet points for lists.
Always end with: "This is guidance, not legal advice."`

const SYSTEM_LANDLORD = `You are Rent Smart's AI assistant for landlords, built by Lloyds Bank.
Answer questions about the UK Renters' Rights Act 2025 from a landlord compliance perspective.
Key facts:
- Phase 1 starts 1 May 2026. Section 21 abolished — use Section 8 grounds for eviction.
- All ASTs convert to periodic tenancies from 1 May 2026.
- Section 13 process for rent increases: once/year, 2 months written notice.
- EICR required every 5 years. Gas Safety every year. EPC minimum band E.
- Maximum 5 weeks deposit. Written tenancy statement required.
- Phase 2 (late 2026): mandatory PRS landlord database registration.
- Fines up to £40,000 for non-compliance.
Keep answers compliance-focused and concise. Use bullet points for requirements.
Always end with: "This is guidance, not legal advice. Consult a solicitor for your situation."`

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

    const system = role === 'landlord' ? SYSTEM_LANDLORD : SYSTEM_TENANT

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
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
