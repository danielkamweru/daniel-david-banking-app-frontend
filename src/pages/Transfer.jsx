import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotifications } from '../context/NotificationContext'
import { transactionService } from '../api/services'

export default function Transfer() {
  const [formData, setFormData] = useState({
    receiver_acc_number: '',
    amount: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { user, updateUser } = useAuth()
  const { addNotification } = useNotifications()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.receiver_acc_number) newErrors.receiver_acc_number = 'Recipient account number is required'
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Valid amount is required'

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      try {
        await transactionService.transfer(formData)
        await updateUser()
        addNotification({
          type: 'success',
          title: 'Transfer Successful',
          message: 'KSH ' + formData.amount + ' transferred successfully. Confirmation email sent.'
        })
        alert('Transfer successful!')
        setFormData({ receiver_acc_number: '', amount: '' })
      } catch (error) {
        setErrors({ general: error.response?.data?.detail || 'Transfer failed. Please try again.' })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Transfer Money</h1>

      {user?.account && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-800">
            From: {user.first_name} {user.last_name} - Account: {user.account.account_number} - Balance: ${user.account.initial_balance.toFixed(2)}
          </p>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errors.general}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Account Number</label>
            <input
              type="text"
              name="receiver_acc_number"
              value={formData.receiver_acc_number}
              onChange={handleChange}
              placeholder="Enter recipient's account number"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.receiver_acc_number ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.receiver_acc_number && <p className="mt-1 text-sm text-red-600">{errors.receiver_acc_number}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500">KSH</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Transfer Money'}
          </button>
        </form>
      </div>
    </div>
  )
}