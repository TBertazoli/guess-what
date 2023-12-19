// import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const switchPage = (game) => {
    navigate("/mastermind", {
      state: { game },
    });
    console.log(game);
  };

  return (
    <div className="d-flex flex-column text-center mb-3 p-5">
      <div id="dashboard">
        <h1>Mastermind Game</h1>
        <div className="text-center">
          <p>Welcome to the guessing game!</p>
          <p>Guess the secret code in as few tries as possible.</p>
          <p>Please choose your level of difficulty.</p>
        </div>
      </div>
      <Dropdown>
        <Dropdown.Toggle id="dropdownMenuButton">Choose level</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => switchPage("easy")}>Easy</Dropdown.Item>
          <Dropdown.Item onClick={() => switchPage("medium")}>
            Medium
          </Dropdown.Item>
          <Dropdown.Item onClick={() => switchPage("hard")}>Hard</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
