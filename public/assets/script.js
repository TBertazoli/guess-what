//function to colect numbers
const submitGuess = function () {
  const firstDigit = $("#first-digit").val();
  const secondDigit = $("#second-digit").val();
  const thirdDigit = $("#third-digit").val();
  const fourthDigit = $("#fourth-digit").val();

  var guess = [firstDigit, secondDigit, thirdDigit, fourthDigit];
  console.log(guess);

  //POST request to server
  $.post(
    "/results",
    {
      guess: guess,
    },
    function (response) {
      console.log(response);
      if (response.correctNumbers == 4) {
        $("#incoming-results").text("You won!");
      } else {
        $("#incoming-results").text(
          response.correctNumbers +
            " correct numbers and " +
            response.correctLocation +
            " correct location"
        );
      }
    }
  );
};
