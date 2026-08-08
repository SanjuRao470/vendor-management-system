import Badge from '../../../../../components/ui/Badge'
import { Card } from '../../../../../components/ui/Card'
import { useVendorIssues } from '../../../hooks/useVendors'

const severityVariant = { Critical: 'danger', High: 'danger', Medium: 'warning', Low: 'info' }
const statusVariant = { Open: 'warning', 'In Progress': 'info', Resolved: 'success', Closed: 'neutral' }

function VendorIssues({ vendorId }) {
  const { data, isLoading, isError } = useVendorIssues(vendorId)
  const issues = data?.data ?? data ?? []

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  if (isError) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-slate-500">Unable to load issues.</p>
      </Card>
    )
  }

  if (!issues.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-slate-500">No issues reported for this vendor.</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full">
          <thead className="sticky top-0 bg-slate-50">
            <tr className="border-b border-slate-200">
              {['Issue ID', 'Issue', 'Severity', 'Category', 'Created Date', 'Assigned To', 'Status'].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 first:pl-6">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                <td className="whitespace-nowrap px-4 py-3 pl-6 text-sm font-medium text-slate-900">{issue.id}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{issue.title || issue.issue}</td>
                <td className="whitespace-nowrap px-4 py-3"><Badge variant={severityVariant[issue.severity]}>{issue.severity}</Badge></td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{issue.category}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{issue.createdDate || issue.date}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{issue.assignedTo || issue.assigned}</td>
                <td className="whitespace-nowrap px-4 py-3"><Badge variant={statusVariant[issue.status]}>{issue.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default VendorIssues
