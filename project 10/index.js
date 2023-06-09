export function alertMessage(parent, type, mes) {
  let div = document.createElement("div");
  div.className = `alert ${type}`;
  div.textContent = mes;
  parent.append(div);
  setTimeout(div.remove.bind(div), 1500);
}
export function styling(e) {
  let activeBtns = document.querySelectorAll(".operator.active")[0];
  if (activeBtns) activeBtns.classList.remove("active");
  e.target.classList.add("active"); // for styling
}
export let obj = {
  firstVal: 0,
  nextVal: 0,
  pending: false, // waiting for second arg
  exists2nd: false,
  activeOperator: undefined,
  activeBtn: undefined,
};
export function execCalculations(operator, val1, val2) {
  if (operator == "+") return val1 + val2;
  else if (operator == "-") return val1 - val2;
  else if (operator == "*") return val1 * val2;
  else if (operator == "/") return (val1 / val2).toFixed(5);
}
