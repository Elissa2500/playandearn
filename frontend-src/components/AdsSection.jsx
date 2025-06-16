import { useState } from 'react'
import { useLanguage } from '../App.jsx'

const AdsSection = () => {
  const { t } = useLanguage()
  
  const ads = [
    {
      id: 1,
      type: 'success_story',
      title: t.successStory1Title,
      content: t.successStory1Content,
      amount: '45,000 RWF',
      user: 'Jean Claude M.',
      image: '🎉',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      type: 'deposit_promo',
      title: t.depositPromoTitle,
      content: t.depositPromoContent,
      amount: '1,000 RWF',
      user: 'New Users',
      image: '💰',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      type: 'withdrawal_success',
      title: t.withdrawalSuccessTitle,
      content: t.withdrawalSuccessContent,
      amount: '25,000 RWF',
      user: 'Marie U.',
      image: '✅',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 4,
      type: 'big_win',
      title: t.bigWinTitle,
      content: t.bigWinContent,
      amount: '100,000 RWF',
      user: 'Patrick N.',
      image: '🚀',
      color: 'from-yellow-500 to-orange-600'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          {t.liveUpdates}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ads.map((ad) => (
            <div 
              key={ad.id}
              className={`bg-gradient-to-br ${ad.color} rounded-xl p-6 text-white shadow-xl hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-4xl mb-4 text-center">{ad.image}</div>
              <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
              <p className="text-sm mb-4 opacity-90">{ad.content}</p>
              
              <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold">{ad.amount}</div>
                  <div className="text-sm opacity-80">{ad.user}</div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-center opacity-75">
                {new Date().toLocaleDateString()} • {t.verified}
              </div>
            </div>
          ))}
        </div>
        
        {/* Live Ticker */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-4 overflow-hidden">
          <div className="flex items-center space-x-4">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {t.live}
            </div>
            <div className="flex-1">
              <div className="animate-marquee whitespace-nowrap">
                <span className="text-gray-800 font-medium">
                  🎉 Jean Baptiste {t.won} 25,000 RWF • 💰 Marie Uwimana {t.deposited} 1,000 RWF • 
                  ✅ Patrick Nzeyimana {t.withdrew} 15,000 RWF • 🚀 Alice Mukamana {t.won} 50,000 RWF • 
                  💎 Emmanuel Habimana {t.deposited} 5,000 RWF • 🎯 Grace Uwimana {t.won} 30,000 RWF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdsSection

