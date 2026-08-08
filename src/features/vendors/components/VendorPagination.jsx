function VendorPagination() {
  const pages = [1, 2, 3, 4, 5]
  const currentPage = 1

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-sm text-slate-500">
        Showing <span className="font-medium text-slate-700">1</span> to{' '}
        <span className="font-medium text-slate-700">8</span> of{' '}
        <span className="font-medium text-slate-700">48</span> vendors
      </p>

      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-400 shadow-sm"
          disabled
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={`min-w-[2.25rem] rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition-colors ${
                page === currentPage
                  ? 'bg-brand-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <span className="px-2 text-sm text-slate-500 sm:hidden">
          Page {currentPage} of {pages.length}
        </span>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          Next
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default VendorPagination
