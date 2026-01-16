import { useState, useEffect } from 'react'
import { transactionService } from '../api/services'

export default function Transactions() {
  const [filter, setFilter] = useState('all')
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionService.getAll()
        setTransactions(response.data)
      } catch (error) {
        console.error('Failed to fetch transactions:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(t => {
        if (filter === 'credit') return t.transaction_type === 'DEPOSIT'
        if (filter === 'debit') return t.transaction_type === 'TRANSFER'
        return true
      })

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString()
  }

  const getTransactionDescription = (transaction) => {
    if (transaction.transaction_type === 'DEPOSIT') {
      return 'Deposit'
    } else {
      return `Transfer to ${transaction.receiver_id || 'Unknown'}`
    }
  }

  if (loading) {
    return <div className="p-6">Loading transactions...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('credit')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'credit' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Deposits
          </button>
          <button
            onClick={() => setFilter('debit')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'debit' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Transfers
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Reference</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(transaction.timestamp)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{getTransactionDescription(transaction)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {transaction.reference_code}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-semibold text-right ${
                    transaction.transaction_type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.transaction_type === 'DEPOSIT' ? '+' : '-'}KSH {transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}