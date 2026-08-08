import { http, HttpResponse } from 'msw'
import {
  vendorPerformanceTrend,
  monthlyPurchaseValue,
} from '../data/mockData'
import {
  getStore,
  computeDashboardSummary,
  computeCategoryDistribution,
  computeRatingDistribution,
} from '../store'
import { delay, paginate, matchesRatingFilter, getRiskLevel, mapNotificationPriority, normalizeNotificationType } from '../utils'

function json(data, status = 200) {
  return HttpResponse.json(data, { status })
}

function error(message, status = 400) {
  return HttpResponse.json({ message }, { status })
}

function filterVendors(vendors, params) {
  let result = [...vendors]
  const search = params.get('search')?.toLowerCase()
  const status = params.get('status')
  const category = params.get('category')
  const city = params.get('city')
  const rating = params.get('rating')

  if (search) {
    result = result.filter((v) =>
      [v.vendorName, v.vendorCode, v.contactPerson, v.city, v.category]
        .some((field) => field?.toLowerCase().includes(search)),
    )
  }

  if (status && status !== 'All Statuses') {
    const normalized = status === 'Active' ? 'Approved' : status
    result = result.filter((v) => v.status === normalized)
  }

  if (category && category !== 'All Categories') {
    result = result.filter((v) => v.category === category)
  }

  if (city && city !== 'All Cities') {
    result = result.filter((v) => v.city === city)
  }

  if (rating) {
    result = result.filter((v) => matchesRatingFilter(v.rating, rating))
  }

  const sortBy = params.get('sortBy')
  const sortOrder = params.get('sortOrder') || 'asc'

  if (sortBy) {
    result.sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]

      if (sortBy === 'lastTransaction') {
        aVal = new Date(aVal).getTime()
        bVal = new Date(bVal).getTime()
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
}

function buildPerformanceResponse(vendorId) {
  const store = getStore()
  const vendor = store.vendors.find((v) => v.id === vendorId)
  const perf = store.performance.find((p) => p.vendorId === vendorId)

  if (!vendor || !perf) return null

  const vendorIssues = store.issues
    .filter((i) => i.vendorId === vendorId)
    .slice(0, 5)
    .map((issue) => ({
      id: issue.id,
      title: issue.title,
      category: 'General',
      severity: issue.severity,
      status: issue.status,
      assignedTo: 'Procurement Team',
      createdDate: issue.createdAt,
    }))

  const trend = (perf.trend || []).map((point, index) => ({
    month: point.month,
    quality: perf.qualityScore - (perf.trend.length - index) + Math.floor(Math.random() * 3),
    delivery: perf.deliveryScore - (perf.trend.length - index) + Math.floor(Math.random() * 3),
    rating: Math.min(5, (perf.vendorRating - 0.5 + index * 0.05).toFixed(1)),
    score: point.score,
  }))

  return {
    vendor: {
      code: vendor.vendorCode,
      name: vendor.vendorName,
      category: vendor.category,
      status: vendor.status === 'Approved' ? 'Active' : vendor.status,
      rating: vendor.rating,
    },
    scores: {
      quality: perf.qualityScore,
      delivery: perf.deliveryScore,
      responseTime: perf.responseTime > 10 ? (perf.responseTime / 10).toFixed(1) : perf.responseTime,
      paymentHistory: perf.paymentHistory,
      risk: perf.riskScore,
      riskLevel: getRiskLevel(perf.riskScore),
      rating: perf.vendorRating,
    },
    trend,
    recentIssues: vendorIssues.length
      ? vendorIssues
      : (perf.recentIssues || []).map((title, i) => ({
          id: `ISS-GEN-${i}`,
          title,
          category: 'General',
          severity: 'Medium',
          status: 'Open',
          assignedTo: 'Procurement Team',
          createdDate: new Date().toISOString().split('T')[0],
        })),
  }
}

function enrichPurchase(purchase) {
  const deliveryMap = {
    Completed: 'Delivered',
    Processing: 'In Transit',
    Delayed: 'Delayed',
  }
  const paymentMap = {
    Completed: 'Paid',
    Processing: 'Pending',
    Delayed: 'Overdue',
  }

  return {
    ...purchase,
    id: purchase.purchaseOrderNumber || purchase.id,
    deliveryStatus: deliveryMap[purchase.status] || 'Pending',
    paymentStatus: paymentMap[purchase.status] || 'Pending',
  }
}

function enrichPayment(payment) {
  return {
    ...payment,
    invoice: payment.invoiceNumber,
    date: payment.invoiceDate,
    method: 'Bank Transfer',
  }
}

function enrichNotification(notification) {
  return {
    ...notification,
    type: normalizeNotificationType(notification.type),
    priority: mapNotificationPriority(notification.type),
    actionLabel: notification.type === 'APPROVAL_PENDING' ? 'Review Vendor' : 'View Details',
  }
}

export const dashboardHandlers = [
  http.get('/api/dashboard/summary', async () => {
    await delay()
    return json(computeDashboardSummary())
  }),

  http.get('/api/dashboard/vendor-performance', async () => {
    await delay()
    return json(vendorPerformanceTrend)
  }),

  http.get('/api/dashboard/performance-trend', async () => {
    await delay()
    return json(vendorPerformanceTrend)
  }),

  http.get('/api/dashboard/category-distribution', async () => {
    await delay()
    return json(computeCategoryDistribution())
  }),

  http.get('/api/dashboard/monthly-purchase-value', async () => {
    await delay()
    return json(monthlyPurchaseValue)
  }),

  http.get('/api/dashboard/rating-distribution', async () => {
    await delay()
    return json(computeRatingDistribution())
  }),
]

export const vendorHandlers = [
  http.get('/api/vendors', async ({ request }) => {
    await delay()
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const limit = Number(url.searchParams.get('limit') || 10)
    const filtered = filterVendors(getStore().vendors, url.searchParams)
    return json(paginate(filtered, page, limit))
  }),

  http.get('/api/vendors/:vendorId', async ({ params }) => {
    await delay()
    const vendor = getStore().vendors.find((v) => v.id === params.vendorId)
    if (!vendor) return error('Vendor not found', 404)
    return json(vendor)
  }),

  http.post('/api/vendors', async ({ request }) => {
    await delay(500)
    const body = await request.json()
    const store = getStore()

    if (!body.vendorName || !body.gst || !body.pan) {
      return error('Invalid vendor payload', 400)
    }

    const id = `VND-${store.nextVendorNum++}`
    const vendorCode = `VEN-${String(store.nextVendorNum - 1000).padStart(3, '0')}`
    const now = new Date().toISOString().split('T')[0]

    const newVendor = {
      id,
      vendorCode,
      vendorName: body.vendorName,
      category: body.category,
      contactPerson: body.contactPerson || body.contactDetails?.name || '',
      email: body.email || body.contactDetails?.email || '',
      phone: body.phone || body.contactDetails?.phone || '',
      city: body.city || body.address?.city || '',
      state: body.state || body.address?.state || '',
      country: body.country || body.address?.country || 'India',
      rating: 0,
      status: 'Pending',
      lastTransaction: now,
      totalPurchaseValue: 0,
      gst: body.gst,
      pan: body.pan,
      paymentTerms: body.paymentTerms || 'Net 30',
      riskScore: 50,
      createdAt: now,
      updatedAt: now,
      addressLine1: body.addressLine1 || body.address?.line1 || '',
      addressLine2: body.addressLine2 || body.address?.line2 || '',
      postalCode: body.postalCode || body.address?.pincode || '',
      bankDetails: body.bankDetails || {},
      certifications: body.certifications || [],
    }

    store.vendors.unshift(newVendor)

    store.approvals.push({
      id: `APR-${Date.now()}`,
      vendorId: id,
      status: 'Pending',
      submittedAt: new Date().toISOString(),
      submittedBy: 'Procurement Team',
      comments: [],
      timeline: [
        {
          id: `TL-${Date.now()}`,
          action: 'Vendor Created',
          user: 'Procurement Team',
          timestamp: new Date().toISOString(),
        },
        {
          id: `TL-${Date.now() + 1}`,
          action: 'Submitted for Approval',
          user: 'Procurement Team',
          timestamp: new Date().toISOString(),
        },
      ],
    })

    store.auditTimeline.push({
      id: `AUD-${Date.now()}`,
      vendorId: id,
      action: 'Vendor Created',
      description: 'New vendor submitted for approval.',
      performedBy: 'Procurement Team',
      timestamp: new Date().toISOString(),
    })

    store.notifications.unshift({
      id: `NOT-${Date.now()}`,
      type: 'APPROVAL_PENDING',
      title: 'Vendor approval pending',
      message: `${newVendor.vendorName} is waiting for approval.`,
      vendorId: id,
      isRead: false,
      createdAt: new Date().toISOString(),
    })

    return json(newVendor, 201)
  }),

  http.patch('/api/vendors/:vendorId', async ({ params, request }) => {
    await delay()
    const store = getStore()
    const index = store.vendors.findIndex((v) => v.id === params.vendorId)
    if (index === -1) return error('Vendor not found', 404)

    const updates = await request.json()
    store.vendors[index] = {
      ...store.vendors[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0],
    }
    return json(store.vendors[index])
  }),

  http.get('/api/vendors/:vendorId/contacts', async ({ params }) => {
    await delay()
    const data = getStore().contacts.filter((c) => c.vendorId === params.vendorId)
    return json(data)
  }),

  http.get('/api/vendors/:vendorId/performance', async ({ params }) => {
    await delay()
    const data = buildPerformanceResponse(params.vendorId)
    if (!data) return error('Performance data not found', 404)
    return json(data)
  }),

  http.get('/api/vendors/:vendorId/purchases', async ({ params }) => {
    await delay()
    const data = getStore()
      .purchases
      .filter((p) => p.vendorId === params.vendorId)
      .map(enrichPurchase)
    return json(data)
  }),

  http.get('/api/vendors/:vendorId/documents', async ({ params }) => {
    await delay()
    const data = getStore().documents.filter((d) => d.vendorId === params.vendorId)
    return json(data)
  }),

  http.get('/api/vendors/:vendorId/payments', async ({ params }) => {
    await delay()
    const data = getStore()
      .payments
      .filter((p) => p.vendorId === params.vendorId)
      .map(enrichPayment)
    return json(data)
  }),

  http.get('/api/vendors/:vendorId/projects', async ({ params }) => {
    await delay()
    const data = getStore().projects.filter((p) => p.vendorId === params.vendorId)
    return json(data)
  }),

  http.get('/api/vendors/:vendorId/issues', async ({ params }) => {
    await delay()
    const data = getStore().issues.filter((i) => i.vendorId === params.vendorId)
    return json(data)
  }),

  http.get('/api/vendors/:vendorId/audit-timeline', async ({ params }) => {
    await delay()
    const data = getStore().auditTimeline.filter((a) => a.vendorId === params.vendorId)
    return json(data)
  }),

  http.get('/api/vendors/:vendorId/approval', async ({ params }) => {
    await delay()
    const approval = getStore().approvals.find((a) => a.vendorId === params.vendorId)
    if (!approval) return error('Approval not found', 404)
    return json({
      ...approval,
      reviewer: 'Procurement Manager',
    })
  }),

  http.post('/api/vendors/:vendorId/approve', async ({ params }) => {
    await delay(500)
    return handleApprovalAction(params.vendorId, 'Approved', 'Vendor Approved')
  }),

  http.post('/api/vendors/:vendorId/reject', async ({ params, request }) => {
    await delay(500)
    const { reason } = await request.json()
    if (!reason) return error('Rejection reason is required', 400)
    return handleApprovalAction(params.vendorId, 'Rejected', 'Vendor Rejected', reason)
  }),

  http.post('/api/vendors/:vendorId/request-changes', async ({ params, request }) => {
    await delay(500)
    const { reason } = await request.json()
    if (!reason) return error('Change request reason is required', 400)
    return handleApprovalAction(params.vendorId, 'On Hold', 'Request Changes', reason)
  }),

  http.get('/api/vendors/:vendorId/comments', async ({ params }) => {
    await delay()
    const approval = getStore().approvals.find((a) => a.vendorId === params.vendorId)
    return json(approval?.comments || [])
  }),

  http.post('/api/vendors/:vendorId/comments', async ({ params, request }) => {
    await delay()
    const { message } = await request.json()
    const store = getStore()
    const approval = store.approvals.find((a) => a.vendorId === params.vendorId)
    if (!approval) return error('Approval not found', 404)

    const comment = {
      id: `COM-${Date.now()}`,
      user: 'Procurement Manager',
      message,
      createdAt: new Date().toISOString(),
    }
    approval.comments.push(comment)
    return json(comment, 201)
  }),
]

function handleApprovalAction(vendorId, status, action, reason) {
  const store = getStore()
  const vendor = store.vendors.find((v) => v.id === vendorId)
  const approval = store.approvals.find((a) => a.vendorId === vendorId)

  if (!vendor || !approval) return error('Vendor or approval not found', 404)
  if (approval.status === 'Approved' || approval.status === 'Rejected') {
    return error('Approval action not permitted', 403)
  }

  approval.status = status
  vendor.status = status

  const timelineEntry = {
    id: `TL-${Date.now()}`,
    action,
    user: 'Procurement Manager',
    timestamp: new Date().toISOString(),
    description: reason,
  }
  approval.timeline.push(timelineEntry)

  if (reason) {
    approval.comments.push({
      id: `COM-${Date.now()}`,
      user: 'Procurement Manager',
      message: reason,
      createdAt: new Date().toISOString(),
    })
  }

  store.auditTimeline.push({
    id: `AUD-${Date.now()}`,
    vendorId,
    action,
    description: reason || `${action} by Procurement Manager`,
    performedBy: 'Procurement Manager',
    timestamp: new Date().toISOString(),
  })

  return json({ approval, vendor })
}

export const notificationHandlers = [
  http.get('/api/notifications', async ({ request }) => {
    await delay()
    const url = new URL(request.url)
    const unreadOnly = url.searchParams.get('unread') === 'true'
    const type = url.searchParams.get('type')

    let items = getStore().notifications.map(enrichNotification)

    if (unreadOnly) items = items.filter((n) => !n.isRead)
    if (type) items = items.filter((n) => n.type === type)

    return json(items)
  }),

  http.patch('/api/notifications/:notificationId/read', async ({ params }) => {
    await delay(200)
    const store = getStore()
    const notification = store.notifications.find((n) => n.id === params.notificationId)
    if (!notification) return error('Notification not found', 404)
    notification.isRead = true
    return json(enrichNotification(notification))
  }),

  http.patch('/api/notifications/read-all', async () => {
    await delay(200)
    getStore().notifications.forEach((n) => { n.isRead = true })
    return json({ success: true })
  }),
]

export const approvalHandlers = [
  http.get('/api/approvals', async () => {
    await delay()
    return json(getStore().approvals)
  }),

  http.get('/api/approvals/:approvalId', async ({ params }) => {
    await delay()
    const approval = getStore().approvals.find((a) => a.id === params.approvalId)
    if (!approval) return error('Approval not found', 404)
    return json(approval)
  }),
]
