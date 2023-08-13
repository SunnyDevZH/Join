// drag and drop logic

let todos = [
  {
    id: 0,
    title: "Aufgabe 1",
    category: "col-01",
  },
  {
    id: 1,
    title: "Aufgabe 2",
    category: "col-01",
  },
  {
    id: 2,
    title: "Aufgabe 3",
    category: "col-01",
  },
];

let currentDraggedElement;

function init() {
  updateHTML();
}

function updateHTML() {
  let todo_list = todos.filter((t) => t["category"] == "col-01");
  let progress_list = todos.filter((t) => t["category"] == "col-02");
  let await_list = todos.filter((t) => t["category"] == "col-03");
  let feedback_list = todos.filter((t) => t["category"] == "col-04");

  document.getElementById("col-01").innerHTML = "";
  document.getElementById("col-02").innerHTML = "";
  document.getElementById("col-03").innerHTML = "";
  document.getElementById("col-04").innerHTML = "";

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
  <div draggable='true' ondragstart='startDragging(${element["id"]})' class='todo'>
  <h3>${element["title"]}</h3>
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
  todos[currentDraggedElement]["category"] = category;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add("col-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("col-highlight");
}

// drag and drop logic END
