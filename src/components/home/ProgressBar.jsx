import { motion } from 'framer-motion'

const ProgressBar = ({ percentage, completed, total }) => {
  return (
    <div className="space-y-3">
      {/* Progress info */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          {completed} de {total} misiones completadas
        </span>
        <span className="text-sm font-bold text-wellness-600">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-wellness-400 to-wellness-600 h-3 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </motion.div>
        </div>

        {/* Progress milestones */}
        <div className="absolute top-0 left-0 w-full h-3 flex items-center">
          {[...Array(total)].map((_, index) => {
            const milestonePercentage = ((index + 1) / total) * 100
            const isCompleted = (index + 1) <= completed
            
            return (
              <motion.div
                key={index}
                className={`absolute w-3 h-3 rounded-full border-2 border-white ${
                  isCompleted 
                    ? 'bg-wellness-500' 
                    : 'bg-gray-300'
                }`}
                style={{ left: `calc(${milestonePercentage}% - 6px)` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              />
            )
          })}
        </div>
      </div>

      {/* Motivational message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        {percentage === 100 ? (
          <p className="text-wellness-600 font-semibold text-sm">
            🎉 ¡Increíble! Has completado todas las misiones de hoy
          </p>
        ) : percentage >= 66 ? (
          <p className="text-wellness-600 font-medium text-sm">
            💪 ¡Excelente progreso! Ya casi terminas
          </p>
        ) : percentage >= 33 ? (
          <p className="text-wellness-600 font-medium text-sm">
            🌟 ¡Buen trabajo! Sigues por buen camino
          </p>
        ) : (
          <p className="text-gray-600 font-medium text-sm">
            🚀 ¡Comienza tu día de bienestar!
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default ProgressBar
