'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export { gsap, ScrollTrigger }

/** Reveal from left (feature bands, sidebar items) */
export const revealFromLeft = (el: Element, delay = 0) => {
  gsap.fromTo(el,
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5, delay, ease: 'power3.out' }
  )
}

/** Count up number */
export const countUp = (el: Element, target: number, decimals = 0) => {
  const obj = { val: 0 }
  gsap.to(obj, {
    val: target,
    duration: 1.5,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = obj.val.toFixed(decimals)
    }
  })
}

/** Stagger fade up (grid items, table rows) */
export const staggerFadeUp = (els: Element[], stagger = 0.08) => {
  gsap.fromTo(els,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger, duration: 0.5, ease: 'power2.out' }
  )
}

/** ScrollTrigger wrapper */
export const onEnter = (el: Element, animation: () => void) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    onEnter: animation,
    once: true
  })
}

/** Button press (all interactive elements) */
export const buttonPress = (el: Element) => {
  el.addEventListener('mousedown', () => {
    gsap.to(el, { scale: 0.96, duration: 0.1 })
  })
  el.addEventListener('mouseup', () => {
    gsap.to(el, { scale: 1, duration: 0.2, ease: 'back.out(2)' })
  })
}

/** Number update (when live data changes) */
export const flipNumber = (el: Element, newVal: string) => {
  gsap.fromTo(el,
    { y: -20, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.3, ease: 'power2.out',
      onStart: () => { el.textContent = newVal }
    }
  )
}

/** Typewriter effect (terminal labels) */
export const typeWriter = (el: Element, text: string, speed = 40) => {
  gsap.to(el, {
    duration: text.length * speed / 1000,
    text: { value: text, delimiter: '' },
    ease: 'none'
  })
}
