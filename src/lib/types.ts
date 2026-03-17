import type { Timestamp, FieldValue } from 'firebase/firestore'

export type FirestoreTimestamp = Timestamp | FieldValue

// ─── User ─────────────────────────────────────────────────────────────
export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

// ─── Generic item (replace / extend per PRD) ──────────────────────────
export interface Item {
  id: string
  userId: string
  title: string
  description?: string
  status: 'active' | 'done' | 'archived'
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

// ─── API responses ─────────────────────────────────────────────────────
export interface ApiOk<T = unknown> { ok: true;  data: T }
export interface ApiErr           { ok: false; error: string }
export type ApiResponse<T = unknown> = ApiOk<T> | ApiErr
