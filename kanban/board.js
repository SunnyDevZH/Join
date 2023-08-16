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
  console.log(todos);
  updateHTML();
}

function updateHTML() {
  let todo_list = todos.filter((t) => t["step"] == "col-01");
  let progress_list = todos.filter((t) => t["step"] == "col-02");
  let await_list = todos.filter((t) => t["step"] == "col-03");
  let feedback_list = todos.filter((t) => t["step"] == "col-04");

  document.getElementById("col-01").innerHTML = "";
  document.getElementById("col-02").innerHTML = "";
  document.getElementById("col-03").innerHTML = "";
  document.getElementById("col-04").innerHTML = "";

  if (todo_list.length == 0) {
    document.getElementById("col-01").innerHTML = generateEmptyTodo();
  }
  if (progress_list.length == 0) {
    document.getElementById("col-02").innerHTML = generateEmptyTodo();
  }
  if (await_list.length == 0) {
    document.getElementById("col-03").innerHTML = generateEmptyTodo();
  }
  if (feedback_list.length == 0) {
    document.getElementById("col-04").innerHTML = generateEmptyTodo();
  }
  todo_list.forEach((todo) => {
    const element = todo;
    document.getElementById("col-01").innerHTML += generateTodo(element);
  });
  progress_list.forEach((todo) => {
    const element = todo;
    document.getElementById("col-02").innerHTML += generateTodo(element);
  });
  await_list.forEach((todo) => {
    const element = todo;
    document.getElementById("col-03").innerHTML += generateTodo(element);
  });
  feedback_list.forEach((todo) => {
    const element = todo;
    document.getElementById("col-04").innerHTML += generateTodo(element);
  });
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
    element["assignedContact"].forEach((contact) => {
      let initials = contact.split(" ");
      initials = initials[0][0] + initials[1][0];
      let contactColor = "#ff7a00";
      if (element[contactColor] != null) {
        contactColor = element[contactColor];
      }
      contactList += `<div class="todo-avatar" style="background-color: ${contactColor}; ">${initials}</div>`;
    });
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
