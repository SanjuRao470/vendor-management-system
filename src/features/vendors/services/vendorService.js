import apiClient from '../../../services/apiClient'

export const vendorService = {
  getVendors: (params) => apiClient.get('/vendors', { params }).then((r) => r.data),
  getVendor: (id) => apiClient.get(`/vendors/${id}`).then((r) => r.data),
  createVendor: (data) => apiClient.post('/vendors', data).then((r) => r.data),
  updateVendor: (id, data) => apiClient.patch(`/vendors/${id}`, data).then((r) => r.data),
  getContacts: (id) => apiClient.get(`/vendors/${id}/contacts`).then((r) => r.data),
  getPerformance: (id) => apiClient.get(`/vendors/${id}/performance`).then((r) => r.data),
  getPurchases: (id) => apiClient.get(`/vendors/${id}/purchases`).then((r) => r.data),
  getDocuments: (id) => apiClient.get(`/vendors/${id}/documents`).then((r) => r.data),
  getPayments: (id) => apiClient.get(`/vendors/${id}/payments`).then((r) => r.data),
  getProjects: (id) => apiClient.get(`/vendors/${id}/projects`).then((r) => r.data),
  getIssues: (id) => apiClient.get(`/vendors/${id}/issues`).then((r) => r.data),
  getAuditTimeline: (id) => apiClient.get(`/vendors/${id}/audit-timeline`).then((r) => r.data),
  getApproval: (id) => apiClient.get(`/vendors/${id}/approval`).then((r) => r.data),
  approve: (id) => apiClient.post(`/vendors/${id}/approve`).then((r) => r.data),
  reject: (id, reason) => apiClient.post(`/vendors/${id}/reject`, { reason }).then((r) => r.data),
  requestChanges: (id, reason) => apiClient.post(`/vendors/${id}/request-changes`, { reason }).then((r) => r.data),
  getComments: (id) => apiClient.get(`/vendors/${id}/comments`).then((r) => r.data),
  addComment: (id, message) => apiClient.post(`/vendors/${id}/comments`, { message }).then((r) => r.data),
}
