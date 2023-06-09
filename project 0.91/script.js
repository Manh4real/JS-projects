import { alertMessage } from "../project 7/index.js";

const content = document.querySelector(".content");
// const selection = document.querySelector(".selection");
const checks = document.querySelectorAll(".el.c input");
const len = document.getElementById("length");
const btn = document.querySelector(".btn button");
const icon = document.querySelector(".icon");
const input = document.querySelector(".show-up");

let alertMes = alertMessage.bind(content);

let uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lc = "acbdefghijklmnopqrstuvwxyz";
let nums = "0123456789";
let syms = `~!@#$%^&*()_+\`{}|:"<>?\\/.,=-[]`;

let ops = new Map([
  ["uc", uc],
  ["lc", lc],
  ["num", nums],
  ["sym", syms],
]);
let result = "";

btn.onclick = function () {
  generate();
};
icon.onclick = function () {
  if (!input.value) return;

  let type = "text/plain";
  let blob = new Blob([input.value], { type });
  let data = [new ClipboardItem({ [type]: blob })];

  navigator.clipboard.write(data);

  alertMes("success", "Copied!");
};

function generate() {
  result = "";
  let l = len.value;
  let options = Array.from(checks).filter((el) => el.checked);
  if (!options.length) return;
  for (let index = 0; index < l; index++) {
    let randomIndex = Math.floor(Math.random() * options.length);
    let key = options[randomIndex].id;
    let val = ops.get(key);

    let i = Math.floor(Math.random() * val.length);
    result += val[i];
  }
  input.value = result;
}
