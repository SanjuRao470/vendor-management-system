const statCards = [
  { key: 'totalPurchaseValue', label: 'Total Purchase Value', format: 'currency', accent: 'bg-blue-50 text-blue-600 ring-blue-100' },
  { key: 'activePurchaseOrders', label: 'Active POs', format: 'number', accent: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
  { key: 'rating', label: 'Avg Rating', format: 'rating', accent: 'bg-amber-50 text-amber-600 ring-amber-100' },
  { key: 'qualityScore', label: 'Quality Score', format: 'score', accent: 'bg-purple-50 text-purple-600 ring-purple-100' },
  { key: 'deliveryScore', label: 'Delivery Score', format: 'score', accent: 'bg-indigo-50 text-indigo-600 ring-indigo-100' },
  { key: 'riskScore', label: 'Risk Score', format: 'score', accent: 'bg-red-50 text-red-600 ring-red-100' },
]

function formatValue(value, format) {
  if (value == null) return '—'
  if (format === 'currency') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  }
  if (format === 'rating') return value.toFixed(1)
  if (format === 'score') return `${value}%`
  return value
}

function VendorSummary({ vendor }) {
  if (!vendor) return null

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {statCards.map((card) => (
        <div key={card.key} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{card.label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            {formatValue(vendor[card.key], card.format)}
          </p>
        </div>
      ))}
    </div>
  )
}

export default VendorSummary
