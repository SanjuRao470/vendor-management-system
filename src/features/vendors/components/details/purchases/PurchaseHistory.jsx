import Badge from '../../../../../components/ui/Badge'
import { Card } from '../../../../../components/ui/Card'
import { useVendorPurchases } from '../../../hooks/useVendors'

const statusVariant = {
  Completed: 'success',
  'In Progress': 'info',
  Pending: 'warning',
  Cancelled: 'danger',
}

const deliveryVariant = {
  Delivered: 'success',
  'In Transit': 'info',
  Pending: 'warning',
  Delayed: 'danger',
}

const paymentVariant = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'danger',
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

function PurchaseHistory({ vendorId }) {
  const { data, isLoading, isError } = useVendorPurchases(vendorId)
  const purchases = data?.data ?? data ?? []

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
        <p className="text-sm text-slate-500">Unable to load purchase history.</p>
      </Card>
    )
  }

  if (!purchases.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-slate-500">No purchase orders found.</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead className="sticky top-0 bg-slate-50">
            <tr className="border-b border-slate-200">
              {['PO Number', 'Date', 'Amount', 'Status', 'Delivery', 'Payment'].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 first:pl-6">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {purchases.map((po) => (
              <tr key={po.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                <td className="whitespace-nowrap px-4 py-3 pl-6 text-sm font-medium text-slate-900">{po.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{po.date}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">{formatCurrency(po.amount)}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge variant={statusVariant[po.status] || 'neutral'}>{po.status}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge variant={deliveryVariant[po.deliveryStatus] || 'neutral'}>{po.deliveryStatus}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge variant={paymentVariant[po.paymentStatus] || 'neutral'}>{po.paymentStatus}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default PurchaseHistory
