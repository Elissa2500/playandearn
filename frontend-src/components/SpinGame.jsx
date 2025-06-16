import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { useAuth, useLanguage } from '../App.jsx'

const SpinGame = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [gameState, setGameState] = useState('waiting') // waiting, spinning, finished
  const [betAmount, setBetAmount] = useState(50)
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [gameHistory, setGameHistory] = useState([])
  const wheelRef = useRef(null)

  // Wheel segments with colors and multipliers
  const segments = [
    { multiplier: 0, color: 'bg-gray-600', label: 'LOSE' },
    { multiplier: 2, color: 'bg-blue-500', label: '2x' },
    { multiplier: 0, color: 'bg-gray-600', label: 'LOSE' },
    { multiplier: 3, color: 'bg-green-500', label: '3x' },
    { multiplier: 0, color: 'bg-gray-600', label: 'LOSE' },
    { multiplier: 5, color: 'bg-yellow-500', label: '5x' },
    { multiplier: 0, color: 'bg-gray-600', label: 'LOSE' },
    { multiplier: 6, color: 'bg-purple-500', label: '6x' },
    { multiplier: 0, color: 'bg-gray-600', label: 'LOSE' },
    { multiplier: 20, color: 'bg-red-500', label: '20x' },
    { multiplier: 0, color: 'bg-gray-600', label: 'LOSE' },
    { multiplier: 2, color: 'bg-blue-500', label: '2x' }
  ]

  const spinWheel = async () => {
    if (!user) {
      alert('Please login to play')
      return
    }

    if (betAmount > user.balance) {
      alert('Insufficient balance')
      return
    }

    setIsSpinning(true)
    setGameState('spinning')

    // Determine result (0.5% chance to win)
    const isWin = Math.random() < 0.005
    let selectedSegment

    if (isWin) {
      // Select a winning segment
      const winningSegments = segments.filter(s => s.multiplier > 0)
      selectedSegment = winningSegments[Math.floor(Math.random() * winningSegments.length)]
    } else {
      // Select a losing segment
      const losingSegments = segments.filter(s => s.multiplier === 0)
      selectedSegment = losingSegments[Math.floor(Math.random() * losingSegments.length)]
    }

    // Calculate rotation to land on selected segment
    const segmentIndex = segments.indexOf(selectedSegment)
    const segmentAngle = 360 / segments.length
    const targetAngle = segmentIndex * segmentAngle + (segmentAngle / 2)
    const spins = 5 + Math.random() * 3 // 5-8 full rotations
    const finalRotation = rotation + (spins * 360) + targetAngle

    setRotation(finalRotation)

    // Wait for animation to complete
    setTimeout(() => {
      setIsSpinning(false)
      setGameState('finished')
      setResult(selectedSegment)

      const winAmount = betAmount * selectedSegment.multiplier

      // Add to history
      setGameHistory(prev => [{
        multiplier: selectedSegment.multiplier,
        result: selectedSegment.multiplier > 0 ? 'win' : 'lose',
        bet: betAmount,
        win: winAmount,
        color: selectedSegment.color
      }, ...prev.slice(0, 9)])

      // Here you would call the backend API to process the result
      if (selectedSegment.multiplier > 0) {
        console.log(`Won ${winAmount.toFixed(0)} RWF with ${selectedSegment.multiplier}x multiplier`)
      } else {
        console.log(`Lost ${betAmount} RWF`)
      }
    }, 3000)
  }

  const resetGame = () => {
    setGameState('waiting')
    setResult(null)
    setIsSpinning(false)
  }

  return (
    <div className="bg-gradient-to-br from-green-900 via-teal-800 to-emerald-900 rounded-xl p-6 text-white min-h-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🎯 {t.spin}</h2>
        <div className="text-right">
          <div className="text-sm text-gray-300">Balance</div>
          <div className="text-lg font-bold">{user?.balance || 0} RWF</div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative flex justify-center items-center mb-6">
        {/* Wheel */}
        <div className="relative">
          <div 
            ref={wheelRef}
            className="w-64 h-64 rounded-full border-4 border-white shadow-2xl transition-transform duration-3000 ease-out"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(${segments.map((segment, index) => {
                const startAngle = (index * 360) / segments.length
                const endAngle = ((index + 1) * 360) / segments.length
                const color = segment.color.replace('bg-', '').replace('-500', '').replace('-600', '')
                const colorMap = {
                  'gray': '#6B7280',
                  'blue': '#3B82F6',
                  'green': '#10B981',
                  'yellow': '#F59E0B',
                  'purple': '#8B5CF6',
                  'red': '#EF4444'
                }
                return `${colorMap[color] || '#6B7280'} ${startAngle}deg ${endAngle}deg`
              }).join(', ')})`
            }}
          >
            {/* Segment labels */}
            {segments.map((segment, index) => {
              const angle = (index * 360) / segments.length + (360 / segments.length) / 2
              const radius = 80
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius
              
              return (
                <div
                  key={index}
                  className="absolute text-white font-bold text-sm"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`
                  }}
                >
                  {segment.label}
                </div>
              )
            })}
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="text-center mb-4">
          <div className={`inline-block px-6 py-3 rounded-lg font-bold text-xl ${result.color}`}>
            {result.multiplier > 0 ? `🎉 WON ${result.multiplier}x!` : '😞 LOST'}
          </div>
          {result.multiplier > 0 && (
            <div className="text-green-400 text-lg mt-2">
              +{(betAmount * result.multiplier).toFixed(0)} RWF
            </div>
          )}
        </div>
      )}

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
            disabled={isSpinning}
          />
        </div>
        <div className="flex items-end gap-2">
          {gameState === 'waiting' && (
            <Button 
              onClick={spinWheel}
              className="bg-green-600 hover:bg-green-700 px-6 py-2"
              disabled={!user}
            >
              Spin Now
            </Button>
          )}
          {gameState === 'spinning' && (
            <Button 
              disabled
              className="bg-gray-600 px-6 py-2"
            >
              Spinning...
            </Button>
          )}
          {gameState === 'finished' && (
            <Button 
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2"
            >
              Spin Again
            </Button>
          )}
        </div>
      </div>

      {/* Multiplier Info */}
      <div className="mb-4">
        <h3 className="text-sm font-bold mb-2 text-gray-300">Multipliers</h3>
        <div className="flex flex-wrap gap-2">
          {[2, 3, 5, 6, 20].map(mult => (
            <div key={mult} className="px-2 py-1 bg-white/10 rounded text-xs">
              {mult}x
            </div>
          ))}
        </div>
      </div>

      {/* Game History */}
      <div>
        <h3 className="text-sm font-bold mb-2 text-gray-300">Recent Spins</h3>
        <div className="flex gap-2 overflow-x-auto">
          {gameHistory.map((game, index) => (
            <div 
              key={index}
              className={`flex-shrink-0 px-3 py-1 rounded text-xs font-bold ${
                game.result === 'lose' ? 'bg-gray-600' : game.color
              }`}
            >
              {game.multiplier > 0 ? `${game.multiplier}x` : 'LOSE'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpinGame

