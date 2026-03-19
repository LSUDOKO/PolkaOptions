'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import { Navbar } from '@/components/layout/Navbar'
import { StatusBar } from '@/components/layout/StatusBar'
import { blackScholes } from '@/lib/blackScholes'

const assets = [
  { symbol: 'P', name: 'DOT / POLKADOT', color: 'bg-pink', disabled: false },
  { symbol: 'K', name: 'KSM / KUSAMA', color: 'bg-black', disabled: false },
  { symbol: 'U', name: 'USDT / TETHER', color: 'bg-white/10', disabled: true },
]

const expiryDates = ['24 OCT 23', '25 OCT 23', '01 NOV 23', '15 NOV 23']

const strikes = [
  { price: '$3.50', iv: '82.1%' },
  { price: '$4.00', iv: '78.5%' },
  { price: '$4.50', iv: '75.2%' },
  { price: '$5.00', iv: '72.0%' },
]

const openPositions = [
  { asset: 'KSM', type: 'CALL', typeColor: 'text-teal', strike: '$4.00', expiry: '25 OCT 23', size: '5.00 KSM', pl: '+0.824 KSM', plColor: 'text-teal' },
  { asset: 'DOT', type: 'PUT', typeColor: 'text-orange', strike: '$3.50', expiry: '25 OCT 23', size: '100.00 DOT', pl: '-2.105 DOT', plColor: 'text-orange' },
]

