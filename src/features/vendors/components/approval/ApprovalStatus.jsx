import Badge from '../../../../components/ui/Badge'
import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'

const statusVariant = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'danger',
  'On Hold': 'warning',
}

function ApprovalStatus({ status, reviewer, submittedAt }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Approval Status</h2>
      </CardHeader>
      <CardBody>
        <dl className="space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-slate-500">Current Status</dt>
            <dd>
              <Badge variant={statusVariant[status] || 'neutral'}>{status}</Badge>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-slate-500">Assigned Reviewer</dt>
            <dd className="text-sm font-medium text-slate-900">{reviewer || 'N/A'}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-slate-500">Submitted On</dt>
            <dd className="text-sm font-medium text-slate-900">
              {submittedAt
                ? new Date(submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '—'}
            </dd>
          </div>
        </dl>
      </CardBody>
    </Card>
  )
}

export default ApprovalStatus
