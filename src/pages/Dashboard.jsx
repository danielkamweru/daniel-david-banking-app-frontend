import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { transactionService } from '../api/services'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.account) {
      setAccounts([{
        id: 1,
        name: 'Main Account',
        balance: user.account.initial_balance,
        type: 'checking',
        number: user.account.account_number.slice(-4).padStart(user.account.account_number.length, '*')
      }])
    }
  }, [user])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await transactionService.getAll()
        // Transform transactions to match the expected format
        const transformed = transactions.slice(0, 4).map(t => ({
          id: t.id,
          description: t.transaction_type === 'DEPOSIT' ? 'Deposit' : t.transaction_type === 'TRANSFER' ? 'Transfer' : 'Transaction',
          amount: t.transaction_type === 'DEPOSIT' ? t.amount : -t.amount,
          date: new Date(t.timestamp).toLocaleDateString(),
          type: t.transaction_type === 'DEPOSIT' ? 'credit' : 'debit'
        }))
        setRecentTransactions(transformed)
      } catch (error) {
        console.error('Failed to fetch transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-[#64FFDA] to-[#4ECDC4] text-[#0A192F] p-6 rounded-xl shadow-lg">
          <p className="text-[#0A192F]/70 text-sm font-medium">Total Balance</p>
          <h3 className="text-3xl font-bold mt-2">KSH {totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          <p className="text-[#0A192F]/70 text-sm mt-2">Across all accounts</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Monthly Income</p>
          <h3 className="text-3xl font-bold text-white mt-2">KSH 5,000.00</h3>
          <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Monthly Expenses</p>
          <h3 className="text-3xl font-bold text-white mt-2">KSH 2,315.49</h3>
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
                  <p className="font-semibold text-white">KSH {account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
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
                  {transaction.amount > 0 ? '+' : ''}KSH {Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={() => navigate('/transfer')} className="p-4 border-2 border-white/10 rounded-lg hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 transition-colors">
            <span className="text-sm font-medium text-white">Transfer Money</span>
          </button>
          <button onClick={() => navigate('/settings')} className="p-4 border-2 border-white/10 rounded-lg hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 transition-colors">
            <span className="text-sm font-medium text-white">Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}