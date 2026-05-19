import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';
import { layout } from '../constants/layout';
import { Rank } from '../engine/types';
import { RANK_THRESHOLDS } from '../constants/game';

const RANK_COLORS: Record<Rank, string> = {
  Bronze: colors.rankBronze,
  Silver: colors.rankSilver,
  Gold: colors.rankGold,
  Platinum: colors.rankPlatinum,
  Diamond: colors.rankDiamond,
  Master: colors.rankMaster,
};

// Placeholder data — replaced by Firebase data in Phase 3
const PLACEHOLDER_DATA = [
  { uid: '1', displayName: 'Player A', totalPoints: 4200, rank: 'Master' as Rank },
  { uid: '2', displayName: 'Player B', totalPoints: 2100, rank: 'Diamond' as Rank },
  { uid: '3', displayName: 'Player C', totalPoints: 1200, rank: 'Platinum' as Rank },
];

export default function LeaderboardScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← 戻る</Text>
      </TouchableOpacity>
      <Text style={styles.title}>ランキング</Text>

      <View style={styles.rankInfo}>
        {(Object.keys(RANK_THRESHOLDS) as Rank[]).map((rank) => (
          <View key={rank} style={styles.rankRow}>
            <Text style={[styles.rankName, { color: RANK_COLORS[rank] }]}>{rank}</Text>
            <Text style={styles.rankPts}>{RANK_THRESHOLDS[rank]}pt〜</Text>
          </View>
        ))}
      </View>

      <FlatList
        data={PLACEHOLDER_DATA}
        keyExtractor={(item) => item.uid}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rowRank}>#{index + 1}</Text>
            <Text style={styles.rowName}>{item.displayName}</Text>
            <Text style={[styles.rowRankBadge, { color: RANK_COLORS[item.rank] }]}>
              {item.rank}
            </Text>
            <Text style={styles.rowPts}>{item.totalPoints}pt</Text>
          </View>
        )}
      />

      <Text style={styles.note}>※ オンライン対戦実装後にリアルタイムデータに切り替わります</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: layout.spacing.lg,
  },
  back: {
    marginBottom: layout.spacing.md,
  },
  backText: {
    color: colors.textSecondary,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: layout.spacing.lg,
  },
  rankInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.sm,
    marginBottom: layout.spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: layout.spacing.md,
  },
  rankRow: {
    alignItems: 'center',
    minWidth: 80,
  },
  rankName: {
    fontSize: 13,
    fontWeight: '700',
  },
  rankPts: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.sm,
    padding: layout.spacing.md,
    marginBottom: layout.spacing.sm,
    gap: layout.spacing.sm,
  },
  rowRank: {
    color: colors.textSecondary,
    width: 32,
    fontSize: 13,
  },
  rowName: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  rowRankBadge: {
    fontSize: 12,
    fontWeight: '700',
  },
  rowPts: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 14,
  },
  note: {
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    marginTop: layout.spacing.md,
  },
});
