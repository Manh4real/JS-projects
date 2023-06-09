"use strict";

const num = document.querySelector("#num");

let targetNum = +num.dataset.target;

let target = numberWithCommas(targetNum);
let count = 0;

window.addEventListener("load", function () {
  render();
});

function numberWithCommas(x) {
  let arr = x.toString().split(".");
  let dec = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return arr[1] ? dec.concat("." + arr[1]) : dec;
}

// let id = setInterval(function () {
//   if (count > targetNum) {
//     num.textContent = target;
//     clearInterval(id);
//     return;
//   }
//   count += 100;
//   num.textContent = numberWithCommas(count);
// }, 50);
function render() {
  if (count > targetNum) {
    num.textContent = target;
    return;
  }
  count += 100;
  num.textContent = numberWithCommas(count);
  setTimeout(render, 0);
}
