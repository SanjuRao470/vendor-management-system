function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages = new Set([1, total, current])
  if (current > 1) pages.add(current - 1)
  if (current < total) pages.add(current + 1)
  if (current <= 3) pages.add(2).add(3)
  if (current >= total - 2) pages.add(total - 1).add(total - 2)

  const sorted = [...pages].sort((a, b) => a - b)
  const result = []

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push('ellipsis')
    }
    result.push(sorted[i])
  }

  return result
}

function VendorPagination({ page, totalPages, total, limit, onPageChange }) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1
  const end = Math.min(page * limit, total)
  const pages = getPageNumbers(page, totalPages)

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-sm text-slate-500">
        Showing <span className="font-medium text-slate-700">{start}</span> to{' '}
        <span className="font-medium text-slate-700">{end}</span> of{' '}
        <span className="font-medium text-slate-700">{total}</span> vendors
      </p>

      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-colors disabled:text-slate-400 disabled:opacity-50 enabled:text-slate-700 enabled:hover:bg-slate-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {pages.map((p, i) =>
            p === 'ellipsis' ? (
              <span key={`ellipsis-${i}`} className="px-2 text-sm text-slate-400">…</span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`min-w-[2.25rem] rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition-colors ${
                  p === page
                    ? 'bg-brand-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            ),
          )}
        </div>

        <span className="px-2 text-sm text-slate-500 sm:hidden">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-colors disabled:text-slate-400 disabled:opacity-50 enabled:text-slate-700 enabled:hover:bg-slate-50"
        >
          Next
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default VendorPagination
