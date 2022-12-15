import "../App.css";
import play from "../play.png";
import pause from "../pause.png";
import reset from "../reset.png";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

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
  percentage,
}) {
  
  return (
    <div id="timer">
      <CircularProgressbarWithChildren
        strokeWidth={4}
        value={percentage}
        styles={buildStyles({
          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,
          // Colors & Fonts
          pathColor: "#ec407a",
          textColor: "green",
          textSize: "20px",
          trailColor: "none",
        })}
      >
        <div id="timer-contents">
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
          <div>{message ? message : <br></br>}</div>
          <div id="timer-control">
            <button id="start-stop" onClick={startStop}>
              {(timerTitle === "Session" && sessionStart) ||
              (timerTitle === "Break" && breakStart) ? (
                <img
                  src={pause}
                  alt="pause button"
                  style={{ width: "25px" }}
                ></img>
              ) : (
                <img
                  src={play}
                  alt="play button"
                  style={{ width: "25px" }}
                ></img>
              )}
            </button>
            <button id="reset" onClick={resetTimer}>
              <img
                src={reset}
                alt="reset button"
                style={{ width: "25px" }}
              ></img>
            </button>
          </div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default Timer;
