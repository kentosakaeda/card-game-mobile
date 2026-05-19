export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface Card {
  value: CardValue;
  id: string;
}

export type PlayerKind = 'human' | 'cpu' | 'remote';
export type CPUDifficulty = 'easy' | 'medium' | 'hard';

export interface Player {
  id: string;
  name: string;
  kind: PlayerKind;
  difficulty?: CPUDifficulty;
  hand: Card[];
  wonCards: Card[];
}

export interface RoundPlay {
  playerId: string;
  card: Card;
}

export interface RoundResult {
  round: number;
  plays: RoundPlay[];
  winnerId: string | null;
}

export type GamePhase =
  | 'idle'
  | 'dealing'
  | 'selecting'
  | 'revealing'
  | 'collecting'
  | 'round_end'
  | 'game_over';

export interface GameState {
  phase: GamePhase;
  players: Player[];
  currentRound: number;
  totalRounds: number;
  currentPlays: RoundPlay[];
  roundHistory: RoundResult[];
  winnerId: string | null;
}

export interface PlayerDef {
  id: string;
  name: string;
  kind: PlayerKind;
  difficulty?: CPUDifficulty;
}

export type GameMode = 'cpu' | 'local' | 'online';

export interface GameConfig {
  mode: GameMode;
  playerDefs: PlayerDef[];
}

export type Rank = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Master';

export interface UserProfile {
  uid: string;
  displayName: string;
  totalPoints: number;
  rank: Rank;
  gamesPlayed: number;
  wins: number;
}
