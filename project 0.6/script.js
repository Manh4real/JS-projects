const lines = document.querySelector(".lines");
const container = document.querySelector(".container");
const navBar = document.querySelector(".nav-bar");

let check;
lines.onclick = function () {
  check = this.classList.toggle("active");
  container.classList.toggle("shrinked");
  if (!check) navBar.hidden = false;
};
container.addEventListener("transitionend", function (e) {
  if (e.target.className.includes("line")) return;
  if (!check) return;
  navBar.hidden = !navBar.hidden;
});
