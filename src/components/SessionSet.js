import "../App.css";
import Toast from "react-bootstrap/Toast";

function SessionSet({
  sessionTime,
  decSession,
  incSession,
  changeSessionTime,
}) {
  return (
    <div id="session-label">
      <h1>Session Timer</h1>
      <div id="session-control">
        <button id="session-decrement" onClick={decSession}>
          &#8722;
        </button>
        <div id="session-length">
          <input
            id="input-length"
            type="number"
            value={sessionTime.toString()}
            onChange={changeSessionTime}
          />
        </div>
        <button id="session-increment" onClick={incSession}>
          +
        </button>
      </div>
      {sessionTime === 0 ? (
        <Toast
          style={{
            position: "absolute",
            top: "25%",
            left: 0,
            right: 0,
            zIndex: 999,
            color: "red",
            marginTop: "1%",
          }}
        >
          <Toast.Body>You can't set session time to 0 minutes</Toast.Body>
        </Toast>
      ) : (
        ""
      )}
    </div>
  );
}

export default SessionSet;
