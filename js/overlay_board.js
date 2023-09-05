let columns = [];
let editedContacts = [];
let editedContactColor = [];
let editedPrio = [];
let editedSubtasks = [];
let editedCol;
let editedCategory;
let editedCategoryColor;


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


function openOverlay(index) {
    const task = todos[index];
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    document.getElementById("overlay-container").classList.remove("d-none");
    document.getElementById("showEditTask").classList.add("d-none");
    document.getElementById("showNewTask").classList.add("d-none");
    let detail = document.getElementById("showDetailTask");
    detail.classList.remove("d-none");
    document.body.style.overflow = 'hidden';
    pushSubtasks(index);
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
        detailContactList = ` <p class="violett">Assigned to:</p>`;
        for (i = 0; i < Math.min(contacts.length, 4); i++) {
            let contact = contacts[i];
            contactColor = task["contactColor"][i];
            detailContactList += renderDetailContactList(contact, contactColor);
        }
        if (contacts.length > 4) {
            detailContactList += `And more`;
        }
    }
    return detailContactList;
}


function renderDetailContactList(contact, contactColor) {
    return `<div class="detailContact">
        <div class="contact-circle" style="background-color: ${contactColor}">${generateInitials(contact)}</div>&nbsp
        <div>${contact}</div></div>`;
}


function pushSubtasks(index) {
    for (i = 0; i < todos[index]['subtasks'].length; i++) {
        editedSubtasks.push(todos[index]["subtasks"][i])
    };
}


function generateDetailSubtasks(task) {
    let index = todos.indexOf(task);
    let detailSubtaskList = "";
    if (editedSubtasks.length > 0) {
        detailSubtaskList += "<p class='violett'>Subtasks</p>";

        for (let i = 0; i < editedSubtasks.length; i++) {
            let subtaskCheckBox = editedSubtasks[i]["imageSrc"];
            detailSubtaskList += renderDetailSubtasks(index, i, subtaskCheckBox);
        }
    }
    return detailSubtaskList;
}


function renderDetailSubtasks(index, i, subtaskCheckBox) {
    return `<div class="detailSubtask nospace-between">
    <img id="check${i}" onclick="changeDetailCheckbox(${index}, ${i})" src="${subtaskCheckBox}">&nbsp
    ${firstCharToUpperCase(editedSubtasks[i]["value"])}
    </div>`;
}


async function updateTodosArray(index) {
    todos[index]["subtasks"] = editedSubtasks;
    await saveBoard();
    init();
}

function changeDetailCheckbox(index, i) {
    let checkBox = document.getElementById(`check${i}`);
    if (checkBox.src.includes("checkbutton_default")) {
        checkBox.src = "./icons/checkbutton_checked.svg";
        editedSubtasks[i]["imageSrc"] = "./icons/checkbutton_checked.svg";
        editedSubtasks[i]["status"] = true;
    } else {
        editedSubtasks[i]["imageSrc"] = "./icons/checkbutton_default.svg";
        editedSubtasks[i]["status"] = false;
        checkBox.src = "./icons/checkbutton_default.svg";
    }

    updateTodosArray(index);
}


async function deleteTask(taskId) {
    const index = todos.findIndex((task) => task["id"] === taskId);
    if (index !== -1) {
        todos.splice(index, 1);
    }
    document.getElementById("overlay-container").classList.add("d-none");
    document.body.style.overflow = 'auto';
    await saveBoard();
    init();
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
        contactContent.innerHTML += renderEditedContactHTML(
            contact,
            contactColor,
            i, task,
        );
    } contactContent.innerHTML += addNewContactToTask();
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


