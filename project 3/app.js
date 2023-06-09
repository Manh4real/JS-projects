import { users } from "./js/data.js";
import { animate, Animation } from "./js/animate.js";
import { toggle } from "./js/toggleDarkMode.js";

const avatar = document.querySelector(".intro-title #avatar");
const username = document.querySelector(".intro-title .name");
const job = document.querySelector(".intro-title .job");
const intro = document.querySelector(".intro-content .intro");
const name_and_job = document.querySelector(".name-job");
const userId = document.getElementById("userId"); // added at 12:15am, 4 Sep 2021

const btn = document.querySelector("button.btn"); // "Suprise me!" button
const slideIcons = document.querySelector(".slide-icon");

let activeUser;

window.addEventListener("DOMContentLoaded", function () {
  randomReview(users);
  toggle(); // toggling to dark mode
});
// setInterval(() => randomReview(users), 1500);
btn.onclick = function () {
  randomReview(users);
};
intro.onmousedown = () => false;

function updateInfo(user) {
  activeUser = user;
  userId.innerHTML = user.userid.slice(-1);
  avatar.src = user.avatar;

  avatar.onload = function () {
    animate({
      duration: 1000, // by milliseconds
      draw: [
        new Animation(bouncingName, true),
        new Animation(slidingFadePara, false),
      ],
    }); // generating animation.
    username.innerHTML = user.username;
    job.innerHTML = user.job;
    intro.innerHTML = user.intro;
  };
}
function slidingFadePara(progress) {
  avatar.style.opacity = intro.style.opacity = progress;
  intro.style.transform = `translateY(${(1 - progress) * 100}%)`;
}
function bouncingName(progress) {
  name_and_job.style.transform = `translateX(-${(1 - progress) * 80}%)`;
  name_and_job.style.opacity = progress;
}

function randomReview(users) {
  let randomNum = Math.floor(Math.random() * users.length);
  updateInfo(users[randomNum]);
}

slideIcons.onclick = function (e) {
  e.preventDefault();
  if (e.target.tagName !== "I") return;

  let curUserPos = users.indexOf(activeUser);

  if (e.target.id == "left") {
    if (curUserPos == 0) updateInfo(users[users.length - 1]);
    else updateInfo(users[curUserPos - 1]);
  } else if (e.target.id == "right") {
    if (curUserPos == users.length - 1) updateInfo(users[0]);
    else updateInfo(users[curUserPos + 1]);
  }
};

// localStorage.removeItem("isDarkMode");
