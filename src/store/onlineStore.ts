import { create } from 'zustand';
import { UserProfile } from '../engine/types';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface OnlineStore {
  roomId: string | null;
  localPlayerId: string | null;
  isHost: boolean;
  connectionStatus: ConnectionStatus;
  userProfile: UserProfile | null;

  setRoomId: (id: string | null) => void;
  setLocalPlayerId: (id: string) => void;
  setIsHost: (v: boolean) => void;
  setConnectionStatus: (s: ConnectionStatus) => void;
  setUserProfile: (profile: UserProfile) => void;
  resetOnline: () => void;
}

export const useOnlineStore = create<OnlineStore>((set) => ({
  roomId: null,
  localPlayerId: null,
  isHost: false,
  connectionStatus: 'disconnected',
  userProfile: null,

  setRoomId: (id) => set({ roomId: id }),
  setLocalPlayerId: (id) => set({ localPlayerId: id }),
  setIsHost: (v) => set({ isHost: v }),
  setConnectionStatus: (s) => set({ connectionStatus: s }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  resetOnline: () =>
    set({
      roomId: null,
      isHost: false,
      connectionStatus: 'disconnected',
    }),
}));
