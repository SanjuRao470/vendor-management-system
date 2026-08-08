function VendorTableActions() {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        className="rounded-md px-2.5 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50"
      >
        View
      </button>
      <button
        type="button"
        className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
      >
        Edit
      </button>
      <button
        type="button"
        className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        aria-label="More actions"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    </div>
  )
}

export default VendorTableActions
