import { AnimatePresence, motion } from 'motion/react'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { HalftonePortrait } from '@/components/halftone-portrait'
import { Slash } from '@/components/primitives'
import { asset, content } from '@/lib/content'
import { plainText } from '@/lib/format'
import { EASE } from '@/lib/motion'

type Word = { word: string; emphasized: boolean }

const NBSP = '\u00a0'

/**
 * Split a statement into words, remembering which ones sit inside _emphasis_ markers. Words that
 * would look stranded at the edge of a line are glued to a neighbour: a lone letter ("I") to the
 * word after it, and a short sentence ending ("II.", "in.") to the word before it.
 */
const toWords = (text: string) =>
  text
    .split(/(_[^_]+_)/g)
    .flatMap((part, index) => {
      const emphasized = index % 2 === 1
      return (emphasized ? part.slice(1, -1) : part)
        .split(' ')
        .filter(Boolean)
        .map((word): Word => ({ word, emphasized }))
    })
    .reduce<Word[]>((words, next) => {
      const previous = words.at(-1)
      const glue =
        previous?.emphasized === next.emphasized &&
        (previous.word.length === 1 || (next.word.length <= 3 && next.word.endsWith('.')))
      if (previous && glue) previous.word += NBSP + next.word
      else words.push(next)
      return words
    }, [])

const RotatingRole = ({ roles }: { roles: string[] }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <span className="relative inline-flex h-4 overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.45, ease: EASE }}
          className="whitespace-nowrap"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export const Hero = () => {
  const { profile } = content
  const [title, ...otherRoles] = profile.roles
  const statement = `${profile.name}. ${title}. ${profile.headline}`

  return (
    <section
      id="about"
      aria-label="Introduction"
      className="relative flex min-h-[calc(100svh-4.5rem)] flex-col px-3 pt-2"
    >
      <motion.h1
        aria-label={plainText(statement)}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.035, delayChildren: 0.1 }}
        className="type-display relative z-10 indent-[1.05em] text-[clamp(2.9rem,7vw,8.5rem)] lg:max-w-[76%]"
      >
        {toWords(statement).map(({ word, emphasized }, index) => {
          const Tag = emphasized ? motion.em : motion.span
          return (
            <Fragment key={index}>
              {/* The mask is padded so the clip doesn't shave italic overhangs or commas. */}
              <span
                aria-hidden
                className="-mx-[0.04em] -mb-[0.1em] inline-block overflow-hidden px-[0.04em] pb-[0.1em] indent-0"
              >
                <Tag
                  variants={{ hidden: { y: '105%' }, visible: { y: 0 } }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="inline-block"
                >
                  {word}
                </Tag>
              </span>{' '}
            </Fragment>
          )
        })}
      </motion.h1>

      <HalftonePortrait
        src={asset(profile.avatar)}
        alt={`Halftone portrait of ${profile.name}`}
        className="mt-6 aspect-square w-full lg:absolute lg:right-3 lg:bottom-0 lg:mt-0 lg:w-[min(44vw,42rem)]"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="type-label relative z-10 mt-8 flex flex-col gap-4 pb-6 lg:mt-auto lg:max-w-md"
      >
        <dl className="border-t border-border">
          <div className="flex justify-between gap-6 border-b border-border py-2">
            <dt className="text-muted-foreground">Based in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div className="flex justify-between gap-6 border-b border-border py-2">
            <dt className="text-muted-foreground">Also</dt>
            <dd>
              <RotatingRole roles={otherRoles} />
            </dd>
          </div>
        </dl>
        <p>
          <a href="#work" className="bracket -ml-1.5">
            See the work ↓
          </a>
          <Slash />
          <Link to="/resume" viewTransition className="bracket">
            Resume →
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
