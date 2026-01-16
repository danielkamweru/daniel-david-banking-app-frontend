import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { userService } from '../api/services'

export default function Settings() {
  const { user, logout } = useAuth()
  const [profile, setProfile] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || ''
  })
  const [newPin, setNewPin] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isResettingPin, setIsResettingPin] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      await userService.updateProfile(profile)
      alert('Profile updated successfully!')
      window.location.reload() // Refresh to get updated user data
    } catch (error) {
      setErrors({ profile: error.response?.data?.detail || 'Failed to update profile' })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleResetPin = async (e) => {
    e.preventDefault()
    if (!/^\d{4}$/.test(newPin)) {
      setErrors({ pin: 'PIN must be 4 digits' })
      return
    }
    setIsResettingPin(true)
    try {
      await userService.resetPin({ new_pin: newPin })
      alert('PIN reset successfully!')
      setNewPin('')
    } catch (error) {
      setErrors({ pin: error.response?.data?.detail || 'Failed to reset PIN' })
    } finally {
      setIsResettingPin(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return
    }
    setIsDeleting(true)
    try {
      await userService.deleteAccount()
      alert('Account deleted successfully!')
      logout()
    } catch (error) {
      setErrors({ delete: error.response?.data?.detail || 'Failed to delete account' })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          {errors.profile && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
              {errors.profile}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={profile.first_name}
              onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={profile.last_name}
              onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? 'Updating...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
        <div className="space-y-4">
          <form onSubmit={handleResetPin} className="space-y-4">
            {errors.pin && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
                {errors.pin}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New PIN (4 digits)</label>
              <input
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Enter new 4-digit PIN"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength="4"
              />
            </div>
            <button
              type="submit"
              disabled={isResettingPin}
              className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResettingPin ? 'Resetting...' : 'Reset PIN'}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
        <h2 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h2>
        <div className="space-y-4">
          {errors.delete && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
              {errors.delete}
            </div>
          )}
          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  )
}