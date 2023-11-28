const { compareResults } = require("../controllers/results");

describe("compareResults", () => {
  test.todo(
    "returns" + 3 + "correct numbers" + 1 + "correct location" + 3 + "incorrect"
  );

  expect(compareResults([5, 4, 6, 2, 5, 0], [5, 9, 8, 7, 6, 5])).toBe(3, 1, 3);
});
