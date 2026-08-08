import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'
import FormField from './FormField'

const CATEGORIES = [
  { value: 'IT Services', label: 'IT Services' },
  { value: 'IT & Software', label: 'IT & Software' },
  { value: 'Logistics', label: 'Logistics' },
  { value: 'Services', label: 'Services' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Construction', label: 'Construction' },
  { value: 'Healthcare', label: 'Healthcare' },
]

function VendorBasicInformation() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Basic Information</h2>
        <p className="mt-0.5 text-sm text-slate-500">Enter the vendor&apos;s core business details</p>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            name="vendorName"
            label="Vendor Name"
            required
            placeholder="Enter vendor name"
            className="sm:col-span-2"
          />
          <FormField
            name="category"
            label="Category"
            required
            as="select"
            placeholder="Select category"
            options={CATEGORIES}
          />
          <FormField
            name="gst"
            label="GST Number"
            required
            placeholder="e.g. 07AABCU9603R1ZM"
          />
          <FormField
            name="pan"
            label="PAN Number"
            required
            placeholder="e.g. AABCU9603R"
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default VendorBasicInformation
