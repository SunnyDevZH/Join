let addContacts = [];
let assignedPrio = [];
let editedContacts = [];
let editedContactColor = [];
let editedPrio = [];
let editedSubtasks = [];
let editedCol;
let editedCategory;
let editedCategoryColor;
let isClicked = false;
// overlay logic
async function pushCategories() {
    taskCategories = [];
    taskColors = [];

    for (i = 0; i < todos.length; i++) {
        if (!taskCategories.includes(todos[i]["category"])) {
            taskCategories.push(todos[i]["category"]);
            taskColors.push(todos[i]["categoryColor"]);
        }
    }
    await saveCategory();
    await loadCategory();
}
async function saveCategory() {
    await setItem('taskCategories', JSON.stringify(taskCategories));
    await setItem('taskColors', JSON.stringify(taskColors));
}
function openOverlay(i) {
    const task = todos[i];
    document.getElementById("overlay-container").classList.remove("d-none");
    document.getElementById("showEditTask").classList.add("d-none");
    let detail = document.getElementById("showDetailTask");
    detail.classList.remove("d-none");
    detail.innerHTML = "";
    detail.innerHTML += renderDetailTask(task);
}
function generateDate(task) {
    let date = task["date"];
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}
function generatePrio(task) {
    let prio = task["prio"][0];
    return prio.charAt(0).toUpperCase() + prio.slice(1).toLowerCase();
}
function generateDetailContacts(task) {
    let detailContactList = "";
    let contacts = task["assignedContact"];
    if (contacts.length > 0) {
        detailContactList = `<p class="violett">Assigned to:</p>`;
        for (i = 0; i < contacts.length; i++) {
            let initials = task["assignedContact"][i].split(" ");
            initials = initials[0][0] + initials[1][0];
            contactColor = task["contactColor"][i];
            detailContactList += `<div class="detailContact">
        <div class="contact-circle" style="background-color: ${contactColor}">${initials}</div>&nbsp
        <div>${task["assignedContact"][i]}</div></div>`;
        }
    }
    return detailContactList;
}
function generateDetailSubtasks(task) {
    let detailSubtaskList = "";
    let subtasks = task["subtasks"];
    if (task["subtasks"].length > 0) {
        detailSubtaskList = `<p class="violett">Subtasks</p>`;

        for (i = 0; i < subtasks.length; i++) {
            let subtaskCheckBox = task["subtasks"][i]["imageSrc"];
            detailSubtaskList += `<div class="detailSubtask">
        <img src="${subtaskCheckBox}">&nbsp${firstCharToUpperCase(
                task["subtasks"][i]["value"]
            )}
        </div>`;
        }
    }
    return detailSubtaskList;
}

