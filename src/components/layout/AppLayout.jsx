import { useSidebar } from './SidebarContext'
import Header from './Header'

function AppLayout({ children }) {
  const { isCollapsed } = useSidebar()

  return (
    <div
      className={`min-h-screen bg-surface transition-all duration-300 ease-in-out ${
        isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}
    >
      <Header />
      <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
