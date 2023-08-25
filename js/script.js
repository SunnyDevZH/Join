let sumTodos = [];
let users = [];
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
  setTimeout(function () {
    location.href = "./login.html";
  }, 1300);
}

async function loadTodos() {
  let newTodos = await getItem("allTasks");
  sumTodos = JSON.parse(newTodos);
  for (let i = 0; i < sumTodos.length; i++) {
    sumTodos[i].id = i;
  }
  changeAvatarColor();
}

async function loadUsers() {
  let getUsers = await getItem("users");
  users = JSON.parse(getUsers);
  console.log(users);
}

async function updateSummaryCounter() {
  await loadUsers();
  await loadTodos();
  await updateSummaryGreeting();
  updateHeader();

  document.getElementById("task-board-counter").innerHTML = sumTodos.length;
  let todoProgress = sumTodos.filter((t) => t["step"] == "col-02");
  document.getElementById("todo-inprogress-counter").innerHTML =
    todoProgress.length;
  let todoAwait = sumTodos.filter((t) => t["step"] == "col-03");
  document.getElementById("todo-await-counter").innerHTML = todoAwait.length;
  let todoOpen = sumTodos.filter((t) => t["step"] == "col-01");
  document.getElementById("todo-open-counter").innerHTML = todoOpen.length;
  let todoDone = sumTodos.filter((t) => t["step"] == "col-04");
  document.getElementById("todo-done-counter").innerHTML = todoDone.length;

  let todoUrgent = sumTodos.filter((t) => t["prio"][0] == "URGENT");
  document.getElementById("todo-prio-counter").innerHTML = todoUrgent.length;

  document.getElementById("next-date").innerHTML = getNextDate(todoUrgent);
}

async function updateSummaryGreeting() {
  document.getElementById("sum-greet").innerHTML = getGreeting();
  document.getElementById("sum-name").innerHTML = getUserName();
}

function getGreeting() {
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  if (currentHour >= 0 && currentHour < 12) {
    return "Good Morning,";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good Afternoon,";
  } else if (currentHour >= 18) {
    return "Good Evening,";
  } else {
    return "Hello,";
  }
}

function getUserName() {
  if (users[7].hasOwnProperty("names")) {
    return users[7].names;
  } else {
    return "Mr Nobody";
  }
}

function generateInitials(name) {
  let initials = name.split(" ");
  if (initials.length == 1) {
    return initials[0][0] + initials[0][1].toUpperCase();
  } else if (initials.length == 2) {
    return initials[0][0] + initials[1][0];
  } else {
    return "00";
  }
}

function updateHeader() {
  document.getElementById("avatar-initials").innerHTML = generateInitials(
    users[7].names
  );
}

function getNextDate(element) {
  if (element.length > 0) {
    let nextdate = "3000-01-01";
    element.forEach((todo) => {
      if (todo["date"] < nextdate) {
        nextdate = todo["date"];
      }
    });
    let monthFull = monthsName[parseInt(nextdate.substring(5, 7))];
    return `${nextdate.substring(8)}. ${monthFull} ${nextdate.substring(0, 4)}`;
  } else {
    return "No urgent task available";
  }
}

// header

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeAvatarColor() {
  document.querySelector(".header-avatar").style.backgroundColor =
    getRandomColor();
}

function toggleAvatarMenu() {
  if (document.getElementById("avatar-menu").classList.contains("d-none")) {
    document.getElementById("avatar-menu").classList.remove("d-none");
  } else {
    document.getElementById("avatar-menu").classList.add("d-none");
  }
}

function closeAvatarMenuOutside(event) {
  const avatarMenu = document.getElementById("avatar-menu");
  const avatarInitials = document.getElementById("avatar-initials");
  if (!avatarMenu.contains(event.target) && event.target !== avatarInitials) {
    avatarMenu.classList.add("d-none");
  }
}

document.addEventListener("click", closeAvatarMenuOutside);

// header end
