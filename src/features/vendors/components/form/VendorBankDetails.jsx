import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'
import FormField from './FormField'

function VendorBankDetails() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Bank Details</h2>
        <p className="mt-0.5 text-sm text-slate-500">Banking information for payments</p>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            name="bankDetails.accountHolderName"
            label="Account Holder Name"
            required
            placeholder="Account holder name"
            className="sm:col-span-2"
          />
          <FormField
            name="bankDetails.bankName"
            label="Bank Name"
            required
            placeholder="e.g. HDFC Bank"
          />
          <FormField
            name="bankDetails.branchName"
            label="Branch Name"
            required
            placeholder="Branch name"
          />
          <FormField
            name="bankDetails.accountNumber"
            label="Account Number"
            required
            placeholder="Account number"
          />
          <FormField
            name="bankDetails.ifscCode"
            label="IFSC Code"
            required
            placeholder="e.g. HDFC0001234"
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default VendorBankDetails
