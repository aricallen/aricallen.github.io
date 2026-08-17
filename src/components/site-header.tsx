import { MailIcon } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { content, type SocialLink } from '@/lib/content'

const iconFor = (icon: SocialLink['icon']) => {
  if (icon === 'github') return <GithubIcon />
  if (icon === 'linkedin') return <LinkedinIcon />
  return <MailIcon />
}

export const SiteHeader = () => {
  const { profile } = content

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="font-mono text-lg font-semibold tracking-tight text-gradient rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {profile.monogram}
        </a>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <Button variant="ghost" nativeButton={false} render={<a href="#work" />}>
            Work
          </Button>
          <Button variant="ghost" nativeButton={false} render={<a href="#about" />}>
            About
          </Button>
          {profile.links.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              size="icon"
              nativeButton={false}
              render={
                <a
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={link.label}
                />
              }
            >
              {iconFor(link.icon)}
            </Button>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
