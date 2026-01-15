import { useState } from 'react'

export default function Transactions() {
  const [filter, setFilter] = useState('all')
  const [transactions] = useState([
    { id: 1, description: 'Salary Deposit', amount: 5000, date: '2024-01-10', type: 'credit', category: 'Income' },
    { id: 2, description: 'Grocery Store', amount: -125.50, date: '2024-01-09', type: 'debit', category: 'Food' },
    { id: 3, description: 'Electric Bill', amount: -89.99, date: '2024-01-08', type: 'debit', category: 'Utilities' },
    { id: 4, description: 'Transfer to Savings', amount: -500, date: '2024-01-07', type: 'debit', category: 'Transfer' },
    { id: 5, description: 'Online Shopping', amount: -249.99, date: '2024-01-06', type: 'debit', category: 'Shopping' },
    { id: 6, description: 'Freelance Payment', amount: 1200, date: '2024-01-05', type: 'credit', category: 'Income' },
  ])

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter)

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('credit')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'credit' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilter('debit')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'debit' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Expenses
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.description}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-semibold text-right ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}