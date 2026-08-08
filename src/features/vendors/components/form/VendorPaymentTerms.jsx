import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'
import FormField from './FormField'

const PAYMENT_TERMS = [
  { value: 'Net 15', label: 'Net 15' },
  { value: 'Net 30', label: 'Net 30' },
  { value: 'Net 45', label: 'Net 45' },
  { value: 'Net 60', label: 'Net 60' },
  { value: 'Due on Receipt', label: 'Due on Receipt' },
]

const PAYMENT_METHODS = [
  { value: 'Bank Transfer', label: 'Bank Transfer' },
  { value: 'UPI', label: 'UPI' },
  { value: 'Cheque', label: 'Cheque' },
  { value: 'Wire Transfer', label: 'Wire Transfer' },
]

function VendorPaymentTerms() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Payment Terms</h2>
        <p className="mt-0.5 text-sm text-slate-500">Payment terms and methods for this vendor</p>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            name="paymentTerms"
            label="Payment Terms"
            required
            as="select"
            placeholder="Select payment terms"
            options={PAYMENT_TERMS}
          />
          <FormField
            name="paymentMethod"
            label="Payment Method"
            required
            as="select"
            placeholder="Select payment method"
            options={PAYMENT_METHODS}
          />
          <FormField
            name="creditLimit"
            label="Credit Limit"
            placeholder="Optional credit limit"
            className="sm:col-span-2"
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default VendorPaymentTerms
