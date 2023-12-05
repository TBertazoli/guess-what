const router = require("express").Router();

// router.get("/", (req, res) => {
//   console.log("============router.get/=============");
//   if (req.session.loggedIn) {
//     console.log("already loggedin, redirecting to /");
//     res.redirect("/");
//     return;
//   } else {
//     res.render("login");
//   }
// });

//if not loggedIN redirect to login page
router.get("/login", (req, res) => {
  console.log("=======router.get/login=========");
  if (req.session.loggedIn) {
    console.log("already loggedin, redirecting to /");
    res.redirect("/login.html");
    return;
  }
  console.log("not loggedin go to login page");
  res.render("login");
});

router.get("/logout", (req, res) => {
  console.log("==========router.get/logout==========");
  req.session.destroy(() => {
    res.status(204).end();
  });
  res.render("login");
});

module.exports = router;
