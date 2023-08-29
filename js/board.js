// for testing
let todos = [];

let currentDraggedElement;

function init() {
  loadTodos();
  updateHTML();
  loadCategory();
  loadContacts();
}

async function loadTodos() {
  let newTodos = await getItem("allTasks");
  todos = JSON.parse(newTodos);
  for (let i = 0; i < todos.length; i++) {
    todos[i].id = i;
  }
  console.log(todos);
  updateHTML();
  pushCategories();
}

function updateHTML() {
  let col = [];

  for (let i = 1; i <= 4; i++) {
    col[i - 1] = todos.filter((t) => t["step"] == "col-0" + i);
    document.getElementById("col-0" + i).innerHTML = "";
    if (col[i - 1].length == 0) {
      document.getElementById("col-0" + i).innerHTML = generateEmptyTodo();
    }
    col[i - 1].forEach((todo) => {
      const element = todo;
      document.getElementById("col-0" + i).innerHTML += generateTodo(element);
    });
  }
}

function generateTodo(element) {
  return `
  <div draggable='true' ondragstart='startDragging(${
    element["id"]
  })' class='todo' onclick="openOverlay(${element["id"]})">
    <div class="todo-category" style="background-color:${
      element["categoryColor"]
    }">${element["category"]}</div>
    <div class="todo-title">${firstCharToUpperCase(element["title"])}</div>
    <div class="todo-content">${firstCharToUpperCase(
      element["description"]
    )}</div>
    ${generateSubtasks(element)}
    <div class="todo-footer">
      <div class="todo-avatar-container">
      ${generateContacts(element)}
      </div>
      <img src="${element["prio"][1]}">
    </div>
  </div>
    `;
}

function generateContacts(element) {
  let contactList = "";
  if (element["assignedContact"].length > 0) {
    for (let i = 0; i < element["assignedContact"].length; i++) {
      //let initials = element["assignedContact"][i].split(" ");
      //initials = initials[0][0] + initials[1][0];
      initials = generateInitials(element["assignedContact"][i]);
      contactColor = element["contactColor"][i];
      contactList += `<div class="todo-avatar" style="background-color: ${contactColor}; left:${
        i * 30
      }px">${initials}</div>`;
      if (i >= 6) {
        break;
      }
    }
    return contactList;
  } else {
    return `<div class="no-avatar" style="background-color: #FF4646;">No Contacts</div>`;
  }
}

function generateSubtasks(element) {
  if (element["subtasks"].length > 0) {
    let finishedTasks = element["subtasks"].filter((t) => t["status"] == true);

    let progress = (100 / element["subtasks"].length) * finishedTasks.length;
    return `<div class="todo-subtasks">
    <div class="status-bar">
      <div class="status-progress" style="width: ${progress}%"></div>
    </div>
    ${finishedTasks.length}/${element["subtasks"].length} Subtasks</div>`;
  } else {
    return "";
  }
}

function generateEmptyTodo() {
  return `
  <div class='emptyTodo'>
  <p>No Todos</p>
  </div>
    `;
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]["step"] = category;
  updateHTML();
  saveBoard();
}

function highlight(id) {
  document.getElementById(id).classList.add("col-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("col-highlight");
}

async function saveBoard() {
  await setItem("allTasks", JSON.stringify(todos));
}

// make the first character of a string (element) uppercase
function firstCharToUpperCase(element) {
  return element.charAt(0).toUpperCase() + element.slice(1);
}

function searchTasks() {
  let col = [];
  let substring = document.getElementById("board-search").value;

  for (let i = 1; i <= 4; i++) {
    col[i - 1] = todos.filter(
      (t) =>
        t["step"] == "col-0" + i &&
        (t["title"].includes(substring.toLowerCase()) ||
          t["description"].includes(substring.toLowerCase()))
    );
    document.getElementById("col-0" + i).innerHTML = "";
    if (col[i - 1].length == 0) {
      document.getElementById("col-0" + i).innerHTML = generateEmptyTodo();
    }
    col[i - 1].forEach((todo) => {
      const element = todo;
      document.getElementById("col-0" + i).innerHTML += generateTodo(element);
    });
  }
}
