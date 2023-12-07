const express = require("express");
const sessions = require("express-session");
const app = express();
const PORT = process.env.PORT || 3001;

//sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(sessions.Store);

//create session
app.use(
  sessions({
    secret: "asdsadsaddsd8r37r2rher33redfsfge5",
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
app.use(require("./controllers"));

//start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
});