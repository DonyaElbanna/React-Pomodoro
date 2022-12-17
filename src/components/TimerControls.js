import React from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TimerControls({
  message,
  timerTitle,
  active,
  startTimer,
  reset,
  mute,
  volume,
  secondsLeft,
}) {
  return (
    <div id="timer-control">
      <div id="message">{message ? message : <br></br>}</div>
      <Container>
        <div id="timer-btns">
          <Row>
            <Col>
              <button
                id="start-stop"
                onClick={startTimer}
                disabled={secondsLeft === 0 ? true : false}
              >
                {active ? (
                  <span className="material-symbols-outlined icon">
                    pause_circle
                  </span>
                ) : (
                  <span className="material-symbols-outlined icon">
                    play_circle
                  </span>
                )}
              </button>
            </Col>
            <Col>
              <button id="reset" onClick={reset}>
                <span className="material-symbols-outlined icon">
                  device_reset
                </span>
              </button>
            </Col>
          </Row>
          <Row>
            <button onClick={mute} id="mute">
              {volume === 0 ? (
                <span className="material-symbols-outlined icon">
                  volume_up
                </span>
              ) : (
                <span className="material-symbols-outlined icon">
                  volume_off
                </span>
              )}
            </button>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default TimerControls;
