const contentContainers = document.querySelectorAll(".content-container");

function translateContainers() {
  contentContainers.forEach((item) => {
    let coords = item.getBoundingClientRect();
    if (
      coords.top >= 0 &&
      coords.left >= 0 &&
      coords.bottom <= (innerHeight || document.documentElement.clientHeight) &&
      coords.right <= (innerWidth || document.documentElement.clientWidth)
    )
      item.classList.add("translated");
  });
}
window.addEventListener("scroll", translateContainers);
window.addEventListener("load", translateContainers);
