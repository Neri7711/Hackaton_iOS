# Components / Componentes 🧩

> Componentes reutilizables de la interfaz de usuario de Wellness Quest

Este directorio contiene todos los componentes UI reutilizables que componen la experiencia visual de la aplicación. Cada componente está diseñado para ser independiente, reutilizable y mantener una responsabilidad específica.

## 📁 Estructura de Componentes

```
components/
├── PetComponent.js      # Mascota emocional animada
├── MissionCard.js       # Tarjeta de misión interactiva  
└── ProgressSection.js   # Sección de progreso visual
```

---

## 🐱 PetComponent.js

### Propósito
Componente que renderiza la mascota emocional con animaciones, estados visuales y feedback interactivo.

### Props Interface
```typescript
interface PetComponentProps {
  happiness: 'happy' | 'neutral' | 'sad';  // Estado emocional actual
  hearts: number;                          // Cantidad de corazones (0-3)
}
```

### Estados Emocionales

#### 😺 Estado: `neutral` (Default)
```javascript
{
  emoji: '😺',
  message: 'Hola! Soy tu compañero de bienestar 😊',
  gradientColors: ['#dcfce7', '#bbf7d0'],  // Verde suave
  moodIndicator: '🌟'
}
```

#### 🐱 Estado: `happy` 
```javascript
{
  emoji: '🐱', 
  message: '¡Estoy muy feliz! Gracias por cuidarme 💖',
  gradientColors: ['#dcfce7', '#bbf7d0'],  // Verde brillante
  moodIndicator: '✨'
}
```

#### 😿 Estado: `sad`
```javascript
{
  emoji: '😿',
  message: 'Me siento un poco triste... ¿me das cariño?',
  gradientColors: ['#dbeafe', '#bfdbfe'],  // Azul suave
  moodIndicator: '💧'
}
```

### Animaciones Implementadas

#### 🌀 Wiggle Animation (Estado Happy)
```javascript
// Rotación de mascota cuando está feliz
Animated.sequence([
  Animated.timing(wiggleAnim, { toValue: 1, duration: 300 }),
  Animated.timing(wiggleAnim, { toValue: 0, duration: 300 })
]).start();

// Transform interpolation
transform: [{
  rotate: wiggleAnim.interpolate({
    inputRange: [0, 0.25, 0.75, 1],
    outputRange: ['0deg', '-3deg', '3deg', '0deg']
  })
}]
```

#### ✨ Sparkle Animation (Mood Indicator)
```javascript
// Rotación infinita cuando está feliz
Animated.loop(
  Animated.sequence([
    Animated.timing(sparkleAnim, { toValue: 1, duration: 1000 }),
    Animated.timing(sparkleAnim, { toValue: 0, duration: 1000 })
  ])
).start();
```

#### 💖 Hearts Scale Animation
```javascript
// Corazones se escalan según cantidad disponible
{
  fontSize: 24,
  opacity: i < hearts ? 1 : 0.3,
  transform: [{ scale: i < hearts ? 1 : 0.7 }]
}
```

### Layout Structure
```javascript
<LinearGradient> {/* Fondo con gradiente dinámico */}
  <Animated.Text>   {/* Mascota principal (emoji grande) */}
    {getPetEmoji()}
  </Animated.Text>
  
  <MessageBubble>   {/* Burbuja de mensaje */}
    <Text>{getPetMessage()}</Text>
  </MessageBubble>
  
  <HeartsIndicator> {/* Indicador de corazones (top-right) */}
    {[...Array(3)].map(heart)}
  </HeartsIndicator>
  
  <MoodIndicator>   {/* Indicador de estado (top-left) */}
    <Animated.Text>{getMoodIndicator()}</Animated.Text>
  </MoodIndicator>
</LinearGradient>
```

### Responsive Design
- **Padding adaptativo**: `spacing['3xl']` (32px)
- **Emoji size**: 80px (legible en todos los dispositivos)
- **Message bubble**: Auto-altura con padding interno
- **Absolute positioning**: Para overlays (corazones, mood)

---

## ✅ MissionCard.js

### Propósito
Tarjeta interactiva que representa una misión diaria con estado visual, feedback háptico y animaciones de completado.

### Props Interface
```typescript
interface Mission {
  id: number;
  title: string;        // "5 respiraciones profundas"
  duration: string;     // "2 min"
  type: string;         // "breathing", "movement", etc.
  completed: boolean;   // Estado de completado
  icon: string;         // "🫁"
}

interface MissionCardProps {
  mission: Mission;
  onComplete: () => void;  // Callback al completar misión
}
```

