'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { LiveBlockCounter } from '@/components/ui/LiveBlockCounter'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavVariant = 'marketing' | 'app'

interface NavbarProps {
  variant?: NavVariant
}

const appLinks = [
  { label: 'TRADE', href: '/trade' },
  { label: 'MARKETS', href: '/markets' },
  { label: 'DOCS', href: '/docs/bs-pricer' },
  { label: 'LEARN', href: '/learn' },
]

export function Navbar({ variant = 'app' }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  if (variant === 'marketing') {
    return (
      <nav ref={navRef} className="fixed top-4 left-4 z-50 flex flex-col gap-2 items-start max-w-min">
        <Link href="/" className="font-headline text-2xl tracking-tighter text-pink mb-2">
          POLKAOPTIONS
        </Link>
        <div className="flex gap-2">
          <Link href="/#hero" className="bg-pink text-white rounded-full px-6 py-2 font-mono uppercase tracking-[0.05em] text-sm hover:bg-white hover:text-pink transition-colors duration-100">ABOUT</Link>
          <Link href="/trade" className="bg-transparent text-white border border-white rounded-full px-6 py-2 font-mono uppercase tracking-[0.05em] text-sm hover:bg-white hover:text-pink transition-colors duration-100">TRADE</Link>
        </div>
        <div className="flex gap-2">
          <Link href="/learn" className="bg-transparent text-white border border-white rounded-full px-6 py-2 font-mono uppercase tracking-[0.05em] text-sm hover:bg-white hover:text-pink transition-colors duration-100">WHY</Link>
          <Link href="/trade" className="bg-transparent text-white border border-white rounded-full px-6 py-2 font-mono uppercase tracking-[0.05em] text-sm hover:bg-white hover:text-pink transition-colors duration-100">LAUNCH APP</Link>
        </div>
      </nav>
    )
  }

  return (
    <header
      ref={navRef}
      className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-bg border-b-2 border-white backdrop-blur-sm"
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="font-headline text-2xl tracking-tighter text-pink">
          POLKAOPTIONS
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          {appLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono uppercase tracking-widest text-xs px-2 py-1 transition-colors duration-100 ${
                pathname.startsWith(link.href)
                  ? 'text-pink border-b-2 border-pink'
                  : 'text-white hover:bg-white hover:text-black'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <span className="font-mono uppercase tracking-[0.05em] text-xs text-white/50">LIVE PRICER</span>
        <span className="font-mono uppercase tracking-[0.05em] text-xs text-pink flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-blink" />
          STATUS: ONLINE
        </span>
        <LiveBlockCounter />
      </div>
      <div className="flex items-center gap-4">
        <button className="text-white/60 hover:text-white transition-colors duration-100 material-symbols-outlined">
          settings
        </button>
        <button className="text-white/60 hover:text-white transition-colors duration-100 flex items-center gap-2">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="font-mono text-xs">0x71...A4F</span>
        </button>
      </div>
    </header>
  )
}
