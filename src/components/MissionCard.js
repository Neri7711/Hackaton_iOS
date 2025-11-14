import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { commonStyles } from '../styles/commonStyles';
import { colors, spacing } from '../styles/theme';

const MissionCard = ({ mission, onComplete }) => {
  const getMissionGradient = (type) => {
    const gradients = {
      breathing: ['#eff6ff', '#dbeafe'],
      movement: ['#f0fdf4', '#dcfce7'],
      mindfulness: ['#faf5ff', '#f3e8ff'],
      relaxation: ['#fdf2f8', '#fce7f3'],
      gratitude: ['#fffbeb', '#fef3c7'],
      exercise: ['#fff7ed', '#fed7aa'],
      default: ['#f9fafb', '#f3f4f6']
    };
    return gradients[type] || gradients.default;
  };

  const handlePress = () => {
    if (!mission.completed) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onComplete();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={mission.completed}
      style={[
        commonStyles.missionCard,
        mission.completed && commonStyles.missionCardCompleted,
        { position: 'relative' }
      ]}
      activeOpacity={0.8}
    >
      {/* Mission Icon */}
      <LinearGradient
        colors={getMissionGradient(mission.type)}
        style={commonStyles.missionIcon}
      >
        <Text style={commonStyles.missionIconText}>{mission.icon}</Text>
      </LinearGradient>

      {/* Mission Content */}
      <View style={commonStyles.missionContent}>
        <Text style={[
          commonStyles.missionTitle,
          mission.completed && commonStyles.missionTitleCompleted
        ]}>
          {mission.title}
        </Text>
        <View style={[commonStyles.row, { alignItems: 'center' }]}>
          <Text style={commonStyles.missionDuration}>
            ⏱️ {mission.duration}
          </Text>
        </View>
      </View>

      {/* Complete Button */}
      <TouchableOpacity
        onPress={handlePress}
        disabled={mission.completed}
        style={[
          commonStyles.missionButton,
          mission.completed && commonStyles.missionButtonCompleted
        ]}
        activeOpacity={0.7}
      >
        <Text style={[
          commonStyles.missionButtonText,
          mission.completed && commonStyles.missionButtonTextCompleted
        ]}>
          {mission.completed ? '✅' : '○'}
        </Text>
      </TouchableOpacity>

      {/* Completion Effect */}
      {mission.completed && (
        <View
          style={{
            position: 'absolute',
            top: spacing.sm,
            right: spacing.sm,
          }}
        >
          <Text style={{ fontSize: 24 }}>✨</Text>
        </View>
      )}

      {/* Reward indicator */}
      {!mission.completed && (
        <View
          style={{
            position: 'absolute',
            top: -spacing.sm,
            right: -spacing.sm,
            backgroundColor: colors.wellness.heart,
            borderRadius: 12,
            paddingHorizontal: spacing.sm,
            paddingVertical: 2,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 12,
              fontWeight: '600',
            }}
          >
            +1 💖
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MissionCard;
