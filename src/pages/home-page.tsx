import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { Hero } from '@/components/hero'
import { PlaySection } from '@/components/play-section'
import { ProjectsSection } from '@/components/projects-section'
import { SkillsMarquee } from '@/components/skills-marquee'
import { StatsStrip } from '@/components/stats-strip'
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
      <StatsStrip />
      <SkillsMarquee />
      <ProjectsSection />
      <PlaySection />
      <TestimonialsSection />
    </>
  )
}
