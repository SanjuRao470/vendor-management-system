import { useState } from 'react'
import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'
import Button from '../../../../components/ui/Button'

function ApprovalComments({ comments = [], onAddComment, isSubmitting = false }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    onAddComment?.(message.trim())
    setMessage('')
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-slate-900">Comments</h2>
        <p className="mt-0.5 text-sm text-slate-500">Discussion and feedback on this approval</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" size="sm" disabled={!message.trim() || isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Add Comment'}
            </Button>
          </div>
        </form>

        {comments.length === 0 ? (
          <p className="text-sm text-slate-500">No comments yet.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{comment.author}</p>
                    <p className="text-xs text-slate-500">{comment.role}</p>
                  </div>
                  <p className="shrink-0 text-xs text-slate-400">
                    {comment.date}{comment.time ? ` · ${comment.time}` : ''}
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-700">{comment.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default ApprovalComments
