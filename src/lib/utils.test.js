import { splitGroups } from './utils';

test('splitGroups should split an array into groups of a specified size', () => {
  const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const expectedResult = [[1, 2, 3, 4, 5], [6, 7, 8, 9], [10, 11, 12]];

  const result = splitGroups(original);

  expect(result).toEqual(expectedResult);
});
