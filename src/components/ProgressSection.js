import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { commonStyles } from '../styles/commonStyles';
import { colors, spacing } from '../styles/theme';

const ProgressSection = ({ percentage, completed, total }) => {
  const progressAnim = new Animated.Value(0);
  const shimmerAnim = new Animated.Value(0);

  useEffect(() => {
    // Animación de la barra de progreso
    Animated.timing(progressAnim, {
      toValue: percentage / 100,
      duration: 800,
      useNativeDriver: false,
    }).start();

    // Animación de shimmer
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [percentage]);

  const getMotivationalMessage = () => {
    if (percentage === 100) {
      return '🎉 ¡Increíble! Has completado todas las misiones de hoy';
    } else if (percentage >= 66) {
      return '💪 ¡Excelente progreso! Ya casi terminas';
    } else if (percentage >= 33) {
      return '🌟 ¡Buen trabajo! Sigues por buen camino';
    } else {
      return '🚀 ¡Comienza tu día de bienestar!';
    }
  };

  return (
    <View style={{ marginVertical: spacing.lg }}>
      {/* Progress Info */}
      <View style={[commonStyles.row, commonStyles.spaceBetween, commonStyles.mb3]}>
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: colors.gray[700]
        }}>
          {completed} de {total} misiones completadas
        </Text>
        <Text style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: colors.wellness[600]
        }}>
          {Math.round(percentage)}%
        </Text>
      </View>

      {/* Progress Bar Container */}
      <View style={{ position: 'relative', marginBottom: spacing.lg }}>
        <View style={commonStyles.progressBar}>
          <Animated.View
            style={{
              height: '100%',
              borderRadius: 999,
              overflow: 'hidden',
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }}
          >
            <LinearGradient
              colors={[colors.wellness[400], colors.wellness[600]]}
              style={{ flex: 1, position: 'relative' }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {/* Shimmer effect */}
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  transform: [
                    {
                      translateX: shimmerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-100, 100],
                      }),
                    },
                  ],
                }}
              />
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Progress Milestones */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {[...Array(total)].map((_, index) => {
            const milestonePercentage = ((index + 1) / total) * 100;
            const isCompleted = (index + 1) <= completed;
            
            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  left: `${milestonePercentage - (100 / total / 2)}%`,
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  borderWidth: 2,
                  borderColor: colors.white,
                  backgroundColor: isCompleted ? colors.wellness[500] : colors.gray[300],
                  transform: [{ translateX: -6 }],
                }}
              />
            );
          })}
        </View>
      </View>

      {/* Motivational Message */}
      <Text style={{
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: percentage >= 33 ? colors.wellness[600] : colors.gray[600],
        lineHeight: 20,
      }}>
        {getMotivationalMessage()}
      </Text>
    </View>
  );
};

export default ProgressSection;
