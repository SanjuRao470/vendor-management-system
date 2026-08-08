import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'

const METRICS = [
  { key: 'quality', label: 'Quality', color: 'bg-blue-500' },
  { key: 'delivery', label: 'Delivery', color: 'bg-emerald-500' },
  { key: 'rating', label: 'Rating', color: 'bg-amber-500', scale: 20 },
]

function PerformanceTrend({ trend = [] }) {
  if (!trend.length) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-slate-900">Performance Trend</h2>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-slate-500">No trend data available.</p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Performance Trend</h2>
        <p className="mt-0.5 text-sm text-slate-500">Monthly quality, delivery, and rating scores</p>
      </CardHeader>
      <CardBody>
        <div className="mb-4 flex flex-wrap gap-4">
          {METRICS.map((metric) => (
            <div key={metric.key} className="flex items-center gap-2 text-sm text-slate-600">
              <span className={`h-3 w-3 rounded-sm ${metric.color}`} />
              {metric.label}
            </div>
          ))}
        </div>

        <div className="flex items-end gap-3 overflow-x-auto pb-2" style={{ minHeight: '200px' }}>
          {trend.map((point) => (
            <div key={point.month} className="flex min-w-[60px] flex-1 flex-col items-center gap-2">
              <div className="flex h-40 w-full items-end justify-center gap-1">
                {METRICS.map((metric) => {
                  const raw = point[metric.key]
                  const height = metric.scale ? (raw / metric.scale) * 100 : raw
                  return (
                    <div
                      key={metric.key}
                      className={`w-full max-w-3 rounded-t ${metric.color} opacity-80 transition-all hover:opacity-100`}
                      style={{ height: `${Math.min(height, 100)}%` }}
                      title={`${metric.label}: ${raw}`}
                    />
                  )
                })}
              </div>
              <span className="text-xs font-medium text-slate-500">{point.month}</span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default PerformanceTrend
