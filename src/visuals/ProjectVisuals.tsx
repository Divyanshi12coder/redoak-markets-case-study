import type { ProjectVisual } from '../data/projects'

export const beautyPalette = [
  { name: 'Cream', hex: '#F3EBE1' },
  { name: 'Clay', hex: '#C8A28A' },
  { name: 'Sage', hex: '#A9B8A3' },
  { name: 'Cocoa', hex: '#3B2A26' },
]

/* ---------- Beauty: editorial social composition ---------- */
function Beauty() {
  return (
    <div className="absolute inset-0 bg-[#F3EBE1]" aria-hidden>
      <div className="absolute left-[6%] top-[8%] flex h-[56%] w-[34%] flex-col justify-between rounded-md bg-[#3B2A26] p-[4%] text-[#F3EBE1] shadow-card">
        <span className="text-[0.5rem] font-bold uppercase tracking-[0.25em] opacity-70">Maison Aura</span>
        <div>
          <div className="font-serif text-[clamp(0.9rem,2.2vw,1.5rem)] italic leading-tight">The Evening<br />Ritual</div>
          <div className="mt-2 h-px w-8 bg-[#C8A28A]" />
        </div>
      </div>
      <div className="absolute left-[44%] top-[6%] h-[40%] w-[26%] rounded-md bg-gradient-to-b from-[#C8A28A] to-[#b58d74] shadow-card">
        <div className="absolute inset-[10%] rounded-full border border-[#F3EBE1]/60" />
        <span className="absolute inset-x-0 bottom-[10%] text-center font-serif text-[0.7rem] italic text-[#F3EBE1]">Reel</span>
      </div>
      <div className="absolute right-[5%] top-[14%] flex h-[50%] w-[20%] flex-col gap-[5%]">
        {['#A9B8A3', '#C8A28A', '#F3EBE1'].map((c, i) => (
          <div key={c} className="flex-1 rounded-md shadow-card" style={{ background: c, border: i === 2 ? '1px solid #3B2A2622' : undefined }} />
        ))}
      </div>
      <div className="absolute bottom-[8%] left-[44%] right-[5%] h-[34%] rounded-md bg-[#A9B8A3] p-[3%] shadow-card">
        <div className="grid h-full grid-cols-7 gap-[3%]">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`rounded-[2px] ${[0, 3, 6, 9, 12].includes(i) ? 'bg-[#3B2A26]' : 'bg-[#F3EBE1]/70'}`} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-[8%] left-[6%] h-[22%] w-[34%] rounded-md bg-[#F3EBE1] p-[3%] shadow-card ring-1 ring-[#3B2A26]/15">
        <div className="h-1.5 w-1/2 rounded bg-[#3B2A26]/70" />
        <div className="mt-1.5 h-1 w-3/4 rounded bg-[#3B2A26]/25" />
      </div>
    </div>
  )
}

/* ---------- Startup: browser + phone ---------- */
function Startup() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#171C26] to-[#101827]" aria-hidden>
      <div className="absolute left-[6%] top-[12%] w-[66%] overflow-hidden rounded-lg bg-white shadow-dark">
        <div className="flex items-center gap-1 border-b border-midnight/10 bg-offwhite px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-midnight/20" /><span className="h-1.5 w-1.5 rounded-full bg-midnight/20" /><span className="h-1.5 w-1.5 rounded-full bg-midnight/20" />
        </div>
        <div className="flex items-center justify-between px-3 py-2 text-[0.5rem] font-bold text-midnight">
          <span>Nimbus</span><span className="h-2 w-8 rounded-full bg-midnight" />
        </div>
        <div className="space-y-1.5 px-3 pb-3 pt-2">
          <div className="text-[clamp(0.7rem,1.8vw,1.1rem)] font-extrabold leading-tight text-midnight">Plan your team’s week<br />in minutes.</div>
          <div className="h-1 w-3/4 rounded bg-midnight/15" />
          <div className="flex gap-1.5 pt-1"><span className="h-4 w-16 rounded-full bg-emerald" /><span className="h-4 w-12 rounded-full border border-midnight/20" /></div>
          <div className="grid grid-cols-3 gap-1.5 pt-2">
            {[0, 1, 2].map((i) => <div key={i} className="h-8 rounded bg-offwhite ring-1 ring-midnight/5" />)}
          </div>
        </div>
      </div>
      <div className="absolute bottom-[8%] right-[7%] w-[22%] overflow-hidden rounded-[1.1rem] border-[3px] border-white/80 bg-white shadow-dark">
        <div className="space-y-1.5 p-2 pt-4">
          <div className="h-1.5 w-1/3 rounded bg-emerald" />
          <div className="h-2.5 w-4/5 rounded bg-midnight" />
          <div className="h-2.5 w-3/5 rounded bg-midnight" />
          <div className="h-3.5 w-full rounded-full bg-emerald" />
          <div className="h-8 rounded bg-offwhite" />
        </div>
      </div>
    </div>
  )
}

/* ---------- Lead gen: ads + form + funnel ---------- */
function LeadGen() {
  return (
    <div className="absolute inset-0 bg-[#e9efe9]" aria-hidden>
      <div className="absolute left-[5%] top-[10%] flex h-[50%] w-[28%] flex-col justify-between rounded-lg bg-midnight p-[3%] shadow-card">
        <span className="text-[0.45rem] font-bold uppercase tracking-widest text-emerald">Sponsored · Concept</span>
        <div className="text-[clamp(0.65rem,1.6vw,1rem)] font-extrabold leading-tight text-white">Same-week<br />visits.</div>
        <span className="h-4 w-14 rounded-full bg-emerald" />
      </div>
      <div className="absolute left-[36%] top-[16%] flex h-[44%] w-[26%] flex-col justify-between rounded-lg bg-white p-[3%] shadow-card ring-1 ring-midnight/10">
        <span className="text-[0.45rem] font-bold uppercase tracking-widest text-emerald-deep">Sponsored · Concept</span>
        <div className="text-[clamp(0.6rem,1.4vw,0.9rem)] font-extrabold leading-tight text-midnight">Trusted<br />local pros.</div>
        <span className="h-4 w-14 rounded-full bg-midnight" />
      </div>
      <div className="absolute right-[5%] top-[8%] w-[28%] rounded-lg bg-white p-[2.5%] shadow-card ring-1 ring-midnight/10">
        <div className="h-1.5 w-2/3 rounded bg-midnight" />
        {[0, 1, 2].map((i) => <div key={i} className="mt-1.5 h-3 rounded border border-midnight/15" />)}
        <div className="mt-2 h-3.5 rounded-full bg-emerald" />
      </div>
      <div className="absolute inset-x-[5%] bottom-[8%] flex items-center justify-between rounded-lg bg-midnight px-[4%] py-[2.5%] shadow-card">
        {['Ad click', 'Landing', 'Form', 'Enquiry'].map((s, i) => (
          <div key={s} className="flex items-center gap-1 text-[0.5rem] font-bold text-white sm:text-[0.6rem]">
            <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[0.5rem] ${i === 3 ? 'bg-emerald text-midnight' : 'bg-white/15'}`}>{i + 1}</span>
            {s}
            {i < 3 && <span className="ml-1 hidden h-px w-4 bg-white/30 sm:block" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProjectCover({ kind, className = '' }: { kind: ProjectVisual; className?: string }) {
  return (
    <div className={`relative aspect-[16/11] w-full overflow-hidden ${className}`}>
      {kind === 'beauty' ? <Beauty /> : kind === 'startup' ? <Startup /> : <LeadGen />}
    </div>
  )
}
