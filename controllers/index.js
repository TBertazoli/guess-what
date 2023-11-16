const router = require("express").Router();

const resultsDisplay = require("./results.js");
const resetGame = require("./reset.js");

router.use("/results", resultsDisplay);
router.use("/reset", resetGame);

module.exports = router;
