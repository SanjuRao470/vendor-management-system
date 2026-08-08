import { TABLE_COLUMNS } from '../../vendorConstants'

function SortIcon({ active, direction }) {
  if (!active) {
    return (
      <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    )
  }

  return (
    <svg className="h-3.5 w-3.5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      {direction === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      )}
    </svg>
  )
}

function VendorTableHeader({ sortBy, sortOrder = 'asc', onSort }) {
  const handleSort = (key, sortable) => {
    if (!sortable || !onSort) return
    onSort(key)
  }

  return (
    <thead className="sticky top-0 z-10 bg-slate-50">
      <tr className="border-b border-slate-200">
        {TABLE_COLUMNS.map((col) => (
          <th
            key={col.key}
            scope="col"
            className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6 ${col.className || ''}`}
          >
            {col.sortable ? (
              <button
                type="button"
                onClick={() => handleSort(col.key, col.sortable)}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-700"
              >
                {col.label}
                <SortIcon active={sortBy === col.key} direction={sortOrder} />
              </button>
            ) : (
              col.label
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default VendorTableHeader