function renderDetailTask(task) {
    return `
    <div class="todo-category width" style="background-color:${task["categoryColor"]
        }">
    ${task["category"]}
    </div>
    <h2>${firstCharToUpperCase(task["title"])}</h2>
    <span class="margin-top">${firstCharToUpperCase(task["description"])}</span>
    <div class="detailAlign"><p class="violett">Due Date:</p> &nbsp   ${generateDate(
            task
        )}</div>
    <div class="detailAlign"><p class="violett">Priority:</p> &nbsp   ${generatePrio(
            task
        )} &nbsp
    <img src="${task["prio"][1]}"></div>
    <div class="margin-top"> ${generateDetailContacts(task)}</div>
    <div class="detailSubtasks"> ${generateDetailSubtasks(task)}</div>
    </div>
    <div class="detail-buttons">
    <div id="delete-btn">
    <button class="stroke" type="button" onclick="deleteTask(${task["id"]
        })" class="detail-btn">
    <svg class="stroke" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_75592_9951" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
    <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_75592_9951)">
    <path d="M7.14453 21C6.59453 21 6.1237 20.8042 5.73203 20.4125C5.34036 20.0208 5.14453 19.55 5.14453 19V6C4.8612 6 4.6237 5.90417 4.43203 5.7125C4.24036 5.52083 4.14453 5.28333 4.14453 5C4.14453 4.71667 4.24036 4.47917 4.43203 4.2875C4.6237 4.09583 4.8612 4 5.14453 4H9.14453C9.14453 3.71667 9.24036 3.47917 9.43203 3.2875C9.6237 3.09583 9.8612 3 10.1445 3H14.1445C14.4279 3 14.6654 3.09583 14.857 3.2875C15.0487 3.47917 15.1445 3.71667 15.1445 4H19.1445C19.4279 4 19.6654 4.09583 19.857 4.2875C20.0487 4.47917 20.1445 4.71667 20.1445 5C20.1445 5.28333 20.0487 5.52083 19.857 5.7125C19.6654 5.90417 19.4279 6 19.1445 6V19C19.1445 19.55 18.9487 20.0208 18.557 20.4125C18.1654 20.8042 17.6945 21 17.1445 21H7.14453ZM7.14453 6V19H17.1445V6H7.14453ZM9.14453 16C9.14453 16.2833 9.24036 16.5208 9.43203 16.7125C9.6237 16.9042 9.8612 17 10.1445 17C10.4279 17 10.6654 16.9042 10.857 16.7125C11.0487 16.5208 11.1445 16.2833 11.1445 16V9C11.1445 8.71667 11.0487 8.47917 10.857 8.2875C10.6654 8.09583 10.4279 8 10.1445 8C9.8612 8 9.6237 8.09583 9.43203 8.2875C9.24036 8.47917 9.14453 8.71667 9.14453 9V16ZM13.1445 16C13.1445 16.2833 13.2404 16.5208 13.432 16.7125C13.6237 16.9042 13.8612 17 14.1445 17C14.4279 17 14.6654 16.9042 14.857 16.7125C15.0487 16.5208 15.1445 16.2833 15.1445 16V9C15.1445 8.71667 15.0487 8.47917 14.857 8.2875C14.6654 8.09583 14.4279 8 14.1445 8C13.8612 8 13.6237 8.09583 13.432 8.2875C13.2404 8.47917 13.1445 8.71667 13.1445 9V16Z" fill="#2A3647"/>
    </g>
    </svg>
    Delete</button>
    </div>
    <div class="line height"></div>
    <div id="edit-btn">
    <button class="stroke" type ="button" onclick="editTask(${task["id"]
        })" class="detail-btn">
    <svg class="stroke" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_75592_9969" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
    <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_75592_9969)">
    <path d="M5.14453 19H6.54453L15.1695 10.375L13.7695 8.975L5.14453 17.6V19ZM19.4445 8.925L15.1945 4.725L16.5945 3.325C16.9779 2.94167 17.4487 2.75 18.007 2.75C18.5654 2.75 19.0362 2.94167 19.4195 3.325L20.8195 4.725C21.2029 5.10833 21.4029 5.57083 21.4195 6.1125C21.4362 6.65417 21.2529 7.11667 20.8695 7.5L19.4445 8.925ZM17.9945 10.4L7.39453 21H3.14453V16.75L13.7445 6.15L17.9945 10.4Z" fill="#2A3647"/>
    </g>
    </svg>
    Edit</button>
    </div>`;
}
async function deleteTask(taskId) {
    const index = todos.findIndex((task) => task["id"] === taskId);
    if (index !== -1) {
        todos.splice(index, 1);
    }
    document.getElementById("overlay-container").classList.add("d-none");
    await saveBoard();
    init();
}
function getNewDate() {
    let today = new Date().toISOString().split("T")[0];
    document.getElementById("calendar").setAttribute("min", today);
}
function editTask(i) {
    const task = todos[i];
    document.getElementById("showDetailTask").classList.add("d-none");
    let editTask = document.getElementById("showEditTask");
    editTask.classList.remove("d-none");
    editTask.innerHTML = renderEditTaskHTML(task);
    getNewDate();
    showEditedTask(task);
}
function showEditedTask(task) {
    document.getElementById("title").value = task["title"];
    document.getElementById("description").value = task["description"];
    document.getElementById("calendar").value = task["date"];
    displayContacts(task);
    displayPrio(task);
    showEditedSubtasks(task);
}
function displayContacts(task) {
    pushContacts(task);
    let contactContent = document.getElementById("contactList");
    contactContent.innerHTML = "";
    for (i = 0; i < addContacts.length; i++) {
        let contact = addContacts[i]['name'];
        let contactColor = addContacts[i]['color'];
        contactContent.innerHTML += renderContactHTML(
            contact,
            contactColor,
            i,
            task
        );
    }
}
function showContactList() {
    let contactContent = document.getElementById("contactList");
    if (contactContent.classList.contains("d-none")) {
        contactContent.classList.remove("d-none");
    } else {
        contactContent.classList.add("d-none");
    }
}
function pushContacts(task) {
    for (i = 0; i < task["assignedContact"].length; i++) {
        editedContacts.push(task["assignedContact"][i]);
        editedContactColor.push(task["contactColor"][i]);
    }
}
function addContactToTask(i) {
    let chosenContact = document.getElementById(`contact${i}`);
    let contact = chosenContact.innerText;
    let contactColor = addContacts[i]['color'];
    let checkBox = document.getElementById(`checkbox-contact${i}`);
    if (chosenContact.style.backgroundColor !== "rgb(42, 54, 71)") {
        chosenContact.style.color = "white";
        checkBox.src = "./icons/checkbutton_checked_white.svg";
        chosenContact.style.backgroundColor = "#2a3647";
        if (!editedContacts.includes(contact)) {
            editedContacts.push(contact);
            editedContactColor.push(contactColor);
        }
    } else {
        chosenContact.style.backgroundColor = "white";
        chosenContact.style.color = "black";
        checkBox.src = "./icons/checkbutton_default.svg";
        let index = editedContacts.indexOf(contact);
        let colorIndex = editedContactColor.indexOf(contactColor);
        if (index > -1 || colorIndex > -1) {
            editedContacts.splice(index, 1);
            editedContactColor.splice(colorIndex, 1);
        }
    }
}

