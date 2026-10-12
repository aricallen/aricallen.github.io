/** Paper grain and a faint dot grid. Fixed, non-interactive, behind everything. */
export const Background = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(var(--rule)_0.6px,transparent_0.6px)] bg-[size:14px_14px] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
    <div className="bg-grain absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />
  </div>
)
