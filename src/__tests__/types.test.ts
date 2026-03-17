/**
 * Type-shape validation tests — catch breaking type changes early.
 */
import type { UserProfile, Item, ApiResponse } from '../lib/types'

describe('Type shapes', () => {
  it('UserProfile has required fields', () => {
    const profile: UserProfile = {
      uid: 'u1',
      email: 'test@example.com',
      displayName: 'Test User',
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
    }
    expect(profile.uid).toBe('u1')
  })

  it('Item status is constrained', () => {
    const item: Item = {
      id: 'i1',
      userId: 'u1',
      title: 'Test item',
      status: 'active',
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
    }
    expect(['active', 'done', 'archived']).toContain(item.status)
  })

  it('ApiResponse ok=true has data field', () => {
    const res: ApiResponse<string> = { ok: true, data: 'hello' }
    expect(res.ok).toBe(true)
    if (res.ok) expect(res.data).toBe('hello')
  })
})
