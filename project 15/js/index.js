export function createLiElement(parent, user) {
  let li = document.createElement("li");
  parent.append(li);
  li.innerHTML = `
          <div class="image" style="background-image: url(./image1.jpg)"></div>
          <div class="info-container">
              <h2 class="name">${user.name.first} ${user.name.last}</h2>
              <p class="location">
                  ${user.location.city}, ${user.location.country}
              </p>
          </div>
          <div class="more">
              <i class="icon ion-ios-more"></i>
          </div>
      `;
}
export async function getUsers() {
  let res = await fetch("https://randomuser.me/api?results=50");
  let data = await res.json();

  let users = data.results;
  localStorage.setItem("users", JSON.stringify(users));
  return users;
}
export function createMessage(parent) {
  let p = document.createElement("p");
  p.className = "no-results";
  p.textContent = "No results";
  parent.append(p);
}
export function loading() {
  let div = document.createElement("div");
  div.className = "loading";
  div.textContent = "Loading...";
  this.append(div);
}
