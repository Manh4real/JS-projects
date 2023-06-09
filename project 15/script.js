// https://randomuser.me/api?results=50

import {
  createLiElement,
  getUsers,
  createMessage,
  loading,
} from "./js/index.js";

const list = document.querySelector(".list");
const search = document.querySelector("#search");
const select = document.querySelector(".options");
const infoEl = document.querySelector(".info");

// localStorage.removeItem("users");
let users;
window.addEventListener("load", async function () {
  loading.call(list);
  await render();
  document.querySelector(".loading").remove();
});
infoEl.onclick = () => {
  alert("Don't type something stupid!");
};
document.forms["filter"].onsubmit = () => false;

search.addEventListener("input", async function (e) {
  if (!search.value) {
    list.innerHTML = "";
    loading.call(list);
    await render();
    document.querySelector(".loading").remove();
    return;
  }
  e.preventDefault();
  switchType(search.value);
  select.onchange = switchType;
});
function switchType(input) {
  switch (select.value) {
    case "both":
      searchUsers(input, true, true);
      break;
    case "name":
      searchUsers(input, true);
      break;
    case "location":
      searchUsers(input, false, true);
      break;
    default:
      break;
  }
}
async function render() {
  users = JSON.parse(localStorage.getItem("users")) || (await getUsers());
  users.forEach((user) => createLiElement(list, user));
}
function searchUsers(input, byName = true, byLocation = false) {
  input = input.toLowerCase();
  if (byName && byLocation) displayUsersByNameAndLocation(input);
  else if (byName && !byLocation) displayUsersbyNames(input);
  else if (!byName && byLocation) displayUsersbyLocation(input);
}
function display(users) {
  list.innerHTML = "";
  if (!users.length) {
    // console.log("empty");
    createMessage(list);
    return;
  }
  users.forEach((user) => {
    createLiElement(list, user);
  });
}

function displayUsersByNameAndLocation(input) {
  let u = getWords(input);
  let userArr = users.filter((user) => {
    let str =
      user.name.first +
      user.name.last +
      user.location.city +
      user.location.country;
    return u.every((word) => str.check(word));
  });
  display(userArr);
}

function displayUsersbyNames(input) {
  let t = getString(input);
  let u = getWords(input);
  let userArr = users.filter((us) => {
    let str = us.name.first + us.name.last;
    return str.check(t) || checkInput(str, u);
  });
  display(userArr);
}
function displayUsersbyLocation(input) {
  let t = getString(input);
  let u = getWords(input);
  let userArr = users.filter((us) => {
    let str = us.location.city + us.location.country;
    return str.check(t) || checkInput(str, u);
  });
  display(userArr);
}
function getString(input) {
  return input.replaceAll(/[,\s*]/g, "");
}
function getWords(input) {
  return input.replaceAll(/,+/g, "").split(/\s+/);
}
function checkInput(str, input) {
  // input: array of words of input
  return input.every((word) => str.check(word));
}
String.prototype.check = function (input) {
  //input: string without spaces, and commas.
  return this.replaceAll(/[,\s*]/g, "")
    .toLowerCase()
    .includes(input);
};