export default function TradePage() {
  const [selectedAsset, setSelectedAsset] = useState(1) // KSM
  const [selectedExpiry, setSelectedExpiry] = useState(1)
  const [selectedStrike, setSelectedStrike] = useState(1)
  const [orderType, setOrderType] = useState<'call' | 'put'>('call')
  const [collateral, setCollateral] = useState('10.00')
  const [slippage, setSlippage] = useState(1) // 0.5%
  const [isExecuting, setIsExecuting] = useState(false)
  const [executeText, setExecuteText] = useState('EXECUTE TRADE ON PVM')

  const premiumRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLElement>(null)

  // Calculate premium using BS
  const premium = blackScholes(4.0, 4.0, 30 / 365, 0.05, 0.785)
  const greeks = {
    delta: premium.delta.toFixed(3),
    gamma: premium.gamma.toFixed(3),
    vega: premium.vega.toFixed(3),
    theta: premium.theta.toFixed(3),
  }

  const displayPremium = orderType === 'call' ? premium.callPrice : premium.putPrice

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav slide pills
      if (navRef.current) {
        const pills = navRef.current.querySelectorAll('a')
        gsap.fromTo(pills, { x: -40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, delay: 0.3, ease: 'power3.out' })
      }
    })
    return () => ctx.revert()
  }, [])

  // Animate premium change
  useEffect(() => {
    if (premiumRef.current) {
      gsap.fromTo(premiumRef.current,
        { scale: 1.05, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [selectedStrike, selectedExpiry, orderType])

  const handleExecute = useCallback(() => {
    if (isExecuting) return
    setIsExecuting(true)
    setExecuteText('EXECUTING...')
    setTimeout(() => {
      setExecuteText('CONFIRMED ✓')
      setTimeout(() => {
        setIsExecuting(false)
        setExecuteText('EXECUTE TRADE ON PVM')
      }, 2000)
    }, 2000)
  }, [isExecuting])

  const premiumCost = displayPremium * parseFloat(collateral || '0')
  const fee = premiumCost * 0.0001
  const total = premiumCost + fee

  return (
    <div className="min-h-screen bg-bg">
      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full px-6 py-2 bg-bg z-40 fixed top-0 border-b border-white/20 h-[60px]">
        <div className="flex items-center gap-8">
          <span className="font-headline text-2xl tracking-tight text-pink">POLKAOPTIONS</span>
          <div className="hidden md:flex gap-6 items-center">
            <span className="font-mono uppercase tracking-[0.05em] text-xs text-white/50">LIVE PRICER</span>
            <span className="font-mono uppercase tracking-[0.05em] text-xs text-pink">STATUS: ONLINE</span>
            <span className="font-mono uppercase tracking-[0.05em] text-xs text-white/60 num">BLOCK: 1,829,402</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/60 hover:text-white transition-colors duration-100">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="text-white/60 hover:text-white transition-colors duration-100 flex items-center gap-2">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="font-mono text-xs">0x71...A4F</span>
          </button>
        </div>
      </header>

      {/* Side Nav Pills */}
      <nav ref={navRef} className="fixed top-[80px] left-6 flex flex-col gap-2 z-50 hidden lg:flex">
        <a href="/trade" className="bg-white text-black font-bold rounded-full px-6 py-2 flex items-center gap-3 uppercase text-sm tracking-widest scale-95">
          <span className="material-symbols-outlined">swap_horiz</span> TRADE
        </a>
        <a href="#" className="text-white/40 px-6 py-2 flex items-center gap-3 hover:text-pink uppercase text-sm tracking-widest transition-colors duration-100">
          <span className="material-symbols-outlined">lock</span> VAULTS
        </a>
        <a href="#" className="text-white/40 px-6 py-2 flex items-center gap-3 hover:text-pink uppercase text-sm tracking-widest transition-colors duration-100">
          <span className="material-symbols-outlined">gavel</span> GOVERNANCE
        </a>
        <a href="/markets" className="text-white/40 px-6 py-2 flex items-center gap-3 hover:text-pink uppercase text-sm tracking-widest transition-colors duration-100">
          <span className="material-symbols-outlined">query_stats</span> STATS
        </a>
      </nav>

      {/* Background ghost text */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 opacity-5 pointer-events-none select-none overflow-hidden">
        <h1 className="font-display text-[40rem] leading-none text-white whitespace-nowrap -mr-48">OPTIONS</h1>
      </div>

      {/* Main Grid */}
      <main className="pt-[140px] px-6 pb-16 grid grid-cols-12 gap-6 min-h-screen">
        {/* LEFT PANEL: Asset & Expiry */}
        <aside className="col-span-12 lg:col-span-3 space-y-10">
          <section>
            <h2 className="font-headline text-xl text-pink mb-4 tracking-wider">ASSET SELECTOR</h2>
            <div className="flex flex-col gap-2">
              {assets.map((a, i) => (
                <button
                  key={a.symbol}
                  disabled={a.disabled}
                  onClick={() => !a.disabled && setSelectedAsset(i)}
                  className={`w-full text-left border p-4 flex justify-between items-center group transition-colors duration-100 ${
                    i === selectedAsset
                      ? 'border-white bg-white text-black'
                      : a.disabled
                        ? 'border-white/20 opacity-50 cursor-not-allowed'
                        : 'border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${i === selectedAsset ? 'bg-black text-white' : a.color + ' text-white'} flex items-center justify-center font-bold grain`}>{a.symbol}</div>
                    <span className={i === selectedAsset ? 'font-bold' : ''}>{a.name}</span>
                  </div>
                  {i === selectedAsset && <span className="material-symbols-outlined">check_circle</span>}
                  {!a.disabled && i !== selectedAsset && <span className="text-pink opacity-0 group-hover:opacity-100 font-mono text-xs">SELECT</span>}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-headline text-xl text-pink mb-4 tracking-wider">EXPIRY DATE</h2>
            <div className="grid grid-cols-2 gap-2">
              {expiryDates.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setSelectedExpiry(i)}
                  className={`border py-3 text-xs font-mono transition-colors duration-100 ${
                    i === selectedExpiry
                      ? 'border-white bg-white text-black font-bold'
                      : 'border-white/20 hover:border-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-headline text-xl text-pink mb-4 tracking-wider">STRIKE PRICE</h2>
            <div className="border border-white/20 max-h-[300px] overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/5 border-b border-white/20 sticky top-0">
                  <tr>
                    <th className="p-2 text-white/40 tracking-widest text-[9px]">STRIKE</th>
                    <th className="p-2 text-white/40 tracking-widest text-[9px]">IV%</th>
                  </tr>
                </thead>
                <tbody>
                  {strikes.map((s, i) => (
                    <tr
                      key={s.price}
                      onClick={() => setSelectedStrike(i)}
                      className={`border-b border-white/5 cursor-none transition-all duration-100 ${
                        i === selectedStrike
                          ? 'bg-white text-black font-bold'
                          : 'hover:bg-white/5 hover:translate-x-1'
                      }`}
                    >
                      <td className="p-2 font-bold">{s.price}</td>
                      <td className={`p-2 ${i === selectedStrike ? '' : 'text-cyan'}`}>{s.iv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </aside>

        {/* CENTER: Pricer */}
        <section className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center text-center px-4 relative">
          <div className="w-full border-y border-white/10 py-12">
            <span className="font-mono text-sm text-white/40 tracking-[0.3em] mb-4 block uppercase">FAIR VALUE ESTIMATION</span>
            <h3
              ref={premiumRef}
              className="font-display text-[8rem] md:text-[12rem] leading-none text-white tracking-tighter num will-change-transform"
            >
              {displayPremium.toFixed(4)}
            </h3>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-pink font-bold text-xl uppercase tracking-widest font-mono">KSM / USDT</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-8 mt-12 w-full max-w-2xl">
            {[
              { label: 'DELTA', value: greeks.delta, color: 'text-cyan' },
              { label: 'GAMMA', value: greeks.gamma, color: '' },
              { label: 'VEGA', value: greeks.vega, color: '' },
              { label: 'THETA', value: greeks.theta, color: 'text-orange' },
            ].map(g => (
              <div key={g.label}>
                <span className="block font-mono text-[10px] text-white/40 mb-1 tracking-widest">{g.label}</span>
                <span className={`block text-xl font-bold num font-headline ${g.color}`}>{g.value}</span>
              </div>
            ))}
          </div>

          {/* Ticker */}
          <div className="absolute bottom-0 w-full bg-cyan/10 h-10 border-y border-cyan/20 flex items-center overflow-hidden">
            <div className="whitespace-nowrap animate-marquee font-headline text-sm flex gap-12 text-cyan">
              <span>POLKADOT NETWORK: STABLE</span>
              <span>GAS_FEE: 0.00012 DOT</span>
              <span>PVM_LATENCY: 12MS</span>
              <span>TOTAL_LOCKED: $1.2B</span>
              <span>POLKADOT NETWORK: STABLE</span>
              <span>GAS_FEE: 0.00012 DOT</span>
              <span>PVM_LATENCY: 12MS</span>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: Order */}
        <aside className="col-span-12 lg:col-span-3 border-l border-white/10 pl-6 space-y-8">
          <div className="flex border border-white">
            <button
              onClick={() => setOrderType('call')}
              className={`flex-1 py-4 text-sm uppercase font-bold font-headline transition-colors duration-100 ${
                orderType === 'call' ? 'bg-white text-black' : 'hover:bg-white/5 text-white/50'
              }`}
            >
              BUY CALL
            </button>
            <button
              onClick={() => setOrderType('put')}
              className={`flex-1 py-4 text-sm uppercase font-bold font-headline transition-colors duration-100 ${
                orderType === 'put' ? 'bg-white text-black' : 'hover:bg-white/5 text-white/50'
              }`}
            >
              BUY PUT
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="font-mono text-[10px] text-white/40 mb-2 block tracking-widest">COLLATERAL AMOUNT (KSM)</label>
              <input
                type="text"
                value={collateral}
                onChange={e => setCollateral(e.target.value)}
                className="w-full bg-transparent border-b border-white focus:outline-none py-2 text-2xl font-bold font-headline tracking-widest focus:border-pink transition-colors duration-100 num"
              />
              <div className="flex justify-between mt-2 text-[10px] text-white/30 font-mono">
                <span>BALANCE: 45.20 KSM</span>
                <button onClick={() => setCollateral('45.20')} className="hover:text-white underline">MAX</button>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-white/40 mb-2 block tracking-widest">SLIPPAGE TOLERANCE</label>
              <div className="flex gap-2">
                {['0.1%', '0.5%', '1.0%'].map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setSlippage(i)}
                    className={`flex-1 border py-1 text-xs font-mono transition-colors duration-100 ${
                      i === slippage ? 'border-white bg-white text-black font-bold' : 'border-white/20 hover:border-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-4 border border-white/10 space-y-2 font-mono">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">PREMIUM COST</span>
                <span className="num">{premiumCost.toFixed(3)} KSM</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">FEE (0.01%)</span>
                <span className="num">{fee.toFixed(3)} KSM</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/10">
                <span>TOTAL PAYING</span>
                <span className="text-pink num">{total.toFixed(3)} KSM</span>
              </div>
            </div>

            <button
              onClick={handleExecute}
              className={`w-full ${isExecuting && executeText.includes('CONFIRMED') ? 'bg-teal' : 'bg-pink'} text-white font-headline text-2xl py-6 relative grain hover:brightness-115 transition-all duration-100 group active:scale-[0.96]`}
            >
              <span className="relative z-20 flex items-center justify-center gap-2">
                {executeText}
                {!isExecuting && <span className="material-symbols-outlined opacity-50 group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>}
              </span>
            </button>
          </div>
        </aside>

        {/* Open Positions */}
        <section className="col-span-12 mt-12">
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-headline text-3xl tracking-tight">OPEN_POSITIONS</h2>
            <span className="font-mono text-xs text-white/30">COUNT: 02 | MARGIN_USED: 15.00 KSM</span>
          </div>
          <div className="border border-white overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-sm uppercase font-mono">
              <thead className="bg-white text-black font-bold border-b border-white">
                <tr>
                  <th className="p-4 border-r border-black">ASSET</th>
                  <th className="p-4 border-r border-black">TYPE</th>
                  <th className="p-4 border-r border-black">STRIKE</th>
                  <th className="p-4 border-r border-black">EXPIRY</th>
                  <th className="p-4 border-r border-black">SIZE</th>
                  <th className="p-4 border-r border-black">P/L (UNREALIZED)</th>
                  <th className="p-4 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {openPositions.map((pos, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors duration-100">
                    <td className="p-4 border-r border-white/20 font-bold">{pos.asset}</td>
                    <td className={`p-4 border-r border-white/20 ${pos.typeColor}`}>{pos.type}</td>
                    <td className="p-4 border-r border-white/20 font-bold num">{pos.strike}</td>
                    <td className="p-4 border-r border-white/20 text-white/60">{pos.expiry}</td>
                    <td className="p-4 border-r border-white/20 num">{pos.size}</td>
                    <td className={`p-4 border-r border-white/20 ${pos.plColor} font-bold num`}>{pos.pl}</td>
                    <td className="p-4 text-center">
                      <button className="border border-pink text-pink px-4 py-1 text-[10px] hover:bg-pink hover:text-white transition-all duration-100">CLOSE</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <StatusBar />
    </div>
  )
}
