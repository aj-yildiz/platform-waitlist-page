// layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Ensure globals.css is present

const inter = Inter({ subsets: ['latin'] })

// ✅ UPDATED METADATA BELOW
export const metadata: Metadata = {
  title: 'Vastis - Allied Health Space Marketplace',
  description: 'Connect with allied health spaces and practitioners.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
