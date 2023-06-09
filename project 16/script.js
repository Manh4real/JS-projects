const paraEl = document.querySelector(".para");
const line = document.querySelector(".line");

const paras = [
  `I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.
    `,
  `This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!
    `,
  `This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.
    `,
];
let avg = Math.round(190 / 60); // average reading speed per second

render();
function render() {
  let i = 0;
  switchParas(paras[i]);

  function switchParas(para) {
    if (i >= paras.length) {
      console.log("end");
      i = 0; // line 1
      para = paras[0]; // line 2, both these lines just to keep it infinite
      //   return; // run the exact number of paragraphs
    }
    let words = para.split(" ").length;
    paraEl.textContent = `"${para}"`;
    ++i;
    setTimeout(() => {
      switchParas(paras[i]);
    }, getDuration(words));
    runAnimation(getDuration(words), drawWidth);
  }
}
function runAnimation(duration, draw) {
  let start = performance.now();
  requestAnimationFrame(function run(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
      cancelAnimationFrame(run);
    }
    let progress = linear(timeFraction);
    draw(progress);
    if (timeFraction < 1) {
      requestAnimationFrame(run);
    }
  });
}
function getDuration(words) {
  return Math.round((words * 1000) / avg);
}
function linear(timeFraction) {
  return timeFraction;
}
function drawWidth(progress) {
  line.style.width = progress * 100 + "%";
}
