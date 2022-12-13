import './App.css';

function App() {
  return (
    <div className="App">
      <div id="labels-container">
        <div id="break-label">
          <h1>Break</h1>
          <button id="break-decrement">decrease break time</button>
          <button id="break-increment">increase break time</button>
          <div id="break-length">break length (5m)</div>
        </div>
        <div id="session-label">
          <h1>Session</h1>
          <button id="session-decrement">decrease session time</button>
          <button id="break-increment">increase break time</button>
          <div id="session-length">session length (25m)</div>
        </div>
      </div>
      <div id="timer">
        <div id="timer-label">
        <h1>Session</h1>
        <div id="time-left">time left (mm:ss)</div>
      </div>
      <div id="timer-control">
        <button id="start_stop">start/stop</button>
        <button id="reset">reset</button>
      </div>
      </div>
      
    </div>
  );
}

export default App;
