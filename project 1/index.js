// const title = document.querySelector(".title");
const main = document.querySelector(".main");
const colorName = document.querySelector(".title .color-name");
const btn = document.querySelector(".btn");

colorName.textContent = "#333333";
btn.onclick = function () {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  colorName.textContent = color;
  main.style.backgroundColor = color;
};
