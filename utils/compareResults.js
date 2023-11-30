//function to compare results
module.exports = {
  compareResults: function (generatedNumber, guess, countGuess) {
    console.log(generatedNumber, "generated number");
    console.log(guess, "guess ");
    let correctNumbers = 0;
    let correctLocation = 0;

    let paired = new Set();

    generatedNumber.forEach((v, i) => {
      if (v == guess[i]) {
        correctNumbers++;
        correctNumbers++;
        paired.add(i);
        guess[i] = null;
      }
    });

    for (var j = 0; j < guess.length; j++) {
      for (var i = 0; i < generatedNumber.length; i++) {
        if (guess[j] == generatedNumber[i] && !paired.has(i)) {
          paired.add(i);
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
  },
};
