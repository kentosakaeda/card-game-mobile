import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOnlineStore } from '../store/onlineStore';
import { colors } from '../constants/colors';
import { layout } from '../constants/layout';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { userProfile } = useOnlineStore();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← 戻る</Text>
      </TouchableOpacity>
      <Text style={styles.title}>プロフィール</Text>

      {userProfile ? (
        <View style={styles.card}>
          <Text style={styles.name}>{userProfile.displayName}</Text>
          <Text style={styles.rank}>{userProfile.rank}</Text>
          <Text style={styles.pts}>{userProfile.totalPoints} pt</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{userProfile.gamesPlayed}</Text>
              <Text style={styles.statLabel}>試合数</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{userProfile.wins}</Text>
              <Text style={styles.statLabel}>勝利数</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>
                {userProfile.gamesPlayed > 0
                  ? Math.round((userProfile.wins / userProfile.gamesPlayed) * 100)
                  : 0}%
              </Text>
              <Text style={styles.statLabel}>勝率</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            オンライン対戦に参加するとプロフィールが作成されます
          </Text>
        </View>
      )}
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.xl,
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  rank: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.accent,
  },
  pts: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
  },
  stats: {
    flexDirection: 'row',
    gap: layout.spacing.xl,
    marginTop: layout.spacing.md,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
  },
});
