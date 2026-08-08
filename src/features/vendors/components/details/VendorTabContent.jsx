import {
  useVendor,
  useVendorContacts,
} from '../../hooks/useVendors'
import VendorOverview from './overview/VendorOverview'
import VendorContacts from './contacts/VendorContacts'
import PurchaseHistory from './purchases/PurchaseHistory'
import VendorDocuments from './documents/VendorDocuments'
import VendorPayments from './payments/VendorPayments'
import AssociatedProjects from './projects/AssociatedProjects'
import VendorPerformanceTab from './performance/VendorPerformanceTab'
import VendorIssues from './issues/VendorIssues'
import AuditTimeline from './audit/AuditTimeline'

function VendorTabContent({ activeTab, vendorId }) {
  const { data: vendor } = useVendor(vendorId)
  const { data: contactsData } = useVendorContacts(vendorId)
  const contacts = contactsData?.data ?? contactsData ?? []

  switch (activeTab) {
    case 'overview':
      return <VendorOverview vendor={vendor} />
    case 'contacts':
      return <VendorContacts data={contacts} />
    case 'purchases':
      return <PurchaseHistory vendorId={vendorId} />
    case 'documents':
      return <VendorDocuments vendorId={vendorId} />
    case 'payments':
      return <VendorPayments vendorId={vendorId} />
    case 'projects':
      return <AssociatedProjects vendorId={vendorId} />
    case 'performance':
      return <VendorPerformanceTab vendorId={vendorId} />
    case 'issues':
      return <VendorIssues vendorId={vendorId} />
    case 'audit':
      return <AuditTimeline vendorId={vendorId} />
    default:
      return <VendorOverview vendor={vendor} />
  }
}

export default VendorTabContent
