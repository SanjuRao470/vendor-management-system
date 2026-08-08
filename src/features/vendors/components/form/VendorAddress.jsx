import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'
import FormField from './FormField'

function VendorAddress() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Address</h2>
        <p className="mt-0.5 text-sm text-slate-500">Vendor&apos;s registered business address</p>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            name="addressLine1"
            label="Address Line 1"
            required
            placeholder="Street address"
            className="sm:col-span-2"
          />
          <FormField
            name="addressLine2"
            label="Address Line 2"
            placeholder="Apartment, suite, etc. (optional)"
            className="sm:col-span-2"
          />
          <FormField name="city" label="City" required placeholder="City" />
          <FormField name="state" label="State" required placeholder="State" />
          <FormField name="country" label="Country" required placeholder="Country" />
          <FormField name="postalCode" label="Postal Code" required placeholder="Postal code" />
        </div>
      </CardBody>
    </Card>
  )
}

export default VendorAddress
