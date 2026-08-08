import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: dashboardService.getSummary,
  })
}

export function usePerformanceTrend() {
  return useQuery({
    queryKey: ['dashboard', 'performance-trend'],
    queryFn: dashboardService.getPerformanceTrend,
  })
}

export function useCategoryDistribution() {
  return useQuery({
    queryKey: ['dashboard', 'category-distribution'],
    queryFn: dashboardService.getCategoryDistribution,
  })
}
