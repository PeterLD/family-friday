import { immutablePush, splitGroups } from './utils';

test('immutablePush adds an item to the end of an array', () => {
  const original = [1, 2, 3];
  const item = 4;
  const expected = [1, 2, 3, item];

  const result = immutablePush(original, item);

  expect(result).toEqual(expected);
});

test('immutablePush does not mutate the original array', () => {
  const original = [1, 2, 3];
  const item = 4;
  const expected = [1, 2, 3, item];

  const result = immutablePush(original, item);

  expect(result).not.toBe(expected);
});

test('splitGroups should split an array into groups of a specified size', () => {
  const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const expected = [[1, 2, 3, 4, 5], [6, 7, 8, 9], [10, 11, 12]];

  const result = splitGroups(original);

  expect(result).toEqual(expected);
});
