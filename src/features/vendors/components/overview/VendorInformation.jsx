import { Card, CardHeader, CardBody } from '../../../components/ui/Card'
import { DEMO_VENDOR } from '../vendorDetailsDemoData'

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-sm font-medium text-slate-900 sm:text-right">{value}</dd>
    </div>
  )
}

function VendorInformation() {
  const vendor = DEMO_VENDOR

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <h3 className="text-base font-semibold text-slate-900">Vendor Information</h3>
        </CardHeader>
        <CardBody>
          <dl className="space-y-4">
            <InfoRow label="Vendor Name" value={vendor.name} />
            <InfoRow label="Vendor Code" value={vendor.code} />
            <InfoRow label="Category" value={vendor.category} />
            <InfoRow label="GST" value={vendor.gst} />
            <InfoRow label="PAN" value={vendor.pan} />
            <InfoRow label="Address" value={vendor.address} />
            <InfoRow label="City" value={vendor.city} />
            <InfoRow label="State" value={vendor.state} />
            <InfoRow label="Country" value={vendor.country} />
          </dl>
        </CardBody>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-slate-900">Contact Information</h3>
          </CardHeader>
          <CardBody>
            <dl className="space-y-4">
              <InfoRow label="Primary Contact" value={vendor.primaryContact} />
              <InfoRow label="Email" value={vendor.email} />
              <InfoRow label="Phone" value={vendor.phone} />
              <InfoRow label="Alternate Contact" value={vendor.alternateContact} />
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-slate-900">Business Summary</h3>
          </CardHeader>
          <CardBody>
            <dl className="space-y-4">
              <InfoRow label="Total Purchase Value" value={`$${vendor.totalPurchaseValue.toLocaleString()}`} />
              <InfoRow label="Active Purchase Orders" value={vendor.activePurchaseOrders} />
              <InfoRow label="Vendor Rating" value={vendor.rating} />
              <InfoRow label="Vendor Since" value={vendor.vendorSince} />
              <InfoRow label="Payment Terms" value={vendor.paymentTerms} />
            </dl>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default VendorInformation
