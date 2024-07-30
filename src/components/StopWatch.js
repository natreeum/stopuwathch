import { useEffect, useState } from "react";

function StopWatch() {
  const [localStorage, setLocalStorage] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [milliSecond, setMilliSecond] = useState(0);
  const [pauseTimestamps, setPauseTimestamps] = useState([]);
  const [resumeTimestamps, setResumeTimestamps] = useState([]);

  function setTime() {
    const curTimestam = Date.now();
    let pausedTime = 0;
    for (let i = 0; i < resumeTimestamps.length; i++) {
      pausedTime += resumeTimestamps[i] - pauseTimestamps[i];
    }
    const diff =
      curTimestam - localStorage.getItem("startTimestamp") - pausedTime;
    const milliSeconds = diff % 1000;
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    setMilliSecond(milliSeconds);
    setSecond(seconds);
    setMinute(minutes);
    setHour(hours);
  }

  useEffect(() => {
    setLocalStorage(window.localStorage);
  });

  function formatNumber(num, isMilliSecond = false) {
    if (isMilliSecond) {
      return num < 10 ? `00${num}` : num < 100 ? `0${num}` : num;
    }
    return num < 10 ? `0${num}` : num;
  }

  return (
    <div>
      <h1>StopWatch</h1>
      <p>{`${formatNumber(hour)} : ${formatNumber(minute)} : ${formatNumber(
        second
      )}`}</p>
      <button
        disabled={intervalId !== null || intervalId === -1}
        onClick={() => {
          localStorage.setItem("startTimestamp", Date.now());
          const id = setInterval(setTime, 100);
          setIntervalId(id);
        }}
      >
        Start
      </button>
      <button
        disabled={intervalId === null || intervalId === -1}
        onClick={() => {
          pauseTimestamps.push(Date.now());
          setPauseTimestamps(pauseTimestamps);
          clearInterval(intervalId);
          setIntervalId(-1);
        }}
      >
        Pause
      </button>
      <button
        disabled={intervalId === null || intervalId !== -1}
        onClick={() => {
          const id = setInterval(setTime, 100);
          setIntervalId(id);
          resumeTimestamps.push(Date.now());
          setResumeTimestamps(resumeTimestamps);
        }}
      >
        Resume
      </button>
      <button
        onClick={() => {
          clearInterval(intervalId);
          setIntervalId(null);
          setHour(0);
          setMinute(0);
          setSecond(0);
          setMilliSecond(0);
          setPauseTimestamps([]);
          setResumeTimestamps([]);
          localStorage.removeItem("startTimestamp");
        }}
      >
        Clear
      </button>
    </div>
  );
}

export default StopWatch;
