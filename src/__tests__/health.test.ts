/**
 * API health route unit test.
 * Add feature-specific tests in src/__tests__/ as PRD features are built.
 */
import { GET } from '../app/api/health/route'

describe('GET /api/health', () => {
  it('returns status ok with correct shape', async () => {
    const res = await GET()
    const body = await res.json()

    expect(body.status).toBe('ok')
    expect(body.service).toBe('hackathon-api')
    expect(typeof body.timestamp).toBe('string')
  })
})
