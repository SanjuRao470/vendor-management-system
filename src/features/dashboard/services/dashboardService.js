import apiClient from '../../../services/apiClient'

export const dashboardService = {
  getSummary: () => apiClient.get('/dashboard/summary').then((r) => r.data),
  getPerformanceTrend: () => apiClient.get('/dashboard/vendor-performance').then((r) => r.data),
  getCategoryDistribution: () => apiClient.get('/dashboard/category-distribution').then((r) => r.data),
  getMonthlyPurchaseValue: () => apiClient.get('/dashboard/monthly-purchase-value').then((r) => r.data),
  getRatingDistribution: () => apiClient.get('/dashboard/rating-distribution').then((r) => r.data),
}
