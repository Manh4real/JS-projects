const btns = document.querySelector("div.btns");

const num = document.querySelector("#num");
const initNum = +num.textContent;
let counter = initNum;
btns.onmousedown = function (e) {
  if (e.target.tagName !== "BUTTON") return;
  if (e.target.id == "decreaseBtn" && counter > 0) num.innerHTML = --counter;
  if (e.target.id == "increaseBtn") num.innerHTML = ++counter;
  if (e.target.id == "resetBtn" && counter !== initNum)
    num.innerHTML = counter = initNum;
};
btns.oncontextmenu = function (e) {
  if (e.target.tagName == "BUTTON") return false;
};