### Estados Visuales

#### 📋 Estado: Pendiente
```javascript
{
  borderColor: '#e5e7eb',          // Gris claro
  backgroundColor: '#ffffff',      // Fondo blanco
  title: { textDecorationLine: 'none' },
  button: { backgroundColor: '#f3f4f6' },  // Gris claro
  reward: 'Visible (+1 💖)'        // Badge de recompensa
}
```

#### ✅ Estado: Completado
```javascript
{
  borderColor: '#22c55e',          // Verde wellness
  backgroundColor: '#f0fdf4',      // Verde muy claro
  title: { textDecorationLine: 'line-through' },
  button: { backgroundColor: '#22c55e' },   // Verde sólido
  reward: 'Hidden',                // Sin badge
  sparkle: 'Visible (✨)'          // Efecto de completado
}
```

### Gradientes por Tipo de Misión
```javascript
const gradients = {
  breathing: ['#eff6ff', '#dbeafe'],    // Azul para respiración
  movement: ['#f0fdf4', '#dcfce7'],     // Verde para movimiento
  mindfulness: ['#faf5ff', '#f3e8ff'],  // Púrpura para mindfulness
  relaxation: ['#fdf2f8', '#fce7f3'],   // Rosa para relajación
  gratitude: ['#fffbeb', '#fef3c7'],    // Amarillo para gratitud
  exercise: ['#fff7ed', '#fed7aa']      // Naranja para ejercicio
};
```

### Interacciones

#### 🎯 Touch Handling
```javascript
const handlePress = () => {
  if (!mission.completed) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);  // Vibración
    onComplete();  // Ejecutar callback
  }
};
```

#### 📱 Visual Feedback
- **TouchableOpacity**: `activeOpacity={0.8}` para feedback visual
- **Disabled state**: No interacción si ya está completado
- **Border animation**: Cambio de color instantáneo al completar

### Layout Components

#### 🎨 Icon Section
```javascript
<LinearGradient colors={getMissionGradient(mission.type)}>
  <Text style={iconStyles}>{mission.icon}</Text>
</LinearGradient>
```

#### 📝 Content Section  
```javascript
<View style={contentStyles}>
  <Text style={titleStyles}>{mission.title}</Text>
  <Text style={durationStyles}>⏱️ {mission.duration}</Text>
</View>
```

#### 🔘 Action Button
```javascript
<TouchableOpacity onPress={handlePress}>
  <Text>{mission.completed ? '✅' : '○'}</Text>
</TouchableOpacity>
```

#### 🏆 Reward Badge (Solo si no completado)
```javascript
{!mission.completed && (
  <View style={badgeStyles}>
    <Text style={badgeTextStyles}>+1 💖</Text>
  </View>
)}
```

---

## 📊 ProgressSection.js

### Propósito
Componente que visualiza el progreso diario del usuario con animaciones, mensajes motivacionales y efectos visuales avanzados.

### Props Interface
```typescript
interface ProgressSectionProps {
  percentage: number;    // 0-100 (progreso actual)
  completed: number;     // Misiones completadas
  total: number;         // Total de misiones del día
}
```

### Sistema de Mensajes Motivacionales
```javascript
const getMotivationalMessage = () => {
  if (percentage === 100) {
    return '🎉 ¡Increíble! Has completado todas las misiones de hoy';
  } else if (percentage >= 66) {
    return '💪 ¡Excelente progreso! Ya casi terminas';
  } else if (percentage >= 33) {
    return '🌟 ¡Buen trabajo! Sigues por buen camino';
  } else {
    return '🚀 ¡Comienza tu día de bienestar!';
  }
};
```

### Animaciones Avanzadas

#### 📈 Progress Bar Animation
```javascript
const progressAnim = new Animated.Value(0);

useEffect(() => {
  Animated.timing(progressAnim, {
    toValue: percentage / 100,
    duration: 800,           // Animación suave de 0.8s
    useNativeDriver: false   // Necesario para width
  }).start();
}, [percentage]);
```

#### ✨ Shimmer Effect
```javascript
const shimmerAnim = new Animated.Value(0);

Animated.loop(
  Animated.timing(shimmerAnim, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true
  })
).start();

// Transform en la barra
transform: [{
  translateX: shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100]  // Se mueve de izquierda a derecha
  })
}]
```

### Elementos Visuales

