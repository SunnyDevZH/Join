// drag and drop logic

let todos = [
  {
    id: 0,
    title: "Aufgabe 1",
    step: "col-01",
    category: "User Story",
    priority: "low",
  },
  {
    id: 1,
    title: "Aufgabe 2",
    step: "col-01",
    category: "User Story",
    priority: "medium",
  },
  {
    id: 2,
    title: "Aufgabe 3",
    step: "col-01",
    category: "Technical Task",
    priority: "urgent",
  },
];

let currentDraggedElement;

function init() {
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
  let categoryColor = setCategoryColor(element);
  let priorityIcon = setPriorityIcon(element);

  return `
  <div draggable='true' ondragstart='startDragging(${element["id"]})' class='todo'>
    <div class="todo-category" style="background-color:${categoryColor}">${element["category"]}</div>
    <div class="todo-title">${element["title"]}</div>
    <div class="todo-content">Content</div>
    <div class="todo-footer">
      <div class="todo-avatar-container">
        <div class="todo-avatar" style="background-color: #ff7a00;">DS</div>  
        <div class="todo-avatar" style="background-color: #9327FF">DS</div>  
      </div>
      <img src="${priorityIcon}">
    </div>
  </div>
    `;
}

// return the color for the category
function setCategoryColor(element) {
  if (element["category"] == "User Story") {
    return "#0038ff";
  } else if (element["category"] == "Technical Task") {
    return "#1FD7C1";
  } else {
    return "#d6d6d6";
  }
}

// return the icon for the priority
function setPriorityIcon(element) {
  if (element["priority"] == "low") {
    return "../icons/priority_low.svg";
  } else if (element["priority"] == "medium") {
    return "../icons/priority_medium.svg";
  } else if (element["priority"] == "urgent") {
    return "../icons/priority_urgent.svg";
  } else {
    return "../icons/priority_medium.svg";
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
}

function highlight(id) {
  document.getElementById(id).classList.add("col-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("col-highlight");
}

// drag and drop logic END
