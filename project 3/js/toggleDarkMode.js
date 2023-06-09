const body = document.body;
const toggleMode = document.querySelector(".toggle-mode-block");
let isDarkMode = JSON.parse(localStorage.getItem("isDarkMode")) || "";

let isToggle = false;
export function toggle() {
  switchModeFromLocal();
  toggleMode.onclick = function () {
    isToggle = body.classList.toggle("dark-mode-on");
    switchMode();
    updateLocal(isToggle);
  };
}
function switchMode() {
  toggleMode.innerHTML = isToggle
    ? `<i class="icon ion-md-moon" title="Darkmode is on"></i>`
    : `<i class="icon ion-md-sunny" title="Lightmode is on"></i>`;
}
function updateLocal(toggle) {
  localStorage.setItem("isDarkMode", toggle);
}

function switchModeFromLocal() {
  if (isDarkMode === "") {
    localStorage.setItem("isDarkMode", isToggle);
    isDarkMode = isToggle;
  }
  if (isDarkMode == true) {
    isToggle = body.classList.toggle("dark-mode-on");
    updateLocal(isToggle);

    toggleMode.innerHTML = `<i class="icon ion-md-moon" title="Darkmode is on"></i>`;
  }
}
