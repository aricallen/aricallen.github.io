import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { AboutSection } from '@/components/about-section'
import { Colophon } from '@/components/colophon'
import { Hero } from '@/components/hero'
import { TestimonialsSection } from '@/components/testimonials-section'
import { WorkSection } from '@/components/work-section'

export const HomePage = () => {
  const { hash } = useLocation()

  // Router navigation (e.g. "Work" from the resume page) doesn't scroll to hash targets on its own.
  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <Hero />
      <AboutSection />
      <WorkSection />
      <TestimonialsSection />
      <Colophon />
    </>
  )
}
