import raw from '@/content/portfolio.json'

export type SocialLink = {
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'mail'
}

export type Profile = {
  name: string
  monogram: string
  roles: string[]
  location: string
  headline: string
  bio: string
  quote: string
  avatar: string
  /** Path under public/ to the downloadable resume PDF */
  resumeUrl: string
  links: SocialLink[]
  /** Tech chips floating around the hero avatar */
  chips: string[]
}

export type Stat = {
  value: number
  suffix: string
  label: string
}

export type Skills = {
  expert: string[]
  experienced: string[]
  learning: string[]
}

export type ProjectMedia = {
  type: 'image' | 'video'
  src: string
  /** Video only: still frame shown before playback */
  poster?: string
  alt: string
  caption: string
}

export type ProjectDetails = {
  overview: string
  role: string
  stack: string[]
  outcomes: string[]
  media: ProjectMedia[]
  links: { label: string; url: string }[]
}

export type Project = {
  id: string
  title: string
  org: string
  period: string
  /** oklch hue (0-360) used to tint the card's glow and accents */
  hue: number
  image: string
  summary: string
  highlights: string[]
  details: ProjectDetails
}

export type Testimonial = {
  quote: string
  /** Attributed by role rather than name unless the person has agreed to be named */
  name?: string
  role: string
  org: string
}

export type ResumeEntry = {
  company: string
  role: string
  dates: string
  bullets: string[]
}

export type Resume = {
  title: string
  experience: ResumeEntry[]
  highlights: string[]
  skills: { label: string; items: string[] }[]
  education: { degree: string; school: string; dates: string }
}

export type PortfolioContent = {
  profile: Profile
  stats: Stat[]
  skills: Skills
  projects: Project[]
  testimonials: Testimonial[]
  resume: Resume
}

export const content = raw as PortfolioContent

/** Prefix a public/ asset path with the deploy base (e.g. /portfolio/ on GitHub Pages). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
