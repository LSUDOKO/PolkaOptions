'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface PillButtonProps {
  label: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'pink' | 'outline' | 'white'
  href?: string
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
}

const sizeStyles = {
  sm: 'font-mono text-[10px] px-3 py-1 h-6',
  md: 'font-mono text-xs px-5 py-2 h-9',
  lg: 'font-headline text-sm w-full h-14 text-center justify-center',
}

const variantStyles = {
  pink: 'bg-pink text-white hover:brightness-110',
  outline: 'bg-transparent border border-pink text-pink hover:bg-pink hover:text-white',
  white: 'bg-white text-black hover:bg-pink hover:text-white',
}

export function PillButton({
  label,
  size = 'md',
  variant = 'pink',
  href,
  onClick,
  className,
  icon,
}: PillButtonProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      el.addEventListener('mousedown', () => gsap.to(el, { scale: 0.96, duration: 0.1 }))
      el.addEventListener('mouseup', () => gsap.to(el, { scale: 1, duration: 0.2, ease: 'back.out(2)' }))
    })
    return () => ctx.revert()
  }, [])

  const classes = cn(
    'rounded-full uppercase tracking-widest font-bold inline-flex items-center gap-2 cursor-none will-change-transform',
    'transition-colors duration-100',
    sizeStyles[size],
    variantStyles[variant],
    className
  )

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={classes}>
        {icon}{label}
      </a>
    )
  }

  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} onClick={onClick} className={classes}>
      {icon}{label}
    </button>
  )
}
