import { useState } from 'react'
import { ProjectDetailDialog } from '@/components/project-detail-dialog'
import { ProjectIndex } from '@/components/project-index'
import { Section } from '@/components/section'
import { content, type Project } from '@/lib/content'

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const openProject = (project: Project) => {
    setActiveProject(project)
    setDetailOpen(true)
  }

  return (
    <Section
      id="work"
      index="02"
      label="Selected work"
      statement="A short index of projects, past and present, that I'm particularly proud of."
      intro={
        <>
          <p>
            Most of this is recent work at dbt Labs: agent interfaces, MCP apps, and the platform work that lets a
            frontend team move fast without breaking things.
          </p>
          <p>Open any project for the full story, outcomes, and screenshots.</p>
        </>
      }
    >
      <ProjectIndex projects={content.projects} onOpen={openProject} />
      <ProjectDetailDialog project={activeProject} open={detailOpen} onOpenChange={setDetailOpen} />
    </Section>
  )
}
