import { useTheme } from '@/hooks/use-theme'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="cursor-pointer text-muted-foreground uppercase transition-colors hover:text-foreground"
    >
      <span aria-hidden>{theme === 'dark' ? '◐ Ink' : '◑ Paper'}</span>
    </button>
  )
}
