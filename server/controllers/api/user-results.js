const router = require("express").Router();
const { User, Results } = require("../../models");
const withAuth = require("../../utils/auth");

//create results to user
router.post(`/`, withAuth, (req, res) => {
  console.log("----Adding scores------");
  Results.create({
    score: req.body.score,
    user_id: req.session.userId,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete results associated to user

module.exports = router;
