import { Link } from 'react-router-dom'
import VendorStatusBadge from './VendorStatusBadge'
import VendorRating from './VendorRating'

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function VendorTableRow({ vendor, onView }) {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50/50">
      <td className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xs font-semibold text-brand-700">
            {getInitials(vendor.vendorName)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">{vendor.vendorName}</p>
            <p className="text-xs text-slate-500">{vendor.vendorCode}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">{vendor.category}</td>
      <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">{vendor.city}</td>
      <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">{vendor.contactPerson}</td>
      <td className="px-4 py-4 sm:px-6">
        <VendorRating rating={vendor.rating} />
      </td>
      <td className="px-4 py-4 sm:px-6">
        <VendorStatusBadge status={vendor.status} />
      </td>
      <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
        {formatCurrency(vendor.totalPurchaseValue)}
      </td>
      <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">
        {formatDate(vendor.lastTransaction)}
      </td>
      <td className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-end gap-1">
          <Link
            to={`/vendors/${vendor.id}`}
            onClick={() => onView?.(vendor)}
            className="rounded-md px-2.5 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50"
          >
            View
          </Link>
          <button
            type="button"
            className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            Edit
          </button>
          <button
            type="button"
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="More actions"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default VendorTableRow
