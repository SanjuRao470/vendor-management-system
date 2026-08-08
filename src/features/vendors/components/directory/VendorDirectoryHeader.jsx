import { Link } from 'react-router-dom'
import Button from '../../../../components/ui/Button'

function VendorDirectoryHeader() {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Vendor Directory
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Search, filter, and manage your vendor relationships
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </Button>
          <Link to="/vendors/new">
            <Button>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Vendor
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default VendorDirectoryHeader
