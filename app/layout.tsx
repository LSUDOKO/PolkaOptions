import type { Metadata } from 'next'
import './globals.css'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { LenisProvider } from '@/components/layout/LenisProvider'

export const metadata: Metadata = {
  title: 'POLKAOPTIONS | ON-CHAIN DERIVATIVES',
  description: 'On-chain options trading powered by Polkadot PVM with Black-Scholes pricing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg text-white font-mono overflow-x-hidden cursor-none">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
