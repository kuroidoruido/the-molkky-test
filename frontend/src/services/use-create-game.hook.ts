import { GameService } from "./game.service";

export function useCreateGame() {
  return (players: string[]) => GameService.createGame(players);
}
