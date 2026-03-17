import { getApps, initializeApp, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

let adminApp: App
let adminDb: Firestore

export function getAdminApp(): App {
  if (!adminApp) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    adminApp = getApps().length
      ? getApps()[0]
      : initializeApp({ credential: cert(JSON.parse(Buffer.from(serviceAccount!, 'base64').toString())) })
  }
  return adminApp
}

export function getAdminDb(): Firestore {
  if (!adminDb) {
    adminDb = getFirestore(getAdminApp())
  }
  return adminDb
}
