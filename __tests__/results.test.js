const { compareResults } = require("../utils/compareResults");

test("compareResults", () => {
  expect(
    compareResults(
      ["5", "4", "6", "2", "5", "0"],
      ["5", "9", "8", "7", "6", "5"]
    )
  ).toBe({ correctNumbers: 3, correctLocation: 1, incorrect: 3 });
});
