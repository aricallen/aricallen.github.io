import { useTheme } from '@/hooks/use-theme'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="label flex items-center gap-2 sm:ml-2 rounded-xs py-1 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span aria-hidden className="hidden sm:inline">
        //
      </span>
      <span aria-hidden className="inline-block w-[2ch] text-left sm:w-[3ch]">
        {dark ? '◐' : '◑'}
      </span>
    </button>
  )
}
