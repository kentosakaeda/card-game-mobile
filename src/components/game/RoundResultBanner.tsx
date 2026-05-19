import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { layout } from '../../constants/layout';

interface RoundResultBannerProps {
  message: string | null;
  visible: boolean;
}

export default function RoundResultBanner({
  message,
  visible,
}: RoundResultBannerProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  useEffect(() => {
    if (visible && message) {
      opacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(1200, withTiming(0, { duration: 400 }))
      );
      translateY.value = withSequence(
        withTiming(0, { duration: 300, easing: Easing.out(Easing.back(1.5)) }),
        withDelay(1200, withTiming(-20, { duration: 400 }))
      );
    }
  }, [visible, message]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!message) return null;

  return (
    <Animated.View style={[styles.container, style]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.sm,
    borderRadius: layout.borderRadius.lg,
    alignSelf: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
