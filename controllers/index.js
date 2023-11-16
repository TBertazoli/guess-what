const router = require("express").Router();

const resultsDisplay = require("./results.js");
// const resetGame = require("./results.js");

router.use("/results", resultsDisplay);
// router.use("/results", resetGame);

module.exports = router;
