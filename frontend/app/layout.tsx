import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: 'Rutinas de Gimnasio',
  description:
    'Consulta ejercicios de gimnasio organizados por categoría, con series y repeticiones recomendadas.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#16171b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${barlow.variable} bg-background`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased [&>main]:flex-1">
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
