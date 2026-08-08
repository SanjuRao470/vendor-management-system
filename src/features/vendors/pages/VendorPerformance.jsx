import { useVendorPerformance, useVendorPayments } from '../hooks/useVendors'
import PerformanceHeader from '../components/performance/PerformanceHeader'
import PerformanceScoreCards from '../components/performance/PerformanceScoreCards'
import PerformanceTrend from '../components/performance/PerformanceTrend'
import PaymentHistorySection from '../components/performance/PaymentHistorySection'
import RecentIssues from '../components/performance/RecentIssues'

const VENDOR_ID = 'VND-1001'

function VendorPerformance() {
  const { data: performance, isLoading, isError } = useVendorPerformance(VENDOR_ID)
  const { data: payments = [] } = useVendorPayments(VENDOR_ID)

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  if (isError || !performance) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
        Failed to load vendor performance data.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1600px]">
      <PerformanceHeader vendor={performance.vendor} />
      <div className="space-y-8">
        <PerformanceScoreCards scores={performance.scores} />
        <PerformanceTrend trend={performance.trend} />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <PaymentHistorySection payments={payments} />
          <RecentIssues issues={performance.recentIssues} />
        </div>
      </div>
    </div>
  )
}

export default VendorPerformance
