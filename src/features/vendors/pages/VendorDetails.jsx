import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useVendor } from '../hooks/useVendors'
import VendorProfileHeader from '../components/details/VendorProfileHeader'
import VendorSummary from '../components/details/VendorSummary'
import VendorTabs from '../components/details/VendorTabs'
import VendorTabContent from '../components/details/VendorTabContent'

function VendorDetails() {
  const { vendorId } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const { data: vendor, isLoading, isError } = useVendor(vendorId)

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  if (isError || !vendor) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-slate-500">Vendor not found.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1600px]">
      <VendorProfileHeader vendor={vendor} />
      <VendorSummary vendor={vendor} />
      <VendorTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <VendorTabContent activeTab={activeTab} vendorId={vendorId} />
    </div>
  )
}

export default VendorDetails
