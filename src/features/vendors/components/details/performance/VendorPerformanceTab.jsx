import { useVendorPerformance } from '../../../hooks/useVendors'
import { Card, CardHeader, CardBody } from '../../../../../components/ui/Card'
import VendorRating from '../../directory/VendorRating'

function ScoreCard({ label, value, suffix = '%' }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">
        {value != null ? `${value}${suffix}` : '—'}
      </p>
    </div>
  )
}

function VendorPerformanceTab({ vendorId }) {
  const { data, isLoading, isError } = useVendorPerformance(vendorId)

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-slate-500">Unable to load performance data.</p>
      </Card>
    )
  }

  const { scores, trend, recentIssues } = data

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <ScoreCard label="Quality Score" value={scores.quality} />
        <ScoreCard label="Delivery Score" value={scores.delivery} />
        <ScoreCard label="Response Time" value={scores.responseTime} suffix=" hrs" />
        <ScoreCard label="Payment History" value={scores.paymentHistory} />
        <ScoreCard label="Risk Score" value={scores.risk} />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Overall Rating</p>
          <div className="mt-2">
            <VendorRating rating={scores.rating} size="md" />
          </div>
          <p className="mt-1 text-xs text-slate-500">Risk Level: {scores.riskLevel}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-base font-semibold text-slate-900">Performance Trend</h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-[500px] w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  {['Month', 'Quality', 'Delivery', 'Rating'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 first:pl-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(trend || []).map((row) => (
                  <tr key={row.month} className="border-b border-slate-100">
                    <td className="py-2.5 pl-0 text-sm font-medium text-slate-900">{row.month}</td>
                    <td className="px-4 py-2.5 text-sm text-slate-600">{row.quality}%</td>
                    <td className="px-4 py-2.5 text-sm text-slate-600">{row.delivery}%</td>
                    <td className="px-4 py-2.5 text-sm text-slate-600">{row.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {recentIssues?.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-slate-900">Recent Issues</h3>
          </CardHeader>
          <CardBody>
            <ul className="divide-y divide-slate-100">
              {recentIssues.map((issue) => (
                <li key={issue.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{issue.title}</p>
                    <p className="text-xs text-slate-500">{issue.category} · {issue.severity}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-600">{issue.status}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export default VendorPerformanceTab
