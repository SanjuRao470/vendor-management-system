import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'
import FormField from './FormField'

function VendorContactDetails() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Contact Details</h2>
        <p className="mt-0.5 text-sm text-slate-500">Primary contact information for the vendor</p>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            name="contactPerson"
            label="Contact Person"
            required
            placeholder="Full name"
            className="sm:col-span-2"
          />
          <FormField
            name="email"
            label="Email"
            type="email"
            required
            placeholder="email@company.com"
          />
          <FormField
            name="phone"
            label="Phone"
            type="tel"
            required
            placeholder="+91 98765 43210"
          />
          <FormField
            name="alternatePhone"
            label="Alternate Phone"
            type="tel"
            placeholder="Optional"
            className="sm:col-span-2"
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default VendorContactDetails
