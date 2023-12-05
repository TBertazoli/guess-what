const { compareResults } = require("../utils/compareResults");

test("compareResults", () => {
  expect(compareResults([5, 4, 6, 2, 5, 0], [5, 9, 8, 7, 6, 5])).toStrictEqual({
    correctNumbers: 3,
    correctLocation: 1,
    incorrect: 3,
    countGuess: undefined,
  });
});

test("compareResults", () => {
  expect(compareResults([5, 4, 6, 2, 5, 0], [5, 6, 6, 7, 6, 5])).toStrictEqual({
    correctNumbers: 3,
    correctLocation: 2,
    incorrect: 3,
    countGuess: undefined,
  });
});

test("compareResults", () => {
  expect(compareResults([5, 4, 6, 2, 5, 0], [5, 5, 5, 5, 5, 5])).toStrictEqual({
    correctNumbers: 2,
    correctLocation: 2,
    incorrect: 4,
    countGuess: undefined,
  });
});

test("compareResults", () => {
  expect(compareResults([5, 4, 6, 2, 5, 0], [5, 6, 7, 8, 5, 6])).toStrictEqual({
    correctNumbers: 3,
    correctLocation: 2,
    incorrect: 3,
    countGuess: undefined,
  });
});
