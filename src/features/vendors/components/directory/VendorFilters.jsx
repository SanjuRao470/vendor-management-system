import { FILTER_OPTIONS } from '../../vendorConstants'

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

function VendorFilters({
  status,
  category,
  city,
  rating,
  onStatusChange,
  onCategoryChange,
  onCityChange,
  onRatingChange,
}) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <FilterSelect
        label="Status"
        value={status}
        onChange={onStatusChange}
        options={FILTER_OPTIONS.status}
      />
      <FilterSelect
        label="Category"
        value={category}
        onChange={onCategoryChange}
        options={FILTER_OPTIONS.category}
      />
      <FilterSelect
        label="City"
        value={city}
        onChange={onCityChange}
        options={FILTER_OPTIONS.city}
      />
      <FilterSelect
        label="Rating"
        value={rating}
        onChange={onRatingChange}
        options={FILTER_OPTIONS.rating}
      />
    </div>
  )
}

export default VendorFilters
