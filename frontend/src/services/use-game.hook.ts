import { useEffect, useState } from "react";
import { Game, GameService, Turn } from "./game.service";

export function useGame(gameId: string) {
  const [game, setGame] = useState<Game | null>(null);
  const [currentPlayer, setCurrrentPlayer] = useState("");

  useEffect(() => {
    GameService.getOneGame(gameId).then((res) => {
      setGame(res);
      setCurrrentPlayer(
        computeNextPlayer(res.players, computeLastPlayer(res.score))
      );
    });
  }, [gameId]);

  const saveTurn = async (pins: number[]) => {
    GameService.saveTurn(gameId, currentPlayer, pins).then((res) => {
      setGame(res);
      setCurrrentPlayer(computeNextPlayer(res.players, currentPlayer));
    });
  };

  return { game, currentPlayer, saveTurn } as const;
}

function computeLastPlayer(scores: Record<string, Turn[]>) {
  const turnsPlayedCountByPlayer = Object.entries(scores).map(
    ([player, turns]) => [player, turns.length] as const
  );
  turnsPlayedCountByPlayer.sort(
    ([, playerTurnCountA], [, playerTurnCountB]) => {
      if (playerTurnCountA === playerTurnCountB) {
        return -1;
      } else {
        return playerTurnCountB - playerTurnCountA;
      }
    }
  );
  return turnsPlayedCountByPlayer[0][0];
}

function computeNextPlayer(players: string[], lastPlayer: string) {
  const currentPlayerIndex = players.findIndex((p) => p === lastPlayer);
  return players[(currentPlayerIndex + 1) % players.length];
}
