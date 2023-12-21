export default function Show(props) {
  const { showResults } = props;

  return (
    <div className="mt-4">
      <div id="results" className="d-flex justify-content-center ">
        <h2>Results</h2>
      </div>
      <div id="element-table" className="d-flex flex-column-reverse">
        {showResults.map((results, index) => {
          return (
            <p id="incoming-results" key={index}>
              {results.playerGuess}
              {results.text}
              {results.attempt}
            </p>
          );
        })}
      </div>
    </div>
  );
}
