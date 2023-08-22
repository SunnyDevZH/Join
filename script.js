let todos = [];
const monthsName = [
  null,
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

function init() {
  setTimeout(renderLogin, 1300);
}

async function loadTodos() {
  let newTodos = await getItem("allTasks");
  todos = JSON.parse(newTodos);
  for (let i = 0; i < todos.length; i++) {
    todos[i].id = i;
  }
  console.log(todos);
}

function renderLogin() {
  document.getElementById("login-container").innerHTML = `
  <header class="loginHeader">
  <div class="signUp">
      <p>Not a Join user?</p>
      <button class="signUpButton" onclick="window.location.href='../signUp/signUp.html'">Sign up</button> 
  </div>
</header>
<div class="alignItems">
  <div class="loginContainer">
      <h1>Log in</h1>
      <form class="flexdirection" onsubmit="login(); return false;">
          <input required type="email" id="email" placeholder="Email"> 
          <input required type="password" id="password" placeholder="Password">
          <div>
              <input type="checkbox" onclick="save()" name="Remember" id="remember"><label for="remember">Remember me</label>
              <a href="../forgotSend/forgotSend.html">I forgot my password</a>
          </div>
          <div>
              <button on>Log in</button>
              <button onclick="window.location.href= '../summary.html';">Guest Log in</button>
          </div>
      </form>
      <div id="msgBox"></div> <!-- Falsches Passwort-->
  </div>
</div>
<footer>
  <a  class="privacy" href="../privacyPolicy.html">Privacy Policy</a>
  <a class="legal" href="../legalNotice.html">Legal notice</a>
</footer>
    `;
}

function guestLogin() {
  window.location.href = "./summary.html";
}

async function updateSummaryCounter() {
  await loadTodos();
  document.getElementById("task-board-counter").innerHTML = todos.length;
  let todoProgress = todos.filter((t) => t["step"] == "col-02");
  document.getElementById("todo-inprogress-counter").innerHTML =
    todoProgress.length;
  let todoAwait = todos.filter((t) => t["step"] == "col-03");
  document.getElementById("todo-await-counter").innerHTML = todoAwait.length;
  let todoOpen = todos.filter((t) => t["step"] == "col-01");
  document.getElementById("todo-open-counter").innerHTML = todoOpen.length;
  let todoDone = todos.filter((t) => t["step"] == "col-04");
  document.getElementById("todo-done-counter").innerHTML = todoDone.length;

  let todoUrgent = todos.filter((t) => t["prio"][0] == "URGENT");
  document.getElementById("todo-prio-counter").innerHTML = todoUrgent.length;

  document.getElementById("next-date").innerHTML = getNextDate(todoUrgent);
}

function getNextDate(element) {
  let nextdate = "3000-01-01";
  element.forEach((todo) => {
    if (todo["date"] < nextdate) {
      nextdate = todo["date"];
    }
  });
  let monthFull = monthsName[parseInt(nextdate.substring(5, 7))];
  return `${nextdate.substring(8)}. ${monthFull} ${nextdate.substring(0, 4)}`;
}
