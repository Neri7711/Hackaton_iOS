import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock, Zap } from 'lucide-react'

const MissionCard = ({ mission, onComplete }) => {
  const getMissionIcon = (type) => {
    const icons = {
      breathing: '🫁',
      movement: '🚶‍♀️',
      mindfulness: '🧘‍♀️',
      relaxation: '🎵',
      gratitude: '📝',
      exercise: '💪',
      default: '⭐'
    }
    return icons[type] || icons.default
  }

  const getMissionColor = (type) => {
    const colors = {
      breathing: 'from-blue-50 to-blue-100',
      movement: 'from-green-50 to-green-100',
      mindfulness: 'from-purple-50 to-purple-100',
      relaxation: 'from-pink-50 to-pink-100',
      gratitude: 'from-yellow-50 to-yellow-100',
      exercise: 'from-orange-50 to-orange-100',
      default: 'from-gray-50 to-gray-100'
    }
    return colors[type] || colors.default
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
        mission.completed
          ? 'border-wellness-500 bg-wellness-50'
          : 'border-gray-200 hover:border-wellness-300 bg-white hover:shadow-md'
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* Mission Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${getMissionColor(mission.type)} flex items-center justify-center text-2xl`}>
          {getMissionIcon(mission.type)}
        </div>

        {/* Mission Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold ${mission.completed ? 'text-wellness-800 line-through' : 'text-gray-900'}`}>
            {mission.title}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{mission.duration}</span>
          </div>
        </div>

        {/* Complete Button */}
        <motion.button
          onClick={() => onComplete(mission.id)}
          disabled={mission.completed}
          className={`flex-shrink-0 p-2 rounded-full transition-all duration-200 ${
            mission.completed
              ? 'bg-wellness-500 text-white cursor-default'
              : 'bg-gray-100 hover:bg-wellness-100 text-gray-500 hover:text-wellness-600'
          }`}
          whileHover={{ scale: mission.completed ? 1 : 1.1 }}
          whileTap={{ scale: mission.completed ? 1 : 0.9 }}
        >
          {mission.completed ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      {/* Completion Effect */}
      {mission.completed && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-2 right-2 text-2xl"
        >
          ✨
        </motion.div>
      )}

      {/* Reward indicator */}
      {!mission.completed && (
        <div className="absolute -top-2 -right-2 bg-wellness-heart text-white text-xs px-2 py-1 rounded-full font-semibold">
          +1 💖
        </div>
      )}
    </motion.div>
  )
}

export default MissionCard
