const router = require("express").Router(); //function to reset the game and session

router.post("/", (req, res) => {
  req.session.destroy();
  res.end();
});

module.exports = router;
