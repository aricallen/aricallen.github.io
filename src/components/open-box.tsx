import { cn } from '@/lib/utils'

/** The box the topic cards come out of. Purely decorative. */
export const OpenBox = ({ className, monogram }: { className?: string; monogram: string }) => (
  <svg aria-hidden viewBox="0 0 440 210" className={cn('overflow-visible', className)}>
    <defs>
      <linearGradient id="box-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="oklch(0.74 0.19 48)" />
        <stop offset="1" stopColor="oklch(0.66 0.21 35)" />
      </linearGradient>
      <linearGradient id="box-side" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="oklch(0.9 0.15 88)" />
        <stop offset="1" stopColor="oklch(0.82 0.15 62)" />
      </linearGradient>
      <linearGradient id="box-flap" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="oklch(0.94 0.1 95)" />
        <stop offset="1" stopColor="oklch(0.87 0.14 72)" />
      </linearGradient>
    </defs>
    <ellipse cx="250" cy="200" rx="190" ry="8" fill="oklch(0 0 0 / 0.1)" />
    {/* back flap, standing open */}
    <path d="M178 84 L392 84 L414 30 L200 30 Z" fill="oklch(0.6 0.2 32)" />
    {/* inside */}
    <path d="M44 104 L178 84 L392 84 L258 104 Z" fill="oklch(0.38 0.12 30)" />
    {/* left flap, folded out */}
    <path d="M44 104 L178 84 L134 46 L0 66 Z" fill="url(#box-flap)" />
    <path d="M44 104 H258 V198 H44 Z" fill="url(#box-front)" />
    <path d="M258 104 L392 84 V178 L258 198 Z" fill="url(#box-side)" />
    <rect
      x="300"
      y="112"
      width="48"
      height="12"
      rx="6"
      transform="skewY(-8.5) translate(0 46)"
      fill="oklch(0.42 0.13 32)"
    />
    <g transform="rotate(-4 120 150)">
      <rect x="68" y="130" width="118" height="42" rx="4" fill="oklch(0.985 0.01 90)" />
      <text x="127" y="148" textAnchor="middle" className="type-label" fontSize="8.5" fill="oklch(0.38 0.12 30)">
        Handle with
      </text>
      <text x="127" y="163" textAnchor="middle" className="type-wide" fontSize="11" fill="oklch(0.38 0.12 30)">
        Optimism
      </text>
    </g>
    <text x="232" y="190" textAnchor="end" className="font-heading" fontSize="17" fill="oklch(0.38 0.12 30 / 0.7)">
      {monogram}
    </text>
  </svg>
)
