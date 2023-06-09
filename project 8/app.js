const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const images = document.querySelectorAll(".image");

let counter = 0;

prevBtn.onclick = slideLeft;
nextBtn.onclick = slideRight;

// prevBtn.disabled = true;
window.addEventListener("keydown", function (e) {
  if (e.key == "ArrowRight") {
    e.preventDefault();
    if (counter >= images.length - 1) return;
    slideRight();
  } else if (e.key == "ArrowLeft") {
    e.preventDefault();
    if (counter <= 0) return;
    slideLeft();
  }
});

function slide() {
  images.forEach((image) => {
    image.style.left = `${-counter * 100}%`;
  });
}
function slideLeft() {
  --counter;
  disableBtn();
  slide();
}

function slideRight() {
  ++counter;
  disableBtn();
  slide();
}

function disableBtn() {
  if (counter == 0) prevBtn.disabled = true;
  else if (counter == images.length - 1) nextBtn.disabled = true;
  else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
}

window.addEventListener("load", function () {
  let intervalID = setInterval(function () {
    if (counter == images.length - 1) counter = -1;
    if (++counter == 0) {
      nextBtn.disabled = false;
      prevBtn.disabled = true;
    } else if (counter == images.length - 1) {
      prevBtn.disabled = false;
      nextBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }
    slide();
  }, 3000);
  // if (!intervalID) disableBtn();
  this.clearInterval(intervalID);
});
