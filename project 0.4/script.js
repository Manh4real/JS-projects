const numBlocks = document.querySelectorAll(".num-block");
const leftBtn = document.querySelector("#left");
const rightBtn = document.querySelector("#right");

const line = document.querySelector(".line");

let counter = 1;

line.style.width = ((numBlocks.length - 1) / numBlocks.length) * 100 + "%";
leftBtn.disabled = true;

leftBtn.onclick = function (e) {
  if (counter <= 1) {
    return;
  }
  rightBtn.disabled = false;
  leftBtn.disabled = false;
  counter--;
  if (counter == 1) leftBtn.disabled = true;
  numBlocks[counter].classList.remove("active");
  numBlocks[counter - 1].classList.remove("finished");
  numBlocks[counter - 1].classList.add("active");
};
rightBtn.onclick = function (e) {
  if (counter >= numBlocks.length) {
    return;
  }
  rightBtn.disabled = false;
  leftBtn.disabled = false;
  ++counter;
  if (counter == numBlocks.length) rightBtn.disabled = true;
  numBlocks[counter - 1].classList.add("active");
  numBlocks[counter - 2].classList.remove("active");
  numBlocks[counter - 2].classList.add("finished");
};
