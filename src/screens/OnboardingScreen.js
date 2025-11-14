import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { commonStyles } from '../styles/commonStyles';
import { colors, spacing } from '../styles/theme';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    objective: '',
    availability: '',
    intensity: '',
    style: ''
  });
  const [progressAnim] = useState(new Animated.Value(0.25));

  // Debug log
  console.log('OnboardingScreen mounted, current step:', currentStep);

  const questions = [
    {
      id: 'objective',
      title: '¿Cuál es tu objetivo principal?',
      subtitle: 'Elige el área que más te interesa mejorar',
      icon: '🎯',
      options: [
        { id: 'energy', label: 'Más energía', icon: '⚡', description: 'Sentirte más activo/a durante el día' },
        { id: 'stress', label: 'Menos estrés', icon: '🧘', description: 'Encontrar momentos de calma y relajación' },
        { id: 'movement', label: 'Más movimiento', icon: '🏃', description: 'Incorporar actividad física regular' }
      ]
    },
    {
      id: 'availability',
      title: '¿Cuánto tiempo tienes disponible?',
      subtitle: 'Para dedicar a tu bienestar cada día',
      icon: '⏰',
      options: [
        { id: 'low', label: '5-10 minutos', icon: '⏱️', description: 'Pequeños momentos entre actividades' },
        { id: 'medium', label: '10-20 minutos', icon: '⏰', description: 'Un momento dedicado en tu rutina' },
        { id: 'high', label: '20+ minutos', icon: '🕐', description: 'Tiempo suficiente para actividades completas' }
      ]
    },
    {
      id: 'intensity',
      title: '¿Qué intensidad prefieres?',
      subtitle: 'Para tus actividades de bienestar',
      icon: '⚡',
      options: [
        { id: 'gentle', label: 'Suave', icon: '🌱', description: 'Actividades relajantes y suaves' },
        { id: 'normal', label: 'Moderada', icon: '🌿', description: 'Un equilibrio entre calma y energía' },
        { id: 'active', label: 'Activa', icon: '🌳', description: 'Actividades más dinámicas y energéticas' }
      ]
    },
    {
      id: 'style',
      title: '¿Qué estilo te motiva más?',
      subtitle: 'Para mantenerte comprometido/a',
      icon: '💖',
      options: [
        { id: 'mindful', label: 'Mindfulness', icon: '🧘‍♀️', description: 'Ejercicios de atención plena y respiración' },
        { id: 'creative', label: 'Creativo', icon: '🎨', description: 'Actividades artísticas y expresivas' },
        { id: 'social', label: 'Social', icon: '👥', description: 'Compartir progreso y conectar con otros' }
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      const newProgress = ((currentStep + 2) / questions.length);
      Animated.timing(progressAnim, {
        toValue: newProgress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      // Completar onboarding
      onComplete(answers);
      navigation.replace('Home');
    }
  };

  const handlePrevious = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      const newProgress = (currentStep / questions.length);
      Animated.timing(progressAnim, {
        toValue: newProgress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id];

  return (
    <LinearGradient
      colors={[colors.wellness[50], colors.wellness[100]]}
      style={commonStyles.container}
    >
      <SafeAreaView style={commonStyles.safeArea}>
        
        {/* Header */}
        <View style={[commonStyles.px4, commonStyles.py4]}>
          <View style={[commonStyles.row, commonStyles.spaceBetween, commonStyles.mb4]}>
            <Text style={commonStyles.title}>Wellness Quest</Text>
            <Text style={{ fontSize: 14, color: colors.wellness[600] }}>
              {currentStep + 1} de {questions.length}
            </Text>
          </View>
          
          {/* Progress Bar */}
          <View style={commonStyles.progressContainer}>
            <View style={commonStyles.progressBar}>
              <Animated.View 
                style={[
                  commonStyles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    })
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Content */}
        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={commonStyles.wellnessCard}>
            
            {/* Question Header */}
            <View style={[commonStyles.centeredText, commonStyles.mb6]}>
              <Text style={{ fontSize: 64, marginBottom: spacing.lg }}>
                {currentQuestion.icon}
              </Text>
              <Text style={[commonStyles.sectionTitle, commonStyles.mb2]}>
                {currentQuestion.title}
              </Text>
              <Text style={commonStyles.subtitle}>
                {currentQuestion.subtitle}
              </Text>
            </View>

            {/* Options */}
            <View style={commonStyles.mb6}>
              {currentQuestion.options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleAnswer(currentQuestion.id, option.id)}
                  style={[
                    commonStyles.optionButton,
                    currentAnswer === option.id && commonStyles.optionButtonSelected
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={commonStyles.optionContent}>
                    <Text style={commonStyles.optionIcon}>{option.icon}</Text>
                    <View style={commonStyles.optionText}>
                      <Text style={commonStyles.optionTitle}>{option.label}</Text>
                      <Text style={commonStyles.optionDescription}>{option.description}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Navigation Buttons */}
            <View style={[commonStyles.row, commonStyles.spaceBetween]}>
              <TouchableOpacity
                onPress={handlePrevious}
                disabled={currentStep === 0}
                style={[
                  commonStyles.px4,
                  commonStyles.py3,
                  { opacity: currentStep === 0 ? 0.3 : 1 }
                ]}
                activeOpacity={0.7}
              >
                <Text style={{ color: colors.wellness[600], fontSize: 16 }}>
                  ← Anterior
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNext}
                disabled={!currentAnswer}
                style={[
                  commonStyles.wellnessButton,
                  !currentAnswer && commonStyles.wellnessButtonDisabled
                ]}
                activeOpacity={0.8}
              >
                <Text style={commonStyles.wellnessButtonText}>
                  {currentStep === questions.length - 1 ? 'Comenzar' : 'Siguiente'} →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingScreen;
