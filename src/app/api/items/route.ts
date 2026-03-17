/**
 * Example CRUD API route — replace/extend per PRD.
 * GET  /api/items?userId=xxx  → list items
 * POST /api/items             → create item
 */
export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getItems, saveItem } from '@/lib/firebase/firestore'
import { v4 as uuid } from 'uuid'
import type { ApiResponse, Item } from '@/lib/types'
import { FieldValue } from 'firebase-admin/firestore'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  if (!userId) return Response.json({ ok: false, error: 'userId required' } satisfies ApiResponse, { status: 400 })

  const items = await getItems(userId)
  return Response.json({ ok: true, data: items } satisfies ApiResponse<Item[]>)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { userId, title, description } = body
  if (!userId || !title) return Response.json({ ok: false, error: 'userId and title required' } satisfies ApiResponse, { status: 400 })

  const item: Item = {
    id: uuid(),
    userId,
    title,
    description,
    status: 'active',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }
  await saveItem(item)
  return Response.json({ ok: true, data: item } satisfies ApiResponse<Item>, { status: 201 })
}
