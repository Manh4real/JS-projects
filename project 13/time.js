const minEl = document.querySelector(".min");
const secEl = document.querySelector(".sec");
const timer = document.querySelector(".timer");

const validateTime = 0.25; // minutes

let secs = Math.floor(validateTime * 60);

let sec = secs % 60;
let min = Math.floor(secs / 60);

minEl.textContent = padStart(min);
secEl.textContent = padStart(sec);

export function validateTillExpired() {
  let id = setInterval(() => {
    if (min == 0 && sec == 0) {
      minEl.style.color = "red";
      secEl.style.color = "red";
      createResend();
      clearInterval(id);
      return;
    }
    if (sec == 0) {
      minEl.textContent = padStart(--min);
      sec = 60;
    }
    secEl.textContent = padStart(--sec);
  }, 1000);
}

function padStart(num) {
  return num < 10 ? "0" + num : num;
}

function createResend() {
  let span = document.createElement("span");
  span.className = "resend-code";
  span.innerHTML = `<a href="#">Resend?</a>`;

  timer.append(span);
}
