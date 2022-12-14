import "./App.css";
import play from "./play.png";
import pause from "./pause.png";
import reset from "./reset.png";
import { useState, useEffect } from "react";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [sessionStart, setSessionStart] = useState(false);
  const [breakStart, setBreakStart] = useState(false);
  const [sessionRemainingTime, setSessionRemainingTime] = useState(
    sessionTime * 60
  );
  const [breakRemainingTime, setBreakRemainingTime] = useState(breakTime * 60);
  const [breakTitle, setBreakTitle] = useState("Session");
  let sessionMinutes = sessionRemainingTime / 60;
  let sessionSeconds = sessionRemainingTime % 60;

  let breakMinutes = breakRemainingTime / 60;
  let breakSeconds = breakRemainingTime % 60;

  useEffect(() => {
    if (sessionStart) {
      const timeOut = setTimeout(() => {
        setSessionRemainingTime((prevState) => prevState - 30);
      }, 1000);
      if (sessionRemainingTime === 0) {
        clearTimeout(timeOut);
        setBreakTitle("Break");
        setBreakRemainingTime(breakTime * 60);
        setBreakStart(false);
      }
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [sessionRemainingTime, breakTime, sessionStart, breakTitle]);

  useEffect(() => {
    if (breakStart) {
      const timeOut = setTimeout(() => {
        setBreakRemainingTime((prevState) => prevState - 30);
      }, 1000);
      if (breakRemainingTime === 0) {
        clearTimeout(timeOut);
        setBreakTitle("Session");
        setSessionRemainingTime(sessionTime * 60);
        setSessionStart(false);
      }
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [breakRemainingTime, sessionTime, breakStart, breakTitle]);

  const decBreak = () => {
    setBreakTime(breakTime - 1);
    setBreakRemainingTime(breakTime * 60 - 60);
    if (breakTime === 0) {
      setBreakTime(0);
    }
  };

  const incBreak = () => {
    setBreakTime(breakTime + 1);
    setBreakRemainingTime(breakTime * 60 + 60);
  };

  const decSession = () => {
    setSessionTime(sessionTime - 1);
    setSessionRemainingTime(sessionTime * 60 - 60);
    if (sessionTime === 0) {
      setSessionTime(0);
    }
  };

  const incSession = () => {
    setSessionTime(sessionTime + 1);
    setSessionRemainingTime(sessionTime * 60 + 60);
  };

  const startStop = () => {
    if (breakTitle === "Session") {
      setSessionStart(!sessionStart);
    } else if (breakTitle === "Break") {
      setBreakStart(!breakStart);
    }
  };

  return (
    <div className="App">
      <div id="labels-container">
        <div id="break-label">
          <h1>Break</h1>
          <div id="break">
            <button
              id="break-decrement"
              style={{ fontWeight: "bolder" }}
              onClick={decBreak}
            >
              &#8722;
            </button>
            <div id="break-length">{breakTime}m</div>
            <button
              id="break-increment"
              style={{ fontWeight: "bolder" }}
              onClick={incBreak}
            >
              +
            </button>
          </div>
        </div>
        <div id="session-label">
          <h1>Session</h1>
          <div id="session">
            <button
              id="session-decrement"
              style={{ fontWeight: "bolder" }}
              onClick={decSession}
            >
              &#8722;
            </button>
            <div id="session-length">{sessionTime}m</div>
            <button
              id="session-increment"
              style={{ fontWeight: "bolder" }}
              onClick={incSession}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div id="timer">
        <div id="timer-label">
          <h1>{breakTitle}</h1>
          <div
            id="time-left"
            style={{ color: sessionRemainingTime <= 60 ? "red" : "black" }}
          >
            {breakTitle === "Session"
              ? Math.floor(sessionMinutes) < 10
                ? "0" + Math.floor(sessionMinutes)
                : Math.floor(sessionMinutes)
              : breakTitle === "Break"
              ? Math.floor(breakMinutes) < 10
                ? "0" + Math.floor(breakMinutes)
                : Math.floor(breakMinutes)
              : ""}
            :
            {breakTitle === "Session"
              ? sessionSeconds === 0
                ? "00"
                : sessionSeconds < 10
                ? "0" + sessionSeconds
                : sessionSeconds
              : breakTitle === "Break"
              ? breakSeconds === 0
                ? "00"
                : breakSeconds < 10
                ? "0" + breakSeconds
                : breakSeconds
              : ""}
          </div>
        </div>
        <div id="timer-control">
          <button id="start_stop" onClick={startStop}>
            {(breakTitle === "Session" && sessionStart) ||
            (breakTitle === "Break" && breakStart) ? (
              <img src={pause} alt="pause button" width="15"></img>
            ) : (
              <img src={play} alt="play button" width="15"></img>
            )}
          </button>
          <button id="reset">
            <img src={reset} alt="reset button" width="15"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
