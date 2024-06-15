import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="custom404_page">
      <h3>404 - Page Not Found</h3>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <p>
        <Link href="/">Go back home</Link>
      </p>
    </div>
  )
}
