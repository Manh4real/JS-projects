import { alertMessage, styling, obj, execCalculations } from "./index.js";

const main = document.querySelector(".main");
const input = document.querySelector("#display-input");
const table = document.querySelector(".table");
const equalOperator = document.querySelector(".equal");

let { firstVal, nextVal, pending, exists2nd, activeOperator, activeBtn } = obj;

equalOperator.onclick = calculate;
input.onmousedown = () => false;
window.addEventListener("keydown", function (e) {
  if (e.key == "Tab") input.tabIndex = -1; // prevent focus on input
});
table.addEventListener("mousedown", handlingCalculation);

function handlingCalculation(e) {
  if (!e.target.closest("td")) return;

  let val = e.target.textContent;
  // if clicks on operators (+ - * /)
  if (e.target.className.includes("operator")) {
    styling(e); // styling operator button
    activeBtn = e.target;
    // waiting for second arg
    if (exists2nd) {
      // e.g. 2 + 2 then press 'nother operator, then execute calculating.
      firstVal = calculate(); // e.g. "2 + 2" => "-" => "4 - "    // (firstVal = 4)
      activeBtn.classList.add("active");
    } else {
      // cases of negative or positive (+ / -) "firstVal".
      let signs = ["+", "-"];
      if (
        (signs.includes(val) && !firstVal) ||
        (signs.includes(val) && signs.includes(firstVal))
      ) {
        firstVal = val;
        pending = false;
        input.value = firstVal;
      } else if (signs.includes(firstVal)) {
        // if "firstVal" = (+ or -) and press 'nother operator, then do none.
        pending = false;
        return;
      } else {
        firstVal = parseFloat(firstVal); // save the final "firstVal".
        activeOperator = val; //
        input.value = firstVal + val;
        pending = true;
      }
      return;
    }
    pending = true;
    activeOperator = val;
    input.value = firstVal + val;
    return;
  } else if (val == "=") {
    // fired "calculate" handler
    return;
  } else if (val == "C") {
    if (exists2nd) {
      nextVal = 0;
      input.value = firstVal + activeOperator;
      exists2nd = false;
    } else {
      firstVal = 0;
      input.value = "";
      pending = false;
      activeOperator = undefined;
      activeBtn.classList.remove("active");
    }
    return;
  }

  if (!pending) {
    if (!firstVal) firstVal = val;
    else if (firstVal || firstVal.startsWith("+"))
      firstVal = String(firstVal).concat(val);
    input.value = firstVal;
  } else if (pending) {
    nextVal = nextVal ? String(nextVal).concat(val) : val;
    input.value = `${firstVal}${activeOperator}${nextVal}`;
    exists2nd = true;
  }
}

function calculate() {
  nextVal = parseFloat(nextVal);
  firstVal = parseFloat(firstVal);
  let temp; // to temporarily save the result;
  if (exists2nd) {
    temp = execCalculations(activeOperator, firstVal, nextVal);
  } else temp = firstVal;

  function handlingResult() {
    let isInf = ["-Infinity", "Infinity"].includes(temp);
    if (!isInf && !isNaN(parseFloat(temp))) firstVal = parseFloat(temp);
    else {
      if (isNaN(temp)) {
        console.log("wrong");
        alertMessage(main, "math-error", "You're stupid. Type again!");
      } else if (isInf) {
        console.log("wrong");
        alertMessage(main, "math-error", "Infinity value. Type again!");
      }

      input.value = firstVal + activeOperator || 0;
      exists2nd = false;
      return firstVal;
    }
    nextVal = 0;
    pending = false;
    activeOperator = undefined;
    exists2nd = false;
    activeBtn.classList.remove("active");
    input.value = firstVal;
    return firstVal;
  }
  return handlingResult();
}
