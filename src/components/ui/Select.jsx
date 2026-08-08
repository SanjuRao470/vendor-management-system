function Select({ label, error, required, id, options = [], placeholder, className = '', ...props }) {
  const selectId = id || props.name

  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full appearance-none rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
          error ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-brand-500'
        }`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Select
