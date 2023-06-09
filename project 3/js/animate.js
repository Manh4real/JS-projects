export function animate({ duration, draw }) {
  let timing; // function that finds the point in the path.

  let start = performance.now();
  requestAnimationFrame(function runAnimation(time) {
    let timeFraction = (time - start) / duration; // must be greater than 0, and less than 1
    if (timeFraction > 1) {
      // passed duration
      timeFraction = 1;
      cancelAnimationFrame(runAnimation);
    }
    let progress; // indicating points on the path (straight line, cubic bezier, circle or parabola...
    // each time run "runAnimation"

    draw.forEach(({ play, isBounced }) => {
      timing = isBounced ? makeEaseOut(bounce) : linear;
      progress = timing(timeFraction);
      play(progress); // emiting animation
    });

    if (timeFraction < 1) requestAnimationFrame(runAnimation); // continue animating till reaching duration
  });
}
function linear(timeFraction) {
  return timeFraction;
}

function makeEaseOut(timing) {
  return (timeFraction) => 1 - timing(1 - timeFraction);
}

function bounce(timeFraction) {
  for (let a = 0, b = 1; ; a += b, b /= 2)
    if (timeFraction >= (7 - 4 * a) / 11)
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
}

export class Animation {
  constructor(play, isBounced) {
    this.play = play;
    this.isBounced = isBounced;
  }
}
