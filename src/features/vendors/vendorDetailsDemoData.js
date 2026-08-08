export const DEMO_VENDOR = {
  name: 'ABC Technologies',
  code: 'VND-1001',
  category: 'IT Services',
  gst: '07AABCU9603R1ZM',
  pan: 'AABCU9603R',
  address: '42 Connaught Place, Block A',
  city: 'Delhi',
  state: 'Delhi',
  country: 'India',
  primaryContact: 'Rajesh Kumar',
  email: 'rajesh@abctech.com',
  phone: '+91 98765 43210',
  alternateContact: '+91 98765 43211',
  totalPurchaseValue: 2847500,
  activePurchaseOrders: 5,
  rating: 4.5,
  vendorSince: '2022-01-15',
  paymentTerms: 'Net 30',
}

export const DEMO_AUDIT = [
  { id: 'A1', event: 'Vendor Created', user: 'Sanju Rao', date: '2022-01-15', time: '10:30 AM', description: 'Vendor profile created in the system', status: 'completed' },
  { id: 'A2', event: 'Documents Uploaded', user: 'Rajesh Kumar', date: '2022-01-16', time: '02:15 PM', description: 'GST, PAN, and contract documents uploaded', status: 'completed' },
  { id: 'A3', event: 'Compliance Verified', user: 'Compliance Team', date: '2022-01-20', time: '11:20 AM', description: 'All compliance documents verified', status: 'completed' },
  { id: 'A4', event: 'Vendor Approved', user: 'Procurement Manager', date: '2022-01-22', time: '04:45 PM', description: 'Vendor approved for procurement', status: 'completed' },
]

export const DEMO_ISSUES = [
  { id: 'ISS-201', title: 'Delayed Delivery', category: 'Delivery', severity: 'High', createdDate: '2026-02-04', assignedTo: 'Procurement Team', status: 'Open' },
  { id: 'ISS-195', title: 'Invoice Mismatch', category: 'Payment', severity: 'Low', createdDate: '2026-01-22', assignedTo: 'Finance Team', status: 'Resolved' },
]
