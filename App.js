import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import { getUserPreferences, saveUserPreferences } from './src/storage/gameStorage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      console.log('🔄 Checking onboarding status...');
      const preferences = await getUserPreferences();
      if (preferences) {
        setUserPreferences(preferences);
        setHasCompletedOnboarding(true);
        console.log('✅ User has completed onboarding');
      } else {
        console.log('⚠️ No onboarding data found, showing onboarding');
      }
    } catch (error) {
      console.error('❌ Error loading preferences:', error);
    } finally {
      setIsLoading(false);
      console.log('✅ App initialization complete');
    }
  };

  const handleOnboardingComplete = async (preferences) => {
    try {
      console.log('💾 Saving onboarding preferences:', preferences);
      const success = await saveUserPreferences(preferences);
      if (success) {
        setUserPreferences(preferences);
        setHasCompletedOnboarding(true);
        console.log('🎉 Onboarding completed successfully!');
      } else {
        console.error('❌ Failed to save preferences');
      }
    } catch (error) {
      console.error('❌ Error saving preferences:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F9F6' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4CAF50' }}>🧭💚 Wellness Quest</Text>
        <Text style={{ fontSize: 16, color: '#666', marginTop: 10 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#F5F9F6" />
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#F5F9F6' }
        }}
        initialRouteName={hasCompletedOnboarding ? "Home" : "Onboarding"}
      >
        <Stack.Screen name="Onboarding">
          {(props) => (
            <OnboardingScreen 
              {...props} 
              onComplete={handleOnboardingComplete} 
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen 
              {...props} 
              userPreferences={userPreferences} 
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
