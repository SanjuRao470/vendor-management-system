import { Link } from 'react-router-dom'
import Badge from '../../../components/ui/Badge'
import { getNotificationConfig } from '../data/notificationConfig'

const icons = {
  clipboard: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  document: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  star: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  truck: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  payment: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  bell: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
}

const priorityVariant = {
  high: 'danger',
  medium: 'warning',
  low: 'neutral',
}

function getActionPath(notification) {
  if (notification.type === 'approval_pending') {
    return `/vendors/${notification.vendorId}/approval`
  }
  if (notification.type === 'low_vendor_rating') {
    return '/performance'
  }
  if (notification.vendorId) {
    return `/vendors/${notification.vendorId}`
  }
  return '/notifications'
}

function NotificationItem({ notification, onMarkRead }) {
  const config = getNotificationConfig(notification.type)
  const icon = icons[config.icon] || icons.bell

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkRead?.(notification.id)
    }
  }

  return (
    <div
      className={`flex gap-4 rounded-lg border p-4 transition-colors ${
        notification.isRead
          ? 'border-slate-100 bg-white'
          : 'border-brand-100 bg-brand-50/30'
      }`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 ring-1 ring-slate-200`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className={`text-sm font-medium ${notification.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
              {notification.title}
            </p>
            <p className="mt-0.5 text-sm text-slate-500">{notification.message}</p>
          </div>
          <Badge variant={priorityVariant[notification.priority] || 'neutral'}>
            {notification.priority}
          </Badge>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400">
            {new Date(notification.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {notification.actionLabel && (
            <Link
              to={getActionPath(notification)}
              onClick={handleClick}
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              {notification.actionLabel} →
            </Link>
          )}
          {!notification.isRead && (
            <button
              type="button"
              onClick={() => onMarkRead?.(notification.id)}
              className="text-xs font-medium text-slate-500 hover:text-slate-700"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
      {!notification.isRead && (
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" aria-label="Unread" />
      )}
    </div>
  )
}

export default NotificationItem
