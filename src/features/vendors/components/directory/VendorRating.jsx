function VendorRating({ rating, showValue = true, size = 'sm' }) {
  const starSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < fullStars || (i === fullStars && hasHalf)
          return (
            <svg
              key={i}
              className={`${starSize} ${filled ? 'text-amber-400' : 'text-slate-300'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}

export default VendorRating
