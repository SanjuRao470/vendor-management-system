import Badge from '../../../../components/ui/Badge'
import { formatRating } from '../../../../utils/formatRating'

function PerformanceHeader({ vendor }) {
  if (!vendor) return null

  const statusVariant = {
    Active: 'success',
    Pending: 'warning',
    'On Hold': 'warning',
    Blacklisted: 'danger',
  }

  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-600">{vendor.code}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {vendor.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{vendor.category}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusVariant[vendor.status] || 'neutral'}>
            {vendor.status}
          </Badge>
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
            <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-semibold text-slate-900">{formatRating(vendor.rating)}</span>
            <span className="text-slate-400">/ 5.0</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default PerformanceHeader
