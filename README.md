# arrir

Apply insert / remove operations to an array, while adjusting indexes to account for prior changes.

## Example

The following example shows the process of removing the item at index 0 and inserting `1.5` at index 2.

```
 array: [0, 1,       2]
   ops: [x, 1, +1.5, 2] <= { reject: [0], insert: [{ values: [1.5], index: 2 }] }
result: [   1,  1.5, 2]
```

## Usage

```bash
npm i arrir
```

```js
import arrir from 'arrir';

const result = arrir([0, 1, 2], {
  reject: [0],
  insert: [{ values: [1.5], index: 2 }]
});

// result => [1, 1.5, 2]
```
