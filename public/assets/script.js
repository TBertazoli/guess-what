let easyLenght = 4;
let mediumLenght = 6;
let hardLenght = 8;
let selectedLevel = "";

//function to choose level of difficulty
function chooseGame(gameLevel) {
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

//function to colect numbers
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

  console.log(selectedLevel);

  //POST request to server and return response
  $.post("/results", {
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

      //attemps diaplays
      let attempts = 10 - response.countGuess;
      if (attempts == 0 || !response.countGuess) {
        //show modasl
        $("#modal").show();
      } else {
        $("#attempt-number").text("You have " + attempts + " attempts left");
        todisplayResults(response);
      }

      function todisplayResults(response) {
        //results display
        $("#show-attempts").removeClass("d-none");
        $("#results").removeClass("d-none");
        var elementTable = $("<li></li>");
        if (response.correctNumbers == 4 && response.correctLocation == 4) {
          elementTable.text("Congratulations You won!");
          $("#incoming-results").append(elementTable);
        } else if (response.incorrect == 4) {
          elementTable.text("all incorrect");
          $("#incoming-results").append(elementTable);
        } else {
          elementTable.text(
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

function closeModal() {
  $("#modal").hide();
  resetGame();
}

//function to reset game
function resetGame() {
  $("#show-attempts").addClass("d-none");
  $("#results").addClass("d-none");
  $("#incoming-results").empty();
  $("#first-dig").val("");
  $("#second-digit").val("");
  $("#third-digit").val("");
  $("#fourth-digit").val("");

  $.post("/reset", {});
}