function addEditedContactToTask(i) {
    let chosenContact = document.getElementById(`contact${i}`);
    let contact = chosenContact.querySelector('.contact-name').innerText;
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


function renderEditedContactHTML(contact, contactColor, i, task) {
    let backgroundColor = task['assignedContact'].includes(contact)
        ? "#2a3647"
        : "";
    let checkBox = task['assignedContact'].includes(contact)
        ? "./icons/checkbutton_checked_white.svg"
        : "./icons/checkbutton_default.svg";
    let color = task['assignedContact'].includes(contact) ? "white" : "black";

    return `<div id="contact${i}" class="option" onclick="addEditedContactToTask(${i})" style="background-color: ${backgroundColor}; color: ${color};">
    <div class="contact-circle" style="background-color: ${contactColor}">${generateInitials(contact)}</div> <span class="contact-name">${contact}</span>
    <img id="checkbox-contact${i}" src="${checkBox}">
  </div>`;
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


function addEditedPrio(clickedTab) {
    editedPrio = [];
    const priority = clickedTab.toUpperCase();
    const image = `./icons/priority_${priority.toLowerCase()}.svg`;

    checkEditedPrio(clickedTab);
    changeImage(clickedTab);
    document.getElementById(clickedTab).classList.add("white-text");

    editedPrio.push(priority, image);
}


function checkEditedPrio(clickedTab) {
    const tabs = ["urgent", "medium", "low"];
    const colors = ["#FF3D00", "#FFA800", "#7AE229"];

    tabs.forEach((tab, index) => {
        const backgroundColor = clickedTab === tab ? colors[index] : "white";
        document.getElementById(tab).style.backgroundColor = backgroundColor;
        document.getElementById(tab).classList.remove("white-text");
    });
    resetImages();
}


async function loadCategory() {
    try {
        taskCategories = JSON.parse(await getItem("taskCategories"));
        taskColors = JSON.parse(await getItem("taskColors"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}


function showEditedSubtasks() {
    let subtaskElement = document.getElementById("subtaskContent");
    subtaskElement.innerHTML = "";
    for (let i = 0; i < editedSubtasks.length; i++) {
        let subtaskCheckBox = editedSubtasks[i]["imageSrc"];
        subtaskElement.innerHTML += renderShowEditedSubtasks(subtaskCheckBox, i);
    }
}


function renderShowEditedSubtasks(subtaskCheckBox, i) {
    return `<div class="detailSubtask">
    <img id="unchecked${i}" onclick="changeCheckbox(${i})" src="${subtaskCheckBox}">&nbsp
    ${firstCharToUpperCase(editedSubtasks[i]["value"])} 
    <div class="subtasks-icons">
    <img onclick="editChosenSubtask(${i})" src="./icons/icon_edit.svg">
    <img onclick="deleteEditedSubtask(${i})" src="./icons/icon_bucket.svg">
    </div></div>`;
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
        if (!editedSubtasks.includes(subtaskObj)) {
            editedSubtasks.push(subtaskObj);
            subtaskElement.innerHTML += renderEditSubtaskHTML(newSubtask, i)
        };
    }
    document.getElementById("subtask").value = "";
}


function renderEditSubtaskHTML(newSubtask, i) {
    return `<div class="detailSubtask">
    <img id="unchecked${editedSubtasks.length - 1}" 
    onclick="changeCheckbox(${editedSubtasks.length - 1})" 
    src="./icons/checkbutton_default.svg">${firstCharToUpperCase(newSubtask)} 
    <div class="subtasks-icons">
    <img onclick="editChosenSubtask(${i})" src="./icons/icon_edit.svg">
    <img onclick="deleteSubtask(${i})" src="./icons/icon_bucket.svg">
    </div>`;
}


function editChosenSubtask(i) {
    let input = document.getElementById('subtask');
    input.value = editedSubtasks[i]['value'];

    let img = document.getElementById('plus');
    img.src = "./icons/icon_checkmark.svg";
    img.onclick = function () { overwriteSubtask(i) };
}


function overwriteSubtask(i) {
    let input = document.getElementById('subtask');
    let newValue = input.value;
    editedSubtasks[i].value = newValue;
    showEditedSubtasks();
    input.value = '';
    let img = document.getElementById('plus');
    img.src = "./icons/plus.svg";
    img.onclick = function () { editSubtask() };
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


async function getEditedTask(i) {
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
    return editedTask;
}

async function addEditTask(i) {
    let editedTask = await getEditedTask(i);
    todos[i] = editedTask;
    await saveBoard();
    init();
    closeOverlay();
}


function closeOverlay() {
    document.getElementById("overlay-container").classList.add("d-none");
    clearAllEditTask();
    document.body.style.overflow = 'auto';
}


function clearAllEditTask() {
    editedContacts = [];
    editedContactColor = [];
    editedPrio = [];
    editedSubtasks = [];
    editedCol;
    editedCategory;
    editedCategoryColor;
}


function deleteEditedSubtask(index) {
    editedSubtasks.splice(index, 1);
    let subtaskContent = document.getElementById('subtaskContent');
    subtaskContent.innerHTML = '';
    showEditedSubtasks();
}


function newTaskColumn(chosenColumn) {
    clearAll();
    document.getElementById('overlay-container').classList.remove('d-none');
    document.getElementById('showDetailTask').classList.add('d-none');
    document.getElementById('showEditTask').classList.add('d-none');
    document.getElementById('showNewTask').classList.remove('d-none');
    document.body.style.overflow = 'hidden';
    columns.push(chosenColumn);
}
/////////////////////
// overlay logic END
