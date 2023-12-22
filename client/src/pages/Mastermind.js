import { useMemo, useState, useRef } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Show from "../components/Show";
import ModalSet from "../components/ModalSet";

export default function Mastermind() {
  //logic to retrieve the level of dificulty from the dashboard
  const location = useLocation();
  const game = location.state.game;

  //logic to create the input field based on level of dificulty
  const createGameLevel = (level) => Array.from({ length: level });
  const [gameLevel, setGameLevel] = useState([]);
  const chooseGame = useMemo(() => {
    switch (game) {
      case "easy":
        return () => setGameLevel(createGameLevel(4));
      case "medium":
        return () => setGameLevel(createGameLevel(6));
      case "hard":
        return () => setGameLevel(createGameLevel(8));
      default:
        return () => {};
    }
  }, [game]);

  useState(() => {
    chooseGame();
  }, [chooseGame]);

  //logic to retrieve the values from input field
  let [guess, setGuess] = useState([]);
  const handleUserInput = (v, i) => {
    const tempGuess = guess;
    guess[i] = v;
    setGuess(tempGuess);
  };

  //logic to submit the guess
  const [isOpen, setisOpen] = useState(false);

  const handleSubmit = () => {
    submitGuess();
    setisOpen(true);
    clearInput();
  };

  const clearInput = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setGuess([]);
  };

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
          setshowResults([...showResults, { text: "Game Over" }]);
          // setIsModalOpen(!isModalOpen);
        } else {
          toDisplayResults(response);
        }

        function toDisplayResults(response) {
          (gameLevel === 4 &&
            response.correctNumbers === 4 &&
            response.correctLocation === 4) ||
          (gameLevel === 6 &&
            response.correctNumbers === 6 &&
            response.correctLocation === 6) ||
          (gameLevel === 8 &&
            response.correctNumbers === 8 &&
            response.correctLocation === 8)
            ? setshowResults([
                ...showResults,
                {
                  playerGuess: "Player guesses: " + guess + " - ",
                  text: "Congratulations You Won!",
                },
              ])
            : (gameLevel === 4 && response.incorrect === 4) ||
              (gameLevel === 6 && response.incorrect === 6) ||
              (gameLevel === 8 && response.incorrect === 8)
            ? setshowResults([
                ...showResults,
                {
                  playerGuess: "Player guesses: " + guess + " - ",
                  text: "All incorect",
                  attempt:
                    " - You have " +
                    (10 - response.countGuess) +
                    " Attempts left",
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
                  attempt:
                    " - You have " +
                    (10 - response.countGuess) +
                    " Attempts left",
                },
              ]);
        }
      });
  };

  // logic for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="m-5 text-center">
      <div>
        <h1 className="mb-5">Level {game}</h1>
      </div>
      <InputGroup id="input-wrapper" className="justify-content-center">
        <div id="input" className="d-flex mr-2">
          {gameLevel.map((game, index) => (
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
            className="btn btn-primary mr-2"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button type="reset" className="btn btn-primary">
            {/* onClick={handleReset} */}
            Reset
          </Button>
        </div>
      </InputGroup>
      {isOpen && <Show showResults={showResults} />}
      {isModalOpen && (
        <ModalSet setIsModalOpen={setIsModalOpen} showResults={showResults} />
      )}
    </div>
  );
}
