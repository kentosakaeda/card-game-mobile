import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSettingsStore } from '../store/settingsStore';
import { colors } from '../constants/colors';
import { layout } from '../constants/layout';
import { CPUDifficulty } from '../engine/types';

const DIFFICULTIES: { value: CPUDifficulty; label: string }[] = [
  { value: 'easy', label: '初級' },
  { value: 'medium', label: '中級' },
  { value: 'hard', label: '上級' },
];

export default function SettingsScreen() {
  const navigation = useNavigation();
  const {
    soundEnabled,
    hapticsEnabled,
    defaultCPUDifficulty,
    playerName,
    setSoundEnabled,
    setHapticsEnabled,
    setDefaultCPUDifficulty,
    setPlayerName,
  } = useSettingsStore();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← 戻る</Text>
      </TouchableOpacity>
      <Text style={styles.title}>設定</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>プレイヤー名</Text>
        <TextInput
          style={styles.input}
          value={playerName}
          onChangeText={setPlayerName}
          placeholderTextColor={colors.textSecondary}
          maxLength={10}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>サウンド・触覚</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>サウンド</Text>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.text}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>バイブレーション</Text>
          <Switch
            value={hapticsEnabled}
            onValueChange={setHapticsEnabled}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.text}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>デフォルトCPU難易度</Text>
        <View style={styles.options}>
          {DIFFICULTIES.map((d) => (
            <TouchableOpacity
              key={d.value}
              style={[
                styles.option,
                defaultCPUDifficulty === d.value && styles.optionSelected,
              ]}
              onPress={() => setDefaultCPUDifficulty(d.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  defaultCPUDifficulty === d.value && styles.optionTextSelected,
                ]}
              >
                {d.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
    marginBottom: layout.spacing.xl,
  },
  section: {
    marginBottom: layout.spacing.lg,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: layout.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.sm,
    padding: layout.spacing.md,
    marginBottom: layout.spacing.xs,
  },
  rowLabel: {
    color: colors.text,
    fontSize: 16,
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
});
