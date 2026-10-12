/** Dot-matrix texture with patchy density plus film grain. Fixed, non-interactive, behind everything. */
export const Background = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="bg-matrix absolute inset-0" />
    <div className="bg-grain absolute inset-0 opacity-[0.035] dark:opacity-[0.06]" />
  </div>
)
