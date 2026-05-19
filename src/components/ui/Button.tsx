import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { layout } from '../../constants/layout';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.xl,
    borderRadius: layout.borderRadius.lg,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.card,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  outlineText: {
    color: colors.accent,
  },
});
