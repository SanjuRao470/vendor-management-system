import VendorTableHeader from './VendorTableHeader'
import VendorTableRow from './VendorTableRow'
import VendorToolbar from './VendorToolbar'
import VendorPagination from './VendorPagination'
import VendorTableSkeleton from './VendorTableSkeleton'
import VendorEmptyState from './VendorEmptyState'
import VendorTableError from './VendorTableError'
import { Card } from '../../../../components/ui/Card'

function VendorTable({
  vendors = [],
  isLoading = false,
  isError = false,
  onRetry,
  search,
  onSearchChange,
  status,
  category,
  city,
  rating,
  onStatusChange,
  onCategoryChange,
  onCityChange,
  onRatingChange,
  sortBy,
  sortOrder,
  onSort,
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}) {
  return (
    <Card className="overflow-hidden">
      <VendorToolbar
        search={search}
        onSearchChange={onSearchChange}
        status={status}
        category={category}
        city={city}
        rating={rating}
        onStatusChange={onStatusChange}
        onCategoryChange={onCategoryChange}
        onCityChange={onCityChange}
        onRatingChange={onRatingChange}
      />

      {isError ? (
        <VendorTableError onRetry={onRetry} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <VendorTableHeader sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
              <tbody>
                {isLoading ? (
                  <VendorTableSkeleton rows={5} />
                ) : vendors.length === 0 ? (
                  <tr>
                    <td colSpan={9}>
                      <VendorEmptyState />
                    </td>
                  </tr>
                ) : (
                  vendors.map((vendor) => (
                    <VendorTableRow key={vendor.id} vendor={vendor} />
                  ))
                )}
              </tbody>
            </table>
          </div>
          {!isLoading && vendors.length > 0 && (
            <VendorPagination
              page={page}
              totalPages={totalPages}
              total={total}
              limit={limit}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </Card>
  )
}

export default VendorTable
