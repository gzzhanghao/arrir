export interface ArrayOps<T> {
  /**
   * Insert actions
   */
  insert?: ArrayInsertOp<T>[];
  /**
   * Items to be removed
   *
   * Can be a function that returns true to remove the item, or an array of indexes to remove
   */
  reject?: number[] | ((item: T, index: number) => boolean);
}

export interface ArrayInsertOp<T> {
  /**
   * Values to insert
   */
  values: T[];
  /**
   * Index to insert at
   */
  index: number;
}

/**
 * Apply insert / delete operations to an array, while adjusting indexes to account for prior changes.
 *
 * @param array The array to manipulate
 * @param ops The actions to apply
 * @returns The manipulated array
 *
 * @example
 * The following example shows the process of removing the item at index 1 and inserting `3.5` at index 3
 *
 * ```
 *  array: [1, 2, 3,       4]
 *    ops: [1, x, 3, +3.5, 4] <= { reject: [1], insert: [{ values: [3.5], index: 3 }] }
 * result: [1,    3,  3.5, 4]
 * ```
 */
export default function arrir<T>(array: T[], ops: ArrayOps<T>) {
  const newArray = array.flatMap((item, index) => {
    const insertions = ops.insert
      ?.filter((action) => action.index === index)
      .flatMap((action) => action.values);

    let shouldReject = false;
    if (typeof ops.reject === 'function') {
      shouldReject = ops.reject(item, index);
    } else {
      shouldReject = !!ops.reject?.includes(index);
    }

    if (shouldReject) {
      return insertions || [];
    }
    return insertions ? [...insertions, item] : item;
  });

  const prepend = ops.insert?.filter((item) => item.index < 0);
  if (prepend?.length) {
    newArray.unshift(...getSortedInsertValues(prepend));
  }

  const append = ops.insert?.filter((item) => item.index >= array.length);
  if (append?.length) {
    newArray.push(...getSortedInsertValues(append));
  }

  return newArray;
}

function getSortedInsertValues<T>(actions: ArrayInsertOp<T>[]) {
  return actions
    .sort((a, b) => a.index - b.index)
    .flatMap((item) => item.values);
}
