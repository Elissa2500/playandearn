import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { useAuth, useLanguage } from '../App.jsx'
import AviatorGame from '../components/AviatorGame.jsx'
import SpinGame from '../components/SpinGame.jsx'

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { t, language } = useLanguage()
  const { login } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          password: password
        })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        login(data.user)
        onClose()
      } else {
        alert(data.error || 'Login failed')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{t.login}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.phoneNumber}
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+250788123456"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full mb-4"
            disabled={loading}
          >
            {loading ? 'Logging in...' : t.login}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button 
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {t.register}
          </button>
        </div>
      </div>
    </div>
  )
}

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { t } = useLanguage()
  const { login } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          password: password
        })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        login(data.user)
        onClose()
      } else {
        alert(data.error || 'Registration failed')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{t.register}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.phoneNumber}
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+250788123456"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full mb-4"
            disabled={loading}
          >
            {loading ? 'Creating account...' : t.register}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button 
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {t.login}
          </button>
        </div>
      </div>
    </div>
  )
}

const GamesPage = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const handlePlayClick = () => {
    if (!user) {
      setShowLoginModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t.games}</h1>
          <p className="text-gray-600">Choose your game and start winning!</p>
          
          {!user && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mt-4">
              Please login to start playing games
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Aviator Game */}
          <div onClick={handlePlayClick}>
            <AviatorGame />
          </div>

          {/* Spin Game */}
          <div onClick={handlePlayClick}>
            <SpinGame />
          </div>
        </div>

        {/* Game Instructions */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How to Play</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-blue-600 mb-3">✈️ Aviator</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Place your bet (minimum 50 RWF)</li>
                <li>• Watch the plane take off</li>
                <li>• Cash out before it crashes</li>
                <li>• The longer you wait, the higher the multiplier</li>
                <li>• But be careful - it can crash anytime!</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-green-600 mb-3">🎯 Spin Game</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Place your bet (minimum 50 RWF)</li>
                <li>• Spin the colorful wheel</li>
                <li>• Win with multipliers: 2x, 3x, 5x, 6x, 20x</li>
                <li>• 0.5% chance to win on each spin</li>
                <li>• Instant results - no waiting!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false)
          setShowRegisterModal(true)
        }}
      />

      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false)
          setShowLoginModal(true)
        }}
      />
    </div>
  )
}

export default GamesPage

