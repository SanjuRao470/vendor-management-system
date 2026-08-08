import Badge from '../../../../components/ui/Badge'

const statusVariant = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'danger',
  'On Hold': 'warning',
}

function ApprovalHeader({ approval, vendorName }) {
  if (!approval) return null

  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-600">{approval.vendorId}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {vendorName || 'Vendor Approval'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Submitted by {approval.submittedBy} on{' '}
            {new Date(approval.submittedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
        <Badge variant={statusVariant[approval.status] || 'neutral'} className="text-sm">
          {approval.status}
        </Badge>
      </div>
    </header>
  )
}

export default ApprovalHeader
