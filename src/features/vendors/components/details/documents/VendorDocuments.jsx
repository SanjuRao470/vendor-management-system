import Badge from '../../../../../components/ui/Badge'
import { Card } from '../../../../../components/ui/Card'
import { useVendorDocuments } from '../../../hooks/useVendors'

const statusVariant = {
  Valid: 'success',
  'Expiring Soon': 'warning',
  Expired: 'danger',
}

function FileIcon({ fileType }) {
  const label = fileType || 'FILE'
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-red-600 ring-1 ring-red-100">
      {label.slice(0, 3)}
    </div>
  )
}

function VendorDocuments({ vendorId }) {
  const { data, isLoading, isError } = useVendorDocuments(vendorId)
  const documents = data?.data ?? data ?? []

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
        <p className="text-sm text-slate-500">Unable to load documents.</p>
      </Card>
    )
  }

  if (!documents.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-slate-500">No documents uploaded.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <Card key={doc.id} className="flex items-center gap-4 p-4 transition-shadow hover:shadow-md">
          <FileIcon fileType={doc.fileType} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-slate-900">{doc.name}</p>
              <Badge variant={statusVariant[doc.status] || 'neutral'}>{doc.status}</Badge>
            </div>
            <p className="mt-0.5 text-sm text-slate-500">
              {doc.type} · Uploaded {doc.uploadedDate}
              {doc.expiryDate ? ` · Expires ${doc.expiryDate}` : ''}
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50"
          >
            Download
          </button>
        </Card>
      ))}
    </div>
  )
}

export default VendorDocuments
