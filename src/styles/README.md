# Styles / Sistema de Estilos 🎨

> Sistema de diseño consistente y escalable para Wellness Quest

Este directorio contiene el sistema completo de estilos de la aplicación, diseñado para mantener consistencia visual, facilitar el mantenimiento y permitir fácil personalización del tema.

## 📁 Estructura de Estilos

```
styles/
├── theme.js         # Variables de diseño y paleta de colores
└── commonStyles.js  # Estilos reutilizables y componentes base
```

---

## 🎨 theme.js - Sistema de Tokens de Diseño

### Propósito
Define todos los tokens de diseño (colores, espaciado, tipografía, sombras) que se utilizan consistentemente en toda la aplicación.

### 🌈 Paleta de Colores Wellness

#### Colores Principales
```javascript
colors: {
  wellness: {
    // Escala de verdes (color principal)
    50: '#f0fdf4',    // Muy claro - fondos suaves
    100: '#dcfce7',   // Claro - cards y estados hover
    200: '#bbf7d0',   // Light - gradientes y acentos
    300: '#86efac',   // Medium light - borders activos
    400: '#4ade80',   // Medium - elementos destacados
    500: '#22c55e',   // Base - botones principales
    600: '#16a34a',   // Medium dark - hover states
    700: '#15803d',   // Dark - texto sobre fondos claros
    800: '#166534',   // Very dark - títulos principales
    900: '#14532d',   // Darkest - máximo contraste
    
    // Colores semánticos
    primary: '#4CAF50',    // Verde principal de la marca
    secondary: '#2196F3',  // Azul para elementos secundarios
    heart: '#E91E63',      // Rosa/rojo para corazones y amor
    background: '#F5F9F6'  // Fondo base de la aplicación
  }
}
```

#### Grises Neutros
```javascript
gray: {
  100: '#f3f4f6',   // Fondos muy suaves
  200: '#e5e7eb',   // Bordes y separadores
  300: '#d1d5db',   // Elementos deshabilitados
  400: '#9ca3af',   // Iconos secundarios
  500: '#6b7280',   // Texto secundario
  600: '#4b5563',   // Texto principal claro
  700: '#374151',   // Texto principal
  800: '#1f2937',   // Títulos importantes
  900: '#111827'    // Máximo contraste
}
```

### 📏 Sistema de Espaciado

#### Escala Base 4px
```javascript
spacing: {
  xs: 4,      // 4px  - espacios muy pequeños
  sm: 8,      // 8px  - espacios pequeños
  md: 12,     // 12px - espacios medianos
  lg: 16,     // 16px - espacios estándar
  xl: 20,     // 20px - espacios grandes
  '2xl': 24,  // 24px - espacios muy grandes
  '3xl': 32,  // 32px - separaciones de secciones
  '4xl': 40,  // 40px - márgenes grandes
  '5xl': 48,  // 48px - espacios extra grandes
  '6xl': 64   // 64px - separaciones máximas
}
```

#### Uso Recomendado
- **xs-sm (4-8px)**: Espacios entre iconos y texto, padding interno
- **md-lg (12-16px)**: Márgenes de cards, padding de botones
- **xl-2xl (20-24px)**: Separación entre elementos principales
- **3xl+ (32px+)**: Separación entre secciones, márgenes de pantalla

### 🔳 Border Radius

#### Escala de Redondez
```javascript
borderRadius: {
  sm: 4,      // 4px  - elementos pequeños (chips, badges)
  md: 8,      // 8px  - inputs, botones pequeños
  lg: 12,     // 12px - cards, botones medianos
  xl: 16,     // 16px - cards principales, modales
  '2xl': 20,  // 20px - elementos destacados
  '3xl': 24,  // 24px - elementos grandes
  full: 999   // Completamente redondo (círculos)
}
```

### 📝 Tipografía

#### Escala de Tamaños
```javascript
fontSize: {
  xs: 12,     // Labels pequeños, metadata
  sm: 14,     // Texto secundario, descripciones
  base: 16,   // Texto principal (tamaño base)
  lg: 18,     // Texto destacado
  xl: 20,     // Subtítulos
  '2xl': 24,  // Títulos de sección
  '3xl': 30,  // Títulos principales
  '4xl': 36,  // Títulos de pantalla
  '5xl': 48   // Display text, logos
}
```

### 🌟 Sistema de Sombras

#### Niveles de Elevación
```javascript
shadows: {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1  // Android
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6
  }
}
```

