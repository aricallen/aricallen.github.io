/** The dock's pages, in display order. Paths are router paths; labels are what the dock shows. */
export const PAGES = [
  { path: '/', label: 'root' },
  { path: '/about', label: 'about' },
  { path: '/work', label: 'work' },
  { path: '/resume', label: 'resume' },
  { path: '/contact', label: 'contact' },
] as const

export type PagePath = (typeof PAGES)[number]['path']

export const isPagePath = (path: string): path is PagePath => PAGES.some((page) => page.path === path)
