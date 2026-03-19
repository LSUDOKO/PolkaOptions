'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

const docsSidebarNav = [
  { section: 'GETTING STARTED', items: [{ label: 'INTRODUCTION', active: false }, { label: 'ARCHITECTURE', active: false }] },
  { section: 'SMART CONTRACTS', items: [{ label: 'FACTORY.RS', active: false }, { label: 'BS_PRICER.RS', active: true }, { label: 'LIQUIDATOR.RS', active: false }] },
  { section: 'INTEGRATION', items: [{ label: 'SUBSTRATE_API', active: false }, { label: 'WS_STREAM', active: false }] },
]

const functions = [
  {
    name: 'CALCULATE_GREEKS',
    badge: 'PVM RUST',
    id: '0x44B2',
    desc: 'Computes Delta, Gamma, Theta, and Vega simultaneously using high-precision fixed-point arithmetic.',
    code: `pub fn calculate_greeks(
  asset_price: U256, 
  strike: U256, 
  time_to_expiry: u64, 
  volatility: u32
) -> Option<Greeks> { ... }`,
    params: [
      { name: 'asset_price', type: 'U256 (18 Decimals)', desc: 'Current underlying market price.' },
      { name: 'volatility', type: 'u32 (BPS)', desc: 'Annualized implied volatility in basis points.' },
    ],
  },
  {
    name: 'COMPUTE_IV',
    badge: 'PVM RUST',
    id: '0x44B3',
    desc: 'Inverts the Black-Scholes formula using the Newton-Raphson method to solve for Implied Volatility.',
    code: `#[pvm_export]
fn compute_iv(target_price: f64) -> f64 {
  let mut sigma = 0.5;
  for _ in 0..10 {
    let diff = bs_price(sigma) - target_price;
    sigma -= diff / vega(sigma);
  }
  sigma
}`,
    warning: 'Newton-Raphson iteration is computationally expensive. Limit use to oracle updates or high-value settlements.',
    params: [],
  },
]

export default function DocsPage() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title slide
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
        )
      }

      // Code blocks reveal
      if (contentRef.current) {
        const codeBlocks = contentRef.current.querySelectorAll('[data-code]')
        codeBlocks.forEach(block => {
          ScrollTrigger.create({
            trigger: block,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(block, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            }
          })
        })

        // Function cards stagger
        const cards = contentRef.current.querySelectorAll('[data-card]')
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(card, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: i * 0.15, ease: 'power2.out' })
            }
          })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex min-h-screen">
      <Navbar variant="app" />
      <Sidebar />

      <main ref={contentRef} className="flex-1 lg:ml-64 pt-16 pb-24">
        <section className="p-10 max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex gap-2 text-[10px] tracking-widest text-white/40 mb-4 items-center font-mono">
            <span>DOCS</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span>CONTRACTS</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-pink">BS_PRICER.RS</span>
          </nav>

          {/* Title */}
          <h1 ref={titleRef} className="font-display text-[80px] leading-[0.85] text-white mb-6 uppercase tracking-tighter will-change-transform">
            bs_pricer.rs<span className="animate-cursor-blink">_</span>
          </h1>
          <div className="h-[2px] w-full bg-pink mb-12" />

          {/* Intro */}
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 lg:col-span-8">
              <p className="text-lg leading-relaxed text-white/80 mb-6 font-mono">
                The <span className="text-pink">Black-Scholes Pricer</span> is the core valuation engine of the PolkaOptions Protocol. It implements the standard non-linear differential equations for European-style option pricing optimized for the Polkadot Virtual Machine (PVM).
              </p>
              <div className="flex gap-4">
                <span className="px-3 py-1 border border-white/20 text-[10px] text-white/40 tracking-widest font-mono">VERSION: 4.2.0-STABLE</span>
                <span className="px-3 py-1 border border-white/20 text-[10px] text-white/40 tracking-widest font-mono">AUDIT: PASSED (ZKE-7)</span>
              </div>
            </div>
          </div>

          {/* Functions */}
          <div className="space-y-12">
            {functions.map(fn => (
              <div key={fn.name} data-card className="border border-white/10 will-change-transform">
                <div className="bg-[#1c1b1b] px-6 py-4 flex justify-between items-center border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="font-headline text-xl tracking-wide text-white">FUNCTION: {fn.name}</span>
                    <span className="bg-teal text-black text-[9px] px-2 py-0.5 font-bold tracking-widest font-mono">{fn.badge}</span>
                  </div>
                  <span className="text-white/20 text-[10px] tracking-widest font-mono">ID: {fn.id}</span>
                </div>
                <div className="p-6">
                  <p className="text-white/60 text-sm mb-6 font-mono">{fn.desc}</p>

                  {/* Code block */}
                  <div data-code className="bg-black p-4 border-l-4 border-pink mb-6 overflow-x-auto will-change-transform">
                    <code className="text-xs text-white leading-relaxed whitespace-pre font-mono">
                      {fn.code}
                    </code>
                  </div>

                  {/* Warning */}
                  {fn.warning && (
                    <div className="bg-orange/10 border border-orange p-4 flex gap-4 mb-6">
                      <span className="material-symbols-outlined text-orange">warning</span>
                      <div>
                        <p className="text-[10px] font-bold text-orange tracking-widest font-mono">GAS_WARNING</p>
                        <p className="text-[11px] text-orange/80 font-mono">{fn.warning}</p>
                      </div>
                    </div>
                  )}

                  {/* Params table */}
                  {fn.params.length > 0 && (
                    <table className="w-full text-left text-[11px] border-collapse font-mono">
                      <thead>
                        <tr className="text-white/40 border-b border-white/10">
                          <th className="py-2 px-4 font-normal tracking-widest">PARAMETER</th>
                          <th className="py-2 px-4 font-normal tracking-widest">TYPE</th>
                          <th className="py-2 px-4 font-normal tracking-widest">DESCRIPTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fn.params.map(p => (
                          <tr key={p.name} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors duration-100">
                            <td className="py-3 px-4 text-pink">{p.name}</td>
                            <td className="py-3 px-4 text-white/60">{p.type}</td>
                            <td className="py-3 px-4 text-white/80">{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Stats Band */}
          <div className="mt-24 bg-teal py-4 px-6 flex justify-between items-center overflow-hidden">
            <div className="whitespace-nowrap flex gap-12 font-headline text-xl text-black">
              <span>LATEST_BLOCK: 19,482,109</span>
              <span>AVG_LATENCY: 12MS</span>
              <span>GAS_PRICE: 14.2 GWEI</span>
              <span>NETWORK_STATUS: OPERATIONAL</span>
              <span>PROTOCOL_TVL: $1.2B</span>
              <span>UPTIME: 99.998%</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full z-50 flex justify-between items-center px-4 py-1 bg-bg border-t border-white">
        <p className="font-mono text-[10px] tracking-tight text-white/60 uppercase">©2024 POLKAOPTIONS PROTOCOL</p>
        <div className="flex gap-4">
          <span className="font-mono text-[10px] text-teal">OPERATIONAL</span>
          <span className="font-mono text-[10px] text-white/60 hidden sm:block">LATENCY: 12MS</span>
          <span className="font-mono text-[10px] text-white/60">BLOCK_HEIGHT: 194821</span>
        </div>
      </footer>
    </div>
  )
}
