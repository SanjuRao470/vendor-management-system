import Select from '../../../components/ui/Select'
import { TYPE_OPTIONS, PRIORITY_OPTIONS, READ_OPTIONS } from '../data/notificationConfig'

function NotificationFilters({ filters, onChange }) {
  const handleChange = (key) => (e) => {
    onChange({ ...filters, [key]: e.target.value })
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <Select
        label="Type"
        name="type"
        value={filters.type}
        onChange={handleChange('type')}
        options={TYPE_OPTIONS}
        className="sm:w-48"
      />
      <Select
        label="Priority"
        name="priority"
        value={filters.priority}
        onChange={handleChange('priority')}
        options={PRIORITY_OPTIONS}
        className="sm:w-40"
      />
      <Select
        label="Status"
        name="read"
        value={filters.read}
        onChange={handleChange('read')}
        options={READ_OPTIONS}
        className="sm:w-36"
      />
    </div>
  )
}

export default NotificationFilters
