import "../App.css";
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
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default Timer;