---

## 🏗️ commonStyles.js - Componentes de Estilo

### Propósito
Proporciona estilos reutilizables y patrones comunes que se utilizan en múltiples componentes de la aplicación.

### 📱 Layout Base

#### Contenedores Principales
```javascript
container: {
  flex: 1,
  backgroundColor: colors.wellness.background
},

safeArea: {
  flex: 1,
  backgroundColor: colors.wellness.background
},

gradient: {
  flex: 1
}
```

### 🎯 Componentes Wellness

#### Cards y Contenedores
```javascript
wellnessCard: {
  backgroundColor: colors.white,
  borderRadius: borderRadius.xl,          // 16px
  padding: spacing['2xl'],                // 24px
  marginHorizontal: spacing.lg,           // 16px
  marginVertical: spacing.sm,             // 8px
  ...shadows.md,                          // Sombra media
  borderWidth: 1,
  borderColor: colors.wellness[100]
}
```

#### Botones del Sistema
```javascript
// Botón Principal
wellnessButton: {
  backgroundColor: colors.wellness[500],   // Verde principal
  paddingHorizontal: spacing['2xl'],      // 24px
  paddingVertical: spacing.lg,            // 16px
  borderRadius: borderRadius.lg,          // 12px
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row'
},

// Texto del Botón Principal
wellnessButtonText: {
  color: colors.white,
  fontSize: fontSize.base,                // 16px
  fontWeight: '600'
},

// Estado Deshabilitado
wellnessButtonDisabled: {
  backgroundColor: colors.gray[300],
  opacity: 0.6
},

// Botón Secundario
wellnessButtonSecondary: {
  backgroundColor: colors.white,
  borderWidth: 2,
  borderColor: colors.wellness[500]
},

wellnessButtonSecondaryText: {
  color: colors.wellness[600],
  fontSize: fontSize.base,
  fontWeight: '600'
}
```

### 📝 Tipografía del Sistema

#### Jerarquía de Títulos
```javascript
title: {
  fontSize: fontSize['3xl'],              // 30px
  fontWeight: 'bold',
  color: colors.wellness[800],
  textAlign: 'center',
  marginBottom: spacing.sm
},

subtitle: {
  fontSize: fontSize.base,                // 16px
  color: colors.wellness[600],
  textAlign: 'center',
  marginBottom: spacing.xl
},

sectionTitle: {
  fontSize: fontSize.xl,                  // 20px
  fontWeight: '600',
  color: colors.wellness[800],
  marginBottom: spacing.lg
}
```

### 📊 Componentes de Progreso

#### Barras de Progreso
```javascript
progressContainer: {
  marginVertical: spacing.lg
},

progressBar: {
  height: 8,
  backgroundColor: colors.gray[200],
  borderRadius: borderRadius.full,
  overflow: 'hidden'
},

progressFill: {
  height: '100%',
  backgroundColor: colors.wellness[500],
  borderRadius: borderRadius.full
},

progressText: {
  fontSize: fontSize.sm,
  color: colors.gray[600],
  textAlign: 'center',
  marginTop: spacing.sm
}
```

### 🎯 Componentes de Opciones

#### Botones de Selección (Onboarding)
```javascript
optionButton: {
  backgroundColor: colors.white,
  borderWidth: 2,
  borderColor: colors.gray[200],
  borderRadius: borderRadius.lg,
  padding: spacing.lg,
  marginBottom: spacing.md
},

optionButtonSelected: {
  borderColor: colors.wellness[500],
  backgroundColor: colors.wellness[50]
},

optionContent: {
  flexDirection: 'row',
  alignItems: 'flex-start'
},

optionIcon: {
  fontSize: fontSize['2xl'],
  marginRight: spacing.md
},

optionTitle: {
  fontSize: fontSize.base,
  fontWeight: '600',
  color: colors.gray[900],
  marginBottom: spacing.xs
},

optionDescription: {
  fontSize: fontSize.sm,
  color: colors.gray[600]
}
```

### 📈 Componentes de Estadísticas

#### Stats y Métricas
```javascript
statsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
},

statItem: {
  flexDirection: 'row',
  alignItems: 'center'
},

statIcon: {
  fontSize: fontSize.lg,
  marginRight: spacing.xs
},

statText: {
  fontSize: fontSize.base,
  fontWeight: '600',
  color: colors.wellness[800]
}
```

