import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { CardValue } from '../../engine/types';
import { colors } from '../../constants/colors';
import { layout } from '../../constants/layout';

interface CardViewProps {
  value?: CardValue;
  faceUp?: boolean;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  small?: boolean;
}

function getCardLabel(value: CardValue): string {
  if (value === 1) return 'A';
  if (value === 11) return 'J';
  if (value === 12) return 'Q';
  if (value === 13) return 'K';
  return String(value);
}

export default function CardView({
  value,
  faceUp = true,
  selected = false,
  onPress,
  disabled = false,
  small = false,
}: CardViewProps) {
  const cardSize = small
    ? { width: 44, height: 64 }
    : { width: layout.card.width, height: layout.card.height };

  if (!faceUp) {
    return (
      <View style={[styles.card, cardSize, styles.cardBack]}>
        <View style={styles.backPattern} />
      </View>
    );
  }

  const label = value ? getCardLabel(value) : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.85}
      style={[
        styles.card,
        cardSize,
        styles.cardFront,
        selected && styles.selected,
      ]}
    >
      <Text style={[styles.cornerLabel, small && styles.smallLabel]}>{label}</Text>
      <Text style={[styles.centerLabel, small && styles.smallCenter]}>{label}</Text>
      <Text style={[styles.cornerLabelBottom, small && styles.smallLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: layout.card.borderRadius,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  cardFront: {
    backgroundColor: colors.cardFace,
    justifyContent: 'space-between',
    padding: 4,
  },
  cardBack: {
    backgroundColor: colors.cardBack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backPattern: {
    width: '80%',
    height: '80%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
  },
  selected: {
    borderWidth: 3,
    borderColor: colors.accent,
    transform: [{ translateY: -8 }],
  },
  cornerLabel: {
    fontSize: layout.card.smallFontSize,
    fontWeight: '700',
    color: colors.card,
  },
  cornerLabelBottom: {
    fontSize: layout.card.smallFontSize,
    fontWeight: '700',
    color: colors.card,
    alignSelf: 'flex-end',
    transform: [{ rotate: '180deg' }],
  },
  centerLabel: {
    fontSize: layout.card.largeFontSize,
    fontWeight: '900',
    color: colors.card,
    textAlign: 'center',
  },
  smallLabel: {
    fontSize: 10,
  },
  smallCenter: {
    fontSize: 20,
  },
});
