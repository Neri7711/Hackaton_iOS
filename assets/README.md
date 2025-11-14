# Assets / Recursos Visuales 🎨

> Recursos gráficos y multimedia para Wellness Quest

Este directorio contiene todos los assets visuales necesarios para la aplicación, incluyendo iconos, imágenes de splash, y recursos gráficos adicionales.

## 📁 Estructura de Assets

```
assets/
├── icon.png              # Icono principal de la app (1024x1024)
├── adaptive-icon.png      # Icono adaptativo Android (1024x1024)
├── splash.png            # Pantalla de splash (1284x2778)
├── favicon.png           # Favicon para web (32x32)
└── images/               # Imágenes adicionales (futuro)
    ├── mascots/          # Variaciones de mascota
    ├── backgrounds/      # Fondos y gradientes
    └── icons/            # Iconos de misiones personalizados
```

---

## 🎯 Especificaciones de Assets

### 📱 icon.png - Icono Principal
- **Tamaño**: 1024x1024 pixels
- **Formato**: PNG con transparencia
- **Uso**: App stores, launcher, configuraciones generales
- **Diseño**: Debe ser reconocible a pequeña escala (16x16)

#### Recomendaciones de Diseño
```
┌─────────────────────────────────┐
│  🎨 Paleta Sugerida             │
├─────────────────────────────────┤
│  • Background: #F5F9F6          │
│  • Primary: #4CAF50             │
│  • Accent: #E91E63              │
│  • Shadow: #166534 (20% opacity)│
└─────────────────────────────────┘

Elements:
• Mascota central (😺 o versión custom)
• Marco circular con gradiente wellness
• Elemento de corazón o bienestar sutil
• Sin texto (debe funcionar internacionalmente)
```

### 🤖 adaptive-icon.png - Android Adaptativo
- **Tamaño**: 1024x1024 pixels
- **Safe zone**: 664x664 pixels (círculo central)
- **Formato**: PNG con transparencia
- **Uso**: Android 8.0+ (API 26+)

#### Android Adaptive Design Rules
```
Safe Zone (Circle): 332px radius from center
┌────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ← Puede ser cortado
│ ░░░░ ┌──────────────────┐ ░░░░░░░░ │
│ ░░░░ │                  │ ░░░░░░░░ │
│ ░░░░ │   SAFE CONTENT   │ ░░░░░░░░ │ ← Siempre visible
│ ░░░░ │      AREA        │ ░░░░░░░░ │
│ ░░░░ └──────────────────┘ ░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ← Puede ser cortado
└────────────────────────────────────┘
```

### 🌟 splash.png - Pantalla de Splash
- **Tamaño**: 1284x2778 pixels (iPhone 14 Pro Max)
- **Formato**: PNG
- **Background**: #F5F9F6 (wellness background)
- **Uso**: Pantalla de carga inicial

#### Splash Screen Layout
```
┌─────────────────────────────────┐
│                                 │
│             30%                 │
│                                 │  ← Logo/Mascota principal
│        🧭💚 Wellness Quest      │
│                                 │
│             40%                 │
│                                 │  ← Espacio para animación
│                                 │
│             20%                 │  ← Texto "Cargando..." (opcional)
│                                 │
│             10%                 │  ← Espaciado inferior
└─────────────────────────────────┘
```

### 🌐 favicon.png - Web Favicon
- **Tamaño**: 32x32 pixels
- **Formato**: PNG o ICO
- **Uso**: Pestaña del navegador (Expo web)
- **Diseño**: Versión ultra-simplificada del icono principal

---

## 🛠️ Herramientas de Generación

### 🎨 Generadores Automáticos
```bash
# Herramientas online recomendadas:
1. https://www.appicon.co/          # Genera todos los tamaños
2. https://icon.kitchen/            # Especializado en mobile
3. https://realfavicongenerator.net # Favicons completos
4. https://www.canva.com/           # Diseño visual
```

### 📱 Expo Asset Tools
```bash
# Generar iconos desde una imagen base
npx expo install expo-image-utils

# Optimizar imágenes
npx expo optimize

# Verificar assets
npx expo doctor
```

