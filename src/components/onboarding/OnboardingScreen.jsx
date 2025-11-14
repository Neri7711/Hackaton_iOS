import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Heart, Zap, Target, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const OnboardingScreen = ({ onComplete }) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({
    objective: '',
    availability: '',
    intensity: '',
    style: ''
  })

  const questions = [
    {
      id: 'objective',
      title: '¿Cuál es tu objetivo principal?',
      subtitle: 'Elige el área que más te interesa mejorar',
      icon: Target,
      options: [
        { id: 'energy', label: 'Más energía', icon: '⚡', description: 'Sentirte más activo/a durante el día' },
        { id: 'stress', label: 'Menos estrés', icon: '🧘', description: 'Encontrar momentos de calma y relajación' },
        { id: 'movement', label: 'Más movimiento', icon: '🏃', description: 'Incorporar actividad física regular' }
      ]
    },
    {
      id: 'availability',
      title: '¿Cuánto tiempo tienes disponible?',
      subtitle: 'Para dedicar a tu bienestar cada día',
      icon: Clock,
      options: [
        { id: 'low', label: '5-10 minutos', icon: '⏱️', description: 'Pequeños momentos entre actividades' },
        { id: 'medium', label: '10-20 minutos', icon: '⏰', description: 'Un momento dedicado en tu rutina' },
        { id: 'high', label: '20+ minutos', icon: '🕐', description: 'Tiempo suficiente para actividades completas' }
      ]
    },
    {
      id: 'intensity',
      title: '¿Qué intensidad prefieres?',
      subtitle: 'Para tus actividades de bienestar',
      icon: Zap,
      options: [
        { id: 'gentle', label: 'Suave', icon: '🌱', description: 'Actividades relajantes y suaves' },
        { id: 'normal', label: 'Moderada', icon: '🌿', description: 'Un equilibrio entre calma y energía' },
        { id: 'active', label: 'Activa', icon: '🌳', description: 'Actividades más dinámicas y energéticas' }
      ]
    },
    {
      id: 'style',
      title: '¿Qué estilo te motiva más?',
      subtitle: 'Para mantenerte comprometido/a',
      icon: Heart,
      options: [
        { id: 'mindful', label: 'Mindfulness', icon: '🧘‍♀️', description: 'Ejercicios de atención plena y respiración' },
        { id: 'creative', label: 'Creativo', icon: '🎨', description: 'Actividades artísticas y expresivas' },
        { id: 'social', label: 'Social', icon: '👥', description: 'Compartir progreso y conectar con otros' }
      ]
    }
  ]

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Completar onboarding
      onComplete(answers)
      navigate('/home')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const currentQuestion = questions[currentStep]
  const currentAnswer = answers[currentQuestion.id]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-wellness-50 to-wellness-100">
      {/* Header con progreso */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-wellness-800">Wellness Quest</h1>
          <span className="text-sm text-wellness-600">
            {currentStep + 1} de {questions.length}
          </span>
        </div>
        
        {/* Barra de progreso */}
        <div className="w-full bg-wellness-200 rounded-full h-2">
          <motion.div 
            className="bg-wellness-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-6 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="wellness-card max-w-md mx-auto h-full flex flex-col"
          >
            {/* Icono y título */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-wellness-100 rounded-full mb-4">
                <currentQuestion.icon className="w-8 h-8 text-wellness-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentQuestion.title}
              </h2>
              <p className="text-gray-600">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Opciones */}
            <div className="flex-1 space-y-4">
              {currentQuestion.options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleAnswer(currentQuestion.id, option.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    currentAnswer === option.id
                      ? 'border-wellness-500 bg-wellness-50 shadow-md'
                      : 'border-gray-200 hover:border-wellness-300 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{option.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Botones de navegación */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-wellness-600 hover:bg-wellness-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </button>

              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                className={`flex items-center px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  currentAnswer
                    ? 'bg-wellness-500 text-white hover:bg-wellness-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentStep === questions.length - 1 ? 'Comenzar' : 'Siguiente'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default OnboardingScreen
