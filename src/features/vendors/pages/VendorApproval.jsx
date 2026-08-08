import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useVendor,
  useVendorApproval,
  useApproveVendor,
  useRejectVendor,
  useRequestChanges,
  useAddComment,
} from '../hooks/useVendors'
import ApprovalHeader from '../components/approval/ApprovalHeader'
import ApprovalStatus from '../components/approval/ApprovalStatus'
import ApprovalTimeline from '../components/approval/ApprovalTimeline'
import ApprovalComments from '../components/approval/ApprovalComments'
import ApprovalActions from '../components/approval/ApprovalActions'

const DEFAULT_VENDOR_ID = 'VND-1004'

function VendorApproval() {
  const { vendorId } = useParams()
  const id = vendorId || DEFAULT_VENDOR_ID

  const { data: vendor } = useVendor(id)
  const { data: approval, isLoading, isError } = useVendorApproval(id)
  const approveVendor = useApproveVendor()
  const rejectVendor = useRejectVendor()
  const requestChanges = useRequestChanges()
  const addComment = useAddComment()

  const [localStatus, setLocalStatus] = useState(null)
  const currentStatus = localStatus || approval?.status

  const handleApprove = () => {
    approveVendor.mutate(id, {
      onSuccess: () => setLocalStatus('Approved'),
    })
  }

  const handleReject = (reason) => {
    rejectVendor.mutate(
      { id, reason },
      { onSuccess: () => setLocalStatus('Rejected') },
    )
  }

  const handleRequestChanges = (reason) => {
    requestChanges.mutate({ id, reason })
  }

  const handleAddComment = (message) => {
    addComment.mutate({ id, message })
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  if (isError || !approval) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
        Failed to load approval data.
      </div>
    )
  }

  const approvalWithStatus = { ...approval, status: currentStatus }

  return (
    <div className="mx-auto max-w-[1200px]">
      <ApprovalHeader
        approval={approvalWithStatus}
        vendorName={vendor?.vendorName}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ApprovalTimeline timeline={approval.timeline} />
          <ApprovalComments
            comments={approval.comments}
            onAddComment={handleAddComment}
            isSubmitting={addComment.isPending}
          />
        </div>
        <div className="space-y-6">
          <ApprovalStatus
            status={currentStatus}
            reviewer={approval.reviewer}
            submittedAt={approval.submittedAt}
          />
          <ApprovalActions
            status={currentStatus}
            onApprove={handleApprove}
            onReject={handleReject}
            onRequestChanges={handleRequestChanges}
            isApproving={approveVendor.isPending}
            isRejecting={rejectVendor.isPending}
            isRequestingChanges={requestChanges.isPending}
          />
        </div>
      </div>
    </div>
  )
}

export default VendorApproval
