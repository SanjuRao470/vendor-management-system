import { CHART_CONFIG } from '../../dashboardConstants'
import { usePerformanceTrend } from '../../hooks/useDashboard'

const COLORS = ['bg-brand-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-blue-400', 'bg-rose-400', 'bg-cyan-400', 'bg-orange-400']

function VendorPerformanceTrend() {
  const { title, description } = CHART_CONFIG.performanceTrend
  const { data = [], isLoading } = usePerformanceTrend()

  const maxScore = Math.max(...data.map((d) => d.overallScore || d.qualityScore || 0), 100)

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>

      <div className="flex flex-1 flex-col px-4 py-6 sm:px-6">
        {isLoading ? (
          <div className="flex h-48 items-end gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex-1 animate-pulse rounded-t bg-slate-200" style={{ height: `${40 + i * 5}%` }} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex h-48 w-full items-end gap-1.5 sm:gap-2">
              {data.map((point, index) => (
                <div key={point.month} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t ${COLORS[index % COLORS.length]} opacity-80 transition-all`}
                    style={{ height: `${((point.overallScore || point.qualityScore) / maxScore) * 100}%`, minHeight: '4px' }}
                    title={`${point.month}: ${point.overallScore || point.qualityScore}`}
                  />
                  <span className="text-[10px] text-slate-400 sm:text-xs">{point.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-500" /> Overall Score</span>
            </div>
          </>
        )}
      </div>
    </article>
  )
}

export default VendorPerformanceTrend
