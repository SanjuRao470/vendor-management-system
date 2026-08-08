export const NOTIFICATION_TYPES = {
  approval_pending: {
    label: 'Approval Pending',
    icon: 'clipboard',
    priority: 'high',
    badgeVariant: 'warning',
  },
  document_expiring: {
    label: 'Document Expiring',
    icon: 'document',
    priority: 'high',
    badgeVariant: 'danger',
  },
  low_vendor_rating: {
    label: 'Low Rating',
    icon: 'star',
    priority: 'medium',
    badgeVariant: 'warning',
  },
  delayed_delivery: {
    label: 'Delayed Delivery',
    icon: 'truck',
    priority: 'high',
    badgeVariant: 'danger',
  },
  payment_due: {
    label: 'Payment Due',
    icon: 'payment',
    priority: 'medium',
    badgeVariant: 'info',
  },
}

export const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All Priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export const TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  ...Object.entries(NOTIFICATION_TYPES).map(([value, config]) => ({
    value,
    label: config.label,
  })),
]

export const READ_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
]

export function getNotificationConfig(type) {
  return NOTIFICATION_TYPES[type] || {
    label: 'Notification',
    icon: 'bell',
    priority: 'low',
    badgeVariant: 'neutral',
  }
}
