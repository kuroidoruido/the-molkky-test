import { Turn } from 'src/features/games/games.model';
import { computeNewTurn } from './score.utils';

describe(computeNewTurn.name, () => {
  it('should return Turn object with total score', () => {
    expect(
      computeNewTurn([{ type: 'ok', pins: [6], score: 6 }], [5]),
    ).toStrictEqual({
      type: 'ok',
      pins: [5],
      score: 11,
    } satisfies Turn);
  });
  it('should return "ok" with score increase with of the pin number when one pin fell', () => {
    expect(computeNewTurn([], [5])).toStrictEqual({
      type: 'ok',
      pins: [5],
      score: 5,
    } satisfies Turn);
  });
  it('should return "ok" with score increase with of the pin count when some pins fell', () => {
    expect(computeNewTurn([], [5, 2])).toStrictEqual({
      type: 'ok',
      pins: [5, 2],
      score: 2,
    } satisfies Turn);
  });
  it('should return "fail" when no pin fell', () => {
    expect(computeNewTurn([], [])).toStrictEqual({
      type: 'fail',
      score: 0,
    } satisfies Turn);
  });
  it('should return "lost" when no pin fell for the third time in a row', () => {
    expect(
      computeNewTurn(
        [
          { type: 'fail', score: 0 },
          { type: 'fail', score: 0 },
        ],
        [],
      ),
    ).toStrictEqual({
      type: 'lost',
      score: 0,
    } satisfies Turn);
  });
  it('should not return "lost" when no pin fell for the third time but not in a row', () => {
    expect(
      computeNewTurn(
        [
          { type: 'fail', score: 0 },
          {
            type: 'ok',
            pins: [5, 2],
            score: 2,
          },
          { type: 'fail', score: 2 },
        ],
        [],
      ),
    ).toStrictEqual({
      type: 'fail',
      score: 2,
    } satisfies Turn);
  });
  it('should return "win" when the score becomes exactly 50', () => {
    expect(
      computeNewTurn(
        [
          {
            type: 'ok',
            pins: [5, 2],
            score: 45,
          },
        ],
        [5],
      ),
    ).toStrictEqual({
      type: 'win',
      pins: [5],
      score: 50,
    } satisfies Turn);
  });
  it('should return "ok" with 25 score when the score becomes over 50', () => {
    expect(
      computeNewTurn(
        [
          {
            type: 'ok',
            pins: [5, 2],
            score: 45,
          },
        ],
        [7],
      ),
    ).toStrictEqual({
      type: 'ok',
      pins: [7],
      score: 25,
    } satisfies Turn);
  });
});
