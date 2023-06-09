import { alertMessage } from "../project 7/index.js";
import { validateTillExpired } from "./time.js";

const contentEl = document.querySelector(".content");
const inputs = document.querySelectorAll(".digit");
let i = 0;
let isFinished;
let alertMes = alertMessage.bind(contentEl);
window.addEventListener("load", function () {
  validateTillExpired();
});
window.addEventListener("mousedown", function (e) {
  e.preventDefault();
  console.log("got ya!!");
  return;
});
window.onkeydown = (e) => {
  if (e.key == "Tab") {
    console.log("ey man");
    return false;
  }
  if (e.key == "Enter") {
    if (inputs[inputs.length - 1].value == "") {
      alertMes("warning", "Please fill out all these!");
      return false;
    } else {
      alertMes("success", "Success!!");
      reset();
      return false;
    }
  }
};
function reset() {
  inputs.forEach((input) => {
    input.value = "";
  });
  inputs[0].focus();
  i = 0;
}
inputs.forEach((input) => {
  input.addEventListener("keydown", function (e) {
    // console.log(e.key);
    if (e.key == "Delete" || e.key == "Backspace") deleteVal(e);
    else if (/\b\d/.test(e.key)) {
      isFilled(e);
    } else if (e.key != "F5") e.preventDefault();
  });
});

inputs[0].focus();
function isFilled(e) {
  if (i >= inputs.length - 1) {
    inputs[i].value = e.key;
    return;
  }
  inputs[i].value = e.key;
  i++;
  setTimeout(() => {
    inputs[i].focus();
  });
}

function deleteVal(e) {
  isFinished = false;
  if (inputs[i].value == "" && i <= 0) {
    e.preventDefault();
    return;
  }
  if (i <= 0) return;

  if (inputs[i].value == "") inputs[--i].focus();
}
