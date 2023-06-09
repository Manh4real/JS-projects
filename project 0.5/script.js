// https://icanhazdadjoke.com/
// async function getJoke() {
//   let res = await fetch("https://icanhazdadjoke.com/", {
//     headers: { accept: "application/json" },
//   });
//   let data = await res.json();
//   console.log(data);
// }
// getJoke();

function gotWeather(data) {
  console.log(data[0].name);
}
let script = document.createElement("script");
script.src = `https://jsonplaceholder.typicode.com/users?callback=gotWeather`;
document.body.append(script);
