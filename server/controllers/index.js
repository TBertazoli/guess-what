const router = require("express").Router();

const resetGameRoute = require("./reset.js");
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

//router.use("/", homeRoutes);
router.use("/reset", resetGameRoute);
router.use("/api", apiRoutes);

module.exports = router;
