import { Turn } from 'src/features/games/games.model';

export function computeNewTurn(
  previousTurns: Turn[],
  fallPins: number[],
): Turn {
  const lastTurn = previousTurns[previousTurns.length - 1];
  const lastScore = lastTurn?.score ?? 0;

  // lost
  if (
    previousTurns.length >= 2 &&
    lastTurn.type === 'fail' &&
    fallPins.length === 0 &&
    previousTurns[previousTurns.length - 2].type === 'fail'
  ) {
    return { type: 'lost', score: lastScore };
  }
  // fail
  if (fallPins.length === 0) {
    return {
      type: 'fail',
      score: lastScore,
    };
  }
  let newScore = lastScore;
  // one pin fall
  if (fallPins.length === 1) {
    newScore += fallPins[0];
  } else {
    // some pins fall
    newScore += fallPins.length;
  }

  // too high score
  if (newScore === 51) {
    newScore = 25;
  }

  return {
    type: 'ok',
    pins: fallPins,
    score: newScore,
  };
}
