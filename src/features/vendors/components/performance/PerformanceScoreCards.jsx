import { Card, CardBody } from '../../../../components/ui/Card'

const accentStyles = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', ring: 'ring-blue-100' },
  green: { bg: 'bg-emerald-50', icon: 'text-emerald-600', ring: 'ring-emerald-100' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', ring: 'ring-amber-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', ring: 'ring-purple-100' },
  red: { bg: 'bg-red-50', icon: 'text-red-600', ring: 'ring-red-100' },
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', ring: 'ring-indigo-100' },
}

function MetricCard({ label, value, unit, accent = 'blue', icon }) {
  const styles = accentStyles[accent] || accentStyles.blue

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              {value}
              {unit && <span className="ml-1 text-lg font-normal text-slate-400">{unit}</span>}
            </p>
          </div>
          {icon && (
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${styles.bg} ${styles.icon} ${styles.ring}`}>
              {icon}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

function PerformanceScoreCards({ scores }) {
  if (!scores) return null

  const riskVariant = {
    Low: 'green',
    Medium: 'amber',
    High: 'red',
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <MetricCard
        label="Quality Score"
        value={scores.quality}
        unit="%"
        accent="blue"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <MetricCard
        label="Delivery Score"
        value={scores.delivery}
        unit="%"
        accent="green"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        }
      />
      <MetricCard
        label="Response Time"
        value={scores.responseTime}
        unit="days"
        accent="amber"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <MetricCard
        label="Payment History"
        value={scores.paymentHistory}
        unit="%"
        accent="purple"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <MetricCard
        label="Risk Score"
        value={scores.risk}
        accent={riskVariant[scores.riskLevel] || 'amber'}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        }
      />
      <MetricCard
        label="Overall Rating"
        value={scores.rating}
        unit="/ 5"
        accent="indigo"
        icon={
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        }
      />
    </div>
  )
}

export default PerformanceScoreCards
export { MetricCard }
