# Screens / Pantallas 📱

> Componentes de pantalla principal de Wellness Quest

Este directorio contiene las pantallas principales de la aplicación. Cada pantalla maneja su propio estado y lógica de presentación.

## 📁 Archivo Overview

```
screens/
├── OnboardingScreen.js    # Configuración inicial del usuario
└── HomeScreen.js          # Pantalla principal de la app
```

---

## 🎯 OnboardingScreen.js

### Propósito
Pantalla de configuración inicial que personaliza la experiencia del usuario mediante 4 preguntas clave.

### Props
```javascript
{
  navigation: NavigationProp,  // React Navigation object
  onComplete: Function        // Callback cuando termina onboarding
}
```

### Estado Interno
```javascript
{
  currentStep: number,        // Paso actual (0-3)
  answers: {                  // Respuestas del usuario
    objective: string,        // 'energy' | 'stress' | 'movement'
    availability: string,     // 'low' | 'medium' | 'high'
    intensity: string,        // 'gentle' | 'normal' | 'active'
    style: string            // 'mindful' | 'creative' | 'social'
  },
  progressAnim: Animated.Value // Animación de barra de progreso
}
```

### Características Principales

#### 🎨 UI/UX
- **Gradiente de fondo**: Wellness 50 → Wellness 100
- **Barra de progreso animada**: Se actualiza con cada paso
- **Contador visual**: "1 de 4", "2 de 4", etc.
- **SafeAreaView**: Compatible con notch y barra de estado

#### ⚡ Interacciones
- **Haptic feedback**: Vibración ligera al seleccionar opciones
- **Animación de progreso**: Transición suave entre pasos
- **Navegación adaptativa**: Botón "Anterior" deshabilitado en paso 1
- **Validación**: Botón "Siguiente" solo activo con respuesta seleccionada

#### 📊 Datos de Configuración
```javascript
const questions = [
  {
    id: 'objective',
    title: '¿Cuál es tu objetivo principal?',
    subtitle: 'Elige el área que más te interesa mejorar',
    icon: '🎯',
    options: [
      { id: 'energy', label: 'Más energía', icon: '⚡' },
      { id: 'stress', label: 'Menos estrés', icon: '🧘' },
      { id: 'movement', label: 'Más movimiento', icon: '🏃' }
    ]
  },
  // ... 3 preguntas más
]
```

### Métodos Principales

#### `handleAnswer(questionId, answer)`
- Almacena respuesta del usuario
- Activa feedback háptico
- Habilita botón "Siguiente"

#### `handleNext()`
- Avanza al siguiente paso o completa onboarding
- Anima barra de progreso
- Navega a HomeScreen al finalizar

#### `handlePrevious()`
- Retrocede al paso anterior
- Actualiza animación de progreso
- Restaura respuesta seleccionada previamente

### Flujo de Navegación
```
Start → Pregunta 1 → Pregunta 2 → Pregunta 3 → Pregunta 4 → HomeScreen
  ↑                                                              ↓
  └──────────────── Guardado en AsyncStorage ←─────────────────────┘
```

---

## 🏠 HomeScreen.js

### Propósito
Pantalla principal donde el usuario interactúa con su mascota, completa misiones y visualiza su progreso.

### Props
```javascript
{
  userPreferences: {          // Datos del onboarding
    objective: string,
    availability: string,
    intensity: string,
    style: string
  }
}
```

### Estado Principal
```javascript
{
  gameState: {
    hearts: number,                    // Corazones disponibles
    petHappiness: 'happy'|'neutral'|'sad', // Estado emocional
    completedMissionsToday: number,    // Misiones completadas hoy
    streak: number,                    // Días consecutivos
    totalMissionsCompleted: number     // Total histórico
  },
  missions: Array<Mission>,            // Lista de misiones diarias
  heartsAnim: Animated.Value          // Animación de corazones
}
```

### Secciones de la Pantalla

#### 1. 📊 Header & Stats
```javascript
// Estadísticas principales
<StatsCard>
  💖 {hearts} corazones
  📅 {streak} días
  🏆 {totalCompleted} misiones
</StatsCard>
```

#### 2. 🐱 Pet Section
- **Mascota animada** con estados emocionales
- **Botón "Alimentar"** (consume 1 corazón)
- **Indicador de corazones** visual
- **Mensajes contextuales** según estado

