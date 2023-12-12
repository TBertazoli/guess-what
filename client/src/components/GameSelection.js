import { useState } from "react";
import { Dropdown, InputGroup, Form, Button } from "react-bootstrap";

export default function GameSelection() {
  //const [isModalOpen, setIsModalOpen] = useState(false);

  //logic to create the input field based on level of dificulty
  let easy = Array.from({ length: 4 });
  let medium = Array.from({ length: 6 });
  let hard = Array.from({ length: 8 });

  const [gameLevel, setGameLevel] = useState([]);

  const chooseGame = function (gameLevel) {
    gameLevel === "easy"
      ? setGameLevel(easy)
      : gameLevel === "medium"
      ? setGameLevel(medium)
      : setGameLevel(hard);
  };

  //logic to retrieve the values from input field
  const [guess, setGuess] = useState([]);
  const handleUserInput = (v, i) => {
    const tempGuess = guess;
    guess[i] = v;
    setGuess(tempGuess);
  };

  //logic to send the guess to the server
  let [showResults, setshowResults] = useState([
    {
      playerGuess: "",
      text: "",
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
          //     //$("#attempt-number").text("You have " + attempts + " attempts left");
          toDisplayResults(response);
        }

        function toDisplayResults(response) {
          (gameLevel === easy &&
            response.correctNumbers === 4 &&
            response.correctLocation === 4) ||
          (gameLevel === medium &&
            response.correctNumbers === 6 &&
            response.correctLocation === 6) ||
          (gameLevel === hard &&
            response.correctNumbers === 8 &&
            response.correctLocation === 8)
            ? setshowResults([
                ...showResults,
                {
                  playerGuess: "Player guesses: " + guess + " - ",
                  text: "Congratulations You Won!",
                },
              ])
            : (gameLevel === "easy" && response.incorrect === 4) ||
              (gameLevel === "medium" && response.incorrect === 6) ||
              (gameLevel === "hard" && response.incorrect === 8)
            ? setshowResults([
                ...showResults,
                {
                  playerGuess: "Player guesses: " + guess + " - ",
                  text: ",All incorect",
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

  //function to close toast
  // function closeToast() {
  //   $("#toast").removeClassNameclassName("show");
  // }

  //function to close modal
  // function closeModal() {
  //   $("#modal").hide();
  //   resetGame();
  // }

  //function to reset game
  // function resetGame() {
  //   $("#show-attempts").addClassNameclassName("d-none");
  //   $("#results").addClassNameclassName("d-none");
  //   $("#incoming-results").empty();
  //   $("#input").empty();
  //   $("#dashboard").show();
  //   $("#imput-wrapper").hide();

  //   $.post("/reset", {});
  // }

  //Post to logout
  // const logout = function () {
  //   $.post("/users/logout", {})
  //     .fail((err) => {
  //       console.log(err);
  //     })

  //     .done((response) => {
  //       document.location.replace("/");
  //     });

  //   if (response.ok) {
  //     document.location.replace("/");
  //   } else {
  //     alert(response.statusText);
  //   }
  // };

  //post to save score
  // const saveScore = function () {
  //   $.post(`/api/user`, {
  //     score: results_table,
  //   })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdownMenuButton">Choose level</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => chooseGame("easy")}>Easy</Dropdown.Item>
          <Dropdown.Item onClick={() => chooseGame("medium")}>
            Medium
          </Dropdown.Item>
          <Dropdown.Item onClick={() => chooseGame("hard")}>Hard</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <InputGroup className="mb-3" id="input-wrapper">
        <div className="d-flex" id="input">
          {gameLevel.map((value, index) => (
            <Form.Control
              type="number"
              min="0"
              max="9"
              key={index}
              id={index}
              onChange={(event) => handleUserInput(event.target.value, index)}
            ></Form.Control>
          ))}
        </div>
        <div className="d-flex">
          <Button
            type="submit"
            className="btn btn-primary"
            onClick={() => submitGuess()}
          >
            Submit
          </Button>
          <Button type="reset" className="btn btn-primary">
            Reset
          </Button>
        </div>
      </InputGroup>
      {/* show results */}
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
      {/* attempt guesses */}
      <div className="text-center mt-2" id="show-attempts">
        <h5>
          <span id="attempt-number"></span>
        </h5>
      </div>
    </>
  );
}
