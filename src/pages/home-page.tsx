import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { Hero } from '@/components/hero'
import { ProjectsSection } from '@/components/projects-section'
import { TestimonialsSection } from '@/components/testimonials-section'

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
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
