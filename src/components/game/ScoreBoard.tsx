import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Player } from '../../engine/types';
import { colors } from '../../constants/colors';
import { layout } from '../../constants/layout';

interface ScoreBoardProps {
  players: Player[];
  humanPlayerIds: string[];
}

export default function ScoreBoard({ players, humanPlayerIds }: ScoreBoardProps) {
  const sorted = [...players].sort((a, b) => b.wonCards.length - a.wonCards.length);

  return (
    <View style={styles.container}>
      {sorted.map((player, i) => (
        <View key={player.id} style={styles.row}>
          <Text style={styles.rank}>#{i + 1}</Text>
          <Text
            style={[
              styles.name,
              humanPlayerIds.includes(player.id) && styles.humanName,
            ]}
            numberOfLines={1}
          >
            {player.name}
          </Text>
          <Text style={styles.score}>{player.wonCards.length}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    gap: layout.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rank: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  name: {
    color: colors.textSecondary,
    fontSize: 12,
    maxWidth: 60,
  },
  humanName: {
    color: colors.accent,
    fontWeight: '700',
  },
  score: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 2,
  },
});
