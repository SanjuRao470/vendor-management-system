import { useState } from 'react'
import Button from '../../../../components/ui/Button'
import Modal from '../../../../components/ui/Modal'
import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'

function ApprovalActions({
  status,
  onApprove,
  onReject,
  onRequestChanges,
  isApproving = false,
  isRejecting = false,
  isRequestingChanges = false,
}) {
  const [modalType, setModalType] = useState(null)
  const [reason, setReason] = useState('')

  const isPending = status === 'Pending'
  const isLoading = isApproving || isRejecting || isRequestingChanges

  const closeModal = () => {
    setModalType(null)
    setReason('')
  }

  const handleConfirm = () => {
    if (modalType === 'reject') {
      onReject?.(reason)
    } else if (modalType === 'changes') {
      onRequestChanges?.(reason)
    }
    closeModal()
  }

  const handleApprove = () => {
    onApprove?.()
  }

  if (!isPending) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-slate-900">Actions</h2>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-slate-500">
            This vendor approval has been {status?.toLowerCase()}. No further actions available.
          </p>
        </CardBody>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-slate-900">Actions</h2>
          <p className="mt-0.5 text-sm text-slate-500">Review and take action on this vendor</p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleApprove} disabled={isLoading}>
              {isApproving ? 'Approving...' : 'Approve Vendor'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setModalType('changes')}
              disabled={isLoading}
            >
              Request Changes
            </Button>
            <Button
              variant="danger"
              onClick={() => setModalType('reject')}
              disabled={isLoading}
            >
              Reject Vendor
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal
        isOpen={modalType !== null}
        onClose={closeModal}
        title={modalType === 'reject' ? 'Reject Vendor' : 'Request Changes'}
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant={modalType === 'reject' ? 'danger' : 'primary'}
              onClick={handleConfirm}
              disabled={!reason.trim() || isLoading}
            >
              {modalType === 'reject'
                ? isRejecting ? 'Rejecting...' : 'Confirm Rejection'
                : isRequestingChanges ? 'Submitting...' : 'Submit Request'}
            </Button>
          </>
        }
      >
        <p className="mb-3 text-sm text-slate-600">
          {modalType === 'reject'
            ? 'Please provide a reason for rejecting this vendor.'
            : 'Describe the changes required before approval.'}
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter your reason..."
          rows={4}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </Modal>
    </>
  )
}

export default ApprovalActions
