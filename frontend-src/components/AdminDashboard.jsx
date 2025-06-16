import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { useLanguage } from '../App.jsx'

const AdminDashboard = () => {
  const { t } = useLanguage()
  const [adminUser, setAdminUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [transactions, setTransactions] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalGames: 0
  })

  // Demo admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'PlayEarn2024!'
  }

  const handleAdminLogin = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get('username')
    const password = formData.get('password')

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setAdminUser({ username, role: 'admin' })
      setShowLoginModal(false)
      loadDashboardData()
    } else {
      alert('Invalid admin credentials')
    }
  }

  const loadDashboardData = () => {
    // Demo data - in real app, this would come from API
    setUsers([
      {
        id: 1,
        phone: '+250788123456',
        balance: 15000,
        totalDeposited: 25000,
        totalWithdrawn: 10000,
        gamesPlayed: 45,
        status: 'active',
        joinedAt: '2024-06-01'
      },
      {
        id: 2,
        phone: '+250789654321',
        balance: 8500,
        totalDeposited: 15000,
        totalWithdrawn: 6500,
        gamesPlayed: 32,
        status: 'active',
        joinedAt: '2024-06-05'
      },
      {
        id: 3,
        phone: '+250787456123',
        balance: 2300,
        totalDeposited: 8000,
        totalWithdrawn: 5700,
        gamesPlayed: 28,
        status: 'suspended',
        joinedAt: '2024-06-10'
      }
    ])

    setTransactions([
      {
        id: 1,
        userId: 1,
        type: 'deposit',
        amount: 5000,
        status: 'completed',
        method: 'mobile_money',
        createdAt: '2024-06-14 10:30:00'
      },
      {
        id: 2,
        userId: 2,
        type: 'withdrawal',
        amount: 3000,
        status: 'pending',
        method: 'mobile_money',
        createdAt: '2024-06-14 09:15:00'
      },
      {
        id: 3,
        userId: 1,
        type: 'game_win',
        amount: 2500,
        status: 'completed',
        method: 'aviator',
        createdAt: '2024-06-14 08:45:00'
      }
    ])

    setStats({
      totalUsers: 156,
      totalDeposits: 2450000,
      totalWithdrawals: 1890000,
      totalGames: 3420
    })
  }

  const handleUserAction = (userId, action) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: action === 'suspend' ? 'suspended' : 'active' }
        : user
    ))
    alert(`User ${action}ed successfully`)
  }

  const handleTransactionAction = (transactionId, action) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === transactionId
        ? { ...transaction, status: action }
        : transaction
    ))
    alert(`Transaction ${action}ed successfully`)
  }

  if (showLoginModal) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">Play And Earn Dashboard</p>
          </div>

          <form onSubmit={handleAdminLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
              Login to Dashboard
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">Demo Credentials:</h3>
            <p className="text-sm text-gray-600">Username: <strong>admin</strong></p>
            <p className="text-sm text-gray-600">Password: <strong>PlayEarn2024!</strong></p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Play And Earn Admin</h1>
              <p className="text-gray-600">Dashboard & Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {adminUser.username}</span>
              <Button 
                onClick={() => {
                  setAdminUser(null)
                  setShowLoginModal(true)
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'users', label: 'Users', icon: '👥' },
                { id: 'transactions', label: 'Transactions', icon: '💰' },
                { id: 'games', label: 'Games', icon: '🎮' },
                { id: 'settings', label: 'Settings', icon: '⚙️' }
              ].map(tab => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Deposits</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalDeposits.toLocaleString()} RWF</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <span className="text-2xl">📤</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Withdrawals</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalWithdrawals.toLocaleString()} RWF</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <span className="text-2xl">🎮</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Games Played</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalGames}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">New user registered</p>
                        <p className="text-sm text-gray-600">+250788123456</p>
                      </div>
                      <span className="text-sm text-gray-500">2 minutes ago</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">Deposit completed</p>
                        <p className="text-sm text-gray-600">5,000 RWF via Mobile Money</p>
                      </div>
                      <span className="text-sm text-gray-500">5 minutes ago</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">Big win on Aviator</p>
                        <p className="text-sm text-gray-600">User won 15,000 RWF</p>
                      </div>
                      <span className="text-sm text-gray-500">8 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deposited</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Withdrawn</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Games</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-800">{user.phone}</p>
                              <p className="text-sm text-gray-600">Joined: {user.joinedAt}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-800">{user.balance.toLocaleString()} RWF</td>
                          <td className="px-6 py-4 text-gray-800">{user.totalDeposited.toLocaleString()} RWF</td>
                          <td className="px-6 py-4 text-gray-800">{user.totalWithdrawn.toLocaleString()} RWF</td>
                          <td className="px-6 py-4 text-gray-800">{user.gamesPlayed}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                                className={user.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                              >
                                {user.status === 'active' ? 'Suspend' : 'Activate'}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction Management</h2>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map(transaction => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 text-gray-800">#{transaction.id}</td>
                          <td className="px-6 py-4 text-gray-800">User {transaction.userId}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              transaction.type === 'deposit' ? 'bg-green-100 text-green-800' :
                              transaction.type === 'withdrawal' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-800">{transaction.amount.toLocaleString()} RWF</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-800">{transaction.createdAt}</td>
                          <td className="px-6 py-4">
                            {transaction.status === 'pending' && (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleTransactionAction(transaction.id, 'completed')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleTransactionAction(transaction.id, 'failed')}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'games' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Game Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Aviator Game</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Plays:</span>
                      <span>1,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Winnings:</span>
                      <span>456,000 RWF</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Win Rate:</span>
                      <span>0.5%</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Manage Settings
                  </Button>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Spin Game</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Plays:</span>
                      <span>1,573</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Winnings:</span>
                      <span>389,000 RWF</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Win Rate:</span>
                      <span>0.5%</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Manage Settings
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Deposit (RWF)
                      </label>
                      <input
                        type="number"
                        defaultValue="50"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Withdrawal (RWF)
                      </label>
                      <input
                        type="number"
                        defaultValue="100"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Game Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Win Chance (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        defaultValue="0.5"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Multiplier
                      </label>
                      <input
                        type="number"
                        defaultValue="20"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Settings
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard

