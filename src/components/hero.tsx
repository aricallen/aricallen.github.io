import { motion } from 'motion/react'
import { useRef, useSyncExternalStore } from 'react'
import { Band, Pill } from '@/components/frame'
import { OpenBox } from '@/components/open-box'
import { TopicVignette } from '@/components/topic-vignettes'
import { content, type Topic } from '@/lib/content'
import { cn } from '@/lib/utils'

type HeroProps = {
  onPickTopic: (topicId: string) => void
}

// Where each card comes to rest above the box from `sm` up; below that they simply stack.
const RESTING = [
  { className: 'self-start sm:left-0 sm:top-0', rotate: -4 },
  { className: 'z-10 self-end sm:left-1/2 sm:top-14 sm:-ml-[10.5rem]', rotate: 1.5 },
  { className: 'self-start sm:right-0 sm:top-0', rotate: 4 },
]

const DOTS = [
  { x: '8%', y: '18%', size: 22, color: 'var(--dot-b)', drift: 'animate-drift-a' },
  { x: '24%', y: '9%', size: 18, color: 'var(--dot-a)', drift: 'animate-drift-c' },
  { x: '5%', y: '46%', size: 26, color: 'var(--dot-c)', drift: 'animate-drift-b' },
  { x: '14%', y: '78%', size: 18, color: 'var(--dot-a)', drift: 'animate-drift-a' },
  { x: '27%', y: '64%', size: 16, color: 'var(--dot-b)', drift: 'animate-drift-c' },
  { x: '44%', y: '40%', size: 24, color: 'var(--dot-c)', drift: 'animate-drift-b' },
  { x: '67%', y: '8%', size: 16, color: 'var(--dot-b)', drift: 'animate-drift-b' },
  { x: '83%', y: '14%', size: 24, color: 'var(--dot-c)', drift: 'animate-drift-a' },
  { x: '93%', y: '34%', size: 18, color: 'var(--dot-b)', drift: 'animate-drift-c' },
  { x: '88%', y: '66%', size: 20, color: 'var(--dot-a)', drift: 'animate-drift-b' },
  { x: '74%', y: '82%', size: 18, color: 'var(--dot-b)', drift: 'animate-drift-a' },
  { x: '96%', y: '86%', size: 24, color: 'var(--dot-c)', drift: 'animate-drift-c' },
]

const FINE_POINTER = '(pointer: fine)'

const subscribeToPointer = (listener: () => void) => {
  const query = window.matchMedia(FINE_POINTER)
  query.addEventListener('change', listener)
  return () => query.removeEventListener('change', listener)
}

type TopicCardProps = {
  topic: Topic
  index: number
  count: number
  onPick: () => void
}

const TopicCard = ({ topic, index, count, onPick }: TopicCardProps) => {
  // Dragging a card on a touch screen would fight with scrolling, so it's a mouse-only toy.
  const draggable = useSyncExternalStore(subscribeToPointer, () => window.matchMedia(FINE_POINTER).matches)
  const dragged = useRef(false)
  const { className, rotate } = RESTING[index % RESTING.length]

  return (
    <motion.button
      type="button"
      drag={draggable}
      dragSnapToOrigin
      dragElastic={0.5}
      onDragStart={() => {
        dragged.current = true
      }}
      onClick={() => {
        // Letting go of a drag also fires a click; only a clean click should pick the topic.
        if (!dragged.current) onPick()
        dragged.current = false
      }}
      initial={{ opacity: 0, y: 170, scale: 0.4, rotate: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.55 + index * 0.13 }}
      whileHover={{ scale: 1.04, rotate: 0 }}
      whileDrag={{ scale: 1.08, zIndex: 30 }}
      aria-label={`${topic.title}: show ${count} ${count === 1 ? 'project' : 'projects'}`}
      className={cn(
        'w-[84%] cursor-pointer rounded-xl text-left max-sm:-mt-2 max-sm:first:mt-0 sm:absolute sm:w-[21rem]',
        draggable && 'active:cursor-grabbing',
        className,
      )}
    >
      <span
        data-tone={topic.tone}
        style={{ animationDelay: `${index * -1.8}s` }}
        className="ambient animate-bob mesh grain block rounded-xl px-5 pt-4 pb-3 shadow-[0_18px_40px_-18px_oklch(0.3_0.1_320/0.45)]"
      >
        <span className="block font-heading text-[1.65rem] leading-tight tracking-[-0.02em]">{topic.title}</span>
        <span className="mt-3 block">
          <TopicVignette topicId={topic.id} />
        </span>
        <span className="type-label mt-2 flex justify-between text-[0.62rem] opacity-70">
          <span>
            {count} {count === 1 ? 'project' : 'projects'}
          </span>
          <span aria-hidden>↓</span>
        </span>
      </span>
    </motion.button>
  )
}

export const Hero = ({ onPickTopic }: HeroProps) => {
  const { profile, resume, topics, projects } = content
  const firstName = profile.name.split(' ')[0]
  const title = profile.roles[0]
  // The employer shown is whichever job on the resume carries the headline title.
  const company = resume.experience.find((entry) => entry.role === resume.title)?.company

  return (
    <Band className="relative isolate overflow-hidden px-4 pt-16 sm:pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {DOTS.map((dot, index) => (
          <span
            key={index}
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              background: dot.color,
              animationDelay: `${index * -1.3}s`,
            }}
            className={cn('ambient absolute rounded-full blur-[5px]', dot.drift)}
          />
        ))}
      </div>

      <h1 className="text-center font-heading text-[clamp(2rem,4.3vw,3.875rem)] leading-[1.24] tracking-[-0.03em] text-balance">
        <span className="block">Hi, I’m {firstName}</span>
        <span className="sm:block">
          a{' '}
          <Pill tone="lime" className="[animation-delay:0.5s]">
            {title}
          </Pill>
          {company && (
            <>
              {' '}
              at{' '}
              <Pill tone="sky" className="[animation-delay:0.75s]">
                {company}
              </Pill>
            </>
          )}
        </span>
        <span className="sm:block"> and here’s everything I know about</span>
      </h1>

      <svg
        aria-hidden
        viewBox="0 0 480 24"
        className="mx-auto mt-3 h-5 w-[min(30rem,80%)] overflow-visible sm:translate-x-[18%]"
      >
        <path
          d="M4 16 C80 6 150 12 232 10 S380 4 476 9 M228 13 C262 8 270 20 214 17"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="1"
          strokeDashoffset="1"
          className="[animation:draw_0.9s_1s_ease-out_forwards] motion-reduce:[animation:none] motion-reduce:[stroke-dashoffset:0]"
        />
      </svg>

      <div className="relative mx-auto mt-8 flex w-full max-w-[62.5rem] flex-col sm:mt-6 sm:h-[29rem]">
        {topics.map((topic, index) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            index={index}
            count={projects.filter((project) => project.topic === topic.id).length}
            onPick={() => onPickTopic(topic.id)}
          />
        ))}
        <OpenBox
          monogram={profile.monogram}
          className="mx-auto mt-4 w-[min(26rem,86%)] sm:absolute sm:bottom-0 sm:left-1/2 sm:mt-0 sm:-ml-[13.5rem] sm:w-[27rem]"
        />
      </div>
    </Band>
  )
}
