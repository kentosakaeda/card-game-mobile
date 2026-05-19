import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useGameStore } from '../store/gameStore';
import { getFinalRanking } from '../engine/GameEngine';
import Button from '../components/ui/Button';
import { colors } from '../constants/colors';
import { layout } from '../constants/layout';

type Nav = StackNavigationProp<RootStackParamList, 'Result'>;

const RANK_LABELS = ['🥇', '🥈', '🥉', '4位'];

export default function ResultScreen() {
  const navigation = useNavigation<Nav>();
  const { state, humanPlayerIds, resetGame } = useGameStore();

  if (!state) {
    navigation.replace('Home');
    return null;
  }

  const ranking = getFinalRanking(state);
  const humanPlayer = ranking.find((p) => humanPlayerIds.includes(p.id));
  const humanRank = humanPlayer ? ranking.indexOf(humanPlayer) + 1 : null;

  function handlePlayAgain() {
    resetGame();
    navigation.replace('Home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ゲーム終了！</Text>

      {humanRank && (
        <View style={styles.myResult}>
          <Text style={styles.myRankLabel}>{RANK_LABELS[humanRank - 1] ?? `${humanRank}位`}</Text>
          <Text style={styles.myRankText}>
            {humanRank === 1 ? 'おめでとう！' : 'またチャレンジ！'}
          </Text>
        </View>
      )}

      <FlatList
        data={ranking}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.row,
              humanPlayerIds.includes(item.id) && styles.rowHighlight,
            ]}
          >
            <Text style={styles.rowRank}>{RANK_LABELS[index] ?? `${index + 1}位`}</Text>
            <Text style={styles.rowName}>{item.name}</Text>
            <Text style={styles.rowScore}>{item.wonCards.length}枚獲得</Text>
          </View>
        )}
      />

      <View style={styles.buttons}>
        <Button label="もう一度" onPress={handlePlayAgain} />
        <Button
          label="ホームへ"
          variant="outline"
          onPress={() => {
            resetGame();
            navigation.replace('Home');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: layout.spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: layout.spacing.lg,
  },
  myResult: {
    alignItems: 'center',
    marginBottom: layout.spacing.lg,
  },
  myRankLabel: {
    fontSize: 56,
  },
  myRankText: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '700',
    marginTop: layout.spacing.xs,
  },
  list: {
    flex: 1,
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
  rowHighlight: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  rowRank: {
    fontSize: 22,
    width: 36,
    textAlign: 'center',
  },
  rowName: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  rowScore: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  buttons: {
    gap: layout.spacing.md,
    marginTop: layout.spacing.lg,
  },
});
