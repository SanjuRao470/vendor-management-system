import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'

const statusStyles = {
  completed: 'bg-brand-600 ring-brand-100',
  current: 'bg-amber-500 ring-amber-100 animate-pulse',
  rejected: 'bg-red-500 ring-red-100',
  pending: 'bg-slate-300 ring-slate-100',
}

function ApprovalTimeline({ timeline = [] }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Approval Timeline</h2>
        <p className="mt-0.5 text-sm text-slate-500">Track the approval workflow progress</p>
      </CardHeader>
      <CardBody>
        {timeline.length === 0 ? (
          <p className="text-sm text-slate-500">No timeline events yet.</p>
        ) : (
          <div className="space-y-0">
            {timeline.map((item, index) => (
              <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
                {index < timeline.length - 1 && (
                  <div className="absolute left-[11px] top-6 h-full w-0.5 bg-slate-200" aria-hidden="true" />
                )}
                <div
                  className={`relative z-10 mt-1 h-6 w-6 shrink-0 rounded-full ring-4 ${statusStyles[item.status] || statusStyles.completed}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{item.actor}</p>
                  {item.date && (
                    <p className="mt-1 text-xs text-slate-400">
                      {item.date}{item.time ? ` · ${item.time}` : ''}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default ApprovalTimeline
