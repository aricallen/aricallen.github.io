import { motion } from 'motion/react'
import { Link } from 'react-router'
import { HalftonePortrait } from '@/components/halftone-portrait'
import { asset, content } from '@/lib/content'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const line = {
  hidden: { opacity: 0, y: '40%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

export const Hero = () => {
  const { profile } = content
  const statement = [`${profile.name}.`, `${profile.roles[0]}.`, profile.headline]

  return (
    <section
      id="about"
      aria-label="Introduction"
      className="grid min-h-[calc(100dvh-var(--bar-height)*2)] grid-cols-1 gap-8 px-4 pt-bar pb-12 sm:px-6 lg:grid-cols-[3fr_2fr] lg:gap-6"
    >
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        className="display self-start pt-10 text-[clamp(2.4rem,6.4vw,6rem)] text-balance lg:pt-16"
      >
        {statement.map((text, index) => (
          <span key={text} className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={line} className="block">
              {index === 2 ? <span className="text-muted-foreground">{text}</span> : text}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <div className="relative flex flex-col justify-end gap-6 lg:items-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-sm lg:max-w-md"
        >
          <HalftonePortrait src={asset(profile.avatar)} alt={`Portrait of ${profile.name}, as a halftone print`} />
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="label grid w-full max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2 rule-t pt-4 text-muted-foreground"
        >
          <dt className="text-foreground">Currently</dt>
          <dd>
            {profile.roles.slice(1).map((role, index) => (
              <span key={role}>
                {index > 0 && <span aria-hidden> // </span>}
                {role}
              </span>
            ))}
          </dd>
          <dt className="text-foreground">Stack</dt>
          <dd className="text-pretty">{profile.chips.join(' // ')}</dd>
          <dt className="text-foreground">Next</dt>
          <dd className="flex flex-wrap gap-x-4">
            <a
              href="#work"
              className="link-rule rounded-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Selected work ↓
            </a>
            <Link
              to="/resume"
              className="link-rule rounded-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Resume →
            </Link>
          </dd>
        </motion.dl>
      </div>
    </section>
  )
}
