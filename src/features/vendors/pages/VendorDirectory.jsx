import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import VendorDirectoryHeader from '../components/directory/VendorDirectoryHeader'
import VendorTable from '../components/directory/VendorTable'
import { useVendors } from '../hooks/useVendors'

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

function VendorDirectory() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [status, setStatus] = useState(searchParams.get('status') || 'All Statuses')
  const [category, setCategory] = useState(searchParams.get('category') || 'All Categories')
  const [city, setCity] = useState(searchParams.get('city') || 'All Cities')
  const [rating, setRating] = useState(searchParams.get('rating') || 'All Ratings')
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'vendorName')
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'asc')
  const [page, setPage] = useState(Number(searchParams.get('page') || 1))

  const debouncedSearch = useDebounce(search)

  const filters = {
    search: debouncedSearch || undefined,
    status: status !== 'All Statuses' ? status : undefined,
    category: category !== 'All Categories' ? category : undefined,
    city: city !== 'All Cities' ? city : undefined,
    rating: rating !== 'All Ratings' ? rating : undefined,
    sortBy,
    sortOrder,
    page,
    limit: 10,
  }

  const { data, isLoading, isError, refetch } = useVendors(filters)

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (status !== 'All Statuses') params.set('status', status)
    if (category !== 'All Categories') params.set('category', category)
    if (city !== 'All Cities') params.set('city', city)
    if (rating !== 'All Ratings') params.set('rating', rating)
    if (sortBy !== 'vendorName') params.set('sortBy', sortBy)
    if (sortOrder !== 'asc') params.set('sortOrder', sortOrder)
    if (page > 1) params.set('page', String(page))
    setSearchParams(params, { replace: true })
  }, [debouncedSearch, status, category, city, rating, sortBy, sortOrder, page, setSearchParams])

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(key)
      setSortOrder('asc')
    }
    setPage(1)
  }

  const handleFilterChange = (setter) => (value) => {
    setter(value)
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-[1600px]">
      <VendorDirectoryHeader />
      <VendorTable
        vendors={data?.data ?? []}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1) }}
        status={status}
        category={category}
        city={city}
        rating={rating}
        onStatusChange={handleFilterChange(setStatus)}
        onCategoryChange={handleFilterChange(setCategory)}
        onCityChange={handleFilterChange(setCity)}
        onRatingChange={handleFilterChange(setRating)}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        page={data?.pagination?.page ?? page}
        totalPages={data?.pagination?.totalPages ?? 1}
        total={data?.pagination?.total ?? 0}
        limit={data?.pagination?.limit ?? 10}
        onPageChange={setPage}
      />
    </div>
  )
}

export default VendorDirectory
