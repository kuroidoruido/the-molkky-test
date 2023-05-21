import { Turn } from 'src/features/games/games.model';
import { computeNewTurn } from './score.utils';

describe(computeNewTurn.name, () => {
  it('should return Turn object with total score', () => {
    expect(computeNewTurn([{ type: 'ok', pins: [6], score: 6 }], [5])).toBe({
      type: 'ok',
      pins: [5],
      score: 11,
    } satisfies Turn);
  });
  it('should return "ok" with score increase with of the pin number when one pin fell', () => {
    expect(computeNewTurn([], [5])).toBe({
      type: 'ok',
      pins: [5],
      score: 5,
    } satisfies Turn);
  });
  it('should return "ok" with score increase with of the pin count when some pins fell', () => {
    expect(computeNewTurn([], [5, 2])).toBe({
      type: 'ok',
      pins: [5, 2],
      score: 2,
    } satisfies Turn);
  });
  it('should return "fail" when no pin fell', () => {
    expect(computeNewTurn([], [])).toBe({ type: 'fail' } satisfies Turn);
  });
  it('should return "lost" when no pin fell for the third time in a row', () => {
    expect(computeNewTurn([{ type: 'fail' }, { type: 'fail' }], [])).toBe({
      type: 'lost',
    } satisfies Turn);
  });
  it('should not return "lost" when no pin fell for the third time but not in a row', () => {
    expect(
      computeNewTurn(
        [
          { type: 'fail' },
          {
            type: 'ok',
            pins: [5, 2],
            score: 2,
          },
          { type: 'fail' },
        ],
        [],
      ),
    ).toBe({
      type: 'fail',
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
    ).toBe({
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
        [6],
      ),
    ).toBe({
      type: 'ok',
      pins: [6],
      score: 25,
    } satisfies Turn);
  });
});
