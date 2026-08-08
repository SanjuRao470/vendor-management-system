import DashboardHeader from '../components/DashboardHeader'
import KpiSection from '../components/KpiSection'
import VendorPerformanceTrend from '../components/charts/VendorPerformanceTrend'
import CategoryVendorDistribution from '../components/charts/CategoryVendorDistribution'

function VendorDashboard() {
  return (
    <div className="mx-auto max-w-[1600px]">
      <DashboardHeader />

      <div className="space-y-8">
        <KpiSection />

        <section aria-label="Dashboard charts">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Analytics</h2>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <VendorPerformanceTrend />
            <CategoryVendorDistribution />
          </div>
        </section>
      </div>
    </div>
  )
}

export default VendorDashboard
