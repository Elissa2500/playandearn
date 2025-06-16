import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import GamesPage from './components/GamesPage.jsx'
import DepositPage from './components/DepositPage.jsx'
import AdsSection from './components/AdsSection.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import './App.css'

// Language Context
const LanguageContext = createContext()

// Translation data
const translations = {
  en: {
    appName: 'Play And Earn',
    tagline: 'Rwanda\'s Premier Gaming Platform',
    login: 'Login',
    register: 'Register',
    home: 'Home',
    games: 'Games',
    deposit: 'Deposit',
    withdraw: 'Withdraw',
    profile: 'Profile',
    balance: 'Balance',
    phoneNumber: 'Phone Number',
    password: 'Password',
    playNow: 'Play Now',
    testimonials: 'Success Stories',
    aviator: 'Aviator',
    spin: 'Spin Game',
    minDeposit: 'Minimum deposit: 50 RWF',
    winChance: '0.5% win chance with multipliers up to 20x!',
    language: 'Language',
    
    // Ads and Live Updates
    liveUpdates: 'Live Updates',
    successStory1Title: 'Big Win Alert!',
    successStory1Content: 'Just won big on Aviator game with 15x multiplier!',
    depositPromoTitle: 'Welcome Bonus',
    depositPromoContent: 'Get instant bonus when you make your first deposit!',
    withdrawalSuccessTitle: 'Withdrawal Success',
    withdrawalSuccessContent: 'Fast and secure withdrawal completed successfully!',
    bigWinTitle: 'Jackpot Winner!',
    bigWinContent: 'Amazing 20x win on Spin Game! Could you be next?',
    verified: 'Verified',
    live: 'LIVE',
    won: 'won',
    deposited: 'deposited',
    withdrew: 'withdrew',
    
    // Enhanced testimonials
    testimonial1: 'I started with just 500 RWF and now I have won over 50,000 RWF! The games are fair and withdrawals are instant.',
    testimonial2: 'Play And Earn changed my life! I can now support my family with my winnings. Thank you!',
    testimonial3: 'Fast deposits, fair games, and quick withdrawals. This is the best gaming platform in Rwanda!',
    
    // Game instructions
    howToPlay: 'How to Play',
    aviatorInstructions: 'Watch the plane fly higher and cash out before it crashes. The higher it goes, the bigger your win!',
    spinInstructions: 'Spin the colorful wheel and win amazing multipliers. Every spin could be your lucky one!',
    
    // Footer
    madeInRwanda: 'Made in Rwanda',
    safeSecure: 'Safe & Secure',
    customerSupport: '24/7 Customer Support'
  },
  rw: {
    appName: 'Gukina no Kwinjiza',
    tagline: 'Urubuga rukomeye rw\'imikino mu Rwanda',
    login: 'Kwinjira',
    register: 'Kwiyandikisha',
    home: 'Ahabanza',
    games: 'Imikino',
    deposit: 'Gushyira Amafaranga',
    withdraw: 'Gukura Amafaranga',
    profile: 'Umwirondoro',
    balance: 'Amafaranga',
    phoneNumber: 'Nimero ya Telefoni',
    password: 'Ijambo ry\'ibanga',
    playNow: 'Gukina Ubu',
    testimonials: 'Inkuru z\'Intsinzi',
    aviator: 'Aviator',
    spin: 'Umukino wo Kuzenguruka',
    minDeposit: 'Amafaranga make: 50 RWF',
    winChance: '0.5% amahirwe yo gutsinda hamwe n\'inyongera zigera kuri 20x!',
    language: 'Ururimi',
    
    // Ads and Live Updates
    liveUpdates: 'Amakuru Mashya',
    successStory1Title: 'Intsinzi Nini!',
    successStory1Content: 'Yaratsinze cyane ku mukino wa Aviator hamwe na 15x!',
    depositPromoTitle: 'Ikado ryo Kwakira',
    depositPromoContent: 'Boneka ikado ako kanya iyo ushyize amafaranga bwa mbere!',
    withdrawalSuccessTitle: 'Gukura Byagenze Neza',
    withdrawalSuccessContent: 'Gukura amafaranga byihuse kandi bitibazo byarangiye neza!',
    bigWinTitle: 'Uwatsinze Jackpot!',
    bigWinContent: 'Intsinzi idasanzwe ya 20x ku mukino wo kuzenguruka! Wowe ushobora kuba ukurikira?',
    verified: 'Byemejwe',
    live: 'UBUNGUBU',
    won: 'yatsinze',
    deposited: 'yashyize',
    withdrew: 'yakuye',
    
    // Enhanced testimonials
    testimonial1: 'Natangiye n\'amafaranga 500 RWF gusa ubu naratsinze arenga 50,000 RWF! Imikino ni myiza kandi gukura amafaranga ni ako kanya.',
    testimonial2: 'Gukina no Kwinjiza byahinduye ubuzima bwanjye! Ubu nshobora gutera inkunga umuryango wanjye n\'ayo natsinze. Murakoze!',
    testimonial3: 'Gushyira amafaranga byihuse, imikino myiza, no gukura amafaranga vuba. Uru ni urubuga rukomeye rw\'imikino mu Rwanda!',
    
    // Game instructions
    howToPlay: 'Uburyo bwo Gukina',
    aviatorInstructions: 'Reba indege igenda hejuru ukagura mbere y\'uko igwa. Uko igenda hejuru ni ko watsinza byinshi!',
    spinInstructions: 'Zenguruka uruziga rw\'amabara ukatsinde inyongera zidasanzwe. Buri kuzenguruka gushobora kuba amahirwe yawe!',
    
    // Footer
    madeInRwanda: 'Byakozwe mu Rwanda',
    safeSecure: 'Bitibazo kandi Bifite Umutekano',
    customerSupport: 'Ubufasha bw\'Abakiriya 24/7'
  }
}

