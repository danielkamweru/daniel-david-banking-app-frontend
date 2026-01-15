import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const location = useLocation()
  const { logout } = useAuth()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/accounts', label: 'Accounts' },
    { path: '/transfer', label: 'Transfer' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/settings', label: 'Settings' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 bg-[#0A192F] border-r border-white/10 min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-[#64FFDA] border-2 border-amber-600">BankApp</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-[#64FFDA]/10 text-[#64FFDA] font-medium'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}