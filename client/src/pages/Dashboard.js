import GameSelection from "./../components/GameSelection";

export default function Dashboard() {
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
      <GameSelection />
    </div>
  );
}
