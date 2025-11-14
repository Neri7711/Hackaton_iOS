import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const PetComponent = ({ happiness, hearts }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 1000)
    return () => clearTimeout(timer)
  }, [happiness])

  const getPetEmoji = () => {
    switch (happiness) {
      case 'happy':
        return '🐱'
      case 'sad':
        return '😿'
      default:
        return '😺'
    }
  }

  const getPetMessage = () => {
    switch (happiness) {
      case 'happy':
        return '¡Estoy muy feliz! Gracias por cuidarme 💖'
      case 'sad':
        return 'Me siento un poco triste... ¿me das cariño?'
      default:
        return 'Hola! Soy tu compañero de bienestar 😊'
    }
  }

  const getBackgroundColor = () => {
    switch (happiness) {
      case 'happy':
        return 'from-green-100 to-green-200'
      case 'sad':
        return 'from-blue-100 to-blue-200'
      default:
        return 'from-wellness-100 to-wellness-200'
    }
  }

  return (
    <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${getBackgroundColor()}`}>
      {/* Pet Avatar */}
      <motion.div
        className="text-8xl mb-4"
        animate={{
          scale: isAnimating ? [1, 1.1, 1] : 1,
          rotate: isAnimating ? [0, -5, 5, 0] : 0
        }}
        transition={{ duration: 0.5 }}
      >
        {getPetEmoji()}
      </motion.div>

      {/* Pet Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm"
      >
        <p className="text-sm text-gray-700 text-center">
          {getPetMessage()}
        </p>
      </motion.div>

      {/* Hearts indicator */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: i < hearts ? 1 : 0.3 }}
              className={`text-2xl ${i < hearts ? 'opacity-100' : 'opacity-30'}`}
            >
              💖
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pet mood indicator */}
      <div className="absolute top-4 left-4">
        <motion.div
          animate={{ rotate: happiness === 'happy' ? [0, 360] : 0 }}
          transition={{ duration: 2, repeat: happiness === 'happy' ? Infinity : 0 }}
          className="text-2xl"
        >
          {happiness === 'happy' ? '✨' : happiness === 'sad' ? '💧' : '🌟'}
        </motion.div>
      </div>
    </div>
  )
}

export default PetComponent
