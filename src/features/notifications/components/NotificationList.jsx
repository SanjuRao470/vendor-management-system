import NotificationItem from './NotificationItem'
import NotificationEmptyState from './NotificationEmptyState'

function NotificationList({ notifications = [], onMarkRead }) {
  if (notifications.length === 0) {
    return <NotificationEmptyState />
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkRead={onMarkRead}
        />
      ))}
    </div>
  )
}

export default NotificationList
