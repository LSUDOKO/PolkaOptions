'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dotEl = dot.current
    const ringEl = ring.current
    if (!dotEl || !ringEl) return

    const moveDot = (e: MouseEvent) => {
      gsap.set(dotEl, { x: e.clientX - 4, y: e.clientY - 4 })
      gsap.to(ringEl, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.12,
        ease: 'power2.out'
      })
    }

    const onEnter = () => {
      gsap.to(ringEl, { scale: 1.8, borderColor: 'var(--color-pink)', duration: 0.2 })
      gsap.to(dotEl, { scale: 0, duration: 0.15 })
    }

    const onLeave = () => {
      gsap.to(ringEl, { scale: 1, borderColor: 'rgba(230,0,122,0.6)', duration: 0.2 })
      gsap.to(dotEl, { scale: 1, duration: 0.15 })
    }

    const onClick = () => {
      gsap.fromTo(ringEl,
        { scale: 1 },
        {
          scale: 2.5, opacity: 0, duration: 0.4, ease: 'power2.out',
          onComplete: () => { gsap.set(ringEl, { scale: 1, opacity: 1 }) }
        }
      )
    }

    window.addEventListener('mousemove', moveDot)
    window.addEventListener('click', onClick)

    const attachHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attachHoverListeners()
    const observer = new MutationObserver(attachHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveDot)
      window.removeEventListener('click', onClick)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] hidden md:block"
        style={{ background: 'var(--color-pink)' }}
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99998] hidden md:block"
        style={{ border: '1.5px solid rgba(230,0,122,0.6)' }}
      />
    </>
  )
}
