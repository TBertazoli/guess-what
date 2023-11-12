//function to colect numbers
const submitGuess = function () {
  const firstDigit = $("#first-digit").val();
  const secondDigit = $("#second-digit").val();
  const thirdDigit = $("#third-digit").val();
  const fourthDigit = $("#fourth-digit").val();

  var guess = [firstDigit, secondDigit, thirdDigit, fourthDigit];

  //POST request to server and return response
  $.post("/results", {
    guess: guess,
  })
    //error handling
    .fail((err) => {
      console.log(err);
      $("#toast").addClass("show");
    })
    //response from server
    .done((response) => {
      console.log(response);

      //attemps diaplays
      let attempts = 10 - response.countGuess;
      if (attempts == 0 || !response.countGuess) {
        $("#attempt-number").text("Game-over");
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

//function to reset game
function resetGame() {
  $("#show-attempts").addClass("d-none");
  $("#results").addClass("d-none");
  $("#incoming-results").empty();
  $("#first-digit").val("");
  $("#second-digit").val("");
  $("#third-digit").val("");
  $("#fourth-digit").val("");

  $.post("/reset", {});
}
