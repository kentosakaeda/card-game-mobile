import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useGameStore } from '../store/gameStore';
import CardHand from '../components/card/CardHand';
import CardView from '../components/card/CardView';
import PlayerArea from '../components/game/PlayerArea';
import ScoreBoard from '../components/game/ScoreBoard';
import RoundResultBanner from '../components/game/RoundResultBanner';
import { colors } from '../constants/colors';
import { layout } from '../constants/layout';
import { REVEAL_DELAY_MS, ROUND_END_DELAY_MS } from '../constants/game';

type Nav = StackNavigationProp<RootStackParamList, 'Game'>;

export default function GameScreen() {
  const navigation = useNavigation<Nav>();
  const { state, mode, humanPlayerIds, playCard, advanceRound, triggerCPUTurns } =
    useGameStore();

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [passModalVisible, setPassModalVisible] = useState(false);
  const [passToPlayer, setPassToPlayer] = useState('');
  const [localHumanIndex, setLocalHumanIndex] = useState(0);

  useEffect(() => {
    if (!state) return;

    if (state.phase === 'game_over') {
      navigation.replace('Result');
      return;
    }

    if (state.phase === 'revealing') {
      const lastResult = state.roundHistory[state.roundHistory.length - 1];
      if (lastResult) {
        const winner = state.players.find((p) => p.id === lastResult.winnerId);
        const msg = winner
          ? `${winner.name} が獲得！ (+${state.players.length}枚)`
          : '引き分け！';
        setBannerMessage(msg);
        setShowBanner(true);
      }

      const timer = setTimeout(() => {
        setShowBanner(false);
        setSelectedCardId(null);
        advanceRound();
      }, REVEAL_DELAY_MS + ROUND_END_DELAY_MS);

      return () => clearTimeout(timer);
    }

    if (state.phase === 'selecting' && mode === 'cpu') {
      const allHumanPlayed = humanPlayerIds.every((id) =>
        state.currentPlays.some((cp) => cp.playerId === id)
      );
      if (allHumanPlayed) {
        triggerCPUTurns();
      }
    }
  }, [state?.phase, state?.currentRound]);

  if (!state) return null;

  const humanPlayer =
    mode === 'local'
      ? state.players[localHumanIndex]
      : state.players.find((p) => humanPlayerIds.includes(p.id));

  const opponents = state.players.filter((p) => p.id !== humanPlayer?.id);
  const isMyTurn =
    state.phase === 'selecting' &&
    humanPlayer !== undefined &&
    !state.currentPlays.some((cp) => cp.playerId === humanPlayer.id);
  const showPlays = state.phase === 'revealing' || state.phase === 'collecting';

  function handleCardSelect(cardId: string) {
    if (!humanPlayer || !isMyTurn) return;
    if (selectedCardId === cardId) {
      playCard(humanPlayer.id, cardId);
      setSelectedCardId(null);

      if (mode === 'local') {
        const nextIndex = (localHumanIndex + 1) % humanPlayerIds.length;
        if (nextIndex !== 0) {
          setPassToPlayer(state.players[nextIndex].name);
          setPassModalVisible(true);
          setLocalHumanIndex(nextIndex);
        }
      }
    } else {
      setSelectedCardId(cardId);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.roundText}>
          ラウンド {state.currentRound} / {state.totalRounds}
        </Text>
        <ScoreBoard players={state.players} humanPlayerIds={humanPlayerIds} />
      </View>

      <View style={styles.opponents}>
        {opponents.map((opp) => (
          <PlayerArea
            key={opp.id}
            player={opp}
            currentPlay={state.currentPlays.find((cp) => cp.playerId === opp.id)}
            showPlay={showPlays}
          />
        ))}
      </View>

      <View style={styles.center}>
        <RoundResultBanner message={bannerMessage} visible={showBanner} />
        {showPlays && (
          <View style={styles.playedCards}>
            {state.currentPlays.map((cp) => (
              <View key={cp.playerId} style={styles.playedCard}>
                <CardView value={cp.card.value} faceUp />
                <Text style={styles.playedLabel}>
                  {state.players.find((p) => p.id === cp.playerId)?.name}
                </Text>
              </View>
            ))}
          </View>
        )}
        {state.phase === 'selecting' && !showPlays && (
          <Text style={styles.instruction}>
            {isMyTurn
              ? 'カードをタップして選択、もう一度タップで出す'
              : 'CPUが考え中...'}
          </Text>
        )}
      </View>

      {humanPlayer && (
        <View style={styles.hand}>
          <PlayerArea
            player={humanPlayer}
            isHuman
            currentPlay={state.currentPlays.find((cp) => cp.playerId === humanPlayer.id)}
            showPlay={showPlays}
          />
          <CardHand
            cards={humanPlayer.hand}
            faceUp
            interactive={isMyTurn}
            onCardSelect={handleCardSelect}
            selectedCardId={selectedCardId}
            label={isMyTurn ? 'タップで選択→もう一度で確定' : undefined}
          />
        </View>
      )}

      <Modal visible={passModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              {passToPlayer} さんに渡してください
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setPassModalVisible(false)}
            >
              <Text style={styles.modalBtnText}>準備OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
  },
  topBar: {
    alignItems: 'center',
    gap: layout.spacing.sm,
    marginBottom: layout.spacing.sm,
  },
  roundText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  opponents: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: layout.spacing.sm,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: layout.spacing.md,
  },
  playedCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: layout.spacing.md,
  },
  playedCard: {
    alignItems: 'center',
    gap: 4,
  },
  playedLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  instruction: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
  hand: {
    gap: layout.spacing.sm,
    alignItems: 'center',
    paddingBottom: layout.spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: layout.spacing.xl,
    alignItems: 'center',
    gap: layout.spacing.lg,
    minWidth: 260,
  },
  modalText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  modalBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: layout.spacing.xl,
    paddingVertical: layout.spacing.md,
    borderRadius: layout.borderRadius.lg,
  },
  modalBtnText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
});
