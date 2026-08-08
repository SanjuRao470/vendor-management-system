import Badge from '../../../../../components/ui/Badge'
import { Card } from '../../../../../components/ui/Card'
import { useVendorProjects } from '../../../hooks/useVendors'

const statusVariant = {
  Active: 'success',
  Completed: 'info',
  'On Hold': 'warning',
  Cancelled: 'danger',
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

function AssociatedProjects({ vendorId }) {
  const { data, isLoading, isError } = useVendorProjects(vendorId)
  const projects = data?.data ?? data ?? []

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  if (isError) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-slate-500">Unable to load projects.</p>
      </Card>
    )
  }

  if (!projects.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-slate-500">No associated projects found.</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead className="sticky top-0 bg-slate-50">
            <tr className="border-b border-slate-200">
              {['Project', 'Code', 'Manager', 'Start Date', 'End Date', 'Value', 'Status'].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 first:pl-6">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                <td className="whitespace-nowrap px-4 py-3 pl-6 text-sm font-medium text-slate-900">{project.name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{project.code}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{project.manager}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{project.startDate}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{project.endDate}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">{formatCurrency(project.value)}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge variant={statusVariant[project.status] || 'neutral'}>{project.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default AssociatedProjects
