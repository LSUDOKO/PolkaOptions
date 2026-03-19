'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Navbar } from '@/components/layout/Navbar'
import Link from 'next/link'

const featureBands = [
  { title: 'BLACK-SCHOLES ON-CHAIN', desc: 'NATIVE FLOATING POINT ARITHMETIC IN RUST', icon: 'functions', bg: 'bg-pink', text: 'text-white', num: '01' },
  { title: 'LIVE GREEKS', desc: 'DELTA, GAMMA, THETA COMPUTED EVERY BLOCK', icon: 'monitoring', bg: 'bg-purple', text: 'text-white', num: '02' },
  { title: 'IMPLIED VOLATILITY SOLVER', desc: 'NEWTON-RAPHSON CORE AT PROTOCOL LEVEL', icon: 'calculate', bg: 'bg-blue', text: 'text-black', num: '03' },
  { title: 'ASSET HUB NATIVE', desc: 'SEAMLESS DOT/KSM LIQUIDITY INTEGRATION', icon: 'hub', bg: 'bg-teal', text: 'text-black', num: '04' },
  { title: 'ZERO ORACLE RISK', desc: 'INTERNAL STATE-BASED PRICE DISCOVERY', icon: 'security', bg: 'bg-orange', text: 'text-white', num: '05' },
]

const ecosystemItems = [
  { label: 'CORE NETWORK', content: 'DOT' },
  { label: 'GRANT RECIPIENT', content: 'W3F' },
  { label: 'INFRASTRUCTURE', content: 'PARITY' },
  { label: 'DEVELOPMENT', content: 'OPEN GUILD' },
]

