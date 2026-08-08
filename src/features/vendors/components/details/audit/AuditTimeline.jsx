import { useVendorAudit } from '../../../hooks/useVendors'
import { Card } from '../../../../../components/ui/Card'

const statusStyles = {
  completed: 'bg-brand-600 ring-brand-100',
  current: 'bg-amber-500 ring-amber-100 animate-pulse',
  pending: 'bg-slate-300 ring-slate-100',
}

function AuditTimeline({ vendorId }) {
  const { data, isLoading, isError } = useVendorAudit(vendorId)
  const auditEvents = data?.data ?? data ?? []

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
        <p className="text-sm text-slate-500">Unable to load audit trail.</p>
      </Card>
    )
  }

  if (!auditEvents.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-slate-500">No audit events recorded.</p>
      </Card>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="space-y-0">
        {auditEvents.map((item, index) => (
          <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
            {index < auditEvents.length - 1 && (
              <div className="absolute left-[11px] top-6 h-full w-0.5 bg-slate-200" aria-hidden="true" />
            )}
            <div className={`relative z-10 mt-1 h-6 w-6 shrink-0 rounded-full ring-4 ${statusStyles[item.status] || statusStyles.completed}`} />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-900">{item.event}</p>
              <p className="mt-0.5 text-sm text-slate-500">{item.user}</p>
              <p className="mt-1 text-xs text-slate-400">{item.date} · {item.time}</p>
              <p className="mt-2 break-words text-sm text-slate-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuditTimeline
