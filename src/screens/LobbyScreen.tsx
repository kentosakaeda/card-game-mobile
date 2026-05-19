import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import Button from '../components/ui/Button';
import { useGameStore } from '../store/gameStore';
import { PlayerDef, CPUDifficulty } from '../engine/types';
import { colors } from '../constants/colors';
import { layout } from '../constants/layout';

type Nav = StackNavigationProp<RootStackParamList, 'Lobby'>;
type Route = RouteProp<RootStackParamList, 'Lobby'>;

const DIFFICULTIES: CPUDifficulty[] = ['easy', 'medium', 'hard'];
const DIFFICULTY_LABELS = { easy: '初級', medium: '中級', hard: '上級' };

export default function LobbyScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { mode } = route.params;
  const startGame = useGameStore((s) => s.startGame);

  const [playerCount, setPlayerCount] = useState(2);
  const [playerName, setPlayerName] = useState('あなた');
  const [difficulty, setDifficulty] = useState<CPUDifficulty>('medium');

  const modeLabel = { cpu: 'CPU対戦', local: 'ローカル対戦', online: 'オンライン対戦' }[mode];

  function handleStart() {
    if (mode === 'online') {
      navigation.navigate('OnlineLobby');
      return;
    }

    const playerDefs: PlayerDef[] = [];

    if (mode === 'cpu') {
      playerDefs.push({ id: 'human-0', name: playerName, kind: 'human' });
      for (let i = 1; i < playerCount; i++) {
        playerDefs.push({
          id: `cpu-${i}`,
          name: `CPU ${i}`,
          kind: 'cpu',
          difficulty,
        });
      }
    } else {
      for (let i = 0; i < playerCount; i++) {
        playerDefs.push({ id: `human-${i}`, name: `Player ${i + 1}`, kind: 'human' });
      }
    }

    startGame({ mode, playerDefs });
    navigation.navigate('Game');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← 戻る</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{modeLabel}</Text>

      {mode === 'cpu' && (
        <View style={styles.section}>
          <Text style={styles.label}>あなたの名前</Text>
          <TextInput
            style={styles.input}
            value={playerName}
            onChangeText={setPlayerName}
            placeholderTextColor={colors.textSecondary}
            maxLength={10}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>プレイヤー数</Text>
        <View style={styles.options}>
          {[2, 3, 4].map((n) => (
            <TouchableOpacity
              key={n}
              style={[styles.option, playerCount === n && styles.optionSelected]}
              onPress={() => setPlayerCount(n)}
            >
              <Text style={[styles.optionText, playerCount === n && styles.optionTextSelected]}>
                {n}人
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {mode === 'cpu' && (
        <View style={styles.section}>
          <Text style={styles.label}>CPU難易度</Text>
          <View style={styles.options}>
            {DIFFICULTIES.map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.option, difficulty === d && styles.optionSelected]}
                onPress={() => setDifficulty(d)}
              >
                <Text
                  style={[styles.optionText, difficulty === d && styles.optionTextSelected]}
                >
                  {DIFFICULTY_LABELS[d]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <Button label="ゲームスタート" onPress={handleStart} style={styles.startBtn} />
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
    marginBottom: layout.spacing.lg,
  },
  backText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: layout.spacing.xl,
  },
  section: {
    marginBottom: layout.spacing.lg,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: layout.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.sm,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  options: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
  },
  option: {
    flex: 1,
    paddingVertical: layout.spacing.sm,
    borderRadius: layout.borderRadius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  optionText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: colors.text,
  },
  startBtn: {
    marginTop: layout.spacing.xl,
  },
});
