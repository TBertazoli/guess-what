const Dashboard = () => {
  let easyLenght = 4;
  let mediumLenght = 6;
  let hardLenght = 8;
  let selectedLevel = "";
  let results_table = [];

  //function to choose level of difficulty
  function chooseGame(gameLevel) {
    $("#imput-wrapper").show();
    $("#dashboard").hide();
    selectedLevel = gameLevel;
    if (gameLevel == "easy") {
      for (let i = 0; i < easyLenght; i++) {
        let addImput = $(
          `<input type="number" min="0" max="9" class="form-control" id="digit-${i}"></input>`
        );
        $("#input").append(addImput);
      }
    } else if (gameLevel == "medium") {
      for (let i = 0; i < mediumLenght; i++) {
        let addImput = $(
          `<input type="number" min="0" max="9" class="form-control" id="digit-${i}"></input>`
        );
        $("#input").append(addImput);
      }
    } else if (gameLevel == "hard") {
      for (let i = 0; i < hardLenght; i++) {
        let addImput = $(
          `<input type="number" min="0" max="9" class="form-control" id="digit-${i}"></input>`
        );
        $("#input").append(addImput);
      }
    }
  }

  //function to collect numbers
  const submitGuess = function () {
    let values = [];
    let inputSize =
      selectedLevel == "easy"
        ? easyLenght
        : selectedLevel == "medium"
        ? mediumLenght
        : hardLenght;

    for (let i = 0; i < inputSize; i++) {
      let getValues = $("#digit-" + i).val();
      values.push(getValues);
    }
    clear();

    //function to clear input
    function clear() {
      for (let i = 0; i < inputSize; i++) {
        $("#digit-" + i).val("");
      }
    }

    //POST request to server and return response
    $.post("/api/results", {
      guess: values,
    })

      //error handling
      .fail((err) => {
        console.log(err);
        //show toast
        $("#toast").addClass("show");
      })
      //response from server
      .done((response) => {
        console.log(response);
        results_table.push(response);

        //attemps diaplays
        let attempts = 10 - response.countGuess;
        if (attempts == 0 || !response.countGuess) {
          //show modasl
          $("#show-modal-text").text("Game Over");
          $("#modal").show();
        } else {
          $("#attempt-number").text("You have " + attempts + " attempts left");
          toDisplayResults(response);
        }

        function toDisplayResults(response) {
          let displayValue = values.join("");

          //results display
          $("#show-attempts").removeClass("d-none");
          $("#results").removeClass("d-none");
          var elementTable = $("<li></li>");

          if (
            (selectedLevel == "easy" &&
              response.correctNumbers == 4 &&
              response.correctLocation == 4) ||
            (selectedLevel == "medium" &&
              response.correctNumbers == 6 &&
              response.correctLocation == 6) ||
            (selectedLevel == "hard" &&
              response.correctNumbers == 8 &&
              response.correctLocation == 8)
          ) {
            elementTable.text(
              "Player guesses:" +
                "'" +
                displayValue +
                "'" +
                " , Congratulations You won!"
            );
            $("#show-modal-text").text("Congratulations You won!");
            $("#modal").show();
            $("#incoming-results").append(elementTable);
          } else if (
            (selectedLevel == "easy" && response.incorrect == 4) ||
            (selectedLevel == "medium" && response.incorrect == 6) ||
            (selectedLevel == "hard" && response.incorrect == 8)
          ) {
            elementTable.text(
              "Player guesses:" + "'" + displayValue + "'" + " , all incorrect"
            );
            $("#incoming-results").append(elementTable);
          } else {
            elementTable.text(
              "Player guesses:" +
                "'" +
                displayValue +
                "' , " +
                response.correctNumbers +
                " correct numbers and " +
                response.correctLocation +
                " correct location"
            );
            $("#incoming-results").append(elementTable);
          }
        }
      });
  };

  //function to close toast
  function closeToast() {
    $("#toast").removeClass("show");
  }

  //function to close modal
  function closeModal() {
    $("#modal").hide();
    resetGame();
  }

  //function to reset game
  function resetGame() {
    $("#show-attempts").addClass("d-none");
    $("#results").addClass("d-none");
    $("#incoming-results").empty();
    $("#input").empty();
    $("#dashboard").show();
    $("#imput-wrapper").hide();

    $.post("/reset", {});
  }

  //Post to logout
  const logout = function () {
    $.post("/users/logout", {})
      .fail((err) => {
        console.log(err);
      })

      .done((response) => {
        document.location.replace("/");
      });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  };

  //post to save score
  const saveScore = function () {
    $.post(`/api/user`, {
      score: results_table,
    })
      .fail((err) => {
        console.log(err);
      })
      .done((response) => {
        console.log(response);
      });
  };
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
