import "../App.css";

function SessionSet({ sessionTime, decSession, incSession }) {
  return (
    <div id="session-label">
      <h1>Set Session Timer</h1>
      <div id="session-control">
        <button
          id="session-decrement"
          style={{ fontWeight: "bolder" }}
          onClick={decSession}
        >
          &#8722;
        </button>
        <div id="session-length">{sessionTime}</div>
        <button
          id="session-increment"
          style={{ fontWeight: "bolder" }}
          onClick={incSession}
        >
          +
        </button>
      </div>
      <div>
        {sessionTime <= 0 ? "You can't set time equal to 0 minutes" : <br />}
      </div>
    </div>
  );
}

export default SessionSet;
