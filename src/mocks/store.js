import {
  vendors as initialVendors,
  contacts as initialContacts,
  performance as initialPerformance,
  purchases as initialPurchases,
  documents as initialDocuments,
  payments as initialPayments,
  projects as initialProjects,
  issues as initialIssues,
  approvals as initialApprovals,
  notifications as initialNotifications,
  auditTimeline as initialAuditTimeline,
} from './data/mockData'

function cloneData() {
  return {
    vendors: structuredClone(initialVendors),
    contacts: structuredClone(initialContacts),
    performance: structuredClone(initialPerformance),
    purchases: structuredClone(initialPurchases),
    documents: structuredClone(initialDocuments),
    payments: structuredClone(initialPayments),
    projects: structuredClone(initialProjects),
    issues: structuredClone(initialIssues),
    approvals: structuredClone(initialApprovals),
    notifications: structuredClone(initialNotifications),
    auditTimeline: structuredClone(initialAuditTimeline),
    nextVendorNum: 1026,
  }
}

let store = cloneData()

export function getStore() {
  return store
}

export function resetStore() {
  store = cloneData()
}

export function computeDashboardSummary() {
  const { vendors, purchases } = store
  const activeVendors = vendors.filter((v) => v.status === 'Approved').length
  const blacklistedVendors = vendors.filter((v) => v.status === 'Blacklisted').length
  const pendingApprovals = vendors.filter((v) => v.status === 'Pending').length
  const ratings = vendors.filter((v) => v.rating > 0).map((v) => v.rating)
  const averageVendorRating = ratings.length
    ? Number((ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(2))
    : 0
  const activePurchaseOrders = purchases.filter((p) => p.status === 'Processing').length

  return {
    totalVendors: vendors.length,
    activeVendors,
    blacklistedVendors,
    pendingApprovals,
    averageVendorRating,
    activePurchaseOrders,
  }
}

export function computeCategoryDistribution() {
  const counts = {}
  store.vendors.forEach((v) => {
    counts[v.category] = (counts[v.category] || 0) + 1
  })
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}

export function computeRatingDistribution() {
  const buckets = { '1-2': 0, '2-3': 0, '3-4': 0, '4-5': 0 }
  store.vendors.forEach((v) => {
    if (v.rating < 2) buckets['1-2'] += 1
    else if (v.rating < 3) buckets['2-3'] += 1
    else if (v.rating < 4) buckets['3-4'] += 1
    else buckets['4-5'] += 1
  })
  return Object.entries(buckets).map(([rating, count]) => ({ rating, count }))
}
