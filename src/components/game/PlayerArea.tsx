import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Player, RoundPlay } from '../../engine/types';
import CardView from '../card/CardView';
import { colors } from '../../constants/colors';
import { layout } from '../../constants/layout';

interface PlayerAreaProps {
  player: Player;
  isHuman?: boolean;
  currentPlay?: RoundPlay;
  showPlay?: boolean;
}

export default function PlayerArea({
  player,
  isHuman = false,
  currentPlay,
  showPlay = false,
}: PlayerAreaProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={[styles.name, isHuman && styles.humanName]} numberOfLines={1}>
          {player.name}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{player.wonCards.length}</Text>
        </View>
      </View>
      <View style={styles.playArea}>
        {showPlay && currentPlay ? (
          <CardView value={currentPlay.card.value} faceUp small />
        ) : (
          <CardView faceUp={false} small />
        )}
        <Text style={styles.handCount}>{player.hand.length}枚残り</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: layout.spacing.xs,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
  },
  name: {
    color: colors.textSecondary,
    fontSize: 13,
    maxWidth: 80,
  },
  humanName: {
    color: colors.text,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
  playArea: {
    alignItems: 'center',
    gap: 4,
  },
  handCount: {
    color: colors.textSecondary,
    fontSize: 10,
  },
});
