let allTasks = [];
let taskCategories = ['Marketing', 'User Stories', 'Technical Task'];
let taskColors = ['#F3C774', '#5E3FD8', '#26AB6A'];
let contacts = ['Hermine Granger', 'Harry Potter', 'Ron Weasley'];
let contactColors = ['#17D264', '#3043F0', '#496F70'];

let isClicked = false;
let isClicked2 = false;

let assignedPrio = [];
let assignedCategory;
let assignedCategoryColor;
let assignedContacts = [];
let assignedContactColor = [];
let assignedSubtasks = [];


async function init() {
    getNewDate();
    await load();
}

//* function to get all values from all inputfields and to push it in an JSON, and then in an array
async function addTask() {

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('calendar').value;
    if (!requirePrio()) {
        return; // Stops the function when the prio was not chosen
    }
    if (!requireCategory()) {
        return;
    }
    let task = {
        'step': 'col-01',
        'title': title,
        'description': description,
        'assignedContact': assignedContacts,
        'contactColor': assignedContactColor,
        'date': date,
        'prio': assignedPrio,
        'category': assignedCategory,
        'categoryColor': assignedCategoryColor,
        'subtasks': assignedSubtasks,
    }
    allTasks.push(task);
    await saveTask();
    clearAll();
    window.location.href = "../board.html";

}
//* checks if the Prio was chosen, if not there is an alert. 
function requirePrio() {

    let alertArea = document.getElementById('priorityAlert');
    alertArea.classList.add('d-none');

    if (assignedPrio.length === 0) {
        alertArea.textContent = 'Please choose a Priority.';
        alertArea.classList.remove('d-none');
        return false;
    }
    return true;
}
//* checks if the Category was chosen, if not there is an alert
function requireCategory() {
    let alertArea = document.getElementById('categoryAlert');
    alertArea.classList.add('d-none');

    if (!assignedCategory) {
        alertArea.textContent = 'Please choose a Category.';
        alertArea.classList.remove('d-none');
        return false;
    }
    return true;
}
//* saves the tasks to the server
async function saveTask() {
    await setItem("allTasks", JSON.stringify(allTasks));
}
async function saveCategory() {
    await setItem('taskCategories', JSON.stringify(taskCategories));
    await setItem('taskColors', JSON.stringify(taskColors));
}
async function load() {
    try {
        taskCategories = JSON.parse(await getItem("taskCategories"));
        taskColors = JSON.parse(await getItem("taskColors"));
        allTasks = JSON.parse(await getItem("allTasks"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}
//* gets the date of today, so the user cannot chose previous dates
function getNewDate() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('calendar').setAttribute('min', today);
}
//* function to check which prio is clicked
function addPrio(clickedTab) {
    let alertArea = document.getElementById('priorityAlert');
    alertArea.classList.add('d-none');
    let priority;
    let image;
    if (clickedTab === 'urgent') {
        checkPrio(clickedTab);
        priority = 'URGENT';
        image = '../icons/priority_urgent.svg';
    } else if (clickedTab === 'medium') {
        checkPrio(clickedTab);
        priority = 'MEDIUM';
        image = '../icons/priority_medium.svg';
    } else if (clickedTab === 'low') {
        checkPrio(clickedTab);
        priority = 'LOW';
        image = '../icons/priority_low.svg';
    }
    assignedPrio.push(priority, image);
}
//* changes the color of the Prio tab and sets back the other prioButtons
function checkPrio(clickedTab) {
    assignedPrio = [];
    const tabs = ['urgent', 'medium', 'low'];
    const colors = ['#f55d42', '#f5da42', 'green'];

    tabs.forEach((tab, index) => {
        const backgroundColor = clickedTab === tab ? colors[index] : 'white';
        document.getElementById(tab).style.backgroundColor = backgroundColor;
    });
}
//* clears the PrioButtons and the Array
function resetPrio() {
    assignedPrio = [];
    const tabs = ['urgent', 'medium', 'low'];
    const defaultColors = ['white', 'white', 'white'];

    tabs.forEach((tab, index) => {
        document.getElementById(tab).style.backgroundColor = defaultColors[index];
    });
}
//* function to clear all inputfields 
function clearAll() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const date = document.getElementById('calendar');
    const subtask = document.getElementById('subtask');
    title.value = '';
    description.value = '';
    date.value = '';
    subtask.value = '';
    resetPrio();
    resetCategory();
    resetContact();
    resetSubtasks();
}
//**funtion to renderCategories onclick */
function renderCategories() {
    let contentList = document.getElementById('contentCategories');
    if (isClicked == false) {
        contentList.classList.remove('d-none');
        contentList.innerHTML += renderNewCategoryHTML();
        for (i = 0; i < taskCategories.length; i++) {
            let taskCategory = taskCategories[i];
            let taskColor = taskColors[i];
            contentList.innerHTML += renderCategoryHTML(taskCategory, taskColor, i);
        }
        isClicked = true;
    }
    else {
        hideCategoryList();
        contentList.innerHTML = '';
        isClicked = false;
    }
}
function addNewCategory() {
    let input = document.getElementById('categoryInput');
    let addButton = document.getElementById('addCategoryButton');
    addButton.classList.add('d-none');
    let addNewButton = document.getElementById('addNewCategoryButton');
    addNewButton.classList.remove('d-none');
    input.disabled = false;
    resetCategory();
    input.placeholder = 'Add New Category';
    input.style.color = 'black';
    hideCategoryList();
}
function pushNewCategory() {
    let input = document.getElementById('categoryInput');
    let newInput = input.value;
    newInput = newInput.charAt(0).toUpperCase() + newInput.slice(1);
    let newColor = getRandomColor();
    if (newInput.length >= 3 && !taskCategories.includes(newInput)) {
        taskCategories.push(newInput);
        taskColors.push(newColor);
        resetCategoryInput();
        saveCategory();
    }
    else {
        resetCategoryInput();
        let alert = document.getElementById('categoryAlert');
        alert.innerHTML = 'Please add new Category';
    }

}
function resetCategoryInput() {
    let input = document.getElementById('categoryInput');
    document.getElementById('addCategoryButton').classList.remove('d-none');
    document.getElementById('addNewCategoryButton').classList.add('d-none');
    input.value = '';
    input.disabled = true;
    input.placeholder = 'Select Task Category';
}
//* hides the categoryList if a category is chosen
function hideCategoryList() {
    let contentList = document.getElementById('contentCategories');
    contentList.classList.add('d-none');
}
//*renders the contactList from the Array
function renderContactList() {
    let contactList = document.getElementById('contactList');
    if (isClicked2 == false) {
        contactList.classList.remove('d-none');
        for (i = 0; i < contacts.length; i++) {
            let contact = contacts[i];
            let contactColor = contactColors[i];
            contactList.innerHTML += renderContactHTML(contact, contactColor, i);
        }
        isClicked2 = true;
    }
    else {
        contactList.classList.add('d-none');
        contactList.innerHTML = '';
        isClicked2 = false;
    }
}
//* choses the category and shows only this category in the Inputfield
function chooseCategory(i) {
    let alertArea = document.getElementById('categoryAlert');
    alertArea.classList.add('d-none');

    const selectedCategoryElement = document.getElementById(`category${i}`);
    const selectedCategory = selectedCategoryElement.innerText;
    const selectedColor = selectedCategoryElement.querySelector("circle").getAttribute("fill");

    categoryInput.value = assignedCategory = selectedCategory;
    categoryInput.style.backgroundColor = assignedCategoryColor = selectedColor;
    categoryInput.style.color = 'white';
    categoryInput.style.fontWeight = 'bold';
    hideCategoryList();
    document.getElementById('categoryAlert').classList.add('d-none');
}
//* resets chosen category
function resetCategory() {
    assignedCategory = '';
    assignedCategoryColor = '';
    const categoryInput = document.getElementById('categoryInput');
    const defaultCategory = "";
    const defaultColor = "";

    categoryInput.value = defaultCategory;
    categoryInput.style.backgroundColor = defaultColor;
    assignedCategory = defaultCategory;
    assignedCategoryColor = defaultColor;
    hideCategoryList();
}
//adds the chosen contacts to the task and sets a highlight to the background
function addContactToTask(i) {
    let chosenContact = document.getElementById(`contact${i}`);
    let contact = chosenContact.innerText;
    if (chosenContact.style.backgroundColor !== 'lightgrey') {
        chosenContact.style.backgroundColor = 'lightgrey';

        let contactColor = contactColors[i];
        if (!assignedContacts.includes(contact)) {
            assignedContacts.push(contact)
            assignedContactColor.push(contactColor);
        }
    }
    else {
        chosenContact.style.backgroundColor = 'white';
        let index = assignedContacts.indexOf(contact);
        if (index > -1) { assignedContacts.splice(index, 1); }
    }
}
//* resets the Contacts
function resetContact() {
    renderContactList();
    let contactList = document.getElementById('contactList');
    contactList.classList.add('d-none');
    assignedContacts = [];
    let contacts = document.querySelectorAll('[id^="contact"]');
    contacts.forEach(contact => {
        contact.style.backgroundColor = 'white';
    });
}
//* this function adds subtasks to the mainTask and pushes it in the array
function addSubtask() {
    let subtaskContent = document.getElementById('subtaskContent');
    let newSubtask = document.getElementById('subtask');
    let newSubtaskValue = newSubtask.value;
    let addButton = document.getElementById('addSubtaskButton');

    if (newSubtaskValue.length < 3) {
        addButton.disabled;
    }
    else if (newSubtaskValue.length >= 3) {
        addButton.enabled;
        let subtaskObj = {
            value: newSubtaskValue,
            imageSrc: '../icons/checkbutton_default.svg',
            status: false
        };
        assignedSubtasks.push(subtaskObj);
        subtaskContent.innerHTML += renderSubtaskHTML(subtaskObj, assignedSubtasks.length - 1);
    }

    newSubtask.value = '';
}
function checkSubtask(i) {
    let checkbox = document.getElementById(`subtaskImage${i}`);
    if (checkbox.src.includes('checkbutton_checked')) {
        checkbox.src = '../icons/checkbutton_default.svg';
        assignedSubtasks[i].imageSrc = '../icons/checkbutton_default.svg';
        assignedSubtasks[i].status = false;
    } else {
        checkbox.src = '../icons/checkbutton_checked.svg';
        assignedSubtasks[i].imageSrc = '../icons/checkbutton_checked.svg';
        assignedSubtasks[i].status = true;
    }
}

//* resets ALL Subtasks
function resetSubtasks() {
    let subtaskContent = document.getElementById('subtaskContent');
    subtaskContent.innerHTML = '';
    assignedSubtasks = [];
}
//** function to getRandomColor for the new Categories */
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function renderSVG(taskColor) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <circle cx="10" cy="10.5" r="9" fill="${taskColor}" stroke="white" stroke-width="2"></circle>
    </svg>`
}
function renderNewCategoryHTML() {
    return `<div class="option" id="newCategory" onclick="addNewCategory()">Add New Category</div>`;
}
function renderCategoryHTML(taskCategory, taskColor, i) {
    return `<div class="option">
            <div id="category${i}" onclick="chooseCategory(${i})">${taskCategory} ${renderSVG(taskColor)}
            </div>
            </div>`;
}
function renderContactHTML(contact, contactColor, i) {
    return `<div id="contact${i}" class="option" onclick="addContactToTask(${i})"> 
    ${contact}  ${renderSVG(contactColor)}
    </div>`
}
function renderSubtaskHTML(subtaskObj, i) {
    return `<div class="option">${subtaskObj.value} 
    <img id="subtaskImage${i}" onclick="checkSubtask(${i})" src="${subtaskObj.imageSrc}">
    </div>`;
}