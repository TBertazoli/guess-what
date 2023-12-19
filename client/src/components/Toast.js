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
