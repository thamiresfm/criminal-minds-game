import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import NotificationContainer from '@/components/ui/NotificationContainer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Criminal Minds Game',
  description: 'Jogo de investigação criminal online para até 6 jogadores',
  keywords: ['jogo', 'investigação', 'criminal', 'mistério', 'online', 'multiplayer'],
  authors: [{ name: 'Criminal Minds Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#d4af37',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
        <NotificationContainer />
      </body>
    </html>
  )
}
