/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState("RUN");
  const [timeLeft, setTimeLeft] = useState(1500);

  const runTime = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60 && breakLength > 0) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 0) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60 && sessionLength > 0) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 0) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const handlePlay = () => {
    clearTimeout(runTime);
    if (play) {
      setPlay(false);
    } else {
      setPlay(true);
    }
  };

  const handleReset = () => {
    clearTimeout(runTime);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("RUN");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "RUN") {
      setTimeLeft(breakLength * 60);
      setTimingType("STOP");

      audio.play();
    }
    if (!timeLeft && timingType === "STOP") {
      setTimeLeft(sessionLength * 60);
      setTimingType("RUN");

      audio.pause();
      audio.currentTime = 0;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clock = () => {
    if (play) {
      runTime;
      resetTimer();
    } else {
      clearTimeout(runTime);
    }
  };
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    clock();
  }, [play, runTime, timeLeft, clock]);

  const title = timingType === "RUN" ? "Session" : "Break";

  return (
    <div>
      <div className="wrapper-container">
        <h1>25+5 Clock </h1>
        <div className="counter-container">
          <div>
            <h2 id="break-label">Break Length</h2>
            <div className="button-left">
              <button
                disabled={play}
                onClick={handleBreakIncrease}
                id="break-increment"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
              <p id="break-length">{breakLength}</p>
              <button
                disabled={play}
                onClick={handleBreakDecrease}
                id="break-decrement"
              >
                <i class="fa-solid fa-minus"></i>
              </button>
            </div>
          </div>

          <div>
            <h2 id="session-label">Session Length</h2>
            <div className="button-right">
              <button
                disabled={play}
                onClick={handleSessionIncrease}
                id="session-increment"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
              <p id="session-length">{sessionLength}</p>
              <button
                disabled={play}
                onClick={handleSessionDecrease}
                id="session-decrement"
              >
                <i class="fa-solid fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="timer-container">
          <div className="timer">
            <h2 id="timer-label">{title}</h2>
            <h3 id="time-left">{timeFormatter()}</h3>

            <div className="touch">
              <button onClick={handlePlay} id="start_stop">
                <i class="fa-solid fa-play"></i>/
                <i class="fa-solid fa-pause"></i>
              </button>
              <button onClick={handleReset} id="reset">
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <h6>Challenged by Freecodecamp by Cyril Salamite</h6>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

export default App;
