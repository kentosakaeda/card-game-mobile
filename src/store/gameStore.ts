import { create } from 'zustand';
import {
  GameState,
  GameConfig,
  GameMode,
  PlayerDef,
} from '../engine/types';
import {
  createGame,
  dealCards,
  playCard,
  advanceRound,
  isGameOver,
} from '../engine/GameEngine';
import { selectCPUCard } from '../engine/CPUPlayer';
import { CPU_THINK_DELAY_MS } from '../constants/game';

interface GameStore {
  state: GameState | null;
  mode: GameMode;
  humanPlayerIds: string[];

  startGame: (config: GameConfig) => void;
  playCard: (playerId: string, cardId: string) => void;
  advanceRound: () => void;
  triggerCPUTurns: () => Promise<void>;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  state: null,
  mode: 'cpu',
  humanPlayerIds: [],

  startGame: (config: GameConfig) => {
    const gameState = dealCards(createGame(config.playerDefs));
    const humanIds = config.playerDefs
      .filter((p) => p.kind === 'human')
      .map((p) => p.id);
    set({ state: gameState, mode: config.mode, humanPlayerIds: humanIds });
  },

  playCard: (playerId: string, cardId: string) => {
    const { state } = get();
    if (!state) return;
    const newState = playCard(state, playerId, cardId);
    set({ state: newState });
  },

  advanceRound: () => {
    const { state } = get();
    if (!state) return;
    set({ state: advanceRound(state) });
  },

  triggerCPUTurns: async () => {
    const { state } = get();
    if (!state) return;

    const cpuPlayers = state.players.filter(
      (p) => p.kind === 'cpu' && p.hand.length > 0
    );

    for (const cpu of cpuPlayers) {
      const alreadyPlayed = state.currentPlays.some((cp) => cp.playerId === cpu.id);
      if (alreadyPlayed) continue;

      const delay =
        CPU_THINK_DELAY_MS.min +
        Math.random() * (CPU_THINK_DELAY_MS.max - CPU_THINK_DELAY_MS.min);

      await new Promise((resolve) => setTimeout(resolve, delay));

      const currentState = get().state;
      if (!currentState) return;

      const card = selectCPUCard(
        cpu.hand,
        currentState.players
          .filter((p) => p.id !== cpu.id)
          .map((p) => p.hand.length),
        currentState.roundHistory,
        cpu.difficulty ?? 'medium'
      );

      const newState = playCard(currentState, cpu.id, card.id);
      set({ state: newState });
    }
  },

  resetGame: () => {
    set({ state: null, humanPlayerIds: [] });
  },
}));