#### 📊 Progress Info Header
```javascript
<View style={rowSpaceBetween}>
  <Text>{completed} de {total} misiones completadas</Text>
  <Text style={percentageStyle}>{Math.round(percentage)}%</Text>
</View>
```

#### 🎨 Animated Progress Bar
```javascript
<View style={progressContainer}>
  <Animated.View style={progressBar}>
    <LinearGradient 
      colors={['#4ade80', '#22c55e']}
      style={gradientFill}
    >
      <Animated.View style={shimmerOverlay} />  {/* Efecto brillante */}
    </LinearGradient>
  </Animated.View>
</View>
```

#### 🎯 Milestone Indicators
```javascript
{[...Array(total)].map((_, index) => {
  const milestonePercentage = ((index + 1) / total) * 100;
  const isCompleted = (index + 1) <= completed;
  
  return (
    <View style={{
      position: 'absolute',
      left: `${milestonePercentage - (100 / total / 2)}%`,
      backgroundColor: isCompleted ? colors.wellness[500] : colors.gray[300]
    }} />
  );
})}
```

### Responsive Layout
- **Ancho total**: Se adapta al contenedor padre
- **Altura fija**: 8px para la barra de progreso
- **Milestone dots**: 12px de diámetro, posicionados dinámicamente
- **Text scaling**: Fonts responsivos para diferentes pantallas

---

## 🎨 Patrones de Diseño Utilizados

### 🔧 Composition Pattern
```javascript
// Cada componente compone elementos más pequeños
<PetComponent>
  <PetAvatar />
  <MessageBubble />
  <HeartsDisplay />
  <MoodIndicator />
</PetComponent>
```

### 🎛️ Props-Based Configuration
```javascript
// Componentes configurables via props
<MissionCard mission={missionData} onComplete={handler} />
<ProgressSection percentage={75} completed={3} total={4} />
```

### 🔄 State-Driven UI
```javascript
// UI se adapta automáticamente al estado
const borderColor = mission.completed 
  ? colors.wellness[500]    // Verde si completado
  : colors.gray[200];       // Gris si pendiente
```

### 📱 Native Performance
```javascript
// Uso de animaciones nativas para mejor performance
useNativeDriver: true      // Animaciones en UI thread
interpolate()             // Transformaciones optimizadas
```

## 🚀 Extensibilidad

### Agregar Nuevo Tipo de Misión
```javascript
// 1. Actualizar gradientes en MissionCard.js
const gradients = {
  ...existingGradients,
  newType: ['#color1', '#color2']
};

// 2. Agregar icon mapping si es necesario
const icons = {
  ...existingIcons,
  newType: '🆕'
};
```

### Personalizar Mensajes de Mascota
```javascript
// Agregar más variedad en PetComponent.js
const messages = {
  happy: [
    '¡Estoy muy feliz! Gracias por cuidarme 💖',
    '¡Qué gran día estamos teniendo! 🌟',
    '¡Me siento lleno de energía! ⚡'
  ],
  // Seleccionar aleatoriamente
  getMessage: () => messages[happiness][Math.floor(Math.random() * messages[happiness].length)]
}
```

### Añadir Nuevas Animaciones
```javascript
// Ejemplo: Bounce animation para progreso
const bounceAnim = new Animated.Value(1);

const animateBounce = () => {
  Animated.sequence([
    Animated.timing(bounceAnim, { toValue: 1.2, duration: 150 }),
    Animated.timing(bounceAnim, { toValue: 1, duration: 150 })
  ]).start();
};
```

## 🐛 Debugging y Testing

### Debugging Props
```javascript
// En desarrollo, agregar logs para debugging
console.log('PetComponent props:', { happiness, hearts });
console.log('MissionCard mission:', mission);
console.log('ProgressSection values:', { percentage, completed, total });
```

### Testing Interacciones
```javascript
// Simular completado de misión
const testMission = { id: 1, completed: false };
const mockOnComplete = () => console.log('Mission completed!');

// Renderizar componente de prueba
<MissionCard mission={testMission} onComplete={mockOnComplete} />
```

### Performance Monitoring
```javascript
// Medir performance de animaciones
console.time('Progress animation');
Animated.timing(progressAnim, {...}).start(() => {
  console.timeEnd('Progress animation');
});
```

---

**🎯 Principio de Diseño**: Cada componente debe ser independiente, reutilizable y enfocado en una responsabilidad específica, manteniendo alta cohesión y bajo acoplamiento.
