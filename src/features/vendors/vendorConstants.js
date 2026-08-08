export const TABLE_COLUMNS = [
  { key: 'vendorName', label: 'Vendor', sortable: true, className: 'min-w-[220px]' },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'city', label: 'City', sortable: true },
  { key: 'contactPerson', label: 'Contact', sortable: true },
  { key: 'rating', label: 'Rating', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'totalPurchaseValue', label: 'Total Purchase', sortable: true },
  { key: 'lastTransaction', label: 'Last Transaction', sortable: true },
  { key: 'actions', label: '', sortable: false, className: 'w-32' },
]

export const FILTER_OPTIONS = {
  status: ['All Statuses', 'Active', 'Pending', 'Blacklisted', 'On Hold'],
  category: [
    'All Categories',
    'IT Services',
    'IT & Software',
    'Logistics',
    'Services',
    'Manufacturing',
    'Construction',
    'Healthcare',
  ],
  city: [
    'All Cities',
    'Mumbai',
    'Bengaluru',
    'Pune',
    'Delhi',
    'Gurugram',
    'Hyderabad',
    'Noida',
    'Ahmedabad',
    'Chennai',
    'Kolkata',
  ],
  rating: ['All Ratings', '4.5+', '4.0 - 4.4', '3.0 - 3.9', 'Below 3.0'],
}
