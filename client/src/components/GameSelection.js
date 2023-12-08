import { useState } from "react";
import { Dropdown, InputGroup, Button } from "react-bootstrap";

export default function GameSelection() {
  //logic to create the input field based on level of dificulty
  let easy = Array.from({ length: 4 });
  let medium = Array.from({ length: 6 });
  let hard = Array.from({ length: 8 });

  const [gameLevel, setGameLevel] = useState([]);

  const chooseGame = function (gameSelected) {
    gameSelected === "easy"
      ? setGameLevel(easy)
      : gameSelected === "medium"
      ? setGameLevel(medium)
      : setGameLevel(hard);
  };

  //logic to retrieve the values from input field
  const [guess, setGuess] = useState([]);
  const handleUserInput = (v, i) => {
    const tempGuess = guess;
    guess[i] = v;
    setGuess(tempGuess);
    console.log(guess);
  };
  //logic to send the guess to the server
  const submitGuess = () => {
    console.log(guess);
    fetch("/api/results", {
      method: "POST",

      body: guess,
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

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
            <input
              type="number"
              min="0"
              max="9"
              key={index}
              id={index}
              onChange={(event) => handleUserInput(event.target.value, index)}
            ></input>
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
    </>
  );
}
