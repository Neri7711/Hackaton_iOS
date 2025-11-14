# Wellness Quest Mobile 📱🧭💚

> Aplicación móvil gamificada de bienestar desarrollada con **Expo** y **React Native**

Wellness Quest es una app móvil que impulsa hábitos saludables mediante **micro-misiones diarias** y una **mascota emocional** que refleja el progreso del usuario. Desarrollada para funcionar en **Expo Go** con la capacidad de ser desplegada como app nativa.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app en tu dispositivo móvil

### Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPO]
cd hackaton

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npx expo start
```

### Probar en dispositivo móvil

1. **Descargar Expo Go** en tu celular:
   - [iOS App Store](https://apps.apple.com/us/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Escanear código QR** que aparece en la terminal o navegador

3. **¡La app se cargará automáticamente!**

## 📱 Características Principales

### ✅ Onboarding Personalizado
- **4 preguntas** para personalizar la experiencia
- **Progipsión visual** con animaciones
- **Persistencia** de preferencias del usuario

### ✅ Sistema de Mascota Emocional
- **3 estados emocionales**: Feliz, Neutral, Triste
- **Animaciones nativas** con rotación y efectos visuales
- **Feedback háptico** al interactuar

### ✅ Misiones Diarias Gamificadas
- **3 misiones personalizadas** por día
- **Sistema de corazones** como recompensa (+1 por misión)
- **Diferentes tipos**: Respiración, Movimiento, Mindfulness, etc.

### ✅ Progreso Visual
- **Barra de progreso animada** con efectos shimmer
- **Hitos visuales** para cada misión completada
- **Mensajes motivacionales** dinámicos

### ✅ Características Móviles Nativas
- **Feedback háptico** (vibraciones táctiles)
- **AsyncStorage** para persistencia de datos
- **SafeAreaView** compatible con notch/barra de estado
- **Gradientes nativos** para UI atractiva

## 🏗️ Arquitectura del Proyecto

```
src/
├── screens/           # Pantallas principales
│   ├── OnboardingScreen.js
│   └── HomeScreen.js
├── components/        # Componentes reutilizables
│   ├── PetComponent.js
│   ├── MissionCard.js
│   └── ProgressSection.js
└── styles/           # Sistema de estilos
    ├── theme.js      # Colores y variables de diseño
    └── commonStyles.js # Estilos reutilizables
```

## 📋 Scripts Disponibles

```bash
# Iniciar en modo desarrollo
npm start

# Abrir directamente en Android
npm run android

# Abrir directamente en iOS
npm run ios

# Abrir en navegador web
npm run web
```

## 🎨 Sistema de Diseño

### Paleta de Colores Wellness
```javascript
colors: {
  wellness: {
    primary: '#4CAF50',    // Verde principal
    secondary: '#2196F3',  // Azul secundario
    heart: '#E91E63',      // Rosa corazones
    background: '#F5F9F6'  // Fondo suave
  }
}
```

### Componentes de UI
- **Gradientes** para fondos atractivos
- **Sombras nativas** para elevación
- **Border radius** consistente (8px, 12px, 16px)
- **Espaciado** basado en grid de 4px

## 📊 Estado de la Aplicación

### Flujo de Datos
1. **Onboarding** → Guarda preferencias en AsyncStorage
2. **Generación de Misiones** → Basada en preferencias del usuario
3. **Completar Misiones** → Actualiza estado y persiste datos
4. **Alimentar Mascota** → Consume corazones y cambia estado emocional

### Persistencia
- **AsyncStorage** para datos del juego
- **Preferencias de usuario** guardadas permanentemente
- **Estado de misiones** se actualiza en tiempo real

## 🔧 Dependencias Principales

```json
{
  "expo": "~49.0.15",
  "react-native": "0.72.6",
  "@react-navigation/native": "^6.1.9",
  "expo-linear-gradient": "~12.3.0",
  "react-native-reanimated": "~3.3.0",
  "expo-haptics": "~12.4.0",
  "@react-native-async-storage/async-storage": "1.18.2"
}
```

## 🧪 Testing y QA

### Flujo de Testing Sugerido
1. **Onboarding completo** → Responder 4 preguntas
2. **Navegación a Home** → Verificar transición
3. **Completar misiones** → Verificar +1 corazón
4. **Alimentar mascota** → Verificar -1 corazón y cambio emocional
5. **Cerrar y reabrir app** → Verificar persistencia

### Dispositivos Recomendados para Pruebas
- **iOS**: iPhone 12+ (iOS 15+)
- **Android**: Dispositivos con API 21+ (Android 5.0+)

## 🚀 Despliegue

### Build de Desarrollo
```bash
# Para pruebas internas
npx expo build:android
npx expo build:ios
```

### Build de Producción
```bash
# Preparar para stores
npx expo build:android --type app-bundle
npx expo build:ios --type archive
```

## 🛠️ Customización

### Agregar Nuevos Tipos de Misión
1. Modificar `generateMissions()` en `HomeScreen.js`
2. Agregar nuevos iconos y gradientes en components
3. Actualizar tipos en `MissionCard.js`

### Cambiar Colores del Tema
1. Editar `src/styles/theme.js`
2. Los cambios se aplicarán automáticamente en toda la app

### Agregar Nuevas Pantallas
1. Crear componente en `src/screens/`
2. Registrar ruta en `App.js`
3. Actualizar navegación si es necesario

## 🐛 Solución de Problemas

### Error: "Metro bundler not starting"
```bash
npx expo start --clear
```

### Error: "AsyncStorage not found"
```bash
npx expo install @react-native-async-storage/async-storage
```

### Error: "Reanimated not working"
```bash
# Reiniciar con cache limpio
npx expo start --clear
```

## 📄 Licencia

ISC License - Emanuel Neri

## 🤝 Contribución

Este proyecto fue desarrollado para el hackathon. Para contribuir:

1. Fork el proyecto
2. Crear feature branch
3. Commit los cambios
4. Push a la rama
5. Crear Pull Request

---

**¡Construido con ❤️ para promover el bienestar digital!**