#### 3. 📈 Progress Section
- **Barra de progreso** del día actual
- **Contador de misiones** completadas vs total
- **Mensajes motivacionales** dinámicos
- **Efectos shimmer** en la barra

#### 4. ✅ Missions Section
- **Lista de 3 misiones** personalizadas
- **Cards interactivas** con iconos y duración
- **Estados visuales** (pendiente/completada)
- **Mensaje de felicitación** al completar todas

### Lógica de Misiones

#### Generación Automática
```javascript
const missionTemplates = {
  energy: [
    { title: '5 respiraciones profundas', duration: '2 min', icon: '🫁' },
    { title: 'Estiramiento suave', duration: '5 min', icon: '🤸‍♀️' },
    { title: 'Caminar al aire libre', duration: '10 min', icon: '🚶‍♀️' }
  ],
  stress: [
    { title: 'Meditación guiada', duration: '8 min', icon: '🧘‍♀️' },
    { title: 'Escuchar música relajante', duration: '5 min', icon: '🎵' },
    { title: 'Escribir 3 cosas positivas', duration: '3 min', icon: '📝' }
  ],
  movement: [
    { title: 'Escaleras en lugar de ascensor', duration: '2 min', icon: '🏃‍♀️' },
    { title: 'Ejercicios de escritorio', duration: '5 min', icon: '💪' },
    { title: 'Baile libre', duration: '8 min', icon: '💃' }
  ]
};
```

### Métodos Principales

#### `handleMissionComplete(missionId)`
- Marca misión como completada
- Incrementa corazones (+1)
- Actualiza contadores y progreso
- Guarda estado en AsyncStorage
- Anima corazones con bounce effect

#### `handleFeedPet()`
- Verifica corazones disponibles
- Decrementa corazones (-1)
- Cambia estado de mascota a 'happy'
- Feedback háptico intenso
- Muestra alert si no hay corazones

#### `saveGameState(newGameState)`
- Persiste estado del juego
- Maneja errores de AsyncStorage
- Asíncrono para no bloquear UI

### Sistema de Persistencia
```javascript
// Datos guardados en AsyncStorage
'wellness-game-state': {
  hearts: 2,
  petHappiness: 'neutral',
  completedMissionsToday: 0,
  streak: 1,
  totalMissionsCompleted: 0
}
```

### Animaciones Implementadas

#### Corazones Bounce
```javascript
Animated.sequence([
  Animated.timing(heartsAnim, { toValue: 1.3, duration: 150 }),
  Animated.timing(heartsAnim, { toValue: 1, duration: 150 })
]).start();
```

#### Progreso Suave
- Barra de progreso animada con Animated.timing
- Efecto shimmer con Animated.loop
- Transiciones de color basadas en porcentaje

## 🔄 Flujo Entre Pantallas

```
OnboardingScreen
       ↓ (onComplete)
   [Save to AsyncStorage]
       ↓ (navigation.replace)
    HomeScreen
       ↓ (useEffect)
   [Load game state]
       ↓
   [Generate missions]
       ↓
   [User interactions]
```

## 🎨 Patrones de Diseño Usados

### HOC Pattern
- Cada pantalla wrappea contenido en LinearGradient + SafeAreaView

### State Lifting
- Estado de usuario compartido desde App.js via props

### Composition Pattern
- Pantallas compuestas por componentes pequeños y reutilizables

### Observer Pattern
- useEffect para reaccionar a cambios de props/estado

## 🐛 Debugging Tips

### OnboardingScreen
```javascript
// Debug: Ver respuestas actuales
console.log('Current answers:', answers);

// Debug: Paso actual
console.log('Current step:', currentStep);
```

### HomeScreen
```javascript
// Debug: Estado del juego
console.log('Game state:', gameState);

// Debug: Misiones generadas
console.log('Generated missions:', missions);
```

## 🚀 Extensibilidad

### Agregar Nueva Pantalla
1. Crear archivo en `/screens/`
2. Implementar misma estructura (SafeAreaView + LinearGradient)
3. Registrar en `App.js` navigation
4. Seguir patrones de estado y props existentes

### Modificar Flujo de Onboarding
1. Agregar/quitar preguntas en array `questions`
2. Actualizar validación en `handleNext()`
3. Modificar cálculo de progreso
4. Ajustar AsyncStorage schema si es necesario

---

**🎯 Objetivo**: Mantener pantallas simples, enfocadas y con responsabilidades claras.
