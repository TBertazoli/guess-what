const router = require("express").Router();

const resultsDisplay = require("./results.js");

router.use("/results", resultsDisplay);

module.exports = router;
