// for testing
let todos = [];

const icon_prio_low = "./icons/priority_low.svg";
const icon_prio_med = "./icons/priority_medium.svg";
const icon_prio_urg = "./icons/priority_urgent.svg";

let currentDraggedElement;

function init() {
  loadTodos();
  updateHTML();
}

async function loadTodos() {
  let newTodos = await getItem("allTasks");
  todos = JSON.parse(newTodos);
  for (let i = 0; i < todos.length; i++) {
    todos[i].id = i;
  }
  console.log(todos);
  updateHTML();
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
  })' class='todo'>
    <div class="todo-category" style="background-color:${
      element["categoryColor"]
    }">${element["category"]}</div>
    <div class="todo-title">${element["title"]}</div>
    <div class="todo-content">${element["description"]}</div>
    ${generateSubtasks()}
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
      let initials = element["assignedContact"][i].split(" ");
      initials = initials[0][0] + initials[1][0];
      contactColor = element["contactColor"][i];
      contactList += `<div class="todo-avatar" style="background-color: ${contactColor}; left:${
        i * 30
      }px">${initials}</div>`;
    }
    return contactList;
  } else {
    return `<div class="no-avatar" style="background-color: #FF4646;">No Contacts</div>`;
  }
}

function generateSubtasks() {
  return `<div class="todo-subtasks">
  <div class="status-bar">
    <div class="status-progress"></div>
  </div>
  1/2 Subtasks</div>`;
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
}

function highlight(id) {
  document.getElementById(id).classList.add("col-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("col-highlight");
}

// drag and drop logic END
