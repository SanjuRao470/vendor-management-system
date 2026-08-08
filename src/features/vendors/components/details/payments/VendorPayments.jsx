import Badge from '../../../../../components/ui/Badge'
import { Card } from '../../../../../components/ui/Card'
import { useVendorPayments } from '../../../hooks/useVendors'

const statusVariant = {
  Completed: 'success',
  Pending: 'warning',
  Failed: 'danger',
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

function VendorPayments({ vendorId }) {
  const { data, isLoading, isError } = useVendorPayments(vendorId)
  const payments = data?.data ?? data ?? []

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
        <p className="text-sm text-slate-500">Unable to load payments.</p>
      </Card>
    )
  }

  if (!payments.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-slate-500">No payment records found.</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full">
          <thead className="sticky top-0 bg-slate-50">
            <tr className="border-b border-slate-200">
              {['Payment ID', 'Invoice', 'Date', 'Amount', 'Method', 'Status'].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 first:pl-6">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                <td className="whitespace-nowrap px-4 py-3 pl-6 text-sm font-medium text-slate-900">{payment.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{payment.invoice}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{payment.date}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">{formatCurrency(payment.amount)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{payment.method}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge variant={statusVariant[payment.status] || 'neutral'}>{payment.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default VendorPayments
