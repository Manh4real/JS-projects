const search = document.getElementById("search-user");
const form = document.forms["search-user"];
const container = document.querySelector(".container");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (container.children[1]) {
    container.lastElementChild.remove();
  }
  loadingIndicator();
  let htmls = await getUser(search.value);
  setInPlace();
  if (htmls) container.insertAdjacentHTML("beforeend", htmls);
});

function setInPlace() {
  document.querySelector(".loading").remove();
  search.value = "";
  search.blur();
}
async function getUser(userName) {
  const url = "https://api.github.com/users/";
  const res = await fetch(url + userName);
  const user = await res.json();

  if (user.message == "Not Found") {
    container.insertAdjacentHTML("beforeend", `<p>NOT FOUND!</p>`);
    return;
  }
  return render(user);
}
async function render(user) {
  let repos = await getRepos(user.repos_url);
  let htmls = `
    <div class="content">
        <div class="user-info-container">
            <div class="image" style="background-image: url(${user.avatar_url})"></div>
            <div class="info">
                <h1 class="name">${user.name}</h1>
                <p class="description">${user.bio}</p>
                <div class="basic">
                    <span class="followers">
                        <span class="num">${user.followers}</span>
                        Followers
                    </span>
                    <span class="following">
                        <span class="num">${user.following}</span>
                        Following
                    </span>
                    <span class="repos">
                        <span class="num">${user.public_repos}</span>
                        Repos
                    </span>
                </div>
                ${repos}
            </div>
        </div>
    </div>
    `;
  return htmls;
}
async function getRepos(url) {
  let htmls = "";
  const res = await fetch(url);
  const data = await res.json();

  data.forEach((link) => {
    htmls += `<a href="${link.html_url}" target="_blank">${link.name}</a>`;
  });
  return `<div class="links">${htmls}</div>`;
}

function loadingIndicator() {
  let div = document.createElement("div");
  div.className = "loading";
  div.innerHTML = "Loading...";
  container.append(div);
}
