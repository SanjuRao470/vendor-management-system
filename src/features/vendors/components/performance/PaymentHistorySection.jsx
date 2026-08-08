import Badge from '../../../../components/ui/Badge'
import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'
import { formatCurrency } from '../../../../utils/formatCurrency'

const statusVariant = {
  Completed: 'success',
  Pending: 'warning',
  Failed: 'danger',
}

function PaymentHistorySection({ payments = [] }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Payment History</h2>
        <p className="mt-0.5 text-sm text-slate-500">Recent payment transactions</p>
      </CardHeader>
      <CardBody className="p-0">
        {payments.length === 0 ? (
          <p className="px-6 py-4 text-sm text-slate-500">No payment records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-6 py-3 text-left font-medium text-slate-500">Invoice</th>
                  <th className="px-6 py-3 text-left font-medium text-slate-500">Date</th>
                  <th className="px-6 py-3 text-left font-medium text-slate-500">Amount</th>
                  <th className="px-6 py-3 text-left font-medium text-slate-500">Method</th>
                  <th className="px-6 py-3 text-left font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium text-slate-900">{payment.invoice}</td>
                    <td className="px-6 py-3 text-slate-600">{payment.date}</td>
                    <td className="px-6 py-3 text-slate-900">{formatCurrency(payment.amount)}</td>
                    <td className="px-6 py-3 text-slate-600">{payment.method}</td>
                    <td className="px-6 py-3">
                      <Badge variant={statusVariant[payment.status] || 'neutral'}>
                        {payment.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default PaymentHistorySection
