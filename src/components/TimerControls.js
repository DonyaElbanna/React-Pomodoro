import React from "react";
import "../App.css";
import play from "../play.png";
import pause from "../pause.png";
import reset from "../reset.png";

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
            <img src={pause} alt="pause button" style={{ width: "25px" }}></img>
          ) : (
            <img src={play} alt="play button" style={{ width: "25px" }}></img>
          )}
        </button>
        <button id="reset" onClick={resetTimer}>
          <img src={reset} alt="reset button" style={{ width: "25px" }}></img>
        </button>
      </div>
    </div>
  );
}

export default TimerControls;
