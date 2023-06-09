// this file is of module - thus line 3 and 4 ("await" in top-level scope)

let response = await fetch("https://jsonplaceholder.typicode.com/users");
let users = await response.json();

let container = document.querySelector(".container");
// console.log(JSON.stringify(users, null, 2));

users.forEach((user) => {
  let html = `
    <div class="user-header">
        <div class="name">
            <h1>${user.name}</h1>
        </div>
        <div class="username">
            <h2><em>${user.username}</em></h2>
        </div>
    </div>
    <div class="user-main">
        <ul>
            <li class="email">
                <p>Email: ${user.email}</p>
            </li>
            <li class="address">
                <p>Address: ${Object.entries(user.address)
                  .slice(0, -1)
                  .map((arr) => arr.join(": "))
                  .join(", ")}</p>
            </li>
            <li class="phone">
                <p>Phone: ${user.phone}</p>
            </li>
            <li class="website">
                website: <a href="${user.website}"> ${user.website}</a>
            </li>
            <li class="company">
                <li><h3>Company info: &nbsp; </h3></li>
                <ul>
                    <h4 class="name">${user.company.name}</h4>
                    <p class="catch-phrase">${user.company.catchPhrase}</p>
                    <p class="bs">${user.company.bs}</p>
                </ul>
            </li>
        </ul>
    </div>
    `;
  let userInfo = document.createElement("div");
  userInfo.className = "user-info";
  userInfo.innerHTML = html;
  container.append(userInfo);
});
