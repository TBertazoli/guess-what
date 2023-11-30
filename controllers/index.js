const router = require("express").Router({ mergeParams: true });

const resultsDisplayRoute = require("./results.js");
//const resetGameRoute = require("./reset.js");
const userRoutes = require("./user.js");

router.use("/results", resultsDisplayRoute);
// router.use("/reset", resetGameRoute);
router.use("/users", userRoutes);

module.exports = router;
