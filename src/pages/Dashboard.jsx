import { useState } from 'react'

export default function Dashboard() {
  const [accounts] = useState([
    { id: 1, name: 'Checking Account', balance: 12450.50, type: 'checking', number: '****4521' },
    { id: 2, name: 'Savings Account', balance: 28900.00, type: 'savings', number: '****7832' },
  ])

  const [recentTransactions] = useState([
    { id: 1, description: 'Salary Deposit', amount: 5000, date: '2024-01-10', type: 'credit' },
    { id: 2, description: 'Grocery Store', amount: -125.50, date: '2024-01-09', type: 'debit' },
    { id: 3, description: 'Electric Bill', amount: -89.99, date: '2024-01-08', type: 'debit' },
    { id: 4, description: 'Transfer to Savings', amount: -500, date: '2024-01-07', type: 'debit' },
  ])

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-[#64FFDA] to-[#4ECDC4] text-[#0A192F] p-6 rounded-xl shadow-lg">
          <p className="text-[#0A192F]/70 text-sm font-medium">Total Balance</p>
          <h3 className="text-3xl font-bold mt-2">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          <p className="text-[#0A192F]/70 text-sm mt-2">Across all accounts</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Monthly Income</p>
          <h3 className="text-3xl font-bold text-white mt-2">$5,000.00</h3>
          <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Monthly Expenses</p>
          <h3 className="text-3xl font-bold text-white mt-2">$2,315.49</h3>
          <p className="text-red-400 text-sm mt-2">↑ 8% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Your Accounts</h3>
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium text-white">{account.name}</p>
                  <p className="text-sm text-gray-400">{account.number}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-gray-400 capitalize">{account.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                <div>
                  <p className="font-medium text-white">{transaction.description}</p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
                <p className={`font-semibold ${transaction.type === 'credit' ? 'text-green-400' : 'text-white'}`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-white/10 rounded-lg hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 transition-colors">
            <span className="text-sm font-medium text-white">Transfer Money</span>
          </button>
          <button className="p-4 border-2 border-white/10 rounded-lg hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 transition-colors">
            <span className="text-sm font-medium text-white">Pay Bills</span>
          </button>
          <button className="p-4 border-2 border-white/10 rounded-lg hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 transition-colors">
            <span className="text-sm font-medium text-white">View Reports</span>
          </button>
          <button className="p-4 border-2 border-white/10 rounded-lg hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 transition-colors">
            <span className="text-sm font-medium text-white">Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}