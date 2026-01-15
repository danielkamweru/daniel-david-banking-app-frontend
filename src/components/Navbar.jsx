import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-[#0A192F] border-b border-white/10 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">Welcome back, {user?.name || 'User'}</h2>
          <p className="text-sm text-gray-400">Manage your finances with ease</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <span className="text-sm text-gray-300">Notifications</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#64FFDA] rounded-full flex items-center justify-center text-[#0A192F] font-semibold">
              {user?.name?.[0] || 'U'}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}