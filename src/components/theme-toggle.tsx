import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={className}
    >
      <SunIcon aria-hidden className="size-4 dark:hidden" />
      <MoonIcon aria-hidden className="hidden size-4 dark:block" />
    </button>
  )
}
