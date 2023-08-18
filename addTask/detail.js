let detailTask = [];
async function loadDetail() {
    await detail();
}
async function detail() {
    detailTask = JSON.parse(await getItem("allTasks"));
    console.log("allTasks", detailTask);
    let detail = document.getElementById('showDetailTask');
    detail.innerHTML = '';
    detail.innerHTML += renderDetailTask();
}
function generateUpperCaseDetail() {
    let description = detailTask[9]['description'];
    return description.charAt(0).toUpperCase() + description.slice(1);
}
function generateUpperCaseTitle() {
    let title = detailTask[9]['title'];
    return title.charAt(0).toUpperCase() + title.slice(1);
}
function generateDate() {
    let date = detailTask[9]['date'];
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}
function generatePrio() {
    let prio = detailTask[9]['prio'][0];
    return prio.charAt(0).toUpperCase() + prio.slice(1).toLowerCase();
}
function generateContacts() {
    let detailContactList = '';
    let contacts = detailTask[9]['assignedContact']; 
    for (i = 0; i < contacts.length; i++) {
        let initials = detailTask[9]['assignedContact'][i].split(" ");
        initials = initials[0][0] + initials[1][0];
        contactColor = detailTask[9]['contactColor'][i];
        detailContactList += `<div class="detailContact">
        <div class="contact-circle" style="background-color: ${contactColor}">${initials}</div>&nbsp
        <div>${detailTask[9]['assignedContact'][i]}</div></div>`;
    }
    return detailContactList;
}
function generateSubtasks() {
    let detailSubtaskList = ''; 
    let subtasks = detailTask[13]['subtasks']; 
    for (i=0; i < subtasks.length; i++) {
        let subtask = detailTask[13]['subtasks'][i]['value'];
        let subtaskCheckBox = detailTask[13]['subtasks'][i]['imageSrc'];
        detailSubtaskList += `<div class="detailSubtask">
        <img src="${subtaskCheckBox}">&nbsp${subtaskUpperCase(i)}
        </div>`; 
    }
return detailSubtaskList; 
}
function subtaskUpperCase(i) {
    let subtask = detailTask[13]['subtasks'][i]['value'];
    return subtask.charAt(0).toUpperCase() + subtask.slice(1);
}
function renderDetailTask() {
    return `
    <div class="todo-category width" style="background-color:${detailTask[9]['categoryColor']}">
    ${detailTask[9]['category']}
    </div>
    <h2>${generateUpperCaseTitle()}</h2>
    <span class="margin-top">${generateUpperCaseDetail()}</span>
    <div class="detailAlign"><p>Due Date:</p> &nbsp   ${generateDate()}</div>
    <div class="detailAlign"><p>Priority:</p> &nbsp   ${generatePrio()} &nbsp
    <img src="${detailTask[9]['prio'][1]}"></div>
    <div class="margin-top"><p>Assigned to:</p> ${generateContacts()}</div>
    <div class="detailSubtasks"><p>Subtasks</p> ${generateSubtasks()}</div>
    </div>
    <div class="detail-buttons">
    <div id="delete-btn">
    <button><img src="./icons/icon_bucket.svg">Delete</button>
    </div>
    <div class="line height"></div>
    <div id="edit-btn">
    <button><img src="./icons/icon_edit.svg">Edit</button>
    </div>`;
}