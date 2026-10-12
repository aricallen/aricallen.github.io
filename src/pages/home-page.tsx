import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Hero } from '@/components/hero'
import { StatsRow } from '@/components/stats-row'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ToolkitSection } from '@/components/toolkit-section'
import { WorkSection } from '@/components/work-section'

const scrollToWork = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })

export const HomePage = () => {
  const { hash } = useLocation()
  const [topicId, setTopicId] = useState<string | null>(null)

  // Router navigation (e.g. "Work" from the resume page) doesn't scroll to hash targets on its own.
  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  // Picking a card out of the box files the work list under that topic and takes you to it.
  const pickTopic = (id: string) => {
    setTopicId(id)
    scrollToWork()
  }

  return (
    <>
      <Hero onPickTopic={pickTopic} />
      <StatsRow />
      <WorkSection topicId={topicId} onTopicChange={setTopicId} />
      <TestimonialsSection />
      <ToolkitSection />
    </>
  )
}
