import { TABLE_COLUMNS } from '../../vendorConstants'

function SkeletonCell({ className = '' }) {
  return <div className={`h-4 animate-pulse rounded bg-slate-200 ${className}`} />
}

function VendorTableSkeleton({ rows = 8 }) {
  return Array.from({ length: rows }, (_, i) => (
      <tr key={i} className="border-b border-slate-100">
        <td className="px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-slate-200" />
            <div className="space-y-2">
              <SkeletonCell className="w-32" />
              <SkeletonCell className="w-20" />
            </div>
          </div>
        </td>
        {TABLE_COLUMNS.slice(1, -1).map((col) => (
          <td key={col.key} className="px-4 py-4 sm:px-6">
            <SkeletonCell className="w-24" />
          </td>
        ))}
        <td className="px-4 py-4 sm:px-6">
          <div className="flex justify-end gap-2">
            <SkeletonCell className="w-10" />
            <SkeletonCell className="w-10" />
          </div>
        </td>
      </tr>
    ))
}

export default VendorTableSkeleton
