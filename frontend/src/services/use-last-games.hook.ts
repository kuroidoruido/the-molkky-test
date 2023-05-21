import { useEffect, useState } from "react";
import { Game, GameService } from "./game.service";

export function useLastGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    GameService.getLastGames().then((lastGames) => {
      setGames(lastGames);
    });
  }, []);

  return games;
}