### ✅ Componentes de Misiones

#### Mission Cards
```javascript
missionCard: {
  backgroundColor: colors.white,
  borderWidth: 2,
  borderColor: colors.gray[200],
  borderRadius: borderRadius.lg,
  padding: spacing.lg,
  marginBottom: spacing.md,
  flexDirection: 'row',
  alignItems: 'center'
},

missionCardCompleted: {
  borderColor: colors.wellness[500],
  backgroundColor: colors.wellness[50]
},

missionIcon: {
  width: 48,
  height: 48,
  borderRadius: borderRadius.full,
  backgroundColor: colors.wellness[100],
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: spacing.lg
},

missionTitle: {
  fontSize: fontSize.base,
  fontWeight: '600',
  color: colors.gray[900],
  marginBottom: spacing.xs
},

missionTitleCompleted: {
  textDecorationLine: 'line-through',
  color: colors.wellness[800]
}
```

### 🛠️ Utilidades de Layout

#### Helpers de Espaciado
```javascript
// Márgenes
mb1: { marginBottom: spacing.xs },    // 4px
mb2: { marginBottom: spacing.sm },    // 8px
mb3: { marginBottom: spacing.md },    // 12px
mb4: { marginBottom: spacing.lg },    // 16px
mb5: { marginBottom: spacing.xl },    // 20px
mb6: { marginBottom: spacing['2xl'] }, // 24px

// Padding
px4: { paddingHorizontal: spacing.lg },    // 16px
py4: { paddingVertical: spacing.lg },      // 16px

// Layout helpers
row: {
  flexDirection: 'row',
  alignItems: 'center'
},

spaceBetween: {
  justifyContent: 'space-between'
},

centeredText: {
  textAlign: 'center'
}
```

## 🎨 Patrones de Uso

### 🔄 Composición de Estilos
```javascript
// Combinar estilos base con modificadores
<View style={[
  commonStyles.wellnessCard,     // Estilo base
  commonStyles.mb4,              // Margen inferior
  { opacity: disabled ? 0.5 : 1 } // Modificador condicional
]}>
```

### 🎯 Consistencia de Colores
```javascript
// Usar siempre los tokens de color
backgroundColor: colors.wellness[500]     // ✅ Correcto
backgroundColor: '#22c55e'               // ❌ Evitar hardcodear
```

### 📏 Espaciado Sistemático
```javascript
// Usar la escala de espaciado
marginBottom: spacing.lg                 // ✅ Correcto (16px)
marginBottom: 16                        // ❌ Evitar valores mágicos
```

## 🚀 Extensibilidad

### Agregar Nuevo Color
```javascript
// En theme.js
colors: {
  wellness: {
    // ... colores existentes
    accent: '#F59E0B',      // Nuevo color accent
    warning: '#EF4444'      // Nuevo color warning
  }
}

// En commonStyles.js
warningButton: {
  backgroundColor: colors.wellness.warning,
  // ... resto de estilos
}
```

### Crear Nuevo Componente de Estilo
```javascript
// En commonStyles.js
newComponentStyle: {
  backgroundColor: colors.white,
  borderRadius: borderRadius.lg,
  padding: spacing.lg,
  ...shadows.sm
}
```

### Personalizar Tema
```javascript
// Crear theme variations
const darkTheme = {
  ...colors,
  wellness: {
    ...colors.wellness,
    background: '#1a1a1a',
    primary: '#4ade80'    // Verde más brillante para dark mode
  }
}
```

## 📱 Consideraciones de Plataforma

### iOS Específico
```javascript
// Sombras optimizadas para iOS
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4
```

### Android Específico
```javascript
// Elevación para Android
elevation: 3
```

### Responsive Design
```javascript
// Adaptar a diferentes tamaños de pantalla
const screenWidth = Dimensions.get('window').width;
const responsivePadding = screenWidth > 600 ? spacing['3xl'] : spacing.lg;
```

## 🐛 Debugging Estilos

### Verificar Colores
```javascript
// Agregar border temporal para debug
borderWidth: 1,
borderColor: 'red'  // Solo para debugging
```

### Inspeccionar Espaciado
```javascript
// Agregar background temporal
backgroundColor: 'rgba(255, 0, 0, 0.1)'  // Solo para debugging
```

---

**🎯 Principio de Diseño**: Mantener un sistema consistente, escalable y fácil de mantener, evitando valores hardcodeados y promoviendo la reutilización de estilos.
