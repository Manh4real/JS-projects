import { local, btnCtrl, alertMessage } from "./index.js";

let { create } = btnCtrl;
let $ = document;
let _$ = $.querySelector.bind(document);
let {
  add: addToLocalStorage,
  update: updateItemLocalStorage,
  remove: removeFromLocalStorage,
  removeItems: removeSelectedItemsFromLocalStorage,
} = local;

const content = _$(".content");
const itemInput = _$(".item-input");
const submitBtn = _$(".submit-btn");
const inputSubmit = _$(".input-submit");

let alertMes = alertMessage.bind(content);

const listContainer = $.createElement("div");
const list = $.createElement("div");
list.className = "list";
listContainer.className = "list-container";

let editingItem, itemID, editFlag, selectFlag;
let selectedItems = [];

let selectBtn, deleteBtn, clearBtn, cancelBtn; // DELETE BUTTON next to SELECTION BUTTON, to delete selected items

renderFromLocal(); // RENDER ITEMS FROM LOCAL STORAGE

submitBtn.addEventListener("click", handleUserEditing);
window.addEventListener("keydown", cancelSelecting);
window.addEventListener("click", cancelEditing);
list.onclick = selectItem;

function handleUserEditing(e) {
  e.preventDefault();
  const value = itemInput.value;
  if (!value) {
    alertMes("reject", "Please enter an item");
    return;
  }
  if (value && !editFlag) {
    setItem(Math.random().toString(36).substr(2, 9), value);
    alertMes("success", "Added Successfully");
    addToLocalStorage(itemID, value);
  } else if (value && editFlag) {
    editItem(value);
    updateItemLocalStorage(itemID, value);
  }
  setBackToDefault();
}
function setItem(id, value) {
  let html = `
      <div class="item-name">${value}</div>
      <div class="modifying-btn">
          <button type="submit" id="edit-btn"><ion-icon name="create" class="edit"></ion-icon></button>
          <button type="submit" id="del-btn"><ion-icon name="trash" class="trash"></ion-icon></button>
      </div>
    `;
  let item = $.createElement("div");
  item.setAttribute("data-id", id);
  item.className = "item";
  item.innerHTML = html;

  itemID = item.dataset.id;
  if (!list.children.length) initListContainer();
  list.append(item);

  const modifyingBtns = item.lastElementChild;
  modifyingBtns.onclick = modifyItem;
}
function initListContainer() {
  listContainer.style.visibility = "visible";
  listContainer.append(list);
  content.append(listContainer);
  createBtns();
}
function setBackToDefault() {
  itemInput.value = "";
  editFlag = false;
  itemID = "";
}
// SELECTION HANDLING STUFF
function createDeleteBtn() {
  // create a clear button to delete selected items
  deleteBtn = create("delete");
  deleteBtn.disabled = true;
  deleteBtn.onclick = removeSelectedItems;
  listContainer.append(deleteBtn);
}
function createSelectBtn() {
  // create a clear button to  ACTIVATE selecting items
  selectBtn = create("select");
  selectBtn.onclick = activateSelection;
  listContainer.append(selectBtn);
}
function activateSelection() {
  if (selectFlag) {
    alertMes("already", "Alt + C to cancel selecting");
    return;
  }
  // if (!selectFlag)
  selectFlag = true;
  selectBtn.classList.add("active");
  alertMes("select-active", "Alt + C to cancel selecting");
}
function selectItem(e) {
  if (!selectFlag) return;
  if (e.target.tagName == "BUTTON") return;
  let item; // to identify selected item
  if (e.target.className.includes("item-name")) item = e.target.parentNode;
  else item = e.target;
  let check = item.classList.toggle("selected");

  if (check) selectedItems.push(item);
  else selectedItems = selectedItems.filter((id) => id != item);

  toggleDeleteBtn();
}
function toggleDeleteBtn() {
  if (selectedItems.length) {
    deleteBtn.disabled = false;
    deleteBtn.classList.add("active");
  } else {
    deleteBtn.disabled = true;
    deleteBtn.classList.remove("active");
  }
}
function cancelSelecting(e) {
  if (!selectFlag) return;
  if (!(e.altKey && e.key == "c")) return;

  selectFlag = false;
  selectBtn.classList.remove("active");
  let selectingItems = $.querySelectorAll(".item.selected");
  selectingItems.forEach((item) => {
    item.classList.remove("selected");
    selectedItems.pop();
  });
  toggleDeleteBtn();
  alertMes("cancel-select", "Done canceling selecting!");
}
function removeSelectedItems() {
  // for (let item of selectedItems) {
  //   item.remove();
  //   console.log("oops");
  // }

  for (let i = 0; i < selectedItems.length; i++) {
    selectedItems[i].remove();
    // i--;
  }

  selectFlag = false; // deleted selected items, thus selectedItems is empty;
  toggleDeleteBtn();
  selectBtn.classList.remove("active");
  emptyList();
  removeSelectedItemsFromLocalStorage(selectedItems);
  selectedItems = [];
  toggleDeleteBtn();
}
// MODIFYING ITEMS BY EDIT, DELETE BUTTONS
function modifyItem(e) {
  let btn = e.target.closest("button");
  if (!btn) return;
  let id = btn.id; // specify button
  editingItem = this.previousElementSibling; // specify editing item
  itemID = editingItem.parentNode.dataset.id; // get editing item's id

  if (id == "edit-btn") {
    itemInput.focus();

    let oldItemVal = editingItem.textContent; // item's value wanted to edit
    itemInput.value = oldItemVal; // show old value up in input

    if (editFlag) return;
    editFlag = true; // status: editing

    createCancelBtn();
  }
  if (id == "del-btn") deleteItem(editingItem);
}
function editItem(value) {
  // when click "Submit" button, edit item.
  editingItem.textContent = value;
  alertMes("edited", "Edited !!");
  cancelBtn.remove();
}
function deleteItem(item) {
  // click "Del" button, delete item
  if (!confirm("Are you sure want to delete " + item.textContent + " ?"))
    return;
  item = item.parentNode;

  // when you select items, but click on "Del" button (rather than "Delete"), then update these stuff.
  selectedItems = selectedItems.filter(
    (it) => it.dataset.id != item.dataset.id
  );
  item.remove(); // remove item container
  toggleDeleteBtn();

  emptyList(); // if list is empty, remove list
  removeFromLocalStorage(itemID);
  alertMes("deleted", `Deleted item ${item.dataset.id} !`);
}
// CANCEL EDITING HANDLING
function createCancelBtn() {
  cancelBtn = create("cancel");
  cancelBtn.onclick = function (e) {
    // cancel editing mode when user click on "Cancel" button
    e.preventDefault();
    _$(".cancel-btn").remove();
    setBackToDefault();
  };
  inputSubmit.append(cancelBtn);
}
function cancelEditing(e) {
  // when user clicks on outside of the screen (except "cancel" button, and "input" field), the editing mode is cancelled.
  if (
    e.target.id == "edit-btn" ||
    e.target == itemInput ||
    e.target.parentNode.id == "edit-btn"
  )
    return;
  if (!editFlag) return;
  setBackToDefault();
  cancelBtn.remove();
}
// CLEAR ALL HANDLING)
function createClearBtn() {
  clearBtn = create("clear");
  clearBtn.onclick = clearAll;
  listContainer.append(clearBtn);
}
function clearAll() {
  if (!confirm("Are you for sure want to clear all that?")) return;
  for (let i = 0; i < list.children.length; i++) {
    list.children[i].remove();
    i--;
  }
  (function () {
    setBackToDefault();
    selectFlag = false;
    toggleDeleteBtn();
  })();
  emptyList();
  alertMes("clear", "Cleared all items :(");
}
// ADDITIONAL FUNCTIONS
function emptyList() {
  if (list.children.length) return;
  removeBtns(); // remove all related buttons
  list.remove(); // clear list content
  listContainer.remove(); // clear list container
  localStorage.removeItem("list"); // clear local storage
}
function createBtns() {
  createClearBtn();
  createDeleteBtn();
  createSelectBtn(); // to ACTIVATE selecting items
}
function removeBtns() {
  selectBtn.remove();
  deleteBtn.remove();
  clearBtn.remove();
}
function renderFromLocal() {
  let storedList = JSON.parse(localStorage.getItem("list"));
  if (!storedList) return;

  storedList.forEach((item) => setItem(item.id, item.value));
}
// localStorage.removeItem("list");
