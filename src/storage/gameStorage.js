// Game Storage - Día 1 Implementation
// Persistencia inicial usando AsyncStorage (equivalente a DataStore en Android)

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'wellness-preferences',
  GAME_STATE: 'wellness-game-state',
  DAILY_MISSIONS: 'wellness-daily-missions',
  PET_STATE: 'wellness-pet-state'
};

// Default states
export const DEFAULT_GAME_STATE = {
  hearts: 2,
  petHappiness: 'neutral',
  completedMissionsToday: 0,
  streak: 1,
  totalMissionsCompleted: 0,
  lastPlayDate: new Date().toISOString().split('T')[0]
};

export const DEFAULT_PET_STATE = {
  happiness: 'neutral', // 'happy' | 'neutral' | 'sad'
  lastFed: null,
  level: 1,
  experience: 0,
  name: 'Wellness Buddy',
  mood: 'neutral',
  hunger: 50, // 0-100
  energy: 75  // 0-100
};

// User Preferences Storage
export const saveUserPreferences = async (preferences) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    console.log('✅ User preferences saved:', preferences);
    return true;
  } catch (error) {
    console.error('❌ Error saving user preferences:', error);
    return false;
  }
};

export const getUserPreferences = async () => {
  try {
    const preferences = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    if (preferences) {
      const parsed = JSON.parse(preferences);
      console.log('✅ User preferences loaded:', parsed);
      return parsed;
    }
    return null;
  } catch (error) {
    console.error('❌ Error loading user preferences:', error);
    return null;
  }
};

// Game State Storage
export const saveGameState = async (gameState) => {
  try {
    const stateWithTimestamp = {
      ...gameState,
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
    await AsyncStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(stateWithTimestamp));
    console.log('✅ Game state saved:', stateWithTimestamp);
    return true;
  } catch (error) {
    console.error('❌ Error saving game state:', error);
    return false;
  }
};

export const getGameState = async () => {
  try {
    const gameState = await AsyncStorage.getItem(STORAGE_KEYS.GAME_STATE);
    if (gameState) {
      const parsed = JSON.parse(gameState);
      console.log('✅ Game state loaded:', parsed);
      return parsed;
    }
    return DEFAULT_GAME_STATE;
  } catch (error) {
    console.error('❌ Error loading game state:', error);
    return DEFAULT_GAME_STATE;
  }
};

// Pet State Storage
export const savePetState = async (petState) => {
  try {
    const stateWithTimestamp = {
      ...petState,
      lastUpdated: new Date().toISOString()
    };
    await AsyncStorage.setItem(STORAGE_KEYS.PET_STATE, JSON.stringify(stateWithTimestamp));
    console.log('✅ Pet state saved:', stateWithTimestamp);
    return true;
  } catch (error) {
    console.error('❌ Error saving pet state:', error);
    return false;
  }
};

export const getPetState = async () => {
  try {
    const petState = await AsyncStorage.getItem(STORAGE_KEYS.PET_STATE);
    if (petState) {
      const parsed = JSON.parse(petState);
      console.log('✅ Pet state loaded:', parsed);
      return parsed;
    }
    return DEFAULT_PET_STATE;
  } catch (error) {
    console.error('❌ Error loading pet state:', error);
    return DEFAULT_PET_STATE;
  }
};

// Daily Missions Storage
export const saveDailyMissions = async (missions) => {
  try {
    const missionsWithDate = {
      missions,
      date: new Date().toISOString().split('T')[0],
      savedAt: new Date().toISOString()
    };
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_MISSIONS, JSON.stringify(missionsWithDate));
    console.log('✅ Daily missions saved:', missionsWithDate);
    return true;
  } catch (error) {
    console.error('❌ Error saving daily missions:', error);
    return false;
  }
};

export const getDailyMissions = async () => {
  try {
    const missions = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_MISSIONS);
    if (missions) {
      const parsed = JSON.parse(missions);
      const today = new Date().toISOString().split('T')[0];
      
      // Verificar si las misiones son de hoy
      if (parsed.date === today) {
        console.log('✅ Daily missions loaded for today:', parsed.missions);
        return parsed.missions;
      } else {
        console.log('⚠️ Missions are from another day, returning null');
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error('❌ Error loading daily missions:', error);
    return null;
  }
};

// Utility functions
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    console.log('✅ All wellness data cleared');
    return true;
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    return false;
  }
};

export const getStorageInfo = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const wellnessKeys = keys.filter(key => key.startsWith('wellness-'));
    
    const info = {
      totalKeys: keys.length,
      wellnessKeys: wellnessKeys.length,
      keys: wellnessKeys
    };
    console.log('📊 Storage info:', info);
    return info;
  } catch (error) {
    console.error('❌ Error getting storage info:', error);
    return null;
  }
};

// Pet happiness logic - Día 1 requirement
export const calculatePetHappiness = (gameState, timeSinceLastFed) => {
  const { hearts, completedMissionsToday } = gameState;
  
  // Lógica simple para Día 1
  if (timeSinceLastFed && timeSinceLastFed < 24 * 60 * 60 * 1000) {
    // Fed within last 24 hours
    return 'happy';
  } else if (completedMissionsToday > 0) {
    // Has completed some missions today
    return 'neutral';
  } else if (hearts === 0) {
    // No hearts and no missions completed
    return 'sad';
  } else {
    // Default state
    return 'neutral';
  }
};

// Hearts and feeding logic - Día 1 requirement
export const feedPet = async (currentGameState) => {
  if (currentGameState.hearts > 0) {
    const newGameState = {
      ...currentGameState,
      hearts: currentGameState.hearts - 1,
      petHappiness: 'happy'
    };
    
    const newPetState = {
      ...(await getPetState()),
      happiness: 'happy',
      lastFed: new Date().toISOString(),
      hunger: Math.min(100, (await getPetState()).hunger + 25),
      energy: Math.min(100, (await getPetState()).energy + 10)
    };
    
    // Save both states
    await saveGameState(newGameState);
    await savePetState(newPetState);
    
    console.log('🍖 Pet fed successfully!', { newGameState, newPetState });
    return { success: true, newGameState, newPetState };
  } else {
    console.log('❌ Not enough hearts to feed pet');
    return { success: false, error: 'No hearts available' };
  }
};
