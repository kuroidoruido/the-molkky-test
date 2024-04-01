export interface Game {
  id: string;
  date: Date;
  players: string[];
  score: Record<string, Turn[]>;
  status: GameStatus;
}

export type LostTurn = { type: 'lost'; score: number };
export type FailedTurn = { type: 'fail'; score: number };
export type OkTurn = { type: 'ok'; pins: number[]; score: number };
export type WinTurn = { type: 'win'; pins: number[]; score: number };
export type Turn = LostTurn | FailedTurn | OkTurn | WinTurn;
export type GameStatus = 'pending' | 'end';
