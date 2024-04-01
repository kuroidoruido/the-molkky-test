import { parseISO } from "date-fns";

class GameServiceImpl {
  createGame(players: string[]): Promise<Game> {
    return fetch(`${import.meta.env.VITE_BACKEND_API}/api/games`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ players }),
    }).then((res) => res.json());
  }

  getOneGame(gameId: string): Promise<Game> {
    return fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/games/${gameId}`
    ).then((res) => res.json());
  }

  getLastGames(): Promise<Game[]> {
    return Promise.resolve(GAMES).then((games) =>
      games.map((game) => ({
        ...game,
        date: typeof game.date === "string" ? parseISO(game.date) : game.date,
      }))
    );
  }

  saveTurn(gameId: string, player: string, pins: number[]): Promise<Game> {
    return fetch(`${import.meta.env.VITE_BACKEND_API}/api/games/${gameId}`, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ player, pins }),
    }).then((res) => res.json());
  }
}

export interface Game {
  id: string;
  date: Date;
  players: string[];
  score: Record<string, Turn[]>;
  status: GameStatus;
}

export type LostTurn = { type: "lost" };
export type FailedTurn = { type: "fail" };
export type OkTurn = { type: "ok"; pins: number[]; score: number };
export type WinTurn = { type: "win"; pins: number[]; score: number };
export type Turn = LostTurn | FailedTurn | OkTurn | WinTurn;
export type GameStatus = "pending" | "end";

export const GameService = new GameServiceImpl();

const GAMES: Game[] = [
  {
    id: "LYDZ6d1DLFuCTZH2",
    date: "2023-05-02 13:30:00" as any,
    players: ["Jane", "John"],
    score: {
      Jane: [
        { type: "ok", pins: [2, 3, 6, 8], score: 4 },
        { type: "ok", pins: [2, 3, 6, 8, 11, 12], score: 10 },
        { type: "ok", pins: [12], score: 22 },
        { type: "ok", pins: [6], score: 28 },
        { type: "ok", pins: [6], score: 34 },
        { type: "ok", pins: [11], score: 45 },
        { type: "win", pins: [5, 6, 7, 8, 9], score: 50 },
      ],
      John: [
        { type: "ok", pins: [10], score: 10 },
        { type: "ok", pins: [12], score: 22 },
        { type: "fail" },
        { type: "ok", pins: [12], score: 34 },
        { type: "ok", pins: [12], score: 46 },
        { type: "ok", pins: [12], score: 25 },
      ],
    },
    status: "end",
  },
  {
    id: "74zj4gfMrafD4rVU",
    date: "2023-04-22 12:30:00" as any,
    players: ["Jane", "John"],
    score: {
      Jane: [
        { type: "ok", pins: [2, 3, 6, 8], score: 4 },
        { type: "ok", pins: [2, 3, 6, 8, 11, 12], score: 10 },
        { type: "ok", pins: [12], score: 22 },
        { type: "ok", pins: [6], score: 28 },
        { type: "ok", pins: [6], score: 34 },
        { type: "ok", pins: [11], score: 45 },
        { type: "win", pins: [5, 6, 7, 8, 9], score: 50 },
      ],
      John: [
        { type: "ok", pins: [10], score: 10 },
        { type: "ok", pins: [12], score: 22 },
        { type: "fail" },
        { type: "fail" },
        { type: "lost" },
      ],
    },
    status: "end",
  },
];