// Language Hook
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Auth Context
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Login Modal Component
const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { t } = useLanguage()
  const { login } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // For demo purposes, create a mock user
      const mockUser = {
        id: 1,
        phone_number: phoneNumber,
        balance: 1000,
        total_deposited: 0,
        total_withdrawn: 0,
        total_winnings: 0
      }
      
      login(mockUser)
      onClose()
      alert('Login successful! (Demo mode)')
    } catch (error) {
      alert('Login failed. Please try again.')
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

// Register Modal Component
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
      // For demo purposes, create a mock user
      const mockUser = {
        id: Date.now(),
        phone_number: phoneNumber,
        balance: 1000, // Welcome bonus
        total_deposited: 0,
        total_withdrawn: 0,
        total_winnings: 0
      }
      
      login(mockUser)
      onClose()
      alert('Registration successful! Welcome bonus: 1000 RWF (Demo mode)')
    } catch (error) {
      alert('Registration failed. Please try again.')
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

// Components
const Header = ({ onLoginClick, onRegisterClick }) => {
  const { t, language, setLanguage } = useLanguage()
  const { user, logout } = useAuth()

  return (
    <header className="bg-gradient-to-r from-blue-600 via-green-500 to-yellow-400 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="flex space-x-1">
              <div className="w-6 h-4 bg-blue-500 rounded-sm"></div>
              <div className="w-6 h-4 bg-yellow-400 rounded-sm"></div>
              <div className="w-6 h-4 bg-green-500 rounded-sm"></div>
            </div>
            <h1 className="text-2xl font-bold">{t.appName}</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-yellow-200 transition-colors">{t.home}</Link>
            <Link to="/games" className="hover:text-yellow-200 transition-colors">{t.games}</Link>
            {user && (
              <>
                <Link to="/deposit" className="hover:text-yellow-200 transition-colors">{t.deposit}</Link>
                <a href="#profile" className="hover:text-yellow-200 transition-colors">{t.profile}</a>
              </>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm"
            >
              <option value="en">EN</option>
              <option value="rw">RW</option>
            </select>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">{t.balance}: {user.balance} RWF</span>
                <Button onClick={logout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={onLoginClick} variant="outline" size="sm">{t.login}</Button>
                <Button onClick={onRegisterClick} size="sm">{t.register}</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-purple-800 to-green-700 text-white py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/hero-gaming-rwanda.jpg" 
          alt="Gaming Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-coins">
          <div className="coin coin-1">💰</div>
          <div className="coin coin-2">🎮</div>
          <div className="coin coin-3">⚽</div>
          <div className="coin coin-4">💎</div>
          <div className="coin coin-5">🏆</div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            <div className="w-12 h-8 bg-blue-500 rounded shadow-lg"></div>
            <div className="w-12 h-8 bg-yellow-400 rounded shadow-lg"></div>
            <div className="w-12 h-8 bg-green-500 rounded shadow-lg"></div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
          {t.appName}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 drop-shadow-md">
          {t.tagline}
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-12">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-transform">
            <div className="text-3xl font-bold text-yellow-400">⚽</div>
            <p className="text-sm mt-2">Sports Themed</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-transform">
            <div className="text-3xl font-bold text-green-400">🎮</div>
            <p className="text-sm mt-2">Gaming Fun</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-transform">
            <div className="text-3xl font-bold text-blue-400">💰</div>
            <p className="text-sm mt-2">Real Winnings</p>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto mb-8 shadow-xl">
          <p className="text-lg mb-2">{t.minDeposit}</p>
          <p className="text-sm text-gray-300">{t.winChance}</p>
        </div>
        
        <Link to="/games">
          <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-green-500 text-black font-bold px-8 py-4 text-lg hover:scale-105 transition-transform shadow-xl">
            {t.playNow}
          </Button>
        </Link>
      </div>
      
      {/* Rwanda Flag Elements */}
      <div className="absolute top-4 left-4 opacity-30">
        <span className="text-6xl">🇷🇼</span>
      </div>
      <div className="absolute bottom-4 right-4 opacity-30">
        <span className="text-6xl">🇷🇼</span>
      </div>
    </section>
  )
}

const GameCard = ({ title, description, icon, color, image }) => {
  const { t } = useLanguage()
  
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-xl hover:scale-105 transition-transform cursor-pointer relative overflow-hidden`}>
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 opacity-20">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="relative z-10">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-200 mb-4">{description}</p>
        <Link to="/games">
          <Button className="w-full bg-white/20 hover:bg-white/30 border-white/30 backdrop-blur-sm">
            {t.playNow}
          </Button>
        </Link>
      </div>
    </div>
  )
}

const Games = () => {
  const { t } = useLanguage()
  
  return (
    <section id="games" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">{t.games}</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <GameCard
            title={t.aviator}
            description="Watch the plane fly and cash out before it crashes! Multipliers up to 10x!"
            icon="✈️"
            color="from-blue-500 to-purple-600"
            image="/aviator-game-icon.jpg"
          />
          
          <GameCard
            title={t.spin}
            description="Spin the colorful wheel for amazing multipliers: 2x, 3x, 5x, 6x, 20x!"
            icon="🎯"
            color="from-green-500 to-teal-600"
            image="/spin-game-icon.jpg"
          />
        </div>
      </div>
    </section>
  )
}

const Testimonials = () => {
  const { t } = useLanguage()
  
  const testimonials = [
    {
      name: "Jean Baptiste",
      phone: "0788****12",
      message: "I started with 1000 RWF and won 25,000 RWF on Aviator! This platform is amazing!",
      amount: "25,000 RWF"
    },
    {
      name: "Marie Uwimana", 
      phone: "0789****45",
      message: "Fast withdrawals and fair games. I have withdrawn over 50,000 RWF so far!",
      amount: "50,000 RWF"
    },
    {
      name: "Patrick Nzeyimana",
      phone: "0790****78", 
      message: "The spin game gave me 20x multiplier! Deposited 500 RWF, won 10,000 RWF!",
      amount: "10,000 RWF"
    }
  ]
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">{t.testimonials}</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.phone}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.message}"</p>
              <div className="text-green-600 font-bold text-lg">Won: {testimonial.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            <div className="w-8 h-6 bg-blue-500 rounded"></div>
            <div className="w-8 h-6 bg-yellow-400 rounded"></div>
            <div className="w-8 h-6 bg-green-500 rounded"></div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{t.appName}</h3>
          <p className="text-gray-400 mb-8">{t.tagline}</p>
          
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>© 2024 Play And Earn</span>
            <span>Made in Rwanda 🇷🇼</span>
            <span>Safe & Secure</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Games />
      <AdsSection />
      <Testimonials />
    </div>
  )
}

function App() {
  const [language, setLanguage] = useState('en')
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const t = translations[language]

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      <AuthContext.Provider value={{ user, login, logout }}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header 
              onLoginClick={() => setShowLoginModal(true)}
              onRegisterClick={() => setShowRegisterModal(true)}
            />
            
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/deposit" element={<DepositPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            
            <Footer />

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
        </Router>
      </AuthContext.Provider>
    </LanguageContext.Provider>
  )
}

export default App
