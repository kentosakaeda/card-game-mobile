import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CPUDifficulty } from '../engine/types';

interface SettingsStore {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  defaultCPUDifficulty: CPUDifficulty;
  playerName: string;

  setSoundEnabled: (v: boolean) => void;
  setHapticsEnabled: (v: boolean) => void;
  setDefaultCPUDifficulty: (v: CPUDifficulty) => void;
  setPlayerName: (v: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      soundEnabled: true,
      hapticsEnabled: true,
      defaultCPUDifficulty: 'medium',
      playerName: 'Player 1',

      setSoundEnabled: (v) => set({ soundEnabled: v }),
      setHapticsEnabled: (v) => set({ hapticsEnabled: v }),
      setDefaultCPUDifficulty: (v) => set({ defaultCPUDifficulty: v }),
      setPlayerName: (v) => set({ playerName: v }),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
