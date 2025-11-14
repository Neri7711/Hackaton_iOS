import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../styles/theme';

const PetComponent = ({ happiness, hearts }) => {
  const [wiggleAnim] = useState(new Animated.Value(0));
  const [sparkleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animación cuando cambia el estado de felicidad
    if (happiness === 'happy') {
      Animated.sequence([
        Animated.timing(wiggleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(wiggleAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Animación de sparkles
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [happiness]);

  const getPetEmoji = () => {
    switch (happiness) {
      case 'happy':
        return '🐱';
      case 'sad':
        return '😿';
      default:
        return '😺';
    }
  };

  const getPetMessage = () => {
    switch (happiness) {
      case 'happy':
        return '¡Estoy muy feliz! Gracias por cuidarme 💖';
      case 'sad':
        return 'Me siento un poco triste... ¿me das cariño?';
      default:
        return 'Hola! Soy tu compañero de bienestar 😊';
    }
  };

  const getGradientColors = () => {
    switch (happiness) {
      case 'happy':
        return [colors.wellness[100], colors.wellness[200]];
      case 'sad':
        return ['#dbeafe', '#bfdbfe'];
      default:
        return [colors.wellness[100], colors.wellness[200]];
    }
  };

  const getMoodIndicator = () => {
    switch (happiness) {
      case 'happy':
        return '✨';
      case 'sad':
        return '💧';
      default:
        return '🌟';
    }
  };

  return (
    <View style={{ position: 'relative' }}>
      <LinearGradient
        colors={getGradientColors()}
        style={{
          borderRadius: 16,
          padding: spacing['3xl'],
          alignItems: 'center',
          position: 'relative',
        }}
      >
        
        {/* Pet Avatar */}
        <Animated.Text
          style={{
            fontSize: 80,
            marginBottom: spacing.lg,
            transform: [
              {
                rotate: wiggleAnim.interpolate({
                  inputRange: [0, 0.25, 0.75, 1],
                  outputRange: ['0deg', '-3deg', '3deg', '0deg'],
                }),
              },
            ],
          }}
        >
          {getPetEmoji()}
        </Animated.Text>

        {/* Pet Message */}
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 12,
            padding: spacing.lg,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: colors.gray[700],
              textAlign: 'center',
              lineHeight: 20,
            }}
          >
            {getPetMessage()}
          </Text>
        </View>

        {/* Hearts Indicator */}
        <View
          style={{
            position: 'absolute',
            top: spacing.lg,
            right: spacing.lg,
            flexDirection: 'row',
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Animated.Text
              key={i}
              style={{
                fontSize: 24,
                marginLeft: spacing.xs,
                opacity: i < hearts ? 1 : 0.3,
                transform: [
                  {
                    scale: i < hearts ? 1 : 0.7,
                  },
                ],
              }}
            >
              💖
            </Animated.Text>
          ))}
        </View>

        {/* Mood Indicator */}
        <View
          style={{
            position: 'absolute',
            top: spacing.lg,
            left: spacing.lg,
          }}
        >
          <Animated.Text
            style={{
              fontSize: 24,
              transform: [
                {
                  rotate:
                    happiness === 'happy'
                      ? sparkleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        })
                      : '0deg',
                },
              ],
            }}
          >
            {getMoodIndicator()}
          </Animated.Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PetComponent;
