import { describe, expect, it } from 'vitest';
import arrir, { type ArrayOps } from '..';

describe('maintainList', () => {
  run(
    'insert',
    {
      insert: [
        { index: 2, values: [1.1] },
        { index: 4, values: [3.1] },
      ],
    },
    [0, 1, 1.1, 2, 3, 3.1, 4],
  );

  run(
    'reject',
    {
      reject: [-1, 1, 2],
    },
    [0, 3, 4],
  );

  run(
    'insert out of bounds',
    {
      insert: [
        { index: 7, values: [6] },
        { index: -2, values: [-3] },
        { index: 6, values: [5] },
        { index: -1, values: [-2, -1] },
      ],
    },
    [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6],
  );

  run(
    'reject and insert',
    {
      reject: [0, 2],
      insert: [{ index: 2, values: [1.1] }],
    },
    [1, 1.1, 3, 4],
  );

  run(
    'dynamic reject',
    {
      reject: (item) => item >= 3,
    },
    [0, 1, 2],
  );
});

function run(name: string, actions: ArrayOps<number>, result: number[]) {
  it(name, () => {
    expect(arrir([0, 1, 2, 3, 4], actions)).toEqual(result);
  });
}
