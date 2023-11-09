const express = require("express");
const sessions = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//create session
const countdown = 60000 * 15;
//session middleware
app.use(
  sessions({
    secret: "asdsadsaddsd8r37r2rher33redfsfge5",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: countdown },
  })
);

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
