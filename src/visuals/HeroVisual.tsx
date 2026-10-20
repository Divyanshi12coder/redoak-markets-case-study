import { Heart, MessageCircle, Send } from 'lucide-react'

/** Layered abstract composition: browser mockup, social card, analytics tile. Illustrative only. */
export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[5/5] w-full max-w-[34rem] select-none" aria-hidden>
      <div className="absolute inset-6 rounded-[2rem] bg-emerald/10 blur-3xl" />

      {/* browser */}
      <div className="absolute left-0 top-[6%] w-[78%] overflow-hidden rounded-2xl border border-white/10 bg-charcoal shadow-dark">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-3 h-4 flex-1 rounded-full bg-white/5" />
        </div>
        <div className="space-y-3 p-5">
          <div className="h-2 w-16 rounded bg-emerald/80" />
          <div className="h-5 w-4/5 rounded bg-offwhite/90" />
          <div className="h-5 w-3/5 rounded bg-offwhite/90" />
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-5/6 rounded bg-white/10" />
          <div className="flex gap-2 pt-2">
            <div className="h-8 w-24 rounded-full bg-emerald" />
            <div className="h-8 w-20 rounded-full border border-white/20" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 rounded-lg bg-white/5" />
            ))}
          </div>
        </div>
      </div>

      {/* social card */}
      <div className="float-slow absolute right-0 top-0 w-[42%] rounded-2xl bg-offwhite p-3 shadow-dark">
        <div className="aspect-square rounded-xl bg-gradient-to-br from-[#d9c6b5] to-[#b9a08d] p-3">
          <div className="h-full rounded-lg border border-white/50 p-2">
            <div className="mt-6 h-3 w-3/4 rounded bg-midnight/70" />
            <div className="mt-2 h-3 w-1/2 rounded bg-midnight/70" />
            <div className="mt-4 h-1.5 w-1/3 rounded bg-white/70" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 px-1 text-midnight/70">
          <Heart className="h-3.5 w-3.5" /> <MessageCircle className="h-3.5 w-3.5" /> <Send className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* analytics */}
      <div className="float-slower absolute bottom-[4%] right-[4%] w-[62%] rounded-2xl border border-white/10 bg-midnight p-4 shadow-dark">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-grey-cool">
          <span>Illustrative analytics</span>
          <span className="rounded-full bg-emerald/15 px-2 py-0.5 text-emerald">Sample</span>
        </div>
        <svg viewBox="0 0 200 70" className="mt-3 w-full">
          <path d="M0 58 C30 50 40 56 70 40 S120 44 140 24 S180 18 200 8 L200 70 L0 70Z" fill="#62B69A" opacity="0.12" />
          <path d="M0 58 C30 50 40 56 70 40 S120 44 140 24 S180 18 200 8" fill="none" stroke="#62B69A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="mt-2 flex gap-1.5">
          {['Visibility', 'Engagement', 'Enquiries'].map((t) => (
            <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-grey-cool">{t}</span>
          ))}
        </div>
      </div>

      {/* calendar chip */}
      <div className="absolute bottom-[14%] left-[2%] w-[34%] rounded-xl border border-midnight/10 bg-white p-3 shadow-dark">
        <div className="text-[10px] font-bold uppercase tracking-widest text-midnight/50">Content calendar</div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`aspect-square rounded-[3px] ${[1, 4, 8, 11].includes(i) ? 'bg-emerald' : 'bg-midnight/10'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
