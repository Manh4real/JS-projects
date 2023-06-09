export let local = {
  add: function (id, value) {
    let storedList = JSON.parse(localStorage.getItem("list")) || [];
    let pushedItem = { id, value };
    storedList.push(pushedItem);
    localStorage.setItem("list", JSON.stringify(storedList));
  },
  update: function (id, value) {
    let storedList = JSON.parse(localStorage.getItem("list"));
    if (!storedList) return;
    storedList = storedList.map((item) => {
      if (item.id == id) item.value = value;
      return item;
    });
    localStorage.setItem("list", JSON.stringify(storedList));
  },
  remove: function (id) {
    let storedList = JSON.parse(localStorage.getItem("list"));
    // remove from local storage, one item each time
    if (!storedList) return;
    storedList = storedList.filter((item) => item.id != id);
    if (storedList.length)
      localStorage.setItem("list", JSON.stringify(storedList));
    // list still has items
    else localStorage.removeItem("list"); // if not, remove list item
  },
  removeItems: function (items) {
    let storedList = JSON.parse(localStorage.getItem("list"));
    if (!storedList) return;
    items = items.map((item) => item.dataset.id);

    storedList = storedList.filter(
      (storedItem) => !items.includes(storedItem.id)
    );
    if (storedList.length)
      localStorage.setItem("list", JSON.stringify(storedList));
    // list still has items
    else localStorage.removeItem("list"); // if not, remove list item
  },
};

export let btnCtrl = {
  create: function (name) {
    let btn = document.createElement("button");
    btn.className = `${name}-btn`;
    btn.textContent = name;
    return btn;
  },
};

export function alertMessage(status, mes) {
  this.insertAdjacentHTML(
    "beforeend",
    `<div class="alert ${status}">${mes}</div>`
  );
  let alertMes = document.querySelectorAll(`.alert`);
  setTimeout(function () {
    alertMes.forEach((mes) => mes.remove());
  }, 1200);
}
