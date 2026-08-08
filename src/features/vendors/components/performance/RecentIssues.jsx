import Badge from '../../../../components/ui/Badge'
import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'

const severityVariant = {
  High: 'danger',
  Medium: 'warning',
  Low: 'info',
}

const statusVariant = {
  Open: 'danger',
  Resolved: 'success',
  'In Progress': 'warning',
}

function RecentIssues({ issues = [] }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Recent Issues</h2>
        <p className="mt-0.5 text-sm text-slate-500">Open and recently resolved vendor issues</p>
      </CardHeader>
      <CardBody>
        {issues.length === 0 ? (
          <p className="text-sm text-slate-500">No issues reported.</p>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="flex flex-col gap-2 rounded-lg border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-slate-900">{issue.title}</p>
                    <Badge variant={severityVariant[issue.severity] || 'neutral'}>
                      {issue.severity}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {issue.category} · Assigned to {issue.assignedTo}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{issue.createdDate}</p>
                </div>
                <Badge variant={statusVariant[issue.status] || 'neutral'}>
                  {issue.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default RecentIssues
