'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface LiveBlockCounterProps {
  prefix?: string
  className?: string
}

export function LiveBlockCounter({ prefix = 'BLOCK: ', className }: LiveBlockCounterProps) {
  const [block, setBlock] = useState(1829402)
  const el = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setBlock(b => b + 1)
      if (el.current) {
        gsap.fromTo(el.current,
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }
        )
      }
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={cn('font-mono text-[11px] text-pink num', className)}>
      {prefix}<span ref={el}>{block.toLocaleString()}</span>
    </span>
  )
}

function cn(...args: (string | undefined)[]) {
  return args.filter(Boolean).join(' ')
}
