const router = require("express").Router();

const resultsDisplay = require("./results.js");
const resetGame = require("./reset.js");
//const user = require("./user.js");

router.use("/results", resultsDisplay);
router.use("/reset", resetGame);
//router.use("/user", user);

module.exports = router;
