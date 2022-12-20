import "../App.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Timer({ timerTitle, percentage, timeLeft, theme }) {
  return (
    <div id="timer-container">
      <div id="timer">
        <CircularProgressbarWithChildren
          strokeWidth={4}
          value={percentage}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            pathColor: theme ? "green" : "#ec407a",
          })}
        >
          <Container>
            <div id="timer-contents">
              <Row>
                <h1 id="timer-title">{timerTitle}</h1>
              </Row>
              <Row>
                <div id="time-left">{timeLeft}</div>
              </Row>
            </div>
          </Container>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}

export default Timer;
