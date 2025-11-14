/**
 * SERVICIO: StorageService  
 * Propósito: Manejar persistencia local (equivalente a DataStore/Room del README)
 * Funcionalidades: Guardar/cargar GameState y UserPreferences
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState, createInitialGameState } from '../models/GameState';
import { UserPreferences } from '../models/UserPreferences';

const KEYS = {
  GAME_STATE: '@wellness_quest_game_state',
  USER_PREFERENCES: '@wellness_quest_user_preferences',
  ONBOARDING_COMPLETED: '@wellness_quest_onboarding_completed'
};

export class StorageService {
  // GAME STATE - Estado principal del juego
  static async saveGameState(gameState) {
    try {
      const jsonData = JSON.stringify(gameState.toJSON());
      await AsyncStorage.setItem(KEYS.GAME_STATE, jsonData);
      console.log('✅ GameState guardado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error guardando GameState:', error);
      return false;
    }
  }

  static async loadGameState() {
    try {
      const jsonData = await AsyncStorage.getItem(KEYS.GAME_STATE);
      if (jsonData) {
        const data = JSON.parse(jsonData);
        console.log('✅ GameState cargado correctamente');
        return GameState.fromJSON(data);
      }
      
      // Si no existe, crear estado inicial
      console.log('ℹ️ No hay GameState guardado, creando inicial');
      return createInitialGameState();
    } catch (error) {
      console.error('❌ Error cargando GameState:', error);
      return createInitialGameState();
    }
  }

  // USER PREFERENCES - Respuestas del onboarding
  static async saveUserPreferences(userPreferences) {
    try {
      const jsonData = JSON.stringify(userPreferences);
      await AsyncStorage.setItem(KEYS.USER_PREFERENCES, jsonData);
      console.log('✅ UserPreferences guardadas correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error guardando UserPreferences:', error);
      return false;
    }
  }

  static async loadUserPreferences() {
    try {
      const jsonData = await AsyncStorage.getItem(KEYS.USER_PREFERENCES);
      if (jsonData) {
        const data = JSON.parse(jsonData);
        console.log('✅ UserPreferences cargadas correctamente');
        return new UserPreferences(data);
      }
      return new UserPreferences({});
    } catch (error) {
      console.error('❌ Error cargando UserPreferences:', error);
      return new UserPreferences({});
    }
  }

  // ONBOARDING STATUS - Si completó el onboarding
  static async setOnboardingCompleted(completed = true) {
    try {
      await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETED, JSON.stringify(completed));
      console.log('✅ Estado de onboarding guardado:', completed);
      return true;
    } catch (error) {
      console.error('❌ Error guardando estado de onboarding:', error);
      return false;
    }
  }

  static async hasCompletedOnboarding() {
    try {
      const completed = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETED);
      return completed ? JSON.parse(completed) : false;
    } catch (error) {
      console.error('❌ Error verificando onboarding:', error);
      return false;
    }
  }

  // UTILIDADES - Limpiar datos (para testing/debug)
  static async clearAllData() {
    try {
      await AsyncStorage.multiRemove([
        KEYS.GAME_STATE,
        KEYS.USER_PREFERENCES,
        KEYS.ONBOARDING_COMPLETED
      ]);
      console.log('✅ Todos los datos limpiados');
      return true;
    } catch (error) {
      console.error('❌ Error limpiando datos:', error);
      return false;
    }
  }

  // DEBUG - Ver todos los datos guardados
  static async debugPrintAllData() {
    try {
      const gameState = await this.loadGameState();
      const userPrefs = await this.loadUserPreferences();
      const onboardingCompleted = await this.hasCompletedOnboarding();

      console.log('=== DEBUG STORAGE ===');
      console.log('GameState:', gameState);
      console.log('UserPreferences:', userPrefs);
      console.log('OnboardingCompleted:', onboardingCompleted);
      console.log('====================');
    } catch (error) {
      console.error('❌ Error en debug:', error);
    }
  }
}

export default StorageService;
