import Badge from '../../../../components/ui/Badge'

const STATUS_VARIANTS = {
  Active: 'success',
  Approved: 'success',
  Pending: 'warning',
  Blacklisted: 'danger',
  Rejected: 'danger',
  'On Hold': 'info',
}

function VendorStatusBadge({ status }) {
  const displayStatus = status === 'Approved' ? 'Active' : status
  const variant = STATUS_VARIANTS[status] || 'neutral'

  return <Badge variant={variant}>{displayStatus}</Badge>
}

export default VendorStatusBadge
