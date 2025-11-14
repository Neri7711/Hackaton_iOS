import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OnboardingScreen from './components/onboarding/OnboardingScreen'
import HomeScreen from './components/home/HomeScreen'

function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [userPreferences, setUserPreferences] = useState(null)

  // Verificar si el usuario ya completó el onboarding
  useEffect(() => {
    const storedPreferences = localStorage.getItem('wellness-preferences')
    if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences))
      setHasCompletedOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = (preferences) => {
    setUserPreferences(preferences)
    setHasCompletedOnboarding(true)
    localStorage.setItem('wellness-preferences', JSON.stringify(preferences))
  }

  return (
    <Router>
      <div className="min-h-screen bg-wellness-background">
        <Routes>
          <Route 
            path="/onboarding" 
            element={
              <OnboardingScreen onComplete={handleOnboardingComplete} />
            } 
          />
          <Route 
            path="/home" 
            element={
              hasCompletedOnboarding ? (
                <HomeScreen userPreferences={userPreferences} />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            } 
          />
          <Route 
            path="/" 
            element={
              hasCompletedOnboarding ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
