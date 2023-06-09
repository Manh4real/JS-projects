// import { alertMessage } from "../project 7/index.js";

const goalText = document.querySelector(".goal-text .text");
const waterLevel = document.querySelector(".water-level");
const percentage = document.querySelector("#percentage");
const remaining = document.querySelector(".remaining");
const remainingText = document.querySelector(".remaining .text");
const bottle = document.querySelector(".bottle");
const cupsEl = document.querySelector(".cups");
const cups = document.getElementsByClassName("cup");

let GOAL;
const CAPACITY = 200;
const UNIT = "ml";

let prePos = -1;
let count = 0;
let initVal = goalText.dataset.goal;
// let alertMes = alertMessage.bind(bottle);

window.addEventListener("DOMContentLoaded", render);

goalText.onkeydown = function (e) {
  if (e.key == "Enter") {
    e.preventDefault();
    goalText.blur();
  }
};
goalText.onblur = function () {
  let val = goalText.textContent;

  if (isNaN(+val)) {
    alert("Enter a number!");
    goalText.textContent = GOAL / 1000;
    return;
  }
  val = parseFloat((+val).toFixed(2)) * 1000;
  if (GOAL == val) {
    goalText.textContent = val / 1000;
    return;
  }
  render();
};
cupsEl.onclick = function (e) {
  let cup = e.target.closest(".cup");
  if (!cup) return;
  // setWaterLevel(cup); // click cup by cup
  setWaterLevel_(cup); // from the beginning of the cups
};

function render() {
  initGoal();
  reset();
  cupsEl.innerHTML = "";
  let cupNum = Math.floor(GOAL / CAPACITY);
  let remainder = GOAL % CAPACITY;

  // CREATE CUPS WITH STANDARD CAPACITY
  for (let i = 0; i < cupNum; i++) {
    createCup(CAPACITY);
  }
  // CREATE CUP WITH REMAINDER
  if (remainder != 0) createCup(Math.round(remainder));
}

function createCup(c) {
  let div = document.createElement("div");
  div.className = "cup";
  div.setAttribute("data-capacity", c);
  div.innerHTML = `<p class="text">${c}${UNIT}</p>`;
  cupsEl.append(div);
}

function initGoal() {
  GOAL = parseFloat((+goalText.textContent).toFixed(2)) * 1000;
  goalText.innerHTML = GOAL / 1000;
  remainingText.innerHTML = `
    <span class="num">${GOAL / 1000}</span>L<br />remaining
    `;
}

function setWaterLevel(cup) {
  // if (!cup.classList.contains("filled") && count >= GOAL) {
  //   alertMes("fulfilled", "Don't exceed your goal!");
  //   return;
  // }
  let check = cup.classList.toggle("filled");

  (function (isFilled) {
    count = isFilled
      ? count + +cup.dataset.capacity
      : count - +cup.dataset.capacity;
    measure();
  })(check);
}

function measure() {
  let left = (GOAL - count) / 1000; // the amount of remaining water
  let filledPer = parseFloat(((count * 100) / GOAL).toFixed(2)); // percentage of the filled space;
  let emptyPer = 100 - filledPer; // percentage of the emtpy space

  if (filledPer <= 8 && filledPer > 0) {
    waterLevel.classList.add("shallow");
  } else waterLevel.classList.remove("shallow");

  if (emptyPer < 10 && emptyPer > 0) {
    remaining.classList.add("shallow");
  } else remaining.classList.remove("shallow");

  remaining.style.height = emptyPer + "%";
  waterLevel.style.height = filledPer + "%";
  percentage.innerHTML = filledPer === 0 ? "" : `${filledPer}<sup>%</sup>`;
  remainingText.innerHTML =
    emptyPer === 0 ? "" : `<span class="num">${left}</span>L<br />remaining`;
}

function setWaterLevel_(cup) {
  // IF THERE'S 1 CUP FILLED, TOGGLE HIM
  if (cupsEl.querySelectorAll(".cup.filled").length == 1 && cups[0] == cup) {
    cup.classList.remove("filled");
    reset();
    return;
  }
  let curPos = Array.from(cups).indexOf(cup);

  if (curPos == prePos) return;
  let i;
  if (curPos < prePos) {
    for (i = prePos; i >= curPos + 1; i--) {
      cups[i].classList.remove("filled");
      count -= parseFloat(cups[i].dataset.capacity);
    }
  } else {
    for (i = prePos + 1; i <= curPos; i++) {
      cups[i].classList.add("filled");
      count += parseFloat(cups[i].dataset.capacity);
    }
  }
  prePos = curPos;
  measure();
}

function reset() {
  count = 0;
  prePos = -1;
  measure();
}
