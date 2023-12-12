import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <header></header>
      <div className="bg-light">
        <Dashboard></Dashboard>
      </div>
    </div>
  );
}

export default App;
