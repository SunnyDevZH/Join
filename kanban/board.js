// for testing
let todos = [];

// const icon_prio_low = "./icons/priority_low.svg";
// const icon_prio_med = "./icons/priority_medium.svg";
// const icon_prio_urg = "./icons/priority_urgent.svg";

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
  <div draggable='true' ondragstart='startDragging(${element["id"]
    })' class='todo' onclick="openOverlay(${element['id']})">
    <div class="todo-category" style="background-color:${element["categoryColor"]
    }">${element["category"]}</div>
    <div class="todo-title">${element["title"]}</div>
    <div class="todo-content">${element["description"]}</div>
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
      let initials = element["assignedContact"][i].split(" ");
      initials = initials[0][0] + initials[1][0];
      contactColor = element["contactColor"][i];
      contactList += `<div class="todo-avatar" style="background-color: ${contactColor}; left:${i * 30
        }px">${initials}</div>`;
    }
    return contactList;
  } else {
    return `<div class="no-avatar" style="background-color: #FF4646;">No Contacts</div>`;
  }
}

function generateSubtasks(element) {
  if (element["subtasks"].length > 0) {
    let finishedTasks = 0;
    let progress = (100 / element["subtasks"].length) * finishedTasks;
    return `<div class="todo-subtasks">
    <div class="status-bar">
      <div class="status-progress" style="width: ${progress}"></div>
    </div>
    ${finishedTasks}/${element["subtasks"].length} Subtasks</div>`;
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

// drag and drop logic END

// overlay logic

function openOverlay(i) {
  const task = todos[i];
  document.getElementById("overlay-container").classList.remove("d-none");
  let detail = document.getElementById('showDetailTask');
  detail.innerHTML = '';
  detail.innerHTML += renderDetailTask(task);
}
function generateUpperCaseDetail(task) {
  let description = task['description'];
  return description.charAt(0).toUpperCase() + description.slice(1);
}
function generateUpperCaseTitle(task) {
  let title = task['title'];
  return title.charAt(0).toUpperCase() + title.slice(1);
}
function generateDate(task) {
  let date = task['date'];
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}
function generatePrio(task) {
  let prio = task['prio'][0];
  return prio.charAt(0).toUpperCase() + prio.slice(1).toLowerCase();
}
function generateDetailContacts(task) {
  let detailContactList = '';
  let contacts = task['assignedContact'];
  for (i = 0; i < contacts.length; i++) {
    let initials = task['assignedContact'][i].split(" ");
    initials = initials[0][0] + initials[1][0];
    contactColor = task['contactColor'][i];
    detailContactList += `<div class="detailContact">
        <div class="contact-circle" style="background-color: ${contactColor}">${initials}</div>&nbsp
        <div>${task['assignedContact'][i]}</div></div>`;
  }
  return detailContactList;
}
function generateDetailSubtasks(task) {
  let detailSubtaskList = '';
  let subtasks = task['subtasks'];
  for (i = 0; i < subtasks.length; i++) {
    let subtask = task['subtasks'][i]['value'];
    let subtaskCheckBox = task['subtasks'][i]['imageSrc'];
    detailSubtaskList += `<div class="detailSubtask">
        <img src="${subtaskCheckBox}">&nbsp${subtaskUpperCase(i, task)}
        </div>`;
  }
  return detailSubtaskList;
}
function subtaskUpperCase(i, task) {
  let subtask = task['subtasks'][i]['value'];
  return subtask.charAt(0).toUpperCase() + subtask.slice(1);
}
function renderDetailTask(task) {
  return `
    <div class="todo-category width" style="background-color:${task['categoryColor']}">
    ${task['category']}
    </div>
    <h2>${generateUpperCaseTitle(task)}</h2>
    <span class="margin-top">${generateUpperCaseDetail(task)}</span>
    <div class="detailAlign"><p class="violett">Due Date:</p> &nbsp   ${generateDate(task)}</div>
    <div class="detailAlign"><p class="violett">Priority:</p> &nbsp   ${generatePrio(task)} &nbsp
    <img src="${task['prio'][1]}"></div>
    <div class="margin-top"><p class="violett">Assigned to:</p> ${generateDetailContacts(task)}</div>
    <div class="detailSubtasks"><p class="violett">Subtasks</p> ${generateDetailSubtasks(task)}</div>
    </div>
    <div class="detail-buttons">
    <div id="delete-btn">
    <button onclick="deleteTask(${task['id']})" class="detail-btn"><img src="./icons/icon_bucket.svg">Delete</button>
    </div>
    <div class="line height"></div>
    <div id="edit-btn">
    <button class="detail-btn"><img src="./icons/icon_edit.svg">Edit</button>
    </div>`;
}
async function deleteTask(taskId) {
  const index = todos.findIndex(task => task['id'] === taskId);
  if (index !== -1) {
    todos.splice(index, 1);
  }
  document.getElementById("overlay-container").classList.add("d-none");
  await saveBoard();
  updateHTML();
}
function closeOverlay() {
  document.getElementById("overlay-container").classList.add("d-none");
}

// overlay logic END
