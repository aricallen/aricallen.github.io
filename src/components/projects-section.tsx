import { motion } from 'motion/react'
import { useState } from 'react'
import { ProjectCard } from '@/components/project-card'
import { ProjectDetailDialog } from '@/components/project-detail-dialog'
import { content, type Project } from '@/lib/content'

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const openProject = (project: Project) => {
    setActiveProject(project)
    setDetailOpen(true)
  }

  return (
    <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <p className="mb-2 font-mono text-sm text-primary">// selected work</p>
        <h2 id="work-heading" className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Things I've shipped
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          A few projects I'm proud of — click any card to flip it open for the full story.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <ProjectCard project={project} onOpen={() => openProject(project)} />
          </motion.div>
        ))}
      </div>

      <ProjectDetailDialog project={activeProject} open={detailOpen} onOpenChange={setDetailOpen} />
    </section>
  )
}
