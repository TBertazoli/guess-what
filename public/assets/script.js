//function to colect numbers
const submitGuess = function () {
  const firstDigit = $("#first-digit").val();
  const secondDigit = $("#second-digit").val();
  const thirdDigit = $("#third-digit").val();
  const fourthDigit = $("#fourth-digit").val();

  var guess = [firstDigit, secondDigit, thirdDigit, fourthDigit];

  //POST request to server and return response
  $.post(
    "/results",
    {
      guess: guess,
    },
    //response from server
    function (response) {
      //attemps diaplay
      $("#attempt-number").text(10 - response.countGuess);

      //results display
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
  );
};
