import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import Button from '../components/ui/Button';
import { colors } from '../constants/colors';
import { layout } from '../constants/layout';

type Nav = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TRUMP</Text>
        <Text style={styles.subtitle}>カードバトル</Text>
      </View>

      <View style={styles.buttons}>
        <Button
          label="CPU対戦"
          onPress={() => navigation.navigate('Lobby', { mode: 'cpu' })}
        />
        <Button
          label="ローカル対戦"
          variant="secondary"
          onPress={() => navigation.navigate('Lobby', { mode: 'local' })}
        />
        <Button
          label="オンライン対戦"
          variant="outline"
          onPress={() => navigation.navigate('Lobby', { mode: 'online' })}
        />
      </View>

      <View style={styles.footer}>
        <Button
          label="ランキング"
          variant="secondary"
          onPress={() => navigation.navigate('Leaderboard')}
          style={styles.footerBtn}
        />
        <Button
          label="設定"
          variant="secondary"
          onPress={() => navigation.navigate('Settings')}
          style={styles.footerBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.xl,
    paddingHorizontal: layout.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: layout.spacing.xl,
  },
  title: {
    fontSize: 56,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '600',
    letterSpacing: 4,
    marginTop: -8,
  },
  buttons: {
    gap: layout.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    gap: layout.spacing.md,
  },
  footerBtn: {
    flex: 1,
    paddingVertical: layout.spacing.sm,
  },
});
