// Mock Missions Data - Día 1 Implementation
// Misiones generadas hardcodeadas según preferencias del onboarding

export const missionTemplates = {
  energy: [
    {
      id: 'energy_1',
      title: '5 respiraciones profundas',
      duration: '2 min',
      type: 'breathing',
      icon: '🫁',
      description: 'Inhala 4 segundos, mantén 4, exhala 6. Repite 5 veces.',
      hearts: 1
    },
    {
      id: 'energy_2',
      title: 'Estiramiento suave',
      duration: '5 min',
      type: 'movement',
      icon: '🤸‍♀️',
      description: 'Estiramientos simples para despertar el cuerpo.',
      hearts: 1
    },
    {
      id: 'energy_3',
      title: 'Caminar al aire libre',
      duration: '10 min',
      type: 'movement',
      icon: '🚶‍♀️',
      description: 'Una caminata corta para activar la circulación.',
      hearts: 1
    },
    {
      id: 'energy_4',
      title: 'Beber un vaso de agua',
      duration: '1 min',
      type: 'hydration',
      icon: '💧',
      description: 'Hidratarse ayuda a mantener la energía.',
      hearts: 1
    }
  ],
  
  stress: [
    {
      id: 'stress_1',
      title: 'Meditación guiada',
      duration: '8 min',
      type: 'mindfulness',
      icon: '🧘‍♀️',
      description: 'Encuentra un lugar tranquilo y respira conscientemente.',
      hearts: 1
    },
    {
      id: 'stress_2',
      title: 'Escuchar música relajante',
      duration: '5 min',
      type: 'relaxation',
      icon: '🎵',
      description: 'Música suave para calmar la mente.',
      hearts: 1
    },
    {
      id: 'stress_3',
      title: 'Escribir 3 cosas positivas',
      duration: '3 min',
      type: 'gratitude',
      icon: '📝',
      description: 'Reflexiona sobre lo bueno del día.',
      hearts: 1
    },
    {
      id: 'stress_4',
      title: 'Técnica 4-7-8',
      duration: '4 min',
      type: 'breathing',
      icon: '🌬️',
      description: 'Inhala 4, mantén 7, exhala 8. Repite 4 veces.',
      hearts: 1
    }
  ],

  movement: [
    {
      id: 'movement_1',
      title: 'Escaleras en lugar de ascensor',
      duration: '2 min',
      type: 'exercise',
      icon: '🏃‍♀️',
      description: 'Activa las piernas subiendo escaleras.',
      hearts: 1
    },
    {
      id: 'movement_2',
      title: 'Ejercicios de escritorio',
      duration: '5 min',
      type: 'exercise',
      icon: '💪',
      description: 'Movimientos simples desde tu silla.',
      hearts: 1
    },
    {
      id: 'movement_3',
      title: 'Baile libre',
      duration: '8 min',
      type: 'exercise',
      icon: '💃',
      description: 'Pon tu música favorita y muévete.',
      hearts: 1
    },
    {
      id: 'movement_4',
      title: 'Sentadillas suaves',
      duration: '3 min',
      type: 'exercise',
      icon: '🦵',
      description: '10 sentadillas lentas y controladas.',
      hearts: 1
    }
  ]
};

// Generador de misiones basado en preferencias de onboarding
export const generateDailyMissions = (userPreferences) => {
  const { objective, availability, intensity } = userPreferences;
  
  // Obtener pool de misiones según objetivo
  const missionPool = missionTemplates[objective] || missionTemplates.energy;
  
  // Seleccionar 3 misiones según disponibilidad e intensidad
  let selectedMissions = [];
  
  if (availability === 'low') {
    // Disponibilidad baja: misiones cortas (1-3 min)
    selectedMissions = missionPool
      .filter(mission => parseInt(mission.duration) <= 3)
      .slice(0, 3);
  } else if (availability === 'medium') {
    // Disponibilidad media: misiones mixtas (2-8 min)
    selectedMissions = missionPool
      .filter(mission => parseInt(mission.duration) <= 8)
      .slice(0, 3);
  } else {
    // Disponibilidad alta: cualquier misión
    selectedMissions = missionPool.slice(0, 3);
  }
  
  // Ajustar según intensidad
  if (intensity === 'gentle') {
    // Intensidad suave: preferir respiración y mindfulness
    selectedMissions = selectedMissions.filter(mission => 
      ['breathing', 'mindfulness', 'relaxation', 'gratitude'].includes(mission.type)
    );
  } else if (intensity === 'active') {
    // Intensidad activa: preferir movimiento y ejercicio
    selectedMissions = selectedMissions.filter(mission => 
      ['movement', 'exercise'].includes(mission.type)
    );
  }
  
  // Asegurar que tenemos 3 misiones
  while (selectedMissions.length < 3) {
    const randomMission = missionPool[Math.floor(Math.random() * missionPool.length)];
    if (!selectedMissions.find(m => m.id === randomMission.id)) {
      selectedMissions.push(randomMission);
    }
  }
  
  // Agregar estado de completado
  return selectedMissions.slice(0, 3).map(mission => ({
    ...mission,
    completed: false,
    completedAt: null
  }));
};

// Estado inicial de la mascota según el Día 1
export const initialPetState = {
  happiness: 'neutral', // 'happy' | 'neutral' | 'sad'
  lastFed: null,
  level: 1,
  experience: 0,
  name: 'Wellness Buddy'
};

// Mock de datos para demo
export const demoGameState = {
  hearts: 2,
  petHappiness: 'neutral',
  completedMissionsToday: 0,
  streak: 1,
  totalMissionsCompleted: 0,
  lastPlayDate: new Date().toISOString().split('T')[0]
};
