import "../App.css";
import Toast from "react-bootstrap/Toast";

function BreakSet({ breakTime, decBreak, incBreak, changeBreakTime }) {
  return (
    <div id="break-label">
      <h1>Break Timer</h1>
      <div id="break-control">
        <button id="break-decrement" onClick={decBreak}>
          &#8722;
        </button>
        <div id="break-length">
          <input
            id="input-length"
            type="number"
            value={breakTime.toString()}
            onChange={changeBreakTime}
          />
        </div>
        <button id="break-increment" onClick={incBreak}>
          +
        </button>
        {breakTime === 0 ? (
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
            <Toast.Body>You can't set break time to 0 minutes</Toast.Body>
          </Toast>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default BreakSet;
