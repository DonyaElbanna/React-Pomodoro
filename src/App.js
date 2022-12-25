import "./App.css";
import { useState, useEffect } from "react";
import BreakSet from "./components/BreakSet";
import SessionSet from "./components/SessionSet";
import Timer from "./components/Timer";
import TimerControls from "./components/TimerControls";
import alarm from "./alarm.mp3";
import useSound from "use-sound";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ToggleButton from "./components/ToggleButton";
import clickSfx from "./click.mp3";
import startTimerSfx from "./startTimer.mp3";
import pauseTimerSfx from "./pauseTimer.mp3";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState(
    sessionTime * 60
  );
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(breakTime * 60);
  const [active, setActive] = useState(false);
  const [timerTitle, setTimerTitle] = useState("Session");
  const [volume, setVolume] = useState(1);
  const [alarmSound] = useSound(alarm, { volume: volume });
  const [message, setMessage] = useState("Start Session");
  const [theme, setTheme] = useState(false);

  const [playClick] = useSound(clickSfx, { volume: volume });
  const [startTimerSound] = useSound(startTimerSfx, { volume: volume });
  const [pauseTimerSound] = useSound(pauseTimerSfx, { volume: volume });

  const changeSessionTime = (event) => {
    const value = Math.max(0, Math.min(120, Number(event.target.value)));
    setSessionTime(value);
    setSessionSecondsLeft(value * 60);
    if (value === 0) {
      setSessionSecondsLeft(0);
    }
  };

  const changeBreakTime = (event) => {
    const value = Math.max(0, Math.min(60, Number(event.target.value)));
    setBreakTime(value);
    setBreakSecondsLeft(value * 60);
    if (value === 0) {
      setBreakSecondsLeft(0);
    }
  };

  const toggleTheme = () => {
    setTheme(!theme);
    playClick();
    if (!theme) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme", "light");
    }
  };

  const mute = () => {
    if (volume === 1) {
      setVolume(0);
    } else {
      setVolume(1);
      playClick();
    }
  };

  const formatTimeLeft = (seconds) => {
    return `${
      Math.floor(seconds / 60) > 9
        ? Math.floor(seconds / 60)
        : "0" + Math.floor(seconds / 60)
    }:${seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)}`;
  };

  const startTimer = () => {
    setActive(!active);
    if (active) {
      setMessage("Resume");
      pauseTimerSound();
    } else if (!active) {
      setMessage("");
      startTimerSound();
    }
  };

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        if (timerTitle === "Session") {
          setSessionSecondsLeft((sessionSecondsLeft) => sessionSecondsLeft - 1);
        } else if (timerTitle === "Break") {
          setBreakSecondsLeft((breakSecondsLeft) => breakSecondsLeft - 1);
        }
      }, 1000);

      if (timerTitle === "Session" && sessionSecondsLeft === 0) {
        clearInterval(interval);
        setActive(false);
        alarmSound();
        setTimerTitle("Break");
        setBreakSecondsLeft(breakTime * 60);
        setMessage("Start Break");
      } else if (timerTitle === "Break" && breakSecondsLeft === 0) {
        clearInterval(interval);
        setActive(false);
        alarmSound();
        setTimerTitle("Session");
        setSessionSecondsLeft(sessionTime * 60);
        setMessage("Start another Session");
      }
      return () => clearInterval(interval);
    }
  }, [
    active,
    sessionSecondsLeft,
    breakSecondsLeft,
    alarmSound,
    timerTitle,
    breakTime,
    sessionTime,
  ]);

  const incSession = () => {
    setSessionTime(sessionTime + 1);
    playClick();
    if (timerTitle === "Session") {
      setSessionSecondsLeft((sessionTime + 1) * 60);
      if (sessionTime >= 120) {
        setSessionTime(120);
        setSessionSecondsLeft(120 * 60);
      }
    }
  };

  const decSession = () => {
    setSessionTime(sessionTime - 1);
    playClick();
    if (sessionTime <= 0) {
      setSessionTime(0);
      if (timerTitle === "Session") {
        setSessionSecondsLeft(0);
      }
    } else if (timerTitle === "Session") {
      setSessionSecondsLeft((sessionTime - 1) * 60);
    }
  };

  const incBreak = () => {
    setBreakTime(breakTime + 1);
    playClick();
    if (timerTitle === "Break") {
      setBreakSecondsLeft((breakTime + 1) * 60);
    }
  };

  const decBreak = () => {
    setBreakTime(breakTime - 1);
    playClick();
    if (breakTime <= 0) {
      setBreakTime(0);
      if (timerTitle === "Break") {
        setBreakSecondsLeft(0);
      }
    } else if (timerTitle === "Break") {
      setBreakSecondsLeft((breakTime - 1) * 60);
    }
  };

  const reset = () => {
    setTimerTitle("Session");
    setSessionTime(25);
    setBreakTime(5);
    setSessionSecondsLeft(25 * 60);
    setBreakSecondsLeft(5 * 60);
    setMessage("Start Session");
    playClick();
  };

  const percentage = () => {
    if (timerTitle === "Session") {
      return 100 - (sessionSecondsLeft / (sessionTime * 60)) * 100;
    } else if (timerTitle === "Break") {
      return 100 - (breakSecondsLeft / (breakTime * 60)) * 100;
    }
  };

  return (
    <div className="App">
      <ToggleButton theme={theme} toggleTheme={toggleTheme} volume={volume} />
      <Container>
        <Tabs defaultActiveKey="session" variant="pills">
          <Tab eventKey="break" title="Set Break Timer" id="tab-one">
            <BreakSet
              breakTime={breakTime}
              incBreak={incBreak}
              decBreak={decBreak}
              changeBreakTime={changeBreakTime}
            />
          </Tab>
          <Tab eventKey="session" title="Set Session Timer" id="tabe-two">
            <SessionSet
              sessionTime={sessionTime}
              decSession={decSession}
              incSession={incSession}
              changeSessionTime={changeSessionTime}
            />
          </Tab>
        </Tabs>

        <Timer
          timerTitle={timerTitle}
          percentage={percentage()}
          sessionSecondsLeft={formatTimeLeft(sessionSecondsLeft)}
          breakSecondsLeft={formatTimeLeft(breakSecondsLeft)}
          theme={theme}
        />
        <TimerControls
          message={message}
          active={active}
          startTimer={startTimer}
          reset={reset}
          mute={mute}
          volume={volume}
          timerTitle={timerTitle}
          sessionSecondsLeft={sessionSecondsLeft}
          breakSecondsLeft={breakSecondsLeft}
        />
      </Container>
    </div>
  );
}

export default App;
