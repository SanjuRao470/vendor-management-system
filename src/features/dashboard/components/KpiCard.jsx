const accentStyles = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    ring: 'ring-blue-100',
  },
  green: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    ring: 'ring-emerald-100',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    ring: 'ring-red-100',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    ring: 'ring-amber-100',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    ring: 'ring-purple-100',
  },
  indigo: {
    bg: 'bg-indigo-50',
    icon: 'text-indigo-600',
    ring: 'ring-indigo-100',
  },
}

const icons = {
  users: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  'check-circle': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ban: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
  clock: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  star: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  'file-text': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
}

function formatValue(value, format) {
  if (value === undefined || value === null) return '—'
  if (format === 'rating') return Number(value).toFixed(1)
  return value.toLocaleString()
}

function KpiCard({ label, icon, accent, value, isLoading, isError, format = 'number' }) {
  const styles = accentStyles[accent] || accentStyles.blue

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          {isLoading ? (
            <div className="mt-2 h-9 w-20 animate-pulse rounded bg-slate-200" />
          ) : (
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              {isError ? '—' : formatValue(value, format)}
            </p>
          )}
          <p className="mt-1 text-xs text-slate-400">
            {isLoading ? 'Loading...' : isError ? 'Failed to load' : 'Updated from API'}
          </p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${styles.bg} ${styles.icon} ${styles.ring}`}>
          {icons[icon]}
        </div>
      </div>
    </div>
  )
}

export default KpiCard
