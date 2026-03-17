/**
 * Firestore helpers — server-side (Admin SDK).
 * Add domain-specific helpers here as PRD features are built.
 */
import { getAdminDb } from './admin'
import type { UserProfile, Item } from '../types'
import { FieldValue } from 'firebase-admin/firestore'

// ─── User ──────────────────────────────────────────────────────────────
export async function getUser(uid: string): Promise<UserProfile | null> {
  const snap = await getAdminDb().collection('users').doc(uid).get()
  return snap.exists ? (snap.data() as UserProfile) : null
}

export async function saveUser(profile: Partial<UserProfile> & { uid: string }) {
  await getAdminDb()
    .collection('users')
    .doc(profile.uid)
    .set({ ...profile, updatedAt: FieldValue.serverTimestamp() }, { merge: true })
}

// ─── Items (generic — replace per PRD) ────────────────────────────────
export async function getItems(userId: string): Promise<Item[]> {
  const snap = await getAdminDb()
    .collection('items')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get()
  return snap.docs.map(d => d.data() as Item)
}

export async function saveItem(item: Partial<Item> & { id: string; userId: string }) {
  await getAdminDb()
    .collection('items')
    .doc(item.id)
    .set({ ...item, updatedAt: FieldValue.serverTimestamp() }, { merge: true })
}
