import React from "react";
import "../App.css";
// import play from "../play.png";
// import pause from "../pause.png";
// import reset from "../reset.png";

function TimerControls({
  message,
  startStop,
  timerTitle,
  sessionStart,
  breakStart,
  resetTimer,
}) {
  return (
    <div id="timer-control">
      <div>{message ? message : <br></br>}</div>
      <div id="timer-btns">
        <button id="start-stop" onClick={startStop}>
          {(timerTitle === "Session" && sessionStart) ||
          (timerTitle === "Break" && breakStart) ? (
            <span class="material-symbols-outlined icon">pause_circle</span>
          ) : (
            <span class="material-symbols-outlined icon">play_circle</span>
          )}
        </button>
        <button id="reset" onClick={resetTimer}>
          <span class="material-symbols-outlined icon">device_reset</span>
        </button>
      </div>
    </div>
  );
}

export default TimerControls;
