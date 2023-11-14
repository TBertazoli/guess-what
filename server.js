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

//function to generate random numbers from random.org
var generateRandomNumber = async function (guessLength) {
  return fetch(
    "https://www.random.org/integers/?num=" +
      guessLength +
      "&min=0&max=9&col=1&base=10&format=plain&rnd=new",
    {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        title: "randomNumber",
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.text())
    .then((data) => {
      const fixed = data.split("\n").splice(0, guessLength);
      return fixed;
    });
};

//routes
app.post("/results", async (req, res) => {
  let guessLength = req.body.guess.length;
  if (
    (req.body.guess instanceof Array && req.body.guess.indexOf("") > -1) ||
    req.body.guess.filter((v) => v >= 10).length > 0
  ) {
    res.statusMessage = "invalid input";
    res.status(400).end();
    return;
  }
  if (req.session.randomNumber) {
    console.log("session exists");
    req.session.counter++;
    if (req.session.counter > 10) {
      res.send("Game over");
      resetGame(req);
      return;
    }
    return res.json(
      compareResults(
        req.session.randomNumber,
        req.body.guess,
        req.session.counter
      )
    );
  } else {
    const randomNumber = await generateRandomNumber(guessLength);
    req.session.randomNumber = randomNumber;
    req.session.counter = 1;
    return res.json(
      compareResults(randomNumber, req.body.guess, req.session.counter)
    );
  }
});

//function to reset the game and session
function resetGame(req) {
  req.session.destroy();
}

//function to compare results
const compareResults = function (generatedNumber, guess, countGuess) {
  console.log(generatedNumber, "generated number");
  console.log(guess, "guess ");
  let correctNumbers = 0;
  let correctLocation = 0;

  let paired = new Set();

  generatedNumber.forEach((v, i) => {
    if (v == guess[i]) {
      correctNumbers++;
      correctLocation++;
      paired.set(i, v);
      guess[i] = null;
    }
  });

  for (var j = 0; j < guess.length; j++) {
    for (var i = 0; i < generatedNumber.length; i++) {
      if (guess[j] == generatedNumber[i] && !paired.has(i)) {
        paired.set(i, guess[j]);
        correctNumbers++;
        guess[j] = null;
        break;
      }
    }
  }

  console.log(correctNumbers, "correct numbers");
  console.log(correctLocation, "correct location");
  console.log("incorrect", guess.filter((v) => v != null).length);

  return {
    correctNumbers: correctNumbers,
    correctLocation: correctLocation,
    incorrect: guess.filter((v) => v != null).length,
    countGuess: countGuess,
  };
};

app.post("/reset", (req, res) => {
  resetGame(req);
  res.end();
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
