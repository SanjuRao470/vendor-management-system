export function delay(ms) {
  const wait = ms ?? 300 + Math.floor(Math.random() * 400)
  return new Promise((resolve) => setTimeout(resolve, wait))
}

export function paginate(items, page = 1, limit = 10) {
  const safePage = Math.max(1, page)
  const safeLimit = Math.max(1, limit)
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / safeLimit))
  const start = (safePage - 1) * safeLimit

  return {
    data: items.slice(start, start + safeLimit),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages,
    },
  }
}

export function matchesRatingFilter(rating, filter) {
  if (!filter || filter === 'All Ratings') return true
  if (filter === '4.5+') return rating >= 4.5
  if (filter === '4.0 - 4.4') return rating >= 4.0 && rating < 4.5
  if (filter === '3.0 - 3.9') return rating >= 3.0 && rating < 4.0
  if (filter === 'Below 3.0') return rating < 3.0
  return true
}

export function getRiskLevel(score) {
  if (score <= 25) return 'Low'
  if (score <= 50) return 'Medium'
  if (score <= 75) return 'High'
  return 'Critical'
}

export function mapNotificationPriority(type) {
  const map = {
    APPROVAL_PENDING: 'high',
    DOCUMENT_EXPIRING: 'high',
    LOW_VENDOR_RATING: 'medium',
    DELAYED_DELIVERY: 'high',
    PAYMENT_DUE: 'medium',
  }
  return map[type] || 'low'
}

export function normalizeNotificationType(type) {
  return type?.toLowerCase().replace(/_/g, '_') ?? type
}
