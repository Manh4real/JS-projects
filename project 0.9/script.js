const textEl = document.querySelector("#text");
const speedEl = document.querySelector("#speed");
const text = "Let's work!!";

let i = 0;
let speed;
let ms = 300;
const MAX = 10;
const MIN = 1;

speed = +speedEl.value;

speedEl.onchange = function () {
  speed = +speedEl.value;
  if (speed > MAX) {
    speed = MAX;
    // speedEl.value = speed;
  } else if (speed < MIN) {
    speed = MIN;
    // speedEl.value = speed;
  }
};
function run() {
  textEl.textContent += text[i++];
  setTimeout(run, ms / speed);
  if (i >= text.length) {
    i = 0;
    textEl.textContent = "";
  }
}
setTimeout(run, ms / speed);
