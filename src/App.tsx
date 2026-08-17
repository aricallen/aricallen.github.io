import { MotionConfig } from 'motion/react'
import { Background } from '@/components/background'
import { Hero } from '@/components/hero'
import { ProjectsSection } from '@/components/projects-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SkillsMarquee } from '@/components/skills-marquee'
import { StatsStrip } from '@/components/stats-strip'

export const App = () => (
  <MotionConfig reducedMotion="user">
    <div id="top" className="relative min-h-dvh">
      <Background />
      <SiteHeader />
      <main>
        <Hero />
        <StatsStrip />
        <SkillsMarquee />
        <ProjectsSection />
      </main>
      <SiteFooter />
    </div>
  </MotionConfig>
)
