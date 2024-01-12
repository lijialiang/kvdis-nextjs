import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KvDis Nextjs Demo',
  description: 'Demo for KvDis Nextjs',
  viewport: {
    maximumScale: 5,
    initialScale: 1,
    width: 'device-width'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
