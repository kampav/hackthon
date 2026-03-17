import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hackathon App',
  description: 'AI-powered hackathon skeleton',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="mesh-bg min-h-screen">{children}</body>
    </html>
  )
}
