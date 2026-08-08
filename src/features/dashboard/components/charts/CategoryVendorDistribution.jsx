import { CHART_CONFIG } from '../../dashboardConstants'
import { useCategoryDistribution } from '../../hooks/useDashboard'

const COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500', 'bg-cyan-500', 'bg-orange-500', 'bg-indigo-500', 'bg-teal-500', 'bg-pink-500']

function CategoryVendorDistribution() {
  const { title, description } = CHART_CONFIG.categoryDistribution
  const { data = [], isLoading } = useCategoryDistribution()

  const total = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>

      <div className="flex flex-1 flex-col px-4 py-6 sm:px-6">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-32 w-32 animate-pulse rounded-full bg-slate-200" />
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              {data.slice(0, 6).map((item, index) => {
                const pct = total ? Math.round((item.count / total) * 100) : 0
                return (
                  <div
                    key={item.category}
                    className={`h-3 rounded-full ${COLORS[index % COLORS.length]}`}
                    style={{ width: `${Math.max(pct, 8)}%`, minWidth: '2rem' }}
                    title={`${item.category}: ${item.count}`}
                  />
                )
              })}
            </div>

            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {data.map((item, index) => (
                <li key={item.category} className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex min-w-0 items-center gap-2 text-slate-600">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${COLORS[index % COLORS.length]}`} />
                    <span className="truncate">{item.category}</span>
                  </span>
                  <span className="shrink-0 font-medium text-slate-900">{item.count}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-center text-sm text-slate-500">
              Total vendors: <span className="font-semibold text-slate-900">{total}</span>
            </p>
          </>
        )}
      </div>
    </article>
  )
}

export default CategoryVendorDistribution
