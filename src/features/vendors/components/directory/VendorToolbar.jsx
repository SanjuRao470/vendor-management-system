import VendorSearch from './VendorSearch'
import VendorFilters from './VendorFilters'
import Button from '../../../../components/ui/Button'

function VendorToolbar({
  search = '',
  onSearchChange = () => {},
  status = 'All Statuses',
  category = 'All Categories',
  city = 'All Cities',
  rating = 'All Ratings',
  onStatusChange = () => {},
  onCategoryChange = () => {},
  onCityChange = () => {},
  onRatingChange = () => {},
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <VendorSearch value={search} onChange={onSearchChange} />

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Saved Views
          </Button>
          <Button variant="secondary" size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Columns
          </Button>
          <Button variant="secondary" size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </Button>
        </div>
      </div>

      <VendorFilters
        status={status}
        category={category}
        city={city}
        rating={rating}
        onStatusChange={onStatusChange}
        onCategoryChange={onCategoryChange}
        onCityChange={onCityChange}
        onRatingChange={onRatingChange}
      />
    </div>
  )
}

export default VendorToolbar
