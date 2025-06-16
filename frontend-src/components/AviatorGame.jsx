import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { useAuth, useLanguage } from '../App.jsx'

const AviatorGame = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [gameState, setGameState] = useState('waiting') // waiting, flying, crashed, cashed_out
  const [multiplier, setMultiplier] = useState(1.0)
  const [betAmount, setBetAmount] = useState(50)
  const [isPlaying, setIsPlaying] = useState(false)
  const [crashPoint, setCrashPoint] = useState(0)
  const [cashOutPoint, setCashOutPoint] = useState(0)
  const [gameHistory, setGameHistory] = useState([])
  const [planePosition, setPlanePosition] = useState({ x: 0, y: 50 })
  const intervalRef = useRef(null)

  const startGame = async () => {
    if (!user) {
      alert('Please login to play')
      return
    }

    if (betAmount > user.balance) {
      alert('Insufficient balance')
      return
    }

    setIsPlaying(true)
    setGameState('flying')
    setMultiplier(1.0)
    setPlanePosition({ x: 0, y: 50 })

    // Generate random crash point (1.0 to 10.0)
    const crash = Math.random() * 9 + 1
    setCrashPoint(crash)

    // Animate the game
    let currentMultiplier = 1.0
    let position = { x: 0, y: 50 }

    intervalRef.current = setInterval(() => {
      currentMultiplier += 0.01
      position.x += 2
      position.y -= 0.5

      setMultiplier(currentMultiplier)
      setPlanePosition(position)

      // Check if crashed
      if (currentMultiplier >= crash) {
        setGameState('crashed')
        setIsPlaying(false)
        clearInterval(intervalRef.current)
        
        // Add to history
        setGameHistory(prev => [{
          multiplier: crash,
          result: 'crashed',
          bet: betAmount,
          win: 0
        }, ...prev.slice(0, 9)])
      }
    }, 100)
  }

  const cashOut = () => {
    if (gameState === 'flying') {
      setGameState('cashed_out')
      setCashOutPoint(multiplier)
      setIsPlaying(false)
      clearInterval(intervalRef.current)

      const winAmount = betAmount * multiplier

      // Add to history
      setGameHistory(prev => [{
        multiplier: multiplier,
        result: 'cashed_out',
        bet: betAmount,
        win: winAmount
      }, ...prev.slice(0, 9)])

      // Here you would call the backend API to process the win
      console.log(`Cashed out at ${multiplier.toFixed(2)}x for ${winAmount.toFixed(0)} RWF`)
    }
  }

  const resetGame = () => {
    setGameState('waiting')
    setMultiplier(1.0)
    setIsPlaying(false)
    setCrashPoint(0)
    setCashOutPoint(0)
    setPlanePosition({ x: 0, y: 50 })
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 rounded-xl p-6 text-white min-h-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">✈️ {t.aviator}</h2>
        <div className="text-right">
          <div className="text-sm text-gray-300">Balance</div>
          <div className="text-lg font-bold">{user?.balance || 0} RWF</div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative bg-black/30 rounded-lg h-64 mb-4 overflow-hidden">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-blue-400"></div>
        
        {/* Clouds */}
        <div className="absolute top-4 left-10 text-white/30 text-2xl">☁️</div>
        <div className="absolute top-8 right-20 text-white/30 text-xl">☁️</div>
        <div className="absolute top-16 left-1/3 text-white/30 text-lg">☁️</div>

        {/* Plane */}
        <div 
          className={`absolute transition-all duration-100 text-2xl ${gameState === 'crashed' ? 'animate-bounce' : ''}`}
          style={{
            left: `${Math.min(planePosition.x, 90)}%`,
            top: `${Math.max(planePosition.y, 10)}%`,
            transform: gameState === 'crashed' ? 'rotate(45deg)' : 'rotate(-10deg)'
          }}
        >
          {gameState === 'crashed' ? '💥' : '✈️'}
        </div>

        {/* Multiplier Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-6xl font-bold ${gameState === 'crashed' ? 'text-red-400' : gameState === 'cashed_out' ? 'text-green-400' : 'text-yellow-400'}`}>
            {multiplier.toFixed(2)}x
          </div>
        </div>

        {/* Game Status */}
        <div className="absolute bottom-4 left-4">
          {gameState === 'crashed' && (
            <div className="text-red-400 font-bold">CRASHED at {crashPoint.toFixed(2)}x</div>
          )}
          {gameState === 'cashed_out' && (
            <div className="text-green-400 font-bold">CASHED OUT at {cashOutPoint.toFixed(2)}x</div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-300 mb-1">Bet Amount (RWF)</label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Math.max(50, parseInt(e.target.value) || 50))}
            min="50"
            max={user?.balance || 1000}
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
            disabled={isPlaying}
          />
        </div>
        <div className="flex items-end gap-2">
          {gameState === 'waiting' && (
            <Button 
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 px-6 py-2"
              disabled={!user}
            >
              Bet & Fly
            </Button>
          )}
          {gameState === 'flying' && (
            <Button 
              onClick={cashOut}
              className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 animate-pulse"
            >
              Cash Out
            </Button>
          )}
          {(gameState === 'crashed' || gameState === 'cashed_out') && (
            <Button 
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2"
            >
              Play Again
            </Button>
          )}
        </div>
      </div>

      {/* Game History */}
      <div>
        <h3 className="text-sm font-bold mb-2 text-gray-300">Recent Games</h3>
        <div className="flex gap-2 overflow-x-auto">
          {gameHistory.map((game, index) => (
            <div 
              key={index}
              className={`flex-shrink-0 px-3 py-1 rounded text-xs font-bold ${
                game.result === 'crashed' ? 'bg-red-600' : 'bg-green-600'
              }`}
            >
              {game.multiplier.toFixed(2)}x
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AviatorGame

