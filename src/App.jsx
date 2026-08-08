import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SidebarProvider } from './components/layout/SidebarContext'
import Sidebar from './components/layout/Sidebar'
import AppLayout from './components/layout/AppLayout'
import VendorDashboard from './features/dashboard/pages/VendorDashboard'
import VendorDirectory from './features/vendors/pages/VendorDirectory'
import VendorDetails from './features/vendors/pages/VendorDetails'
import CreateVendor from './features/vendors/pages/CreateVendor'
import VendorPerformance from './features/vendors/pages/VendorPerformance'
import VendorApproval from './features/vendors/pages/VendorApproval'
import Notifications from './features/notifications/pages/Notifications'

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Sidebar />
        <AppLayout>
          <Routes>
            <Route path="/" element={<VendorDashboard />} />
            <Route path="/vendors" element={<VendorDirectory />} />
            <Route path="/vendors/new" element={<CreateVendor />} />
            <Route path="/vendors/:vendorId" element={<VendorDetails />} />
            <Route path="/performance" element={<VendorPerformance />} />
            <Route path="/approvals/:vendorId" element={<VendorApproval />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </AppLayout>
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App
