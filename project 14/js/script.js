const feelingsEl = document.querySelector(".feelings");
const btn = document.querySelector(".btn");
const container = document.querySelector(".container");
const main = document.querySelector(".main");
let check;

let messages = new Map([
  ["unhappy", "Calm down mane!"],
  ["neutral", "Be free!"],
  ["satisfied", "Having a great day, huh?"],
  ["suprise", "You're suprised, don't you?"],
  ["dizzy", "Take a break!"],
  ["sad", "Go get your favorite things!"],
]);
let feeling = "satisfied";

feelingsEl.onclick = function (e) {
  if (!e.target.closest(".feeling")) return;
  let el = e.target.closest(".feeling");

  feelingsEl.querySelector(".feeling.active").classList.remove("active");
  el.classList.add("active");

  feeling = el.querySelector(".text").textContent;
};
btn.onclick = function (e) {
  e.stopPropagation();
  if (!feeling) return;
  if (check) return;
  check = true;
  main.insertAdjacentHTML(
    "beforeend",
    `<div class="pop-up">
            <div class="image">
                <img src="./confetti.svg" alt="" />
                <h1 class="title">Appreciate you!</h1>
            </div>
            <div class="message">
                <p>Feeling&nbsp;<span class="received-feeling">${feeling}</span></p>
                <p>${messages.get(feeling)}</p>
            </div>
            <div class="close">
                <i class="fas fa-times"></i>
            </div>
        </div>`
  );
  const popup = main.querySelector(".pop-up");
  const closeBtn = popup.querySelector(".pop-up .close");
  popup.onclick = (e) => {
    e.stopPropagation();
  };
  closeBtn.onclick = removePopup;
};
window.addEventListener("click", () => {
  if (!check) return;
  removePopup();
});

function removePopup() {
  check = false;
  main.querySelector(".pop-up")?.remove();
}
