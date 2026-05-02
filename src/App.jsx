import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import HomeDashboard from './components/HomeDashboard'
import DoseCalculator from './components/DoseCalculator'
import DoseWeightCalculator from './components/DoseWeightCalculator'
import DripRateCalculator from './components/DripRateCalculator'
import SolutionCalculator from './components/SolutionCalculator'
import UnitConverter from './components/UnitConverter'
import HistoryScreen from './components/HistoryScreen'
import FavoritesScreen from './components/FavoritesScreen'
import ProfileScreen from './components/ProfileScreen'
import BottomNav from './components/BottomNav'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [screen, setScreen] = useState('home')
  const [activeTab, setActiveTab] = useState('home')
  const [history, setHistory] = useState([])
  const [favorites, setFavorites] = useState(['dose', 'drip'])

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  const addToHistory = (entry) => {
    setHistory(prev => [{ ...entry, id: Date.now(), date: new Date() }, ...prev].slice(0, 50))
  }

  const navigate = (s) => {
    setScreen(s)
    if (['home', 'history', 'favorites', 'profile'].includes(s)) {
      setActiveTab(s)
    }
  }

  if (showSplash) return (
    <div className="app-shell">
      <SplashScreen />
    </div>
  )

  const renderScreen = () => {
    const props = { navigate, addToHistory }
    switch (screen) {
      case 'home': return <HomeDashboard navigate={navigate} history={history} />
      case 'dose': return <DoseCalculator {...props} />
      case 'dose-weight': return <DoseWeightCalculator {...props} />
      case 'drip': return <DripRateCalculator {...props} />
      case 'solution': return <SolutionCalculator {...props} />
      case 'converter': return <UnitConverter {...props} />
      case 'history': return <HistoryScreen history={history} navigate={navigate} />
      case 'favorites': return <FavoritesScreen favorites={favorites} navigate={navigate} toggleFav={(id) => setFavorites(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])} />
      case 'profile': return <ProfileScreen navigate={navigate} history={history} />
      default: return <HomeDashboard navigate={navigate} history={history} />
    }
  }

  return (
    <div className="app-shell">
      <div className="screen">
        {renderScreen()}
      </div>
      <BottomNav activeTab={activeTab} navigate={navigate} />
    </div>
  )
}
