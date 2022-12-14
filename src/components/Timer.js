import "../App.css";

import play from "../play.png";
import pause from "../pause.png";
import reset from "../reset.png";

function Timer({
  timerTitle,
  sessionMinutes,
  sessionSeconds,
  sessionRemainingTime,
  breakMinutes,
  breakSeconds,
  breakRemainingTime,
  sessionStart,
  breakStart,
  startStop,
  message,
  resetTimer,
}) {
  return (
    <div id="timer">
      <div id="timer-label">
        <h1>{timerTitle}</h1>
        <div id="time-left">
          {timerTitle === "Session"
            ? Math.floor(sessionMinutes) < 10
              ? "0" + Math.floor(sessionMinutes)
              : Math.floor(sessionMinutes)
            : timerTitle === "Break"
            ? Math.floor(breakMinutes) < 10
              ? "0" + Math.floor(breakMinutes)
              : Math.floor(breakMinutes)
            : ""}
          :
          {timerTitle === "Session"
            ? sessionSeconds === 0
              ? "00"
              : sessionSeconds < 10
              ? "0" + sessionSeconds
              : sessionSeconds
            : timerTitle === "Break"
            ? breakSeconds === 0
              ? "00"
              : breakSeconds < 10
              ? "0" + breakSeconds
              : breakSeconds
            : ""}
        </div>
      </div>
      <div>{message ? message : <br></br>}</div>
      <div id="timer-control">
        <button id="start_stop" onClick={startStop}>
          {(timerTitle === "Session" && sessionStart) ||
          (timerTitle === "Break" && breakStart) ? (
            <img src={pause} alt="pause button" style={{ width: "15px" }}></img>
          ) : (
            <img src={play} alt="play button" style={{ width: "15px" }}></img>
          )}
        </button>
        <button id="reset" onClick={resetTimer}>
          <img src={reset} alt="reset button" style={{ width: "15px" }}></img>
        </button>
      </div>
    </div>
  );
}

export default Timer;
