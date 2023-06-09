const imgBlock = document.querySelector(".image-block");

Array.from(imgBlock.children).forEach((el) => {
  el.onclick = function () {
    Array.from(imgBlock.children).forEach((el) => {
      el.classList.remove("expanded");
    });
    this.classList.add("expanded");
  };
});