const tradeSteps = [
  { num: '01', title: 'SET TERMS', desc: 'CHOOSE STRIKE PRICE, EXPIRY, AND OPTION TYPE DIRECTLY ON THE ASSET HUB INTERFACE.', icon: 'settings' },
  { num: '02', title: 'LOCK COLLATERAL', desc: 'SMART CONTRACTS AUTOMATICALLY RESERVE UNDERLYING DOT ASSETS TO ENSURE SOLVENCY.', icon: 'lock' },
  { num: '03', title: 'BUY', desc: 'INSTANT EXECUTION WITH NATIVE XCM LIQUIDITY. NO SLIPPAGE OR EXTERNAL RELAYERS.', icon: 'shopping_cart' },
  { num: '04', title: 'EXERCISE', desc: 'AUTONOMOUS SETTLEMENT UPON EXPIRY OR MANUAL EXERCISE VIA RUST-COMPILED LOGIC.', icon: 'rocket_launch' },
]

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const bandsRef = useRef<HTMLElement>(null)
  const ecosystemRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const tradeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      const heroText = heroRef.current?.querySelector('h1')
      if (heroText) {
        const letters = heroText.textContent?.split('') || []
        heroText.innerHTML = letters.map(l => `<span class="inline-block">${l}</span>`).join('')
        const spans = heroText.querySelectorAll('span')
        gsap.fromTo(spans,
          { y: 120, opacity: 0, rotateX: 90 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: 0.6, ease: 'back.out(1.4)' }
        )
        gsap.to(spans, {
          y: -8, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1
        })
      }

      // Tagline typewriter
      if (taglineRef.current) {
        const text = taglineRef.current.dataset.text || ''
        taglineRef.current.textContent = ''
        gsap.to(taglineRef.current, {
          duration: text.length * 0.04,
          text: { value: text, delimiter: '' },
          ease: 'none',
          delay: 0.8
        })
      }

      // Market bars
      const bars = heroRef.current?.querySelectorAll('.pixel-bar')
      if (bars) {
        gsap.fromTo(bars,
          { scaleY: 0, transformOrigin: 'bottom' },
          { scaleY: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out', delay: 0.8 }
        )
      }

      // 48000X count up
      if (countRef.current) {
        ScrollTrigger.create({
          trigger: countRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: 48000,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                if (countRef.current) {
                  countRef.current.textContent = Math.round(obj.val).toLocaleString() + 'X'
                }
              }
            })
          }
        })
      }

      // Feature bands
      if (bandsRef.current) {
        const bandEls = bandsRef.current.querySelectorAll('[data-band]')
        bandEls.forEach((band, i) => {
          ScrollTrigger.create({
            trigger: band,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(band, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, delay: i * 0.12, ease: 'power3.out' })
              const numBadge = band.querySelector('[data-num]')
              if (numBadge) {
                gsap.fromTo(numBadge, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, delay: i * 0.12 + 0.2 })
              }
            }
          })
        })
      }

      // Ecosystem grid
      if (ecosystemRef.current) {
        const cells = ecosystemRef.current.querySelectorAll('[data-eco]')
        ScrollTrigger.create({
          trigger: ecosystemRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(cells,
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' }
            )
          }
        })
      }

      // Stats count up
      if (statsRef.current) {
        const statEls = statsRef.current.querySelectorAll('[data-stat]')
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(statEls,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
            )
            const centerStat = statsRef.current?.querySelector('[data-center-stat]')
            if (centerStat) {
              gsap.fromTo(centerStat, { scale: 0.95 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1 })
            }
          }
        })
      }

      // Trade steps
      if (tradeRef.current) {
        const steps = tradeRef.current.querySelectorAll('[data-step]')
        ScrollTrigger.create({
          trigger: tradeRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(steps, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.5, ease: 'power2.out' })
          }
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main>
      <Navbar variant="marketing" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-bg">
        <h1 className="font-display text-[22vw] leading-none text-pink grain tracking-tighter w-full text-center whitespace-nowrap will-change-transform">
          POLKAOPTIONS
        </h1>
        <div className="w-full px-10 mt-[-2vw]">
          <div className="border-t border-white/40 pt-2 flex justify-between items-center text-[11px] tracking-[0.2em] font-mono text-white/80">
            <span>POLKADOT ASSET HUB</span>
            <span>PVM RUST</span>
            <span>BLACK-SCHOLES</span>
            <span>ZERO ORACLES</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex items-end justify-around h-32 px-4 opacity-80">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-end gap-0.5 h-full">
              {[40, 60, 30, 80, 20, 50, 70, 90].slice(i % 3, i % 3 + 3).map((h, j) => (
                <div key={j} className="pixel-bar w-2 bg-pink will-change-transform" style={{ height: `${h}%` }} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="relative bg-[#0e0e0e] p-10 flex flex-col justify-center items-center overflow-hidden border-r border-white/10">
          <div className="z-10 flex flex-col gap-4 max-w-md">
            <div className="bg-pink p-6 grain self-start">
              <span ref={countRef} className="font-headline text-6xl text-white num">0X</span>
            </div>
            <div className="bg-blue p-4 self-end mt-[-2rem] mr-[-2rem]">
              <span className="font-mono text-xl text-black font-bold">RUST PVM ENGINE</span>
            </div>
            <div className="border border-white/20 p-4 font-mono text-[10px] text-teal bg-black/80">
              <pre>{`fn calculate_iv(price: f64) -> f64 {
  let mut sigma = 0.5;
  for _ in 0..100 {
    let diff = bs_price(sigma) - price;
    if diff.abs() < 1e-6 { break; }
    sigma -= diff / vega(sigma);
  }
  sigma
}`}</pre>
            </div>
          </div>
        </div>
        <div className="p-12 md:p-24 flex flex-col justify-center items-start gap-8 bg-bg">
          <h2 className="font-headline text-7xl md:text-9xl leading-[0.9] text-white">
            POLKAOPTIONS PUTS THE MATH ON-CHAIN. FINALLY.
          </h2>
          <p
            ref={taglineRef}
            data-text="BY LEVERAGING THE POLKADOT VIRTUAL MACHINE (PVM) AND RUST NATIVE EXECUTION, WE ELIMINATE THE NEED FOR EXTERNAL ORACLES. REAL-TIME VOLATILITY SOLVERS RUN DIRECTLY ON THE ASSET HUB, REDUCING GAS COSTS BY 99.8% COMPARED TO EVM ALTERNATIVES."
            className="font-mono text-lg text-white/60 max-w-xl tracking-wider leading-relaxed"
          />
          <Link
            href="/learn"
            className="bg-pink text-white px-10 py-4 rounded-full font-mono text-sm hover:bg-white hover:text-pink transition-colors duration-100"
          >
            WHY PVM
          </Link>
        </div>
      </section>

      {/* Feature Bands */}
      <section ref={bandsRef} className="py-20 flex flex-col">
        {featureBands.map(band => (
          <div
            key={band.num}
            data-band
            className={`w-full py-8 px-10 ${band.bg} ${band.text} flex justify-between items-center grain border-b border-black/10 will-change-transform`}
          >
            <div className="flex items-center gap-6">
              <span className="material-symbols-outlined text-4xl">{band.icon}</span>
              <div>
                <h3 className="font-headline text-4xl">{band.title}</h3>
                <p className="font-mono text-xs opacity-80">{band.desc}</p>
              </div>
            </div>
            <span data-num className="font-headline text-2xl">{band.num}</span>
          </div>
        ))}
      </section>

      {/* Ecosystem */}
      <section ref={ecosystemRef} className="bg-bg border-y border-white/20">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {ecosystemItems.map(item => (
            <div key={item.label} data-eco className="aspect-square border-r border-b border-white/20 p-12 flex flex-col justify-between">
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-headline text-5xl text-white/80">{item.content}</span>
              </div>
              <span className="font-mono text-[10px] tracking-widest text-white/40">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trade */}
      <section ref={tradeRef} className="min-h-screen grid grid-cols-1 md:grid-cols-2 border-b border-white/20">
        <div className="relative bg-pink flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10 font-mono text-[8px] overflow-hidden leading-none select-none whitespace-pre">
            {'01'.repeat(500)}
          </div>
          <h2 className="font-display text-[15vw] text-white grain drop-shadow-2xl">TRADE</h2>
        </div>
        <div className="bg-bg p-12 md:p-24 flex flex-col justify-center gap-12">
          {tradeSteps.map(step => (
            <div key={step.num} data-step className="group flex items-start gap-8 border-b border-white/10 pb-8 hover:bg-white/5 transition-colors cursor-none">
              <div className="w-12 h-12 rounded-full border border-pink flex items-center justify-center group-hover:bg-pink transition-all duration-150">
                <span className="material-symbols-outlined text-pink group-hover:text-white">{step.icon}</span>
              </div>
              <div>
                <h4 className="font-headline text-4xl mb-2">{step.num}. {step.title}</h4>
                <p className="font-mono text-white/40 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-24 px-10 bg-bg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1 mb-20">
          <div data-stat className="p-10 border border-white/20 flex flex-col items-center">
            <span className="font-mono text-white/40 text-xs mb-4">EVM GAS COST</span>
            <span className="font-headline text-7xl text-orange num">487,000</span>
          </div>
          <div data-stat data-center-stat className="p-10 border border-white/20 flex flex-col items-center bg-pink">
            <span className="font-mono text-white/80 text-xs mb-4">POLKAOPTIONS COST</span>
            <span className="font-headline text-7xl text-white num">0.0001 DOT</span>
          </div>
          <div data-stat className="p-10 border border-white/20 flex flex-col items-center">
            <span className="font-mono text-white/40 text-xs mb-4">SOLVER PRECISION</span>
            <span className="font-headline text-7xl text-blue num">18 DEC</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-bg-card p-8 border-l-4 border-pink font-mono text-sm">
          <div className="flex justify-between items-center mb-6 opacity-40">
            <span>NEWTON_RAPHSON_SOLVER.RS</span>
            <span>RUST 1.75</span>
          </div>
          <pre className="text-white/80 leading-relaxed overflow-x-auto">
{`pub fn solve_iv(market_price: f64, s: f64, k: f64, t: f64, r: f64) -> f64 {
    let mut sigma = 0.5;
    for _ in 0..100 {
        let price = black_scholes_call(s, k, t, r, sigma);
        let diff = market_price - price;
        if diff.abs() < 1e-8 { break; }
        let v = vega(s, k, t, r, sigma);
        sigma += diff / v;
    }
    sigma
}`}
          </pre>
        </div>
      </section>

      {/* CTA */}
      <section className="p-12 md:p-24 text-center grain relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none">
          <span className="font-display text-[40vw] text-white select-none">TRADE</span>
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
      <footer className="fixed bottom-0 right-0 z-50 p-4 bg-bg border-t border-l border-white/20 flex flex-row gap-8 items-center justify-end">
        <div className="hidden md:flex gap-8 font-mono uppercase text-[10px] tracking-widest text-white/60">
          <span className="text-pink font-bold">STATUS: OPERATIONAL</span>
          <span>LOC: POLKADOT_HUB</span>
        </div>
        <div className="font-mono uppercase text-[10px] tracking-widest text-pink">
          POLKAOPTIONS PROTOCOL © 2024
        </div>
      </footer>
    </main>
  )
}
