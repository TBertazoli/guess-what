const Dashboard = () => {
  return (
    <body class="bg-light">
      <div class="d-flex flex-column text-center mb-3 p-5">
        <div id="dashboard">
          <h1>Mastermind Game</h1>
          <div class="text-center">
            <p>Welcome to the guessing game!</p>
            <p>Guess the secret code in as few tries as possible.</p>
            <p>Please choose your level of difficulty.</p>
          </div>

          <div class="dropdown text-center">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Choose level
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button class="dropdown-item" onClick="chooseGame('easy')">
                Easy
              </button>
              <button class="dropdown-item" onClick="chooseGame('medium')">
                Medium
              </button>
              <button class="dropdown-item" onClick="chooseGame('hard')">
                Hard
              </button>
            </div>
          </div>
        </div>
        <div class="text-center mt-2" id="show-attempts">
          <h5>
            <span id="attempt-number"></span>
          </h5>
        </div>

        <div class="input-wrapper" id="imput-wrapper">
          <div class="input" id="input"></div>
          {/* <div class="d-flex" style="justify-content: space-between"> */}
          <button type="button" class="btn btn-primary" onClick="submitGuess()">
            Submit
          </button>
          <button type="reset" class="btn btn-primary" onClick="resetGame()">
            Reset
          </button>
        </div>
      </div>

      <div id="results" class="d-none">
        <h2>Results</h2>
        <ul class="text-left">
          <li id="incoming-results"></li>
        </ul>
      </div>
    </body>
  );
};

export default Dashboard;
