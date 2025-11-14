import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, CheckCircle2, Circle, Sparkles, Calendar, Trophy } from 'lucide-react'
import PetComponent from './PetComponent'
import MissionCard from './MissionCard'
import ProgressBar from './ProgressBar'

const HomeScreen = ({ userPreferences }) => {
  const [gameState, setGameState] = useState({
    hearts: 2,
    petHappiness: 'neutral', // happy, neutral, sad
    completedMissionsToday: 0,
    streak: 1,
    totalMissionsCompleted: 0
  })

  const [missions, setMissions] = useState([])

  // Generar misiones basadas en las preferencias del usuario
  useEffect(() => {
    const generateMissions = () => {
      const missionTemplates = {
        energy: [
          { id: 1, title: '5 respiraciones profundas', duration: '2 min', type: 'breathing', completed: false },
          { id: 2, title: 'Estiramiento suave', duration: '5 min', type: 'movement', completed: false },
          { id: 3, title: 'Caminar al aire libre', duration: '10 min', type: 'movement', completed: false }
        ],
        stress: [
          { id: 1, title: 'Meditación guiada', duration: '8 min', type: 'mindfulness', completed: false },
          { id: 2, title: 'Escuchar música relajante', duration: '5 min', type: 'relaxation', completed: false },
          { id: 3, title: 'Escribir 3 cosas positivas', duration: '3 min', type: 'gratitude', completed: false }
        ],
        movement: [
          { id: 1, title: 'Escaleras en lugar de ascensor', duration: '2 min', type: 'movement', completed: false },
          { id: 2, title: 'Ejercicios de escritorio', duration: '5 min', type: 'exercise', completed: false },
          { id: 3, title: 'Baile libre', duration: '8 min', type: 'movement', completed: false }
        ]
      }

      const selectedMissions = missionTemplates[userPreferences?.objective] || missionTemplates.energy
      setMissions(selectedMissions)
    }

    generateMissions()
  }, [userPreferences])

  const handleMissionComplete = (missionId) => {
    setMissions(prev => 
      prev.map(mission => 
        mission.id === missionId 
          ? { ...mission, completed: true }
          : mission
      )
    )

    setGameState(prev => ({
      ...prev,
      hearts: prev.hearts + 1,
      completedMissionsToday: prev.completedMissionsToday + 1,
      totalMissionsCompleted: prev.totalMissionsCompleted + 1
    }))
  }

  const handleFeedPet = () => {
    if (gameState.hearts > 0) {
      setGameState(prev => ({
        ...prev,
        hearts: prev.hearts - 1,
        petHappiness: 'happy'
      }))
    }
  }

  const completedCount = missions.filter(m => m.completed).length
  const progressPercentage = (completedCount / missions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <header className="text-center py-4">
          <h1 className="text-3xl font-bold text-wellness-800 mb-2">
            ¡Hola! 👋
          </h1>
          <p className="text-wellness-600">
            Es hora de cuidar tu bienestar
          </p>
        </header>

        {/* Stats Row */}
        <div className="flex justify-between items-center wellness-card">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-wellness-heart" />
            <span className="font-semibold text-lg">{gameState.hearts}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-wellness-600" />
            <span className="text-wellness-800">{gameState.streak} días</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-wellness-800">{gameState.totalMissionsCompleted}</span>
          </div>
        </div>

        {/* Pet Section */}
        <div className="wellness-card text-center">
          <h2 className="text-xl font-semibold text-wellness-800 mb-4">
            Tu compañero de bienestar
          </h2>
          
          <PetComponent 
            happiness={gameState.petHappiness}
            hearts={gameState.hearts}
          />
          
          <motion.button
            onClick={handleFeedPet}
            disabled={gameState.hearts === 0}
            className={`mt-4 wellness-button ${
              gameState.hearts === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            whileHover={{ scale: gameState.hearts > 0 ? 1.05 : 1 }}
            whileTap={{ scale: gameState.hearts > 0 ? 0.95 : 1 }}
          >
            <Heart className="w-4 h-4 mr-2 inline" />
            Alimentar mascota
          </motion.button>
        </div>

        {/* Progress Section */}
        <div className="wellness-card">
          <h2 className="text-xl font-semibold text-wellness-800 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Progreso de hoy
          </h2>
          
          <ProgressBar 
            percentage={progressPercentage}
            completed={completedCount}
            total={missions.length}
          />
        </div>

        {/* Missions Section */}
        <div className="wellness-card">
          <h2 className="text-xl font-semibold text-wellness-800 mb-4">
            Misiones diarias
          </h2>
          
          <div className="space-y-3">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onComplete={() => handleMissionComplete(mission.id)}
              />
            ))}
          </div>
          
          {completedCount === missions.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-wellness-100 rounded-xl text-center"
            >
              <h3 className="font-semibold text-wellness-800 mb-1">
                ¡Fantástico! 🎉
              </h3>
              <p className="text-wellness-600 text-sm">
                Has completado todas las misiones de hoy
              </p>
            </motion.div>
          )}
        </div>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}

export default HomeScreen
