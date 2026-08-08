import { Link, useNavigate } from 'react-router-dom'
import VendorForm from '../components/form/VendorForm'
import { useCreateVendor } from '../hooks/useVendors'

function CreateVendor() {
  const navigate = useNavigate()
  const createVendor = useCreateVendor()

  const handleSubmit = (data) => {
    createVendor.mutate(data, {
      onSuccess: (vendor) => {
        navigate(`/vendors/${vendor.id}`)
      },
    })
  }

  return (
    <div className="mx-auto max-w-[960px]">
      <header className="mb-8">
        <Link
          to="/vendors"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Directory
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Vendor</h1>
        <p className="mt-1 text-sm text-slate-500">
          Register a new vendor in the procurement system
        </p>
      </header>

      {createVendor.isError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          Failed to create vendor. Please check your input and try again.
        </div>
      )}

      <VendorForm onSubmit={handleSubmit} isSubmitting={createVendor.isPending} />
    </div>
  )
}

export default CreateVendor
