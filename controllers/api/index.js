const router = require("express").Router();
const userRoutes = require("./user.js");
const resultsDisplayRoute = require("./results.js");
const userResults = require("./user-results.js");

router.use("/users", userRoutes);
router.use("/results", resultsDisplayRoute);
router.use("/user", userResults);

module.exports = router;
