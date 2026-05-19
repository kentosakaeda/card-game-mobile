import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';
import { layout } from '../constants/layout';
import Button from '../components/ui/Button';

export default function OnlineLobbyScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState<'create' | 'join'>('create');
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);

  function handleCreate() {
    // Phase 3: Firebase roomService.createRoom()
    alert('オンライン対戦はPhase 3で実装予定です');
  }

  function handleJoin() {
    if (joinCode.length < 6) return;
    // Phase 3: Firebase roomService.joinRoom(joinCode)
    alert('オンライン対戦はPhase 3で実装予定です');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← 戻る</Text>
      </TouchableOpacity>
      <Text style={styles.title}>オンライン対戦</Text>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'create' && styles.tabActive]}
          onPress={() => setTab('create')}
        >
          <Text style={[styles.tabText, tab === 'create' && styles.tabTextActive]}>
            ルーム作成
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'join' && styles.tabActive]}
          onPress={() => setTab('join')}
        >
          <Text style={[styles.tabText, tab === 'join' && styles.tabTextActive]}>
            ルーム参加
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 'create' ? (
        <View style={styles.content}>
          <Text style={styles.description}>
            ルームを作成してコードを友達に共有しましょう。{'\n'}
            ランク戦: 勝利で最大 +30pt 獲得できます。
          </Text>
          <Button label="ルームを作成" onPress={handleCreate} />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.label}>ルームコードを入力</Text>
          <TextInput
            style={styles.input}
            value={joinCode}
            onChangeText={(t) => setJoinCode(t.toUpperCase())}
            placeholder="XXXXXX"
            placeholderTextColor={colors.textSecondary}
            maxLength={6}
            autoCapitalize="characters"
            keyboardType="default"
          />
          <Button
            label="参加する"
            onPress={handleJoin}
            disabled={joinCode.length < 6 || loading}
          />
        </View>
      )}

      {loading && <ActivityIndicator color={colors.accent} style={styles.loader} />}
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: 4,
    marginBottom: layout.spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: layout.spacing.sm,
    borderRadius: layout.borderRadius.sm,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.accent,
  },
  tabText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.text,
  },
  content: {
    gap: layout.spacing.lg,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.sm,
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    textAlign: 'center',
    letterSpacing: 8,
  },
  loader: {
    marginTop: layout.spacing.lg,
  },
});
