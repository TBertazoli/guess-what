import { useMemo, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import SubmitGuess from "../components/SubmitGuess";

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
  const [guess, setGuess] = useState([]);
  const handleUserInput = (v, i) => {
    const tempGuess = guess;
    guess[i] = v;
    setGuess(tempGuess);
  };

  //logic to submit the guess
  const [isOpen, setisOpen] = useState(false);
  const handleClick = () => {
    setisOpen(!isOpen);
  };

  return (
    <>
      {" "}
      <InputGroup className="mb-3" id="input-wrapper">
        <div className="d-flex" id="input">
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
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </Button>
          {isOpen && <SubmitGuess guess={guess} />}
          <Button type="reset" className="btn btn-primary">
            Reset
          </Button>
        </div>
      </InputGroup>
    </>
  );
}
