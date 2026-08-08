import { useMemo, useState } from 'react'
import Button from '../../../components/ui/Button'
import { Card, CardBody } from '../../../components/ui/Card'
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from '../hooks/useNotifications'
import NotificationFilters from '../components/NotificationFilters'
import NotificationList from '../components/NotificationList'

function Notifications() {
  const { data: notifications = [], isLoading, isError } = useNotifications()
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()

  const [filters, setFilters] = useState({
    type: 'all',
    priority: 'all',
    read: 'all',
  })

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      if (filters.type !== 'all' && n.type !== filters.type) return false
      if (filters.priority !== 'all' && n.priority !== filters.priority) return false
      if (filters.read === 'unread' && n.isRead) return false
      if (filters.read === 'read' && !n.isRead) return false
      return true
    })
  }, [notifications, filters])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleMarkRead = (id) => {
    markRead.mutate(id)
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
        Failed to load notifications.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[960px]">
      <header className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
            <p className="mt-1 text-sm text-slate-500">
              {unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                : 'All caught up'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
            >
              Mark all as read
            </Button>
          )}
        </div>
      </header>

      <Card className="mb-6">
        <CardBody>
          <NotificationFilters filters={filters} onChange={setFilters} />
        </CardBody>
      </Card>

      <NotificationList notifications={filtered} onMarkRead={handleMarkRead} />
    </div>
  )
}

export default Notifications
