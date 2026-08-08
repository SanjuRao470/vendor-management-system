export const KPI_CONFIG = [
  {
    id: 'totalVendors',
    label: 'Total Vendors',
    icon: 'users',
    accent: 'blue',
  },
  {
    id: 'activeVendors',
    label: 'Active Vendors',
    icon: 'check-circle',
    accent: 'green',
  },
  {
    id: 'blacklistedVendors',
    label: 'Blacklisted Vendors',
    icon: 'ban',
    accent: 'red',
  },
  {
    id: 'pendingApprovals',
    label: 'Pending Approvals',
    icon: 'clock',
    accent: 'amber',
  },
  {
    id: 'averageRating',
    label: 'Average Vendor Rating',
    icon: 'star',
    accent: 'purple',
  },
  {
    id: 'activePurchaseOrders',
    label: 'Active Purchase Orders',
    icon: 'file-text',
    accent: 'indigo',
  },
]

export const CHART_CONFIG = {
  performanceTrend: {
    id: 'vendorPerformanceTrend',
    title: 'Vendor Performance Trend',
    description: 'Track vendor performance metrics over time',
  },
  categoryDistribution: {
    id: 'categoryVendorDistribution',
    title: 'Category-wise Vendor Distribution',
    description: 'Breakdown of vendors across procurement categories',
  },
}

export const FUTURE_CHARTS = [
  'Monthly Purchase Value',
  'Vendor Rating Distribution',
]

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Vendor Dashboard', path: '/', active: true },
  { id: 'directory', label: 'Vendor Directory', path: '/vendors', active: false, disabled: true },
  { id: 'details', label: 'Vendor Details', path: '/vendors/:id', active: false, disabled: true },
  { id: 'create', label: 'Create Vendor', path: '/vendors/new', active: false, disabled: true },
  { id: 'performance', label: 'Vendor Performance', path: '/performance', active: false, disabled: true },
  { id: 'approval', label: 'Approval Workflow', path: '/approvals', active: false, disabled: true },
  { id: 'notifications', label: 'Notifications', path: '/notifications', active: false, disabled: true },
]