### 🎯 Template de Diseño (SVG)
```svg
<!-- Template base para icon.png -->
<svg width="1024" height="1024" viewBox="0 0 1024 1024">
  <!-- Background circle -->
  <circle cx="512" cy="512" r="512" fill="#F5F9F6"/>
  
  <!-- Main gradient -->
  <circle cx="512" cy="512" r="400" fill="url(#wellnessGradient)"/>
  
  <!-- Mascot placeholder -->
  <circle cx="512" cy="450" r="120" fill="#4CAF50"/>
  
  <!-- Heart accent -->
  <circle cx="580" cy="380" r="30" fill="#E91E63"/>
  
  <defs>
    <linearGradient id="wellnessGradient">
      <stop offset="0%" stop-color="#4CAF50"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
  </defs>
</svg>
```

## 🖼️ Assets Futuros (Roadmap)

### 🐱 Mascot Variations
```
images/mascots/
├── cat-happy.png         # Mascota feliz (alta resolución)
├── cat-neutral.png       # Mascota neutral
├── cat-sad.png          # Mascota triste
├── cat-celebrating.png   # Animación de celebración
└── cat-sleeping.png     # Estado inactivo
```

### 🎨 Mission Icons
```
images/icons/
├── breathing.png         # Iconos personalizados para misiones
├── movement.png
├── mindfulness.png
├── relaxation.png
├── gratitude.png
└── exercise.png
```

### 🌅 Background Assets
```
images/backgrounds/
├── morning-gradient.png  # Gradientes por tiempo del día
├── afternoon-gradient.png
├── evening-gradient.png
└── celebration-bg.png   # Fondo para logros
```

## 📊 Asset Optimization

### 🗜️ Compresión Recomendada
```javascript
// Configuración de optimización
const optimizationSettings = {
  png: {
    quality: 90,           // Balance calidad/tamaño
    compression: 'medium'  // Compresión moderada
  },
  fileSize: {
    icon: '<500KB',        // Iconos ligeros
    splash: '<1MB',        // Splash screen optimizada
    images: '<200KB'       // Imágenes generales
  }
}
```

### 📱 Responsive Assets
```javascript
// Diferentes resoluciones por plataforma
const assetSizes = {
  ios: {
    icon: [40, 58, 60, 87, 80, 120, 180], // iOS icon sizes
    splash: [828, 1242, 1334, 1920, 2048] // Various iPhone sizes
  },
  android: {
    icon: [48, 72, 96, 144, 192],         // Android densities
    splash: [480, 800, 1280, 1920]        // Android screen sizes
  }
}
```

## 🔧 Integración con Expo

### app.json Configuration
```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#F5F9F6"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#F5F9F6"
      }
    }
  }
}
```

### Asset Loading en Código
```javascript
import { Asset } from 'expo-asset';

// Pre-cargar assets críticos
const preloadAssets = async () => {
  const images = [
    require('./assets/icon.png'),
    require('./assets/splash.png')
  ];
  
  await Asset.loadAsync(images);
};
```

## 🎨 Brand Guidelines

### Logo Usage
- **Espaciado mínimo**: 20px alrededor del logo
- **Tamaño mínimo**: 32x32px para legibilidad
- **Fondos permitidos**: Blancos, grises claros, gradientes wellness
- **Fondos prohibidos**: Colores saturados, patrones complejos

### Color Variations
```
Primary Logo: #4CAF50 on #F5F9F6
Dark Mode: #4ade80 on #1a1a1a
Monochrome: #666666 on white
Reverse: white on #4CAF50
```

## 🐛 Troubleshooting Assets

### Problemas Comunes
```bash
# Asset no se carga
npx expo start --clear  # Limpiar cache

# Icono no actualiza
# Borrar app del dispositivo y reinstalar

# Splash screen no aparece
# Verificar backgroundColor en app.json

# Asset muy pesado
# Comprimir con herramientas online
```

### Validación de Assets
```javascript
// Script para validar assets
const validateAssets = () => {
  const requiredAssets = ['icon.png', 'splash.png'];
  
  requiredAssets.forEach(asset => {
    if (!fs.existsSync(`./assets/${asset}`)) {
      console.warn(`⚠️  Missing: ${asset}`);
    }
  });
};
```

---

**🎨 Principio de Diseño**: Los assets deben ser consistentes con la identidad visual wellness, optimizados para performance y accesibles en todos los dispositivos y plataformas.
