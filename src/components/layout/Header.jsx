import { useSidebar } from './SidebarContext'
import NotificationBell from '../../features/notifications/components/NotificationBell'

function Header() {
  const { toggleMobile, toggleCollapse } = useSidebar()

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMobile}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
          aria-label="Open navigation menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          type="button"
          onClick={toggleCollapse}
          className="hidden items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50 lg:inline-flex"
          aria-label="Toggle sidebar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500">Procurement Manager</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
