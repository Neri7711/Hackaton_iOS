import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { commonStyles } from '../styles/commonStyles';
import { colors, spacing } from '../styles/theme';
import PetComponent from '../components/PetComponent';
import MissionCard from '../components/MissionCard';
import ProgressSection from '../components/ProgressSection';
import { generateDailyMissions, demoGameState } from '../data/mockMissions';

const HomeScreen = ({ userPreferences }) => {
  const [gameState, setGameState] = useState({
    hearts: 2,
    petHappiness: 'neutral', // happy, neutral, sad
    completedMissionsToday: 0,
    streak: 1,
    totalMissionsCompleted: 0
  });

  const [missions, setMissions] = useState([]);
  const [heartsAnim] = useState(new Animated.Value(1));

  // Generar misiones basadas en las preferencias del usuario
  useEffect(() => {
    generateMissions();
    loadGameState();
  }, [userPreferences]);

  const loadGameState = async () => {
    try {
      const savedGameState = await AsyncStorage.getItem('wellness-game-state');
      if (savedGameState) {
        setGameState(JSON.parse(savedGameState));
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  };

  const saveGameState = async (newGameState) => {
    try {
      await AsyncStorage.setItem('wellness-game-state', JSON.stringify(newGameState));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  const generateMissions = () => {
    console.log('Generating missions for preferences:', userPreferences);
    
    if (userPreferences) {
      // Usar el generador avanzado con todas las preferencias
      const dailyMissions = generateDailyMissions(userPreferences);
      setMissions(dailyMissions);
      console.log('Generated missions:', dailyMissions);
    } else {
      // Fallback: usar estado demo si no hay preferencias
      const demoMissions = [
        { id: 'demo_1', title: '5 respiraciones profundas', duration: '2 min', type: 'breathing', completed: false, icon: '🫁', hearts: 1 },
        { id: 'demo_2', title: 'Estiramiento suave', duration: '5 min', type: 'movement', completed: false, icon: '🤸‍♀️', hearts: 1 },
        { id: 'demo_3', title: 'Caminar al aire libre', duration: '10 min', type: 'movement', completed: false, icon: '🚶‍♀️', hearts: 1 }
      ];
      setMissions(demoMissions);
      console.log('Using demo missions');
    }
  };

  const handleMissionComplete = (missionId) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    setMissions(prev => 
      prev.map(mission => 
        mission.id === missionId 
          ? { ...mission, completed: true }
          : mission
      )
    );

    const newGameState = {
      ...gameState,
      hearts: gameState.hearts + 1,
      completedMissionsToday: gameState.completedMissionsToday + 1,
      totalMissionsCompleted: gameState.totalMissionsCompleted + 1
    };
    
    setGameState(newGameState);
    saveGameState(newGameState);

    // Animación de corazones
    Animated.sequence([
      Animated.timing(heartsAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartsAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleFeedPet = () => {
    if (gameState.hearts > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      
      const newGameState = {
        ...gameState,
        hearts: gameState.hearts - 1,
        petHappiness: 'happy'
      };
      
      setGameState(newGameState);
      saveGameState(newGameState);
    } else {
      Alert.alert(
        'No tienes corazones',
        'Completa algunas misiones para conseguir corazones y alimentar a tu mascota.',
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const completedCount = missions.filter(m => m.completed).length;
  const progressPercentage = (completedCount / missions.length) * 100;

  return (
    <LinearGradient
      colors={[colors.wellness[50], colors.wellness[100]]}
      style={commonStyles.container}
    >
      <SafeAreaView style={commonStyles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing['4xl'] }}
        >
          
          {/* Header */}
          <View style={[commonStyles.px4, commonStyles.py6]}>
            <Text style={[commonStyles.title, { fontSize: 32 }]}>
              ¡Hola! 👋
            </Text>
            <Text style={commonStyles.subtitle}>
              Es hora de cuidar tu bienestar
            </Text>
          </View>

          {/* Stats Card */}
          <View style={commonStyles.wellnessCard}>
            <View style={commonStyles.statsContainer}>
              <View style={commonStyles.statItem}>
                <Animated.Text 
                  style={[
                    commonStyles.statIcon, 
                    { transform: [{ scale: heartsAnim }] }
                  ]}
                >
                  💖
                </Animated.Text>
                <Text style={commonStyles.statText}>{gameState.hearts}</Text>
              </View>
              
              <View style={commonStyles.statItem}>
                <Text style={commonStyles.statIcon}>📅</Text>
                <Text style={commonStyles.statText}>{gameState.streak} días</Text>
              </View>
              
              <View style={commonStyles.statItem}>
                <Text style={commonStyles.statIcon}>🏆</Text>
                <Text style={commonStyles.statText}>{gameState.totalMissionsCompleted}</Text>
              </View>
            </View>
          </View>

          {/* Pet Section */}
          <View style={commonStyles.wellnessCard}>
            <Text style={[commonStyles.sectionTitle, commonStyles.mb4]}>
              Tu compañero de bienestar
            </Text>
            
            <PetComponent 
              happiness={gameState.petHappiness}
              hearts={gameState.hearts}
            />
            
            <TouchableOpacity
              onPress={handleFeedPet}
              disabled={gameState.hearts === 0}
              style={[
                commonStyles.wellnessButton,
                commonStyles.mt4,
                gameState.hearts === 0 && commonStyles.wellnessButtonDisabled
              ]}
              activeOpacity={0.8}
            >
              <Text style={commonStyles.wellnessButtonText}>
                💖 Alimentar mascota
              </Text>
            </TouchableOpacity>
          </View>

          {/* Progress Section */}
          <View style={commonStyles.wellnessCard}>
            <Text style={[commonStyles.sectionTitle, { flexDirection: 'row', alignItems: 'center' }]}>
              <Text style={{ marginRight: spacing.sm }}>✨</Text>
              Progreso de hoy
            </Text>
            
            <ProgressSection 
              percentage={progressPercentage}
              completed={completedCount}
              total={missions.length}
            />
          </View>

          {/* Missions Section */}
          <View style={commonStyles.wellnessCard}>
            <Text style={[commonStyles.sectionTitle, commonStyles.mb4]}>
              Misiones diarias
            </Text>
            
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onComplete={() => handleMissionComplete(mission.id)}
              />
            ))}
            
            {completedCount === missions.length && (
              <View style={[
                commonStyles.mt4,
                {
                  backgroundColor: colors.wellness[100],
                  borderRadius: 12,
                  padding: spacing.lg,
                  alignItems: 'center'
                }
              ]}>
                <Text style={[
                  commonStyles.sectionTitle, 
                  { fontSize: 18, marginBottom: spacing.xs }
                ]}>
                  ¡Fantástico! 🎉
                </Text>
                <Text style={[
                  commonStyles.subtitle,
                  { fontSize: 14, marginBottom: 0 }
                ]}>
                  Has completado todas las misiones de hoy
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;
