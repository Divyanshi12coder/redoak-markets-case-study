import Button from '../components/Button'
import { useSeo } from '../hooks/useSeo'

export default function NotFound() {
  useSeo({ title: 'Page not found' })
  return (
    <section className="on-dark flex min-h-[70vh] items-center bg-midnight pt-24">
      <div className="container-page">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl text-white sm:text-5xl">This page doesn’t exist.</h1>
        <p className="mt-4 max-w-md text-grey-cool">The link may be broken or the page may have moved.</p>
        <Button href="/" className="mt-8" arrow>Back to home</Button>
      </div>
    </section>
  )
}
