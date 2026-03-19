'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { icon: 'show_chart', label: 'TRADE', href: '/trade' },
  { icon: 'account_balance_wallet', label: 'VAULTS', href: '#' },
  { icon: 'gavel', label: 'GOVERNANCE', href: '#' },
  { icon: 'query_stats', label: 'STATS', href: '#' },
  { icon: 'description', label: 'DOCS', href: '/docs/bs-pricer' },
]

export function Sidebar() {
  const sideRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sideRef.current,
        { x: -260, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <aside
      ref={sideRef}
      className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-bg border-r-2 border-white hidden lg:flex flex-col pt-8 z-40"
    >
      <div className="px-6 mb-8">
        <h2 className="font-display text-4xl text-white opacity-30 leading-none">TERMINAL_V1</h2>
        <p className="font-mono text-[10px] text-pink mt-1">BLOCK_84291</p>
        <div className="mt-2 h-0.5 w-[60%] bg-pink" />
      </div>

      <nav className="flex-1">
        {navItems.map(item => {
          const isActive = pathname.startsWith(item.href) && item.href !== '#'
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`px-6 py-4 flex items-center gap-3 font-mono font-bold uppercase text-xs tracking-wider transition-all duration-100 ${
                isActive
                  ? 'bg-pink text-white rounded-full mx-4 my-1 justify-start'
                  : 'text-white hover:text-pink hover:translate-x-1'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="w-full bg-pink text-white font-mono font-bold text-xs py-3 uppercase hover:bg-white hover:text-black transition-all duration-100 active:scale-95">
          CONNECT WALLET
        </button>
      </div>
    </aside>
  )
}
