import { menu } from "./data.js";

let itemsList = document.querySelector("div.items-list");

window.addEventListener("DOMContentLoaded", function () {
  render(menu);
});

let typesContainer = document.querySelector(".types-container");
typesContainer.insertAdjacentHTML("beforeend", buttonTypesHtml(menu));

function buttonTypesHtml(menu) {
  let typeBtns = new Set(menu.map((item) => item.type));

  return Array.from(typeBtns)
    .map((itemtype) => {
      return `<button id="${itemtype}">${itemtype}</button>`;
    })
    .join("");
}

function render(items) {
  let htmls = "";
  items.forEach((item) => {
    let html = `
      <div class="item" data-type="${item.type}">
        <div class="image">
          <img src="${item.avatar}" id="avatar">
        </div>
        <div class="item-info">
          <div class="title">
            <h2 id="dishName">${item.dishName}</h2>
            <span id="price">${item.price}</span>
          </div>
          <div class="description">
            <p id="description">
              ${item.description}
            </p>
          </div>
        </div>
      </div>
    `;
    htmls += html;
  });
  // itemsList.insertAdjacentHTML("beforeend", htmls);
  itemsList.innerHTML = htmls;
}

typesContainer.onclick = function (e) {
  if (e.target.tagName != "BUTTON") return;
  if (e.target.className == "active") return;

  for (let itemtype of this.children) {
    if (itemtype.className == "active") itemtype.classList.remove("active");
  }

  let type = e.target.id;
  e.target.className = "active";
  if (type == "all") render(menu);
  else render(menu.filter((item) => item.type == type));
};
