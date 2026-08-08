import { Link } from 'react-router-dom'
import Button from '../../../../components/ui/Button'
import VendorStatusBadge from '../directory/VendorStatusBadge'
import VendorRating from '../directory/VendorRating'

function getInitials(name) {
  if (!name) return '??'
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function VendorProfileHeader({ vendor }) {
  if (!vendor) return null

  const name = vendor.vendorName || vendor.name
  const code = vendor.vendorCode || vendor.code

  return (
    <div className="mb-6">
      <Link
        to="/vendors"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-600"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Vendors
      </Link>

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-lg font-semibold text-brand-700">
            {getInitials(name)}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">{name}</h1>
              <VendorStatusBadge status={vendor.status} />
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <span>{code}</span>
              <span className="hidden text-slate-300 sm:inline">·</span>
              <span>{vendor.category}</span>
              <span className="hidden text-slate-300 sm:inline">·</span>
              <span>{vendor.city}</span>
            </div>
            <div className="mt-2">
              <VendorRating rating={vendor.rating} size="md" />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button variant="secondary" size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
          <Button variant="ghost" size="sm" aria-label="More actions">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VendorProfileHeader
