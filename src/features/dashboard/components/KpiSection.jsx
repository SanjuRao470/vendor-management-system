import { KPI_CONFIG } from '../dashboardConstants'
import { useDashboardSummary } from '../hooks/useDashboard'
import KpiCard from './KpiCard'

const KPI_VALUE_MAP = {
  totalVendors: 'totalVendors',
  activeVendors: 'activeVendors',
  blacklistedVendors: 'blacklistedVendors',
  pendingApprovals: 'pendingApprovals',
  averageRating: 'averageVendorRating',
  activePurchaseOrders: 'activePurchaseOrders',
}

function KpiSection() {
  const { data, isLoading, isError } = useDashboardSummary()

  return (
    <section aria-label="Key performance indicators">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6">
        {KPI_CONFIG.map((kpi) => (
          <KpiCard
            key={kpi.id}
            label={kpi.label}
            icon={kpi.icon}
            accent={kpi.accent}
            value={data?.[KPI_VALUE_MAP[kpi.id]]}
            isLoading={isLoading}
            isError={isError}
            format={kpi.id === 'averageRating' ? 'rating' : 'number'}
          />
        ))}
      </div>
    </section>
  )
}

export default KpiSection
