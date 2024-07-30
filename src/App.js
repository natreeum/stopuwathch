import logo from "./logo.svg";
import "./App.css";
import StopWatch from "./components/StopWatch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ width: "200px" }}
        />
        <StopWatch />
      </header>
    </div>
  );
}

export default App;
