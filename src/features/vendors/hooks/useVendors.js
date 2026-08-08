import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { vendorService } from '../services/vendorService'

export function useVendors(filters = {}) {
  return useQuery({
    queryKey: ['vendors', 'list', filters],
    queryFn: () => vendorService.getVendors(filters),
    placeholderData: (prev) => prev,
  })
}

export function useVendor(vendorId) {
  return useQuery({
    queryKey: ['vendors', vendorId],
    queryFn: () => vendorService.getVendor(vendorId),
    enabled: Boolean(vendorId),
  })
}

export function useCreateVendor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: vendorService.createVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useVendorContacts(vendorId) {
  return useQuery({
    queryKey: ['vendors', vendorId, 'contacts'],
    queryFn: () => vendorService.getContacts(vendorId),
    enabled: Boolean(vendorId),
  })
}

export function useVendorPerformance(vendorId) {
  return useQuery({
    queryKey: ['vendors', vendorId, 'performance'],
    queryFn: () => vendorService.getPerformance(vendorId),
    enabled: Boolean(vendorId),
  })
}

export function useVendorPurchases(vendorId) {
  return useQuery({
    queryKey: ['vendors', vendorId, 'purchases'],
    queryFn: () => vendorService.getPurchases(vendorId),
    enabled: Boolean(vendorId),
  })
}

export function useVendorDocuments(vendorId) {
  return useQuery({
    queryKey: ['vendors', vendorId, 'documents'],
    queryFn: () => vendorService.getDocuments(vendorId),
    enabled: Boolean(vendorId),
  })
}

export function useVendorPayments(vendorId) {
  return useQuery({
    queryKey: ['vendors', vendorId, 'payments'],
    queryFn: () => vendorService.getPayments(vendorId),
    enabled: Boolean(vendorId),
  })
}

export function useVendorProjects(vendorId) {
  return useQuery({
    queryKey: ['vendors', vendorId, 'projects'],
    queryFn: () => vendorService.getProjects(vendorId),
    enabled: Boolean(vendorId),
  })
}

export function useVendorIssues(vendorId) {
  return useQuery({
    queryKey: ['vendors', vendorId, 'issues'],
    queryFn: () => vendorService.getIssues(vendorId),
    enabled: Boolean(vendorId),
  })
}

export function useVendorAudit(vendorId) {
  return useQuery({
    queryKey: ['vendors', vendorId, 'audit'],
    queryFn: () => vendorService.getAuditTimeline(vendorId),
    enabled: Boolean(vendorId),
  })
}

export function useVendorApproval(vendorId) {
  return useQuery({
    queryKey: ['vendors', vendorId, 'approval'],
    queryFn: () => vendorService.getApproval(vendorId),
    enabled: Boolean(vendorId),
  })
}

export function useApproveVendor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => vendorService.approve(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['vendors', id] })
      queryClient.invalidateQueries({ queryKey: ['vendors', id, 'approval'] })
      queryClient.invalidateQueries({ queryKey: ['vendors', 'list'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useRejectVendor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }) => vendorService.reject(id, reason),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['vendors', id] })
      queryClient.invalidateQueries({ queryKey: ['vendors', id, 'approval'] })
      queryClient.invalidateQueries({ queryKey: ['vendors', 'list'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useRequestChanges() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }) => vendorService.requestChanges(id, reason),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['vendors', id] })
      queryClient.invalidateQueries({ queryKey: ['vendors', id, 'approval'] })
    },
  })
}

export function useAddComment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, message }) => vendorService.addComment(id, message),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['vendors', id, 'approval'] })
    },
  })
}
