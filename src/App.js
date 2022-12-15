import "./App.css";

import { useState, useEffect } from "react";
import BreakSet from "./components/BreakSet";
import SessionSet from "./components/SessionSet";
import Timer from "./components/Timer";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [sessionStart, setSessionStart] = useState(false);
  const [breakStart, setBreakStart] = useState(false);
  const [sessionRemainingTime, setSessionRemainingTime] = useState(
    sessionTime * 60
  );
  const [breakRemainingTime, setBreakRemainingTime] = useState(breakTime * 60);
  const [timerTitle, setTimerTitle] = useState("Session");
  const [message, setMessage] = useState("Start Session");
  const [alarm, setAlarm] = useState(false);
  let sessionMinutes = sessionRemainingTime / 60;
  let sessionSeconds = sessionRemainingTime % 60;

  let breakMinutes = breakRemainingTime / 60;
  let breakSeconds = breakRemainingTime % 60;

  useEffect(() => {
    const audio = new Audio(
      "https://www.mediacollege.com/downloads/sound-effects/beep/beep-01.wav"
    );
    alarm ? audio.play() : audio.pause();

    // This is cleanup of the effect
    return () => audio.pause();
  }, [alarm]);

  useEffect(() => {
    if (sessionStart && sessionTime !== 0) {
      const timeOut = setTimeout(() => {
        setSessionRemainingTime((prevState) => prevState - 30);
      }, 1000);
      if (sessionRemainingTime === 0) {
        clearTimeout(timeOut);
        setTimerTitle("Break");
        setBreakRemainingTime(breakTime * 60);
        setMessage("Start Break");
        setBreakStart(false);
        setAlarm(true);
      }
      return () => {
        clearTimeout(timeOut);
        setAlarm(false);
      };
    }
  }, [sessionRemainingTime, breakTime, sessionStart, timerTitle, sessionTime]);

  useEffect(() => {
    if (breakStart && breakTime !== 0) {
      const timeOut = setTimeout(() => {
        setBreakRemainingTime((prevState) => prevState - 30);
      }, 1000);
      if (breakRemainingTime === 0) {
        clearTimeout(timeOut);
        setTimerTitle("Session");
        setSessionRemainingTime(sessionTime * 60);
        setMessage("Start Session");
        setSessionStart(false);
        setAlarm(true);
      }
      return () => {
        clearTimeout(timeOut);
        setAlarm(false);
      };
    }
  }, [breakRemainingTime, sessionTime, breakTime, breakStart, timerTitle]);

  const decBreak = () => {
    setBreakTime(breakTime - 1);
    setBreakRemainingTime(breakTime * 60 - 60);
    if (breakTime <= 0) {
      setBreakTime(0);
      setBreakRemainingTime(0);
    }
  };

  const incBreak = () => {
    setBreakTime(breakTime + 1);
    setBreakRemainingTime(breakTime * 60 + 60);
  };

  const decSession = () => {
    setSessionTime(sessionTime - 1);
    setSessionRemainingTime(sessionTime * 60 - 60);
    if (sessionTime <= 0) {
      setSessionTime(0);
      setSessionRemainingTime(0);
    }
  };

  const incSession = () => {
    setSessionTime(sessionTime + 1);
    setSessionRemainingTime(sessionTime * 60 + 60);
  };

  const startStop = () => {
    if (timerTitle === "Session") {
      setSessionStart(!sessionStart);
      setMessage("");
    } else if (timerTitle === "Break") {
      setBreakStart(!breakStart);
      setMessage("");
    }
  };

  const resetTimer = () => {
    setSessionRemainingTime(25 * 60);
    setSessionTime(25);
    setBreakTime(5);
    setBreakRemainingTime(5 * 60);
    setTimerTitle("Session");
    setMessage("Start your Session");
    setBreakStart(false);
    setSessionStart(false);
  };

  const percentage = () => {
    return 100 - (sessionRemainingTime / (sessionTime * 60)) * 100;
    // console.log(progress);
  };

  return (
    <div className="App">
      <div id="labels-container">
        <BreakSet
          breakTime={breakTime}
          incBreak={incBreak}
          decBreak={decBreak}
        />
        <SessionSet
          sessionTime={sessionTime}
          decSession={decSession}
          incSession={incSession}
        />
      </div>
      <Timer
        timerTitle={timerTitle}
        sessionMinutes={sessionMinutes}
        sessionSeconds={sessionSeconds}
        sessionRemainingTime={sessionRemainingTime}
        breakMinutes={breakMinutes}
        breakSeconds={breakSeconds}
        breakRemainingTime={breakRemainingTime}
        sessionStart={sessionStart}
        breakStart={breakStart}
        startStop={startStop}
        message={message}
        resetTimer={resetTimer}
        percentage={percentage()}
      />
    </div>
  );
}

export default App;
