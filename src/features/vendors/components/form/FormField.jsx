import { useFormContext } from 'react-hook-form'

function getNestedError(errors, name) {
  const parts = name.split('.')
  let current = errors
  for (const part of parts) {
    if (!current?.[part]) return undefined
    current = current[part]
  }
  return current?.message
}

function FormField({
  name,
  label,
  type = 'text',
  required = false,
  placeholder,
  className = '',
  as: Component = 'input',
  options,
  rows = 3,
  ...props
}) {
  const { register, formState: { errors } } = useFormContext()
  const error = getNestedError(errors, name)
  const fieldId = name.replace(/\./g, '-')

  const inputClasses = `w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
    error ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-brand-500'
  }`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      {Component === 'textarea' ? (
        <textarea
          id={fieldId}
          rows={rows}
          placeholder={placeholder}
          className={inputClasses}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...register(name)}
          {...props}
        />
      ) : Component === 'select' ? (
        <select
          id={fieldId}
          className={`${inputClasses} appearance-none`}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...register(name)}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...register(name)}
          {...props}
        />
      )}

      {error && (
        <p id={`${fieldId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
