'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

const statusItems = [
  { label: 'MAINNET_HEALTH: EXCELLENT', color: 'bg-cyan' },
  { label: 'RPC_ENDPOINTS: ACTIVE (3/3)', color: 'bg-cyan' },
  { label: 'ACCOUNT_CONNECTED: SUBSTRATE_WALLET', color: 'bg-pink' },
  { label: 'TRADING_VOLUME_24H: $24.8M', color: 'bg-pink' },
]

export function StatusBar() {
  const barRef = useRef<HTMLElement>(null)
  const [blockHeight, setBlockHeight] = useState(194821)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = barRef.current?.querySelectorAll('[data-status-item]')
      if (items) {
        gsap.fromTo(items,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.5,
            delay: 1.2,
            ease: 'power2.out',
            stagger: 0.1
          }
        )
      }
    })

    const interval = setInterval(() => setBlockHeight(b => b + 1), 6000)
    return () => { ctx.revert(); clearInterval(interval) }
  }, [])

  return (
    <footer
      ref={barRef}
      className="fixed bottom-0 w-full z-50 flex justify-between items-center px-4 py-1 bg-bg-dark border-t border-white"
    >
      <div className="flex gap-4 items-center">
        {statusItems.map(item => (
          <span key={item.label} data-status-item className="flex items-center gap-1.5 font-mono text-[10px] tracking-tight text-white/40 uppercase">
            <span className={`w-1.5 h-1.5 rounded-full ${item.color} ${item.color === 'bg-cyan' ? 'animate-blink' : ''}`} />
            {item.label}
          </span>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <span data-status-item className="font-mono text-[10px] text-teal">OPERATIONAL</span>
        <span data-status-item className="font-mono text-[10px] text-white/60 hidden sm:block">LATENCY: 12MS</span>
        <span data-status-item className="font-mono text-[10px] text-white/60 hidden sm:block">P2P_ACTIVE</span>
        <span data-status-item className="font-mono text-[10px] text-white/60 num">BLOCK_HEIGHT: {blockHeight.toLocaleString()}</span>
      </div>
    </footer>
  )
}
