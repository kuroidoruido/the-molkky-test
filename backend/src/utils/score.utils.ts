import { Turn } from 'src/features/games/games.model';

export function computeNewTurn(
  previousTurns: Turn[],
  fallPins: number[],
): Turn {
  return { type: 'ok', pins: fallPins, score: 1 };
}
