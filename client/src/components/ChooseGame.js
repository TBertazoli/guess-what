//function to choose level of difficulty
export default function ChooseGame(gameLevel) {
  //game lenght
  let easyLenght = 4;
  let mediumLenght = 6;
  let hardLenght = 8;

  if (gameLevel === "easy") {
    for (let i = 0; i < easyLenght; i++) {
      return (
        <input
          type="number"
          min="0"
          max="9"
          className="form-control"
          id={"digit-" + { i }}
        ></input>
      );
    }
  } else if (gameLevel === "medium") {
    for (let i = 0; i < mediumLenght; i++) {
      return (
        <input
          type="number"
          min="0"
          max="9"
          className="form-control"
          id={"digit-" + { i }}
        ></input>
      );
    }
  } else if (gameLevel === "hard") {
    for (let i = 0; i < hardLenght; i++) {
      return (
        <input
          type="number"
          min="0"
          max="9"
          className="form-control"
          id={"digit-" + { i }}
        ></input>
      );
    }
  }
}
