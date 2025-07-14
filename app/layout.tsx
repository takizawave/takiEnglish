import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Atomic Language',
  description: 'Learn English with AI-powered tools and interactive materials',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