function renderContactHTML(contact, contactColor, i, task) {
    let backgroundColor = task["assignedContact"].includes(contact)
        ? "#2a3647"
        : "";
    let checkBox = task["assignedContact"].includes(contact)
        ? "./icons/checkbutton_checked_white.svg"
        : "./icons/checkbutton_default.svg";
    let color = task["assignedContact"].includes(contact) ? "white" : "black";

    return `<div id="contact${i}" class="option" onclick="addContactToTask(${i})" style="background-color: ${backgroundColor}; color: ${color};">
    ${renderSVG(contactColor)} ${contact}
    <img id="checkbox-contact${i}" src="${checkBox}">
  </div>`;
}

function renderSVG(taskColor) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <circle cx="10" cy="10.5" r="9" fill="${taskColor}" stroke="white" stroke-width="2"></circle>
  </svg>`;
}
function displayPrio(task) {
    const prio = task.prio[0];
    const button = document.getElementById(prio.toLowerCase());
    const colors = {
        URGENT: "#FF3D00",
        MEDIUM: "#FFA800",
        LOW: "#7AE229",
    };
    const image = `./icons/priority_${prio.toLowerCase()}.svg`;
    changeImage(prio.toLowerCase());
    document.getElementById(prio.toLowerCase()).classList.add("white-text");
    button.style.backgroundColor = colors[prio];
    editedPrio.push(prio, image);
}

function addPrio(clickedTab) {
    editedPrio = [];
    const priority = clickedTab.toUpperCase();
    const image = `./icons/priority_${priority.toLowerCase()}.svg`;

    checkPrio(clickedTab);
    changeImage(clickedTab);
    document.getElementById(clickedTab).classList.add("white-text");

    editedPrio.push(priority, image);
}

function checkPrio(clickedTab) {
    const tabs = ["urgent", "medium", "low"];
    const colors = ["#FF3D00", "#FFA800", "#7AE229"];

    tabs.forEach((tab, index) => {
        const backgroundColor = clickedTab === tab ? colors[index] : "white";
        document.getElementById(tab).style.backgroundColor = backgroundColor;
        document.getElementById(tab).classList.remove("white-text");
    });
    resetImages();
}
function changeImage(clickedTab) {
    const imgPath = "./icons/priority_" + clickedTab + "_default.svg";
    document.getElementById(clickedTab + "-img").src = imgPath;
}
function resetImages() {
    document.getElementById("urgent-img").src = "./icons/priority_urgent.svg";
    document.getElementById("medium-img").src = "./icons/priority_medium.svg";
    document.getElementById("low-img").src = "./icons/priority_low.svg";
}

async function loadCategory() {
    try {
        taskCategories = JSON.parse(await getItem("taskCategories"));
        taskColors = JSON.parse(await getItem("taskColors"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}
async function loadContacts() {
    addContacts = JSON.parse(await getItem("addContacts"));
}
function showEditedSubtasks(task) {
    let subtaskElement = document.getElementById("subtaskContent");
    let subtasks = task["subtasks"];
    subtaskElement.innerHTML = "";
    for (i = 0; i < subtasks.length; i++) {
        let subtask = task["subtasks"][i]["value"];
        let subtaskCheckBox = task["subtasks"][i]["imageSrc"];
        let status = task["subtasks"][i]["status"];
        let subtaskObj = {
            value: subtask,
            imageSrc: subtaskCheckBox,
            status: status,
        };
        editedSubtasks.push(subtaskObj);

        subtaskElement.innerHTML += `<div class="detailSubtask">
        <img id="unchecked${i}" onclick="changeCheckbox(${i})" src="${subtaskCheckBox}">${subtask}
        </div>`;
    }
}
function editSubtask() {
    let subtaskElement = document.getElementById("subtaskContent");
    let newSubtask = document.getElementById("subtask").value;
    let addButton = document.getElementById("addSubtaskButton");
    if (newSubtask.length < 3) {
        addButton.disabled;
    } else if (newSubtask.length >= 3) {
        addButton.enabled;
        let subtaskObj = {
            value: newSubtask,
            imageSrc: "./icons/checkbutton_default.svg",
            status: false,
        };
        editedSubtasks.push(subtaskObj);
        subtaskElement.innerHTML += `<div class="detailSubtask">
    <img id="unchecked${editedSubtasks.length - 1}" 
    onclick="changeCheckbox(${editedSubtasks.length - 1})" 
    src="./icons/checkbutton_default.svg">${newSubtask}
    </div>`;
    }
    document.getElementById("subtask").value = "";
}
function changeCheckbox(i) {
    let checkBox = document.getElementById(`unchecked${i}`);
    if (checkBox.src.includes("checkbutton_default")) {
        editedSubtasks[i].imageSrc = "./icons/checkbutton_checked.svg";
        editedSubtasks[i].status = true;
        checkBox.src = "./icons/checkbutton_checked.svg";
    } else {
        editedSubtasks[i].imageSrc = "./icons/checkbutton_default.svg";
        editedSubtasks[i].status = false;
        checkBox.src = "./icons/checkbutton_default.svg";
    }
}

async function addEditTask(i) {
    let task = todos[i];
    let editedTitle = document.getElementById("title").value;
    let editedDescription = document.getElementById("description").value;
    let editedDate = document.getElementById("calendar").value;
    let editedTask = {
        step: task["step"],
        title: editedTitle,
        description: editedDescription,
        assignedContact: editedContacts,
        contactColor: editedContactColor,
        date: editedDate,
        prio: editedPrio,
        category: task["category"],
        categoryColor: task["categoryColor"],
        subtasks: editedSubtasks,
    };
    todos[i] = editedTask;
    await saveBoard();
    init();
    closeOverlay();
}
function closeOverlay() {
    document.getElementById("overlay-container").classList.add("d-none");
    clearAll();
}
function clearAll() {
    editedContacts = [];
    editedContactColor = [];
    editedPrio = [];
    editedSubtasks = [];
    editedCol;
    editedCategory;
    editedCategoryColor;
}
function renderEditTaskHTML(task) {
    return `
  <form onsubmit="addEditTask(${task["id"]});return false">
            <div class="input-column">
              <div class="left-column">
                <div class="input-form margin">
                  <span>Title</span>
                  <input id="title" required placeholder="Enter a Title" />
                </div>
                <div class="input-form margin">
                  <span>Description</span>
                  <textarea id="description" required placeholder="Enter a Description"></textarea>
                </div>
                <div class="input-form margin">
                  <span>Assigned to</span>
                  <div class="input-with-button">
                    <input disabled placeholder="Select Contacts to Assign" />
                    <button id="contactListButton" type="button" onclick="showContactList()">
                      <img src="./icons/dropdown.svg" />
                    </button>
                  </div>
                  <div class="list d-none" id="contactList"></div>
                </div>
              </div>
              <div class="line"></div>
              <div class="right-column">
                <div class="input-form margin">
                  <span>Due date</span>
                  <input type="date" id="calendar" required placeholder="dd/mm/yyyy" />
                </div>
                <div class="input-form margin">
                  <span>Prio</span>
                  <div class="prio-buttons">
                    <button class="prio" type="button" id="urgent" onclick="addPrio('urgent')">
                      URGENT <img id="urgent-img" src="./icons/priority_urgent.svg" />
                    </button>
                    <button class="prio" type="button" id="medium" onclick="addPrio('medium')">
                      MEDIUM <img id="medium-img" src="./icons/priority_medium.svg" />
                    </button>
                    <button class="prio" type="button" id="low" onclick="addPrio('low')">
                      LOW <img id="low-img" src="./icons/priority_low.svg" />
                    </button>
                  </div>
                  <div id="priorityAlert"></div>
                </div>
                <div class="input-form">
                  <span>Subtasks</span>
                  <div class="input-with-button">
                    <input id="subtask" minlength="3" placeholder="Add new subtask" />
                    <button id="addSubtaskButton" type="button" onclick="editSubtask()">
                      <img src="./icons/plus.svg" />
                    </button>
                  </div>
                  <div id="subtaskContent"></div>
                </div>
              </div>
            </div>
            <div class="ok-button">
              <button type="submit">
                OK<img src="./icons/correct_white.svg" />
              </button>
            </div>
          </form>`;
}
function newTaskColumn(chosenColumn) {
    window.location.href = `add_Task.html?chosenColumn=${chosenColumn}`;
}
/////////////////////
// overlay logic END