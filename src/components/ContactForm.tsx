import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Copy, Loader2, Mail, Send } from 'lucide-react'
import { site } from '../config/site'
import { serviceInterests } from '../data/content'
import { onPrefill, takePrefill } from '../lib/prefill'

interface Values {
  name: string
  email: string
  company: string
  website: string
  country: string
  service: string
  budget: string
  message: string
}
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'submitting' | 'sent' | 'draft' | 'unconfigured' | 'error'

const empty: Values = { name: '', email: '', company: '', website: '', country: '', service: '', budget: '', message: '' }
const countries = ['United States', 'United Kingdom', 'India', 'Canada', 'Australia', 'United Arab Emirates', 'Singapore']

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (v.company.trim().length < 2) e.company = 'Please enter your company or brand name.'
  if (v.website.trim() && !/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v.website.trim()))
    e.website = 'Please enter a valid website address, or leave this blank.'
  if (!v.country.trim()) e.country = 'Please tell us your country.'
  if (!v.service) e.service = 'Please choose a service.'
  if (!v.budget) e.budget = 'Please choose an estimated budget.'
  if (v.message.trim().length < 20) e.message = 'Please describe your project in at least 20 characters.'
  return e
}

const toText = (v: Values) =>
  [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Company: ${v.company}`,
    `Website: ${v.website || '—'}`,
    `Country: ${v.country}`,
    `Service: ${v.service}`,
    `Budget: ${v.budget}`,
    '',
    v.message,
  ].join('\n')

function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-midnight">
        {label} {optional && <span className="font-medium text-midnight/50">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState<Values>({ ...empty, service: takePrefill() })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const honeypot = useRef<HTMLInputElement>(null)
  const openedAt = useRef(Date.now())
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => onPrefill((v) => setValues((s) => ({ ...s, service: v }))), [])

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((s) => ({ ...s, [k]: e.target.value }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }))
  }
  const props = (k: keyof Values) => ({
    id: k,
    name: k,
    value: values[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? (true as const) : undefined,
    'aria-describedby': errors[k] ? `${k}-err` : undefined,
    className: 'field',
  })

  const mailto = () =>
    `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry from ${values.name} (${values.company})`)}&body=${encodeURIComponent(toText(values))}`

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    // Spam prevention: a hidden field humans never fill, and a minimum fill time bots rarely respect.
    if (honeypot.current?.value || Date.now() - openedAt.current < 2500) return

    const errs = validate(values)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus()
      return
    }

    if (site.formEndpoint) {
      setStatus('submitting')
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus('sent')
        setValues({ ...empty })
      } catch {
        setStatus('error')
      }
    } else if (site.email) {
      setStatus('draft')
    } else {
      setStatus('unconfigured')
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toText(values))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="card p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-deep" aria-hidden />
        <h3 className="mt-5 text-2xl">Thank you, your enquiry has been sent.</h3>
        <p className="mt-3 text-midnight/70">We’ll review it and get back to you to arrange a discovery conversation.</p>
        <button type="button" className="mt-6 font-bold text-emerald-deep underline underline-offset-4" onClick={() => setStatus('idle')}>
          Send another enquiry
        </button>
      </div>
    )
  }

  if (status === 'draft' || status === 'unconfigured') {
    return (
      <div role="status" className="card p-6 sm:p-10">
        <Mail className="h-10 w-10 text-emerald-deep" aria-hidden />
        <h3 className="mt-4 text-2xl">{status === 'draft' ? 'Your message is ready to send' : 'Almost there'}</h3>
        <p className="mt-3 leading-relaxed text-midnight/70">
          {status === 'draft'
            ? 'This form isn’t connected to an inbox service, so nothing has been sent yet. Open the prepared email draft in your email app and send it from there.'
            : 'This site’s contact form hasn’t been connected to an inbox yet, so nothing has been sent. Please copy your message and send it to us through the contact details we share with you.'}
        </p>
        <pre className="mt-5 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-offwhite p-4 text-sm text-midnight/80">{toText(values)}</pre>
        <div className="mt-6 flex flex-wrap gap-3">
          {status === 'draft' && (
            <a href={mailto()} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-emerald px-6 font-semibold text-midnight hover:bg-[#74c4a9]">
              <Send className="h-4 w-4" aria-hidden /> Open email draft
            </a>
          )}
          <button type="button" onClick={copy} className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-midnight/20 px-6 font-semibold hover:bg-midnight hover:text-white">
            <Copy className="h-4 w-4" aria-hidden /> {copied ? 'Copied' : 'Copy message'}
          </button>
          <button type="button" onClick={() => setStatus('idle')} className="min-h-[48px] px-4 font-semibold text-midnight/70 underline underline-offset-4">
            Edit details
          </button>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-10" aria-label="Project enquiry form">
      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input ref={honeypot} type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input {...props('name')} type="text" autoComplete="name" placeholder="Jane Smith" />
        </Field>
        <Field id="email" label="Business email" error={errors.email}>
          <input {...props('email')} type="email" autoComplete="email" placeholder="jane@company.com" />
        </Field>
        <Field id="company" label="Company or brand name" error={errors.company}>
          <input {...props('company')} type="text" autoComplete="organization" placeholder="Your brand" />
        </Field>
        <Field id="website" label="Website" optional error={errors.website}>
          <input {...props('website')} type="text" inputMode="url" autoComplete="url" placeholder="yourbrand.com" />
        </Field>
        <Field id="country" label="Country" error={errors.country}>
          <input {...props('country')} type="text" list="countries" autoComplete="country-name" placeholder="Start typing…" />
          <datalist id="countries">{countries.map((c) => <option key={c} value={c} />)}</datalist>
        </Field>
        <Field id="service" label="Service of interest" error={errors.service}>
          <select {...props('service')}>
            <option value="">Select a service</option>
            {serviceInterests.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <Field id="budget" label="Estimated budget" error={errors.budget}>
        <select {...props('budget')}>
          <option value="">Select a range</option>
          {site.budgets.map((b) => <option key={b}>{b}</option>)}
        </select>
      </Field>
      <Field id="message" label="Project description" error={errors.message}>
        <textarea {...props('message')} rows={5} placeholder="What are you building, and where do you want to go?" />
      </Field>

      {status === 'error' && (
        <p role="alert" className="flex gap-2 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            Something went wrong and your message was not sent. Please try again
            {site.email ? <> or email us directly at <a className="underline" href={`mailto:${site.email}`}>{site.email}</a></> : null}.
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-midnight px-8 font-semibold text-white transition hover:bg-charcoal disabled:opacity-70 sm:w-auto"
      >
        {status === 'submitting' ? (
          <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</>
        ) : (
          <><Send className="h-4 w-4" aria-hidden /> Send enquiry</>
        )}
      </button>
      <p className="text-sm text-midnight/55">We use your details only to respond to your enquiry.</p>
    </form>
  )
}
