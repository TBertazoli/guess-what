import { useState } from "react";

export default function SubmitGuess(props) {
  const { guess } = props;
  //logic to send the guess to the server
  let [showResults, setshowResults] = useState([
    {
      playerGuess: "",
      text: "",
      attempt: "",
    },
  ]);
  const submitGuess = () => {
    fetch("/api/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guess),
    })
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        //attemps diaplays
        let attempts = 10 - response.countGuess;
        if (attempts === 0 || !response.countGuess) {
          console.log("game over");

          //     //show modasl
          //     // $("#show-modal-text").text("Game Over");
          //     setIsModalOpen(!isModalOpen);
        } else {
          setshowResults([
            ...showResults,
            {
              attempt:
                "You have " + (10 - response.countGuess) + " Attempts left",
            },
          ]);
          console.log(showResults);
          //     //$("#attempt-number").text("You have " + attempts + " attempts left");
          toDisplayResults(response);
        }

        function toDisplayResults(response) {
          (gameLength === 4 &&
            response.correctNumbers === 4 &&
            response.correctLocation === 4) ||
          (gameLength === 6 &&
            response.correctNumbers === 6 &&
            response.correctLocation === 6) ||
          (gameLength === 8 &&
            response.correctNumbers === 8 &&
            response.correctLocation === 8)
            ? setshowResults([
                ...showResults,
                {
                  playerGuess: "Player guesses: " + guess + " - ",
                  text: "Congratulations You Won!",
                },
              ])
            : (gameLength === 4 && response.incorrect === 4) ||
              (gameLength === 6 && response.incorrect === 6) ||
              (gameLength === 8 && response.incorrect === 8)
            ? setshowResults([
                ...showResults,
                {
                  playerGuess: "Player guesses: " + guess + " - ",
                  text: "All incorect",
                },
              ])
            : setshowResults([
                ...showResults,
                {
                  playerGuess: "Player guesses: " + guess + " - ",
                  text:
                    response.correctNumbers +
                    " correct numbers and " +
                    response.correctLocation +
                    " correct location",
                },
              ]);
        }
      });
  };
  return (
    <>
      <div id="results">
        <h2>Results</h2>
        <ul id="element-table">
          {showResults.map((results, index) => {
            return (
              <li id="incoming-results" key={index}>
                {results.playerGuess}
                {results.text}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
