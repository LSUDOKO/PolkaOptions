'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { StatusBar } from '@/components/layout/StatusBar'

const ivBars = [
  { strike: '$6.00', iv: 85 },
  { strike: '$6.50', iv: 70 },
  { strike: '$7.00', iv: 62 },
  { strike: '$7.50', iv: 58 },
  { strike: '$8.00', iv: 65 },
]

const liveFeed = [
  { exchange: 'BINANCE:DOTUSD', price: '7.4215', color: 'text-teal' },
  { exchange: 'KRAKEN:DOTUSD', price: '7.4210', color: 'text-teal' },
  { exchange: 'COINBASE:DOTUSD', price: '7.4208', color: 'text-pink' },
]

const candleData = [
  { bullish: true, wickH: 20, body: 32 },
  { bullish: false, wickH: 24, body: 40 },
  { bullish: true, wickH: 0, body: 48 },
  { bullish: true, wickH: 0, body: 56 },
  { bullish: false, wickH: 0, body: 32 },
  { bullish: false, wickH: 0, body: 20 },
  { bullish: true, wickH: 0, body: 64 },
]

export default function MarketsPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const ivRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats bar stagger
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll('[data-stat-item]')
        gsap.fromTo(items,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, stagger: 0.08, delay: 0.4, duration: 0.4, ease: 'power2.out' }
        )
      }

      // Candlestick entrance
      if (chartRef.current) {
        const candles = chartRef.current.querySelectorAll('[data-candle]')
        gsap.fromTo(candles,
          { scaleY: 0, transformOrigin: 'bottom' },
          { scaleY: 1, stagger: 0.05, duration: 0.5, delay: 0.6, ease: 'power2.out' }
        )
      }

      // IV bars
      if (ivRef.current) {
        const bars = ivRef.current.querySelectorAll('[data-iv-bar]')
        ScrollTrigger.create({
          trigger: ivRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            bars.forEach(bar => {
              const w = bar.getAttribute('data-width') || '0%'
              gsap.fromTo(bar, { width: '0%' }, { width: w, duration: 0.6, ease: 'power2.out' })
            })
          }
        })
      }

      // Bottom sections
      if (bottomRef.current) {
        const sections = bottomRef.current.querySelectorAll('[data-bottom]')
        ScrollTrigger.create({
          trigger: bottomRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(sections, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.5, ease: 'power2.out' })
          }
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex min-h-screen bg-bg">
      <Navbar variant="app" />
      <Sidebar />

      <main className="lg:ml-64 pt-16 pb-16 min-h-screen flex-1">
        {/* Market Header Strip */}
        <div ref={statsRef} className="bg-black border-b border-white px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-16 z-30">
          <div className="flex items-center gap-6">
            <div data-stat-item>
              <span className="text-[10px] text-white/50 block tracking-widest font-mono">ASSET</span>
              <span className="text-xl font-bold font-headline">DOT/USD</span>
            </div>
            <div data-stat-item>
              <span className="text-[10px] text-white/50 block tracking-widest font-mono">PRICE</span>
              <span className="text-xl font-bold text-teal font-headline num">$7.4210</span>
            </div>
            <div data-stat-item className="hidden sm:block">
              <span className="text-[10px] text-white/50 block tracking-widest font-mono">24H CHANGE</span>
              <span className="text-xl font-bold text-teal font-headline num">+4.21%</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div data-stat-item className="hidden md:block">
              <span className="text-[10px] text-white/50 block tracking-widest font-mono">VOLUME_24H</span>
              <span className="text-xl font-bold font-headline num">1.24B</span>
            </div>
            <div data-stat-item>
              <span className="text-[10px] text-white/50 block tracking-widest font-mono">OPEN_INTEREST</span>
              <span className="text-xl font-bold font-headline num">482.1M</span>
            </div>
            <div data-stat-item className="bg-pink px-3 py-1 text-xs font-bold text-white font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-blink" />
              LIVE_FEED
            </div>
          </div>
        </div>

        {/* Ghost title */}
        <div className="relative h-48 flex items-center overflow-hidden select-none pointer-events-none">
          <h2 className="font-display text-[15rem] leading-none text-white opacity-[0.03] absolute -left-10 top-0 whitespace-nowrap">MARKETS_TERMINAL</h2>
        </div>

        {/* Chart */}
        <section className="px-6 mb-10 -mt-20 relative z-10">
          <div className="flex justify-between items-end mb-4 border-l-4 border-pink pl-4">
            <h3 className="font-headline text-5xl tracking-tighter">PRICE_ACTION.EXE</h3>
            <div className="flex gap-2 font-mono text-xs">
              <button className="px-3 py-1 bg-white text-black">1H</button>
              <button className="px-3 py-1 border border-white hover:bg-white hover:text-black transition-colors duration-100">4H</button>
              <button className="px-3 py-1 border border-white hover:bg-white hover:text-black transition-colors duration-100">1D</button>
            </div>
          </div>
          <div ref={chartRef} className="h-[400px] border border-white bg-black relative flex items-end p-4 gap-1">
            {candleData.map((c, i) => (
              <div key={i} data-candle className="flex-1 flex flex-col justify-end gap-1 items-center will-change-transform" style={{ height: `${c.body + c.wickH}%` }}>
                {c.wickH > 0 && <div className={`w-full ${c.bullish ? 'bg-teal' : 'bg-pink'} opacity-40`} style={{ height: `${c.wickH}%` }} />}
                <div className={`w-full ${c.bullish ? 'bg-teal' : 'bg-pink'}`} style={{ height: `${c.body}%` }} />
              </div>
            ))}
            {/* Grid overlay */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-10 px-4 font-mono text-[10px]">
              {['8.5000', '8.0000', '7.5000', '7.0000', '6.5000'].map(p => (
                <div key={p} className="border-t border-white w-full flex justify-end">{p}</div>
              ))}
            </div>
          </div>
        </section>

        {/* IV Structure */}
        <section className="px-6 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h3 className="font-headline text-5xl tracking-tighter mb-4 text-pink">IV_STRUCTURE</h3>
              <p className="font-mono text-sm text-white/60 mb-6">IMPLIED VOLATILITY BY STRIKE PRICE ACROSS MULTIPLE EXPIRATIONS. HIGHER SKEW OBSERVED IN DOWN-SIDE PUTS.</p>
              <div className="space-y-4">
                <div className="border border-white p-4">
                  <span className="font-mono text-[10px] block mb-2 text-white/40 tracking-widest">TERM_STRUCTURE_30D</span>
                  <div className="flex items-center gap-4">
                    <span className="font-headline text-3xl num">78.4%</span>
                    <span className="text-teal font-mono text-xs num">▲ 2.1%</span>
                  </div>
                </div>
                <div className="border border-white p-4">
                  <span className="font-mono text-[10px] block mb-2 text-white/40 tracking-widest">TERM_STRUCTURE_90D</span>
                  <div className="flex items-center gap-4">
                    <span className="font-headline text-3xl num">64.2%</span>
                    <span className="text-pink font-mono text-xs num">▼ 0.8%</span>
                  </div>
                </div>
              </div>
            </div>
            <div ref={ivRef} className="lg:col-span-8 bg-[#1c1b1b] border border-white p-8 grain overflow-hidden">
              <h4 className="font-mono text-xs uppercase mb-8 border-b border-white/20 pb-2 text-white/40 tracking-widest">STRIKE_PRICE vs IMPLIED_VOLATILITY</h4>
              <div className="space-y-6">
                {ivBars.map(bar => (
                  <div key={bar.strike} className="flex items-center gap-4">
                    <span className="w-16 font-mono text-xs">{bar.strike}</span>
                    <div className="flex-1 h-8 bg-white/5 relative">
                      <div data-iv-bar data-width={`${bar.iv}%`} className="absolute inset-y-0 left-0 bg-pink" style={{ width: 0 }} />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold z-10">{bar.iv}% IV</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom 3-column */}
        <section ref={bottomRef} className="mt-20 border-t-2 border-white">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div data-bottom className="p-8 border-b md:border-b-0 md:border-r border-white hover:bg-white hover:text-black transition-colors duration-150 group cursor-none">
              <span className="font-headline text-lg block mb-4"><span className="text-pink group-hover:text-black">01</span> // LIVE_FEED</span>
              <div className="space-y-2 font-mono text-xs">
                {liveFeed.map(f => (
                  <div key={f.exchange} className="flex justify-between border-b border-current py-1">
                    <span>{f.exchange}</span>
                    <span className={`font-bold ${f.color} group-hover:text-black num`}>{f.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div data-bottom className="p-8 border-b md:border-b-0 md:border-r border-white hover:bg-teal hover:text-black transition-colors duration-150 group cursor-none">
              <span className="font-headline text-lg block mb-4"><span className="text-pink group-hover:text-black">02</span> // OPEN_INTEREST</span>
              <div className="space-y-4">
                <div className="flex items-end gap-1 h-12">
                  {[4, 8, 10, 12, 9].map((h, i) => (
                    <div key={i} className="flex-1 bg-current transition-opacity" style={{ height: `${h * 8}%`, opacity: 0.2 + i * 0.2 }} />
                  ))}
                </div>
                <p className="font-mono text-[10px] leading-tight uppercase">Net positioning heavily biased towards $8.00 calls for SEP-27 expiry.</p>
              </div>
            </div>
            <div data-bottom className="p-8 hover:bg-pink hover:text-white transition-colors duration-150 group cursor-none">
              <span className="font-headline text-lg block mb-4"><span className="text-pink group-hover:text-white">03</span> // VOLATILITY_INDEX</span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-6xl tracking-tighter num">72.8</span>
                <span className="font-headline text-xl">HV_30D</span>
              </div>
              <div className="w-full h-1 bg-current opacity-20 relative">
                <div className="absolute inset-y-0 left-0 bg-current w-[72%]" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <StatusBar />
    </div>
  )
}
