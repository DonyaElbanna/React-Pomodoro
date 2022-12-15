import "../App.css";

function BreakSet({ breakTime, decBreak, incBreak }) {
  return (
    <div id="break-label">
      <h1>Set Break Timer</h1>
      <div id="break-controls">
        <button id="break-decrement" onClick={decBreak}>
          &#8722;
        </button>
        <div id="break-length">{breakTime}</div>
        <button id="break-increment" onClick={incBreak}>
          +
        </button>
      </div>
      <div>{breakTime <= 0 ? "You can't set break to 0 minutes" : <br />}</div>
    </div>
  );
}

export default BreakSet;
