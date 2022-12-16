import "./App.css";
import { useState, useEffect } from "react";
import BreakSet from "./components/BreakSet";
import SessionSet from "./components/SessionSet";
import Timer from "./components/Timer";
import TimerControls from "./components/TimerControls";
import alarm from "./beep.wav";
import useSound from "use-sound";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(sessionTime * 60);
  const [active, setActive] = useState(false);
  const [timerTitle, setTimerTitle] = useState("Session");
  const [volume, setVolume] = useState(1);
  const [alarmSound] = useSound(alarm, { volume: volume });
  const [message, setMessage] = useState("Start Session");

  const mute = () => {
    if (volume === 1) {
      setVolume(0);
    } else {
      setVolume(1);
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
    setMessage("");
  };

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 30);
      }, 1000);

      if (timerTitle === "Session" && secondsLeft === 0) {
        clearInterval(interval);
        setActive(false);
        alarmSound();
        setTimerTitle("Break");
        setSecondsLeft(breakTime * 60);
        setMessage("Start Break");
      } else if (timerTitle === "Break" && secondsLeft === 0) {
        clearInterval(interval);
        setActive(false);
        alarmSound();
        setTimerTitle("Session");
        setSecondsLeft(sessionTime * 60);
        setMessage("Start another Session");
      }

      return () => clearInterval(interval);
    }
  }, [active, secondsLeft, alarmSound, timerTitle, breakTime, sessionTime]);

  const incSession = () => {
    setSessionTime(sessionTime + 1);
    if (timerTitle === "Session") {
      setSecondsLeft((sessionTime + 1) * 60);
    }
  };

  const decSession = () => {
    setSessionTime(sessionTime - 1);
    if (sessionTime <= 0) {
      setSessionTime(0);
      if (timerTitle === "Session") {
        setSecondsLeft(0);
      }
    } else if (timerTitle === "Session") {
      setSecondsLeft((sessionTime - 1) * 60);
    }
  };

  const incBreak = () => {
    setBreakTime(breakTime + 1);
    if (timerTitle === "Break") {
      setSecondsLeft((breakTime + 1) * 60);
    }
  };

  const decBreak = () => {
    setBreakTime(breakTime - 1);
    if (breakTime <= 0) {
      setBreakTime(0);
      if (timerTitle === "Break") {
        setSecondsLeft(0);
      }
    } else if (timerTitle === "Break") {
      setSecondsLeft((breakTime - 1) * 60);
    }
  };

  const reset = () => {
    setTimerTitle("Session");
    setSessionTime(25);
    setBreakTime(5);
    setSecondsLeft(25 * 60);
    setMessage("Start Session");
  };

  const percentage = () => {
    if (timerTitle === "Session") {
      return 100 - (secondsLeft / (sessionTime * 60)) * 100;
    } else if (timerTitle === "Break") {
      return 100 - (secondsLeft / (breakTime * 60)) * 100;
    }
  };

  return (
    <div className="App">
      <Container>
        <div id="labels-container">
          <Row>
            <Col>
              <BreakSet
                breakTime={breakTime}
                incBreak={incBreak}
                decBreak={decBreak}
              />
            </Col>
            <Col>
              <SessionSet
                sessionTime={sessionTime}
                decSession={decSession}
                incSession={incSession}
              />
            </Col>
          </Row>
        </div>
        <Row>
          <Timer
            timerTitle={timerTitle}
            percentage={percentage()}
            timeLeft={formatTimeLeft(secondsLeft)}
          />
        </Row>
        <Row>
          <TimerControls
            message={message}
            active={active}
            startTimer={startTimer}
            reset={reset}
            mute={mute}
            volume={volume}
          />
        </Row>
      </Container>
    </div>
  );
}

export default App;
