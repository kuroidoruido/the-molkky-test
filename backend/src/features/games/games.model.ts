export interface Game {
  id: string;
  date: Date;
  players: string[];
  score: Record<string, Turn[]>;
}

export type LostTurn = { type: 'lost' };
export type FailedTurn = { type: 'fail' };
export type OkTurn = { type: 'ok'; pins: number[]; score: number };
export type WinTurn = { type: 'win'; pins: number[]; score: number };
export type Turn = LostTurn | FailedTurn | OkTurn | WinTurn;
