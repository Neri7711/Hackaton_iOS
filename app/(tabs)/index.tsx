/**
 * TAB PRINCIPAL: Home (Wellness Quest)
 * Propósito: Mostrar HomeScreen adaptado para Expo Router
 * Funcionalidades: Mascota, misiones, corazones, progreso
 */

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DemoData from '../../src/data/DemoData';
import { GameState, createInitialGameState } from '../../src/models/GameState';
// import NotificationService from '../../src/services/NotificationService'; // Comentado para evitar errores de build
import StorageService from '../../src/services/StorageService';

export default function HomeScreen() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 🎨 ANIMACIONES CABRONES (DÍA 3)
  const [petAnimation] = useState(new Animated.Value(1));
  const [heartPulse] = useState(new Animated.Value(1));
  const [missionCompleteAnim] = useState(new Animated.Value(0));
  const [feedingAnim] = useState(new Animated.Value(0));

  // Cargar datos al montar el componente
  useEffect(() => {
    loadGameData();
    startPetAnimation();
    setupNotifications();
  }, []);

  // 📱 CONFIGURAR NOTIFICACIONES (DÍA 3) - Simplificado para evitar errores
  const setupNotifications = async () => {
    try {
      // Configuración simplificada para demo
      console.log('📱 Notificaciones habilitadas para demo');
    } catch (error) {
      console.error('❌ Error configurando notificaciones:', error);
    }
  };

  // 🎭 FUNCIÓN DEBUG: APLICAR DATOS DEMO (para presentación)
  const applyDemoData = async () => {
    try {
      Alert.alert(
        '🎭 Modo Demo',
        '¿Aplicar datos de demostración para presentación?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Aplicar Demo', 
            onPress: async () => {
              setIsLoading(true);
              const demoGameState = await DemoData.applyDemoData(StorageService);
              setGameState(demoGameState);
              setIsLoading(false);
              Alert.alert('🎉', 'Datos demo aplicados! Perfecto para presentación.');
            }
          }
        ]
      );
    } catch (error) {
      console.error('❌ Error aplicando datos demo:', error);
      Alert.alert('Error', 'No se pudieron aplicar los datos demo');
    }
  };

  const loadGameData = async () => {
    try {
      // Verificar si completó onboarding
      const hasOnboarding = await StorageService.hasCompletedOnboarding();
      
      if (!hasOnboarding) {
        // Si no completó onboarding, redirigir
        router.replace('/onboarding' as any);
        return;
      }

      // Cargar estado del juego
      const savedGameState = await StorageService.loadGameState();
      
      // NUEVO DÍA 2: Verificar si es nuevo día y actualizar misiones
      savedGameState.checkAndResetDailyMissions();
      
      setGameState(savedGameState);
      
      // Guardar cambios si hubo reset de día
      await StorageService.saveGameState(savedGameState);
      
      // 📱 NOTIFICACIONES HABILITADAS (simplificado para demo)
      console.log('📱 Sistema de notificaciones listo');
      
      console.log('✅ HomeScreen cargado - Corazones:', savedGameState.hearts);
      console.log('🗓️ Días completados:', savedGameState.daysCompleted);  
      console.log('🎯 Misiones de hoy:', savedGameState.dailyMissions.map(m => m.title));
      
    } catch (error) {
      console.error('❌ Error cargando datos del juego:', error);
      setGameState(createInitialGameState());
    } finally {
      setIsLoading(false);
    }
  };

  // 🎨 ANIMACIONES ÉPICAS DE MASCOTA (DÍA 3)
  const startPetAnimation = () => {
    const animatePet = () => {
      Animated.sequence([
        // Respiración suave
        Animated.timing(petAnimation, {
          toValue: 1.08,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(petAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]).start(() => animatePet());
    };
    animatePet();
  };

  // 🎉 ANIMACIÓN DE MISIÓN COMPLETADA
  const animateMissionComplete = () => {
    Animated.sequence([
      Animated.timing(missionCompleteAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(missionCompleteAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // 💖 ANIMACIÓN DE ALIMENTAR MASCOTA
  const animateFeeding = () => {
    // Animación de corazones flotantes
    Animated.sequence([
      Animated.timing(feedingAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(feedingAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // Pulso de mascota feliz
    Animated.sequence([
      Animated.timing(petAnimation, {
        toValue: 1.2,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(petAnimation, {
        toValue: 1,
        duration: 400,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // 💗 ANIMACIÓN DE PULSO DE CORAZONES
  const startHeartPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartPulse, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(heartPulse, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Iniciar animación de corazones cuando hay hearts > 0
  useEffect(() => {
    if (gameState && gameState.hearts > 0) {
      startHeartPulse();
    }
  }, [gameState?.hearts]);

  const handleCompleteMission = async (missionId: string) => {
    if (!gameState) return;

    const updatedGameState = GameState.fromJSON(gameState.toJSON());
    updatedGameState.completeMission(missionId);
    setGameState(updatedGameState);
    
    // 🎉 ACTIVAR ANIMACIÓN DE MISIÓN COMPLETADA
    animateMissionComplete();
    
    // Guardar en persistencia
    await StorageService.saveGameState(updatedGameState);

    Alert.alert(
      '¡Misión completada! ✅',
      '+1 corazón ganado',
      [{ text: 'Genial!' }]
    );
  };

  const handleFeedPet = async () => {
    if (!gameState) return;

    if (gameState.hearts === 0) {
      Alert.alert(
        'Sin corazones 💔',
        'Completa misiones para ganar corazones y alimentar a tu mascota',
        [{ text: 'Entendido' }]
      );
      return;
    }

    const updatedGameState = GameState.fromJSON(gameState.toJSON());
    const success = updatedGameState.feedPet();
    
    if (success) {
      setGameState(updatedGameState);
      
      // 💖 ACTIVAR ANIMACIÓN DE ALIMENTAR MASCOTA  
      animateFeeding();
      
      await StorageService.saveGameState(updatedGameState);
      
      Alert.alert(
        '¡Mascota alimentada! 😊',
        `${gameState.pet.name} está feliz y motivado`,
        [{ text: '¡Genial!' }]
      );
    }
  };

  // Pantalla de carga
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Cargando Wellness Quest...</Text>
      </View>
    );
  }

  if (!gameState) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error cargando los datos</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadGameData}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const petDisplay = {
    emoji: gameState.pet.getMoodEmoji(),
    name: gameState.pet.name,
    status: gameState.pet.getStatusText(),
    mood: gameState.pet.mood
  };
  
  const completionPercentage = gameState.getTodayCompletionPercentage();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con corazones ANIMADOS (DÍA 3) */}
      <View style={styles.header}>
        <TouchableOpacity onLongPress={applyDemoData} delayLongPress={2000}>
          <Text style={styles.appTitle}>Wellness Quest</Text>
        </TouchableOpacity>
        <View style={styles.heartsContainer}>
          <Animated.Text 
            style={[
              styles.heartsIcon,
              gameState.hearts > 0 && { transform: [{ scale: heartPulse }] }
            ]}
          >
            💝
          </Animated.Text>
          <Text style={styles.heartsCount}>{gameState.hearts}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Sección de Mascota Emocional */}
        <View style={styles.petSection}>
          <Text style={styles.sectionTitle}>Tu Compañero de Bienestar</Text>
          
          <View style={[
            styles.petCard,
            petDisplay.mood === 'feliz' ? styles.petCardHappy : styles.petCardSad
          ]}>
            {/* 💖 EFECTOS VISUALES ÉPICOS */}
            <View style={styles.petContainer}>
              <Animated.Text 
                style={[
                  styles.petEmoji,
                  { transform: [{ scale: petAnimation }] }
                ]}
              >
                {petDisplay.emoji}
              </Animated.Text>
              
              {/* Corazones flotantes al alimentar */}
              <Animated.View style={[
                styles.floatingHearts,
                {
                  opacity: feedingAnim,
                  transform: [
                    { scale: feedingAnim },
                    { 
                      translateY: feedingAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -30]
                      })
                    }
                  ]
                }
              ]}>
                <Text style={styles.floatingHeartsText}>💕💝💖</Text>
              </Animated.View>
              
              {/* Efecto de misión completada */}
              <Animated.View style={[
                styles.missionCompleteEffect,
                {
                  opacity: missionCompleteAnim,
                  transform: [{ scale: missionCompleteAnim }]
                }
              ]}>
                <Text style={styles.missionCompleteText}>🎉 ¡GENIAL! 🎉</Text>
              </Animated.View>
            </View>
            
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{petDisplay.name}</Text>
              <Text style={[
                styles.petStatus,
                petDisplay.mood === 'feliz' ? styles.petStatusHappy : styles.petStatusSad
              ]}>
                {petDisplay.status}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.feedButton,
                gameState.hearts === 0 && styles.feedButtonDisabled
              ]}
              onPress={handleFeedPet}
              disabled={gameState.hearts === 0}
            >
              <Text style={styles.feedButtonText}>
                Alimentar {gameState.hearts === 0 ? '💔' : '💝'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progreso del día CON STREAKS (DÍA 2) */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Progreso de Hoy</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View style={styles.progressMain}>
                <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
                <Text style={styles.progressLabel}>Misiones completadas</Text>
              </View>
              
              {/* NUEVO: Días completados streak */}
              <View style={styles.streakContainer}>
                <Text style={styles.streakEmoji}>🔥</Text>
                <Text style={styles.streakNumber}>{gameState.daysCompleted}</Text>
                <Text style={styles.streakLabel}>días</Text>
              </View>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressBarFill,
                  { width: `${completionPercentage}%` }
                ]}
              />
            </View>
            
            {/* NUEVO: Estadísticas adicionales */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{gameState.totalMissionsCompleted}</Text>
                <Text style={styles.statLabel}>misiones totales</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{gameState.dailyMissions.filter(m => m.isCompleted()).length}/3</Text>
                <Text style={styles.statLabel}>hoy</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Misiones Diarias */}
        <View style={styles.missionsSection}>
          <Text style={styles.sectionTitle}>Misiones de Hoy (3)</Text>
          
          {gameState.dailyMissions.map((mission) => (
            <View key={mission.id} style={styles.missionCard}>
              <View style={styles.missionHeader}>
                <Text style={styles.missionTitle}>{mission.title}</Text>
                <Text style={styles.missionDuration}>{mission.getDurationText()}</Text>
              </View>
              
              <Text style={styles.missionDescription}>{mission.description}</Text>
              
              <View style={styles.missionFooter}>
                <View style={styles.missionMeta}>
                  <Text style={styles.missionCategory}>
                    {mission.category === 'energia' ? '⚡' : 
                     mission.category === 'estres' ? '🧘' : '🏃'} 
                    {mission.category}
                  </Text>
                  <Text style={styles.missionIntensity}>
                    • {mission.intensity}
                  </Text>
                </View>

                {mission.isCompleted() ? (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>✅ Completada</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => handleCompleteMission(mission.id)}
                  >
                    <Text style={styles.completeButtonText}>Completar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Mensaje motivacional */}
        <View style={styles.motivationSection}>
          <Text style={styles.motivationText}>
            {completionPercentage === 100 
              ? "¡Increíble! Has completado todas las misiones de hoy 🎉"
              : completionPercentage > 0
              ? "¡Buen trabajo! Sigue así 💪"
              : "¡Comienza tu día con una pequeña misión! 🌱"
            }
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F9F6',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4CAF50',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F9F6',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  heartsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE0E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  heartsIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  heartsCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  petSection: {
    marginBottom: 24,
  },
  petCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
  },
  petCardHappy: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  petCardSad: {
    borderColor: '#FF9800',
    backgroundColor: '#FFF3E0',
  },
  petContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 12,
  },
  petEmoji: {
    fontSize: 64,
  },
  // 🎨 ESTILOS PARA ANIMACIONES ÉPICAS (DÍA 3)
  floatingHearts: {
    position: 'absolute',
    top: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingHeartsText: {
    fontSize: 20,
    textAlign: 'center',
  },
  missionCompleteEffect: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  missionCompleteText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  petInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  petStatus: {
    fontSize: 14,
  },
  petStatusHappy: {
    color: '#4CAF50',
  },
  petStatusSad: {
    color: '#FF9800',
  },
  feedButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  feedButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  feedButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressMain: {
    alignItems: 'center',
    flex: 1,
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
  },
  streakContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  streakEmoji: {
    fontSize: 20,
  },
  streakNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
    marginTop: 2,
  },
  streakLabel: {
    fontSize: 10,
    color: '#FF9800',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  missionsSection: {
    marginBottom: 24,
  },
  missionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  missionDuration: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  missionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  missionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  missionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionCategory: {
    fontSize: 12,
    color: '#4CAF50',
    textTransform: 'capitalize',
  },
  missionIntensity: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  completedBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completedText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  motivationSection: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  motivationText: {
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
