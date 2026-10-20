export const GITHUB_APP = 'https://github.com/Divyanshi12coder/redoak-markets'
export const LIVE_APP = 'https://redoak-markets-kappa.vercel.app'
export const GITHUB_CASE = 'https://github.com/Divyanshi12coder/redoak-markets-case-study'

export const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'ml', label: 'ML' },
  { id: 'dia', label: 'Dia' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'roadmap', label: 'Roadmap' },
]

export const CHAPTERS = [
  'The Problem', 'The Idea', 'The Product', 'The Data Layer', 'The Quantitative Engine', 'The ML Layer',
  'Dia', 'Architecture', 'Engineering Decisions', 'Results / Impact', 'Lessons Learned', 'Future Roadmap',
]
export const chapter = (n: number) => `${String(n).padStart(2, '0')} — ${CHAPTERS[n - 1]}`
