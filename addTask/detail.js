let detailTask = [];
async function loadDetail(index) {
    await detail(index);
}
async function detail(index) {
    detailTask = JSON.parse(await getItem("allTasks"));
    console.log("allTasks", detailTask);
    let detail = document.getElementById('showDetailTask');
    detail.innerHTML = '';
    detail.innerHTML += renderDetailTask(index);
}
function generateUpperCaseDetail(index) {
    let description = detailTask[index]['description'];
    return description.charAt(0).toUpperCase() + description.slice(1);
}
function generateUpperCaseTitle() {
    let title = detailTask[index]['title'];
    return title.charAt(0).toUpperCase() + title.slice(1);
}
function generateDate() {
    let date = detailTask[index]['date'];
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}
function generatePrio() {
    let prio = detailTask[index]['prio'][0];
    return prio.charAt(0).toUpperCase() + prio.slice(1).toLowerCase();
}
function generateDetailContacts(index) {
    let detailContactList = '';
    let contacts = detailTask[index]['assignedContact']; 
    for (i = 0; i < contacts.length; i++) {
        let initials = detailTask[index]['assignedContact'][i].split(" ");
        initials = initials[0][0] + initials[1][0];
        contactColor = detailTask[index]['contactColor'][i];
        detailContactList += `<div class="detailContact">
        <div class="contact-circle" style="background-color: ${contactColor}">${initials}</div>&nbsp
        <div>${detailTask[index]['assignedContact'][i]}</div></div>`;
    }
    return detailContactList;
}
function generateDetailSubtasks(index) {
    let detailSubtaskList = ''; 
    let subtasks = detailTask[index]['subtasks']; 
    for (i=0; i < subtasks.length; i++) {
        let subtask = detailTask[index]['subtasks'][i]['value'];
        let subtaskCheckBox = detailTask[index]['subtasks'][i]['imageSrc'];
        detailSubtaskList += `<div class="detailSubtask">
        <img src="${subtaskCheckBox}">&nbsp${subtaskUpperCase(i,index)}
        </div>`; 
    }
return detailSubtaskList; 
}
function subtaskUpperCase(i, index) {
    let subtask = detailTask[index]['subtasks'][i]['value'];
    return subtask.charAt(0).toUpperCase() + subtask.slice(1);
}
function renderDetailTask(index) {
    return `
    <div class="todo-category width" style="background-color:${detailTask[index]['categoryColor']}">
    ${detailTask[index]['category']}
    </div>
    <h2>${generateUpperCaseTitle(index)}</h2>
    <span class="margin-top">${generateUpperCaseDetail(index)}</span>
    <div class="detailAlign"><p>Due Date:</p> &nbsp   ${generateDate(index)}</div>
    <div class="detailAlign"><p>Priority:</p> &nbsp   ${generatePrio(index)} &nbsp
    <img src="${detailTask[index]['prio'][1]}"></div>
    <div class="margin-top"><p>Assigned to:</p> ${generateDetailContacts(index)}</div>
    <div class="detailSubtasks"><p>Subtasks</p> ${generateDetailSubtasks(index)}</div>
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