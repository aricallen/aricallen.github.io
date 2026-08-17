export const Background = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
    <div className="animate-aurora absolute -top-40 left-[10%] size-[34rem] rounded-full bg-brand-a/15 blur-3xl dark:bg-brand-a/15" />
    <div className="animate-aurora absolute top-[30%] -right-32 size-[30rem] rounded-full bg-brand-b/10 blur-3xl [animation-delay:-8s] dark:bg-brand-b/12" />
    <div className="animate-aurora absolute -bottom-48 left-[30%] size-[36rem] rounded-full bg-brand-c/10 blur-3xl [animation-delay:-16s] dark:bg-brand-c/10" />
    <div className="bg-noise absolute inset-0 opacity-[0.025] dark:opacity-[0.04]" />
  </div>
)
