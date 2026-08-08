import { Card, CardHeader, CardBody } from '../../../../../components/ui/Card'

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-sm font-medium text-slate-900 sm:text-right">{value || '—'}</dd>
    </div>
  )
}

function formatCurrency(value) {
  if (value == null) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

function VendorInformation({ vendor }) {
  if (!vendor) return null

  const name = vendor.vendorName || vendor.name
  const code = vendor.vendorCode || vendor.code
  const primaryContact = vendor.contactPerson || vendor.primaryContact
  const alternateContact = vendor.alternatePhone || vendor.alternateContact

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <h3 className="text-base font-semibold text-slate-900">Basic Information</h3>
        </CardHeader>
        <CardBody>
          <dl className="space-y-4">
            <InfoRow label="Vendor Name" value={name} />
            <InfoRow label="Vendor Code" value={code} />
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
              <InfoRow label="Primary Contact" value={primaryContact} />
              <InfoRow label="Email" value={vendor.email} />
              <InfoRow label="Phone" value={vendor.phone} />
              <InfoRow label="Alternate Contact" value={alternateContact} />
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-semibold text-slate-900">Business Summary</h3>
          </CardHeader>
          <CardBody>
            <dl className="space-y-4">
              <InfoRow label="Total Purchase Value" value={formatCurrency(vendor.totalPurchaseValue)} />
              <InfoRow label="Active Purchase Orders" value={vendor.activePurchaseOrders} />
              <InfoRow label="Vendor Rating" value={vendor.rating?.toFixed?.(1) ?? vendor.rating} />
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
