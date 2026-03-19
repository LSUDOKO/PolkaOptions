'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Navbar } from '@/components/layout/Navbar'
import Link from 'next/link'

const greeksBands = [
  { name: 'DELTA', desc: 'PRICE SENSITIVITY RELATIVE TO UNDERLYING MOVEMENT.', bg: 'bg-pink', text: 'text-white', icon: 'change_history' },
  { name: 'GAMMA', desc: 'THE RATE OF CHANGE IN DELTA PER $1 MOVE.', bg: 'bg-purple', text: 'text-white', icon: 'speed' },
  { name: 'THETA', desc: 'TIME DECAY. THE COST OF HOLDING THE OPTION.', bg: 'bg-blue', text: 'text-black', icon: 'hourglass_empty' },
  { name: 'VEGA', desc: 'SENSITIVITY TO IMPLIED VOLATILITY SHIFTS.', bg: 'bg-teal', text: 'text-black', icon: 'waves' },
  { name: 'RHO', desc: 'SENSITIVITY TO INTEREST RATE FLUCTUATIONS.', bg: 'bg-orange', text: 'text-white', icon: 'show_chart' },
]

export default function LearnPage() {
  const heroRef = useRef<HTMLElement>(null)
  const typeRef = useRef<HTMLParagraphElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const formulaRef = useRef<HTMLElement>(null)
  const greeksRef = useRef<HTMLElement>(null)
  const comparisonRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero slam
      const heroText = heroRef.current?.querySelector('h1')
      if (heroText) {
        gsap.fromTo(heroText, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out' })
      }

      // Typewriter
      if (typeRef.current) {
        const text = '> DECODING THE PROTOCOL LOGIC'
        typeRef.current.textContent = ''
        gsap.to(typeRef.current, {
          duration: text.length * 0.04,
          text: { value: text, delimiter: '' },
          ease: 'none',
          delay: 0.6
        })
      }

      // Quote slide
      if (quoteRef.current) {
        ScrollTrigger.create({
          trigger: quoteRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(quoteRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
          }
        })
      }

      // Formula pieces
      if (formulaRef.current) {
        const terms = formulaRef.current.querySelectorAll('[data-term]')
        ScrollTrigger.create({
          trigger: formulaRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(terms, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.3, duration: 0.5, ease: 'power2.out' })
          }
        })
      }

      // Greeks bands
      if (greeksRef.current) {
        const bands = greeksRef.current.querySelectorAll('[data-greek]')
        bands.forEach((band, i) => {
          ScrollTrigger.create({
            trigger: band,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(band, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, delay: i * 0.1, ease: 'power3.out' })
            }
          })
        })
      }

      // Comparison bars
      if (comparisonRef.current) {
        const bars = comparisonRef.current.querySelectorAll('[data-bar]')
        ScrollTrigger.create({
          trigger: comparisonRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            bars.forEach(bar => {
              const width = bar.getAttribute('data-width') || '0%'
              gsap.fromTo(bar, { width: '0%' }, { width, duration: 1, ease: 'power2.out' })
            })
          }
        })
      }

      // CTA
      if (ctaRef.current) {
        const btn = ctaRef.current.querySelector('a')
        if (btn) {
          ScrollTrigger.create({
            trigger: ctaRef.current,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.fromTo(btn, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, delay: 0.3 })
            }
          })
        }
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main>
      <Navbar variant="app" />

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center items-center overflow-hidden border-b-2 border-white grain pt-16">
        <div className="w-full px-4 text-center">
          <h1 className="font-display text-[25vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap overflow-hidden select-none opacity-90 will-change-transform">
            THE MATH
          </h1>
          <div className="mt-8 flex flex-col items-center">
            <p ref={typeRef} className="font-mono text-xl max-w-2xl tracking-widest text-pink" />
          </div>
        </div>
      </section>

      {/* What is an Option */}
      <section className="flex flex-col md:flex-row border-b-2 border-white">
        <div ref={quoteRef} className="md:w-1/2 bg-pink p-12 grain min-h-[500px] flex items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-white will-change-transform">
          <div className="max-w-md">
            <p className="font-mono font-bold text-3xl md:text-5xl uppercase leading-tight text-white italic">
              &quot;THE RIGHT, BUT NOT THE OBLIGATION, TO BUY OR SELL.&quot;
            </p>
            <div className="mt-8 h-1 w-24 bg-white" />
          </div>
        </div>
        <div className="md:w-1/2 p-12 bg-bg flex flex-col justify-center">
          <h2 className="font-headline text-6xl mb-6 tracking-tight">THE DERIVATIVE PRIMITIVE</h2>
          <div className="font-mono text-lg space-y-6 text-white/80">
            <p>Options are decentralized contracts that grant the holder the power to execute a trade at a specific price [STRIKE] before a specific date [EXPIRY].</p>
            <p>On PolkaOptions, these are represented as 1:1 backed cryptographic primitives within the PVM ecosystem.</p>
            <ul className="space-y-2 text-teal">
              <li>+ CALL: BET ON UPSIDE</li>
              <li>+ PUT: BET ON DOWNSIDE</li>
              <li>+ YIELD: SELL VOLATILITY</li>
            </ul>
          </div>
        </div>
      </section>

      {/* The Formula */}
      <section ref={formulaRef} className="p-12 border-b-2 border-white bg-surface grain overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-headline text-4xl mb-12 text-pink tracking-wider">PRICING ENGINE: BLACK-SCHOLES-MERTON</h3>
          <div className="bg-black p-12 border border-white/20 font-mono text-2xl md:text-4xl leading-relaxed">
            <span data-term className="text-pink">C</span>
            <span data-term> = </span>
            <span data-term className="text-white">S</span>
            <sub data-term>t</sub>
            <span data-term className="text-blue">N</span>
            <span data-term>(</span>
            <span data-term className="text-pink">d</span>
            <sub data-term>1</sub>
            <span data-term>) - </span>
            <span data-term className="text-white">K</span>
            <span data-term className="text-blue">e</span>
            <sup data-term>-<span className="text-teal">r</span><span className="text-white">t</span></sup>
            <span data-term className="text-blue">N</span>
            <span data-term>(</span>
            <span data-term className="text-pink">d</span>
            <sub data-term>2</sub>
            <span data-term>)</span>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { sym: 'S_t', desc: 'CURRENT UNDERLYING ASSET PRICE' },
              { sym: 'K', desc: 'STRIKE PRICE OF THE OPTION' },
              { sym: 'r', desc: 'RISK-FREE INTEREST RATE' },
            ].map(v => (
              <div key={v.sym} className="border-t border-white/10 pt-4">
                <span className="text-pink font-bold">{v.sym}</span>
                <p className="text-xs text-white/60 mt-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Greeks Bands */}
      <section ref={greeksRef} className="flex flex-col">
        {greeksBands.map(g => (
          <div
            key={g.name}
            data-greek
            className={`h-32 flex items-center ${g.bg} px-12 grain border-b border-white/20 hover:h-48 transition-all duration-300 group will-change-transform`}
          >
            <div className="flex items-end gap-12 w-full">
              <span className="font-display text-7xl opacity-40 group-hover:opacity-100 transition-opacity duration-300">{g.name}</span>
              <span className={`font-mono font-bold text-lg pb-2 flex-1 hidden md:block ${g.text}`}>{g.desc}</span>
              <span className={`material-symbols-outlined text-4xl pb-2 group-hover:rotate-[15deg] transition-transform duration-300 ${g.text}`}>{g.icon}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ETH vs PVM */}
      <section ref={comparisonRef} className="flex flex-col md:flex-row min-h-screen border-b-2 border-white">
        <div className="md:w-1/2 p-12 flex flex-col justify-between border-r-2 border-white bg-bg">
          <div>
            <h4 className="font-headline text-5xl text-orange mb-8">LEGACY CHAIN (ETH)</h4>
            <div className="space-y-4">
              <div className="h-4 w-full bg-orange/20 relative">
                <div data-bar data-width="95%" className="h-full bg-orange" style={{ width: 0 }} />
              </div>
              <p className="font-mono text-sm">GAS FEE: $45.20 / TRADE</p>
              <div className="h-4 w-full bg-orange/20 relative">
                <div data-bar data-width="80%" className="h-full bg-orange" style={{ width: 0 }} />
              </div>
              <p className="font-mono text-sm">SETTLEMENT DELAY: 14 SECONDS</p>
            </div>
          </div>
          <p className="font-display text-9xl text-orange opacity-10 select-none">INEFFICIENT</p>
        </div>
        <div className="md:w-1/2 p-12 flex flex-col justify-between bg-surface grain">
          <div>
            <h4 className="font-headline text-5xl text-teal mb-8">POLKADOT PVM</h4>
            <div className="space-y-4">
              <div className="h-4 w-full bg-teal/20 relative">
                <div data-bar data-width="2%" className="h-full bg-teal" style={{ width: 0 }} />
              </div>
              <p className="font-mono text-sm">GAS FEE: $0.001 / TRADE</p>
              <div className="h-4 w-full bg-teal/20 relative">
                <div data-bar data-width="5%" className="h-full bg-teal" style={{ width: 0 }} />
              </div>
              <p className="font-mono text-sm">SETTLEMENT DELAY: &lt;100 MS</p>
            </div>
          </div>
          <p className="font-display text-9xl text-teal opacity-10 select-none">PARALLEL</p>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="p-12 md:p-24 text-center grain relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.06] flex items-center justify-center pointer-events-none">
          <span className="font-display text-[40vw] text-pink select-none">TRADE</span>
        </div>
        <div className="relative z-10">
          <h2 className="font-headline text-8xl md:text-[12rem] leading-none mb-12 tracking-tighter">READY TO TRADE?</h2>
          <Link href="/trade" className="block w-full bg-pink text-white font-mono font-extrabold text-3xl py-12 hover:bg-white hover:text-black transition-all duration-150 group overflow-hidden relative">
            <span className="relative z-10 flex items-center justify-center gap-4">
              ENTER THE TERMINAL
              <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform duration-200">arrow_forward</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full z-50 flex justify-between items-center px-4 py-1 bg-bg border-t border-white">
        <span className="font-mono text-[10px] tracking-tight text-white/60">©2024 POLKAOPTIONS PROTOCOL</span>
        <div className="flex gap-4">
          <span className="font-mono text-[10px] text-teal">OPERATIONAL</span>
          <span className="font-mono text-[10px] text-white/60 hidden sm:block">LATENCY: 12MS</span>
          <span className="font-mono text-[10px] text-white/60 hidden sm:block">P2P_ACTIVE</span>
          <span className="font-mono text-[10px] text-white/60">BLOCK_HEIGHT: 194821</span>
        </div>
      </footer>
    </main>
  )
}
