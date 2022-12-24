import React from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function TimerControls({
  message,
  timerTitle,
  active,
  startTimer,
  reset,
  mute,
  volume,
  sessionSecondsLeft,
  breakSecondsLeft,
}) {
  const startTooltip = <Tooltip id="startTooltip">Start Timer</Tooltip>;
  const pauseTooltip = <Tooltip id="pauseTooltip">Pause Timer</Tooltip>;
  const resetTooltip = <Tooltip id="resetTooltip">Reset Timer</Tooltip>;
  const muteTooltip = <Tooltip id="muteTooltip">Mute</Tooltip>;
  const unmuteTooltip = <Tooltip id="unmuteTooltip">Unmute</Tooltip>;

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
                disabled={
                  timerTitle === "Session" && sessionSecondsLeft === 0
                    ? true
                    : timerTitle === "Break" && breakSecondsLeft === 0
                    ? true
                    : false
                }
              >
                {active ? (
                  <OverlayTrigger placement="top" overlay={pauseTooltip}>
                    <span className="material-symbols-outlined icon">
                      pause_circle
                    </span>
                  </OverlayTrigger>
                ) : (
                  <OverlayTrigger placement="top" overlay={startTooltip}>
                    <span className="material-symbols-outlined icon">
                      play_circle
                    </span>
                  </OverlayTrigger>
                )}
              </button>
            </Col>
            <Col>
              <OverlayTrigger placement="top" overlay={resetTooltip}>
                <button id="reset" onClick={reset}>
                  <span className="material-symbols-outlined icon">
                    device_reset
                  </span>
                </button>
              </OverlayTrigger>
            </Col>
            <Col>
              <button onClick={mute} id="mute">
                {volume === 0 ? (
                  <OverlayTrigger placement="top" overlay={unmuteTooltip}>
                    <span className="material-symbols-outlined icon">
                      volume_up
                    </span>
                  </OverlayTrigger>
                ) : (
                  <OverlayTrigger placement="top" overlay={muteTooltip}>
                    <span className="material-symbols-outlined icon">
                      volume_off
                    </span>
                  </OverlayTrigger>
                )}
              </button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default TimerControls;
