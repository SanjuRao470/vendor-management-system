export const VENDOR_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'purchases', label: 'Purchases' },
  { id: 'documents', label: 'Documents' },
  { id: 'payments', label: 'Payments' },
  { id: 'projects', label: 'Projects' },
  { id: 'performance', label: 'Performance' },
  { id: 'issues', label: 'Issues' },
  { id: 'audit', label: 'Audit Trail' },
]

function VendorTabs({ activeTab, onTabChange }) {
  return (
    <div className="mb-6 border-b border-slate-200">
      <nav className="-mb-px flex gap-1 overflow-x-auto pb-px" aria-label="Vendor details tabs">
        {VENDOR_TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default VendorTabs
