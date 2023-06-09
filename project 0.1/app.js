const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const milliseconds = document.querySelector(".milliseconds");

// buttons
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");

let ms = 0;
let count = 0;
let intervalId,
  interval = 100; // by millisecond
startBtn.onclick = function () {
  if (intervalId) {
    // if exists setInterval, delete it, create new one with new "count", "ms".
    reset();
    intervalId = setInterval(runClock, interval);
    return;
  }
  intervalId = setInterval(runClock, interval);
};
pauseBtn.onclick = function () {
  if (!intervalId) return; // if no setInterval, do nothing.
  if (pauseBtn.className.includes("paused")) {
    // if paused, then resume new one with previous "count" and "ms".
    pauseBtn.textContent = "Pause";
    pauseBtn.classList.remove("paused");
    intervalId = setInterval(runClock, interval);
    return;
  }
  // Pause
  clearInterval(intervalId);
  pauseBtn.textContent = "Resume";
  pauseBtn.classList.add("paused");
};
resetBtn.onclick = function () {
  if (!intervalId) return; // if no setInterval, do none.
  reset();
};
function reset() {
  pauseBtn.textContent = "Pause";
  pauseBtn.classList.remove("paused");
  clearInterval(intervalId);
  intervalId = count = ms = 0;
  hours.textContent =
    minutes.textContent =
    seconds.textContent =
    milliseconds.textContent =
      "00";
}
function runClock() {
  milliseconds.textContent = padStart(ms);
  if (ms++ >= 10) {
    ms = 0;
    ++count;
  } else {
    let temp = count / 60;
    if (temp < 1 && temp > 0) setSeconds(count);
    else if (temp >= 1 && temp <= 59) setMinutes(count);
    else if (temp > 59) setHours(count);
  }
}
function padStart(count) {
  return count >= 10 ? count : `0${count}`;
}
function setSeconds(count) {
  seconds.innerHTML = padStart(count);
}
function setMinutes(count) {
  minutes.innerHTML = padStart(Math.floor(count / 60));
  seconds.innerHTML = padStart(count % 60);
}
function setHours(count) {
  hours.innerHTML = padStart(Math.floor(count / 60 / 60));
  minutes.innerHTML = padStart(Math.floor((count % 60) / 60));
  seconds.innerHTML = padStart((count % 60) % 60);
}
