const express = require("express");
const sessions = require("express-session");
const { reset } = require("nodemon");

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
var generateRandomNumber = async function () {
  return fetch(
    "https://www.random.org/integers/?num=4&min=0&max=9&col=1&base=10&format=plain&rnd=new",
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
      const fixed = data.split("\n").splice(0, 4);
      return fixed;
    });
};

//routes
app.post("/results", async (req, res) => {
  if (req.session.randomNumber) {
    console.log("session exists");
    req.session.counter++;
    if (req.session.counter > 10) {
      resetGame(req);
      res.json({ message: "game over" });
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
    const randomNumber = await generateRandomNumber();
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
  let incorrect = 0;

  for (var i = 0; i < generatedNumber.length; i++) {
    if (generatedNumber[i] == guess[i]) {
      correctNumbers++;
      correctLocation++;
    } else if (
      generatedNumber[i] == guess[i] &&
      generatedNumber.indexOf(guess[i]) > -1
    ) {
      correctNumbers++;
      correctLocation++;
    } else if (generatedNumber.indexOf(guess[i]) > -1) {
      correctNumbers++;
    } else {
      incorrect++;
    }
  }

  console.log(correctNumbers, "correct numbers");
  console.log(correctLocation, "correct location");
  console.log(incorrect, "incorrect");
  return {
    correctNumbers: correctNumbers,
    correctLocation: correctLocation,
    incorrect: incorrect,
    countGuess: countGuess,
  };
};

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
