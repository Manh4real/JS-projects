const header = document.querySelector(".header");
const toTopBtn = document.querySelector("button.to-top");
const links = document.querySelectorAll(".link-list li");
const headerHeight = header.offsetHeight;

window.addEventListener("load", function () {
  window.addEventListener("scroll", function () {
    if (this.pageYOffset >= 120) {
      if (!toTopBtn.className.includes("active"))
        toTopBtn.classList.add("active");
      if (!header.className.includes("active")) header.classList.add("active");
    } else {
      if (header.className.includes("active"))
        header.classList.remove("active");
      if (toTopBtn.className.includes("active"))
        toTopBtn.classList.remove("active");
    }
  });

  toTopBtn.onclick = function () {
    window.scrollTo(0, 0);
  };
});
links.forEach((link) => {
  link.onclick = function (e) {
    e.preventDefault();
    let isFixedHeader = header.className.includes("active");
    let elem = document.getElementById(
      `${e.target.getAttribute("href").slice(1)}`
    );
    window.scrollTo(
      0,
      isFixedHeader
        ? elem.offsetTop - headerHeight
        : elem.offsetTop - 2 * headerHeight
    );
  };
});
