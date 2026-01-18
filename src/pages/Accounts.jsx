import { useToast } from '../context/ToastContext'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotifications } from '../context/NotificationContext'
import { transactionService } from '../api/services'

export default function Accounts() {
  const { user, updateUser } = useAuth()
  const { showToast } = useToast()
  const [depositAmount, setDepositAmount] = useState('')
  const [isDepositing, setIsDepositing] = useState(false)
  const [errors, setErrors] = useState({})
  const { addNotification } = useNotifications()

  const handleDeposit = async (e) => {
    e.preventDefault()
    const amount = parseFloat(depositAmount)
    if (!amount || amount <= 0) {
      setErrors({ deposit: 'Please enter a valid amount' })
      return
    }
    setIsDepositing(true)
    try {
      await transactionService.deposit({ amount })
      await updateUser()
      addNotification({
        type: 'success',
        title: 'Deposit Successful',
        message: 'KSH ' + amount + ' deposited successfully. Confirmation email sent.'
      })
      showToast({ title: 'Deposit Successful', message: 'Deposit completed successfully.', type: 'success' })
      setDepositAmount('')
    } catch (error) {
      setErrors({ deposit: error.response?.data?.detail || 'Deposit failed' })
    } finally {
      setIsDepositing(false)
    }
  }

  if (!user?.account) {
    return <div className="p-6">Loading account information...</div>
  }

  const account = user.account

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Bank Account</p>
              <h3 className="text-lg font-semibold text-gray-900">{user.first_name} {user.last_name}'s Account</h3>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">KSH {account.initial_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-500 mb-4">Account: {account.account_number}</p>
          {/* Actions removed per request */}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deposit Funds</h3>
          <form onSubmit={handleDeposit} className="space-y-4">
            {errors.deposit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                {errors.deposit}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">KSH</span>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isDepositing}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDepositing ? 'Depositing...' : 'Deposit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}