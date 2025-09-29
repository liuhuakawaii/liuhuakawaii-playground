import { Link } from 'react-router-dom'
import { Button } from '@/components'

export default function NotFound() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
        <p className="mt-6 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10">
          <Link to="/">
            <Button>
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}