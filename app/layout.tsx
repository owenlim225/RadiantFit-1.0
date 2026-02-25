import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Radiant Fit - Premium Fitness Training',
  description: 'Radiant Fit - Premium fitness training, nutrition guidance, and progress tracking to help you shine',
  generator: 'v0.app',
  icons: {
    icon: '/radiant-fit-logo.jpg',
    apple: '/radiant-fit-logo.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#d4af37',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
