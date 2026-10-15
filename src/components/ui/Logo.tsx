/** Oak tree + growth line + stock graph, in one mark. */
export function LogoMark({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="RedOak Markets logo" className={className}>
      <defs>
        <linearGradient id="ro-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c2334a" />
          <stop offset="1" stopColor="#4a0e1a" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#140a0d" stroke="rgba(255,255,255,0.12)" />
      <path d="M32 7c-5 0-8 3-9 6-5 0-9 4-9 9 0 4 2 7 5 8 1 4 5 6 8 5 2 2 8 2 10 0 3 1 7-1 8-5 3-1 5-4 5-8 0-5-4-9-9-9-1-3-4-6-9-6z" fill="url(#ro-g)" />
      <path d="M32 58V38M32 46l-8-6M32 42l8-7" stroke="#e8dfd2" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M19 28l6-5 5 4 6-8 9 7" stroke="#f6f2ec" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="46" cy="26" r="2.8" fill="#3f9468" />
      <path d="M20 54h24" stroke="#3f9468" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
    </svg>
  )
}

export function Logo({ size = 34, withWord = true, className = '' }: { size?: number; withWord?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {withWord && (
        <span className="font-display text-lg leading-none tracking-tight">
          RedOak <span className="text-crimson-light">Markets</span>
        </span>
      )}
    </span>
  )
}
