import { useState } from "react";
import GameSelection from "./../components/GameSelection";

export default function Dashboard() {
  // const submitGuess = function () {

  // //POST request to server and return response
  // $.post("/api/results", {
  //   guess: values,
  // })

  //   //error handling
  //   .fail((err) => {
  //     console.log(err);
  //     //show toast
  //     $("#toast").addClassNameclassName("show");
  //   })
  //   //response from server
  //   .done((response) => {
  //     console.log(response);
  //     results_table.push(response);

  //     //attemps diaplays
  //     let attempts = 10 - response.countGuess;
  //     if (attempts == 0 || !response.countGuess) {
  //       //show modasl
  //       $("#show-modal-text").text("Game Over");
  //       $("#modal").show();
  //     } else {
  //       $("#attempt-number").text("You have " + attempts + " attempts left");
  //       toDisplayResults(response);
  //     }

  //     function toDisplayResults(response) {
  //       let displayValue = values.join("");

  //       //results display
  //       $("#show-attempts").removeClassNameclassName("d-none");
  //       $("#results").removeClassNameclassName("d-none");
  //       var elementTable = $("<li></li>");

  //       if (
  //         (selectedLevel == "easy" &&
  //           response.correctNumbers == 4 &&
  //           response.correctLocation == 4) ||
  //         (selectedLevel == "medium" &&
  //           response.correctNumbers == 6 &&
  //           response.correctLocation == 6) ||
  //         (selectedLevel == "hard" &&
  //           response.correctNumbers == 8 &&
  //           response.correctLocation == 8)
  //       ) {
  //         elementTable.text(
  //           "Player guesses:" +
  //             "'" +
  //             displayValue +
  //             "'" +
  //             " , Congratulations You won!"
  //         );
  //         $("#show-modal-text").text("Congratulations You won!");
  //         $("#modal").show();
  //         $("#incoming-results").append(elementTable);
  //       } else if (
  //         (selectedLevel == "easy" && response.incorrect == 4) ||
  //         (selectedLevel == "medium" && response.incorrect == 6) ||
  //         (selectedLevel == "hard" && response.incorrect == 8)
  //       ) {
  //         elementTable.text(
  //           "Player guesses:" + "'" + displayValue + "'" + " , all incorrect"
  //         );
  //         $("#incoming-results").append(elementTable);
  //       } else {
  //         elementTable.text(
  //           "Player guesses:" +
  //             "'" +
  //             displayValue +
  //             "' , " +
  //             response.correctNumbers +
  //             " correct numbers and " +
  //             response.correctLocation +
  //             " correct location"
  //         );
  //         $("#incoming-results").append(elementTable);
  //       }
  //     }
  //   });

  //function to close toast
  // function closeToast() {
  //   $("#toast").removeClassNameclassName("show");
  // }

  //function to close modal
  // function closeModal() {
  //   $("#modal").hide();
  //   resetGame();
  // }

  //function to reset game
  // function resetGame() {
  //   $("#show-attempts").addClassNameclassName("d-none");
  //   $("#results").addClassNameclassName("d-none");
  //   $("#incoming-results").empty();
  //   $("#input").empty();
  //   $("#dashboard").show();
  //   $("#imput-wrapper").hide();

  //   $.post("/reset", {});
  // }

  //Post to logout
  // const logout = function () {
  //   $.post("/users/logout", {})
  //     .fail((err) => {
  //       console.log(err);
  //     })

  //     .done((response) => {
  //       document.location.replace("/");
  //     });

  //   if (response.ok) {
  //     document.location.replace("/");
  //   } else {
  //     alert(response.statusText);
  //   }
  // };

  //post to save score
  // const saveScore = function () {
  //   $.post(`/api/user`, {
  //     score: results_table,
  //   })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

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
      <div className="text-center mt-2" id="show-attempts">
        <h5>
          <span id="attempt-number"></span>
        </h5>
      </div>
    </div>
  );
}
