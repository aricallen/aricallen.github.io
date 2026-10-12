import { useTheme } from '@/hooks/use-theme'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="link-dotted rounded-xs font-mono text-xs lowercase outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {dark ? 'lights on' : 'lights off'}
    </button>
  )
}
