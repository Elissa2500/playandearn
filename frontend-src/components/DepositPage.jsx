import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { useAuth, useLanguage } from '../App.jsx'

const DepositPage = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [amount, setAmount] = useState(50)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('mobile_money')

  const handleDeposit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('Please login first')
      return
    }

    if (amount < 50) {
      alert('Minimum deposit is 50 RWF')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/payment/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: amount,
          phone_number: phoneNumber,
          payment_method: paymentMethod
        })
      })

      const data = await response.json()

      if (response.ok) {
        // For demo purposes, simulate successful payment
        alert(`Deposit initiated! Amount: ${amount} RWF\nPhone: ${phoneNumber}\nReference: ${data.reference || 'DEMO123456'}`)
        
        // In real implementation, you would redirect to payment gateway
        // window.open(data.payment_link, '_blank')
      } else {
        alert(data.error || 'Deposit failed')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h1>
          <p className="text-gray-600">You need to login to make a deposit</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.deposit}</h1>
            <p className="text-gray-600">Add funds to your account to start playing</p>
            
            <div className="bg-gradient-to-r from-blue-500 via-yellow-400 to-green-500 rounded-lg p-4 mt-4">
              <div className="text-white">
                <div className="text-sm">Current Balance</div>
                <div className="text-2xl font-bold">{user.balance} RWF</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleDeposit}>
            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-1 gap-3">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'mobile_money' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('mobile_money')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      value="mobile_money"
                      checked={paymentMethod === 'mobile_money'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">Mobile Money</div>
                      <div className="text-sm text-gray-600">MTN Mobile Money, Airtel Money</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deposit Amount (RWF)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(50, parseInt(e.target.value) || 50))}
                min="50"
                max="1000000"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="text-sm text-gray-500 mt-1">Minimum deposit: 50 RWF</div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Select
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[100, 500, 1000, 5000].map(quickAmount => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount)}
                    className={`py-2 px-3 rounded border text-sm font-medium transition-colors ${
                      amount === quickAmount
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {quickAmount} RWF
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Money Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+250788123456"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                Enter the phone number registered with your mobile money account
              </div>
            </div>

            {/* Deposit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 text-lg"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Deposit ${amount} RWF`}
            </Button>
          </form>

          {/* Payment Info */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-3">Payment Information</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Deposits are processed instantly</li>
              <li>• Minimum deposit: 50 RWF</li>
              <li>• Maximum deposit: 1,000,000 RWF</li>
              <li>• Supported: MTN Mobile Money, Airtel Money</li>
              <li>• Secure payment processing via Flutterwave</li>
              <li>• 24/7 customer support available</li>
            </ul>
          </div>

          {/* Recent Deposits */}
          <div className="mt-8">
            <h3 className="font-bold text-gray-800 mb-3">Recent Deposits</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded">
                <span className="text-sm">+1,000 RWF</span>
                <span className="text-xs text-gray-500">Welcome Bonus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositPage

