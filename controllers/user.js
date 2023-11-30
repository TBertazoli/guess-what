const router = require("express").Router();
const { User } = require("../models");

//get all users
router.get("/", (req, res) => {
  User.findAll({
    atributtes: { exclude: ["password"] },
  })
    .then((dbuserData) => res.json(dbuserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get user by id
router.get("/:id", (req, res) => {
  User.findOne({
    atributtes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
  })

    .then((dbuserData) => {
      if (!dbuserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbuserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create new user
router.post("/", (req, res) => {
  console.log("-----------------signup-----------------");
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbuserData) => {
      req.session.save(() => {
        req.session.userId = dbuserData.id;
        req.session.username = dbuserData.username;
        req.session.loggedIn = true;

        res.json({
          user: dbuserData,
          message: "You are now logged in as" + dbuserData.username + " !",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login
router.post("/login", (req, res) => {
  console.log("-----------------login------------------");
  console.log(req.body.username);
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbuserData) => {
    console.log(dbuserData);
    if (!dbuserData) {
      res.status(404).json({ message: "No user account found!" });
      return;
    }
    const validPassword = dbuserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "incorrecte password" });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbuserData.id;
      req.session.username = dbuserData.username;
      req.session.loggedIn = true;

      res.json({
        user: dbdata,
        message: "You are now logged in as " + dbuserData.username + " !",
      });
    });
  });
});

// logout
router.post("/logout", (req, res) => {
  console.log("-----logout-----");
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;
