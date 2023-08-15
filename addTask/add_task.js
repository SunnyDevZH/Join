let allTasks = [];
let taskCategories = ['Marketing', 'User Stories', 'Technical Task'];
let taskColors = ['#F3C774', '#5E3FD8', '#26AB6A'];
let contacts = ['Hermine Granger', 'Harry Potter', 'Ron Weasley'];
let colors = [];

let isClicked = false;
let isClicked2 = false;

let assignedPrio = [];
let assignedCategory;
let assignedCategoryColor;
let assignedContacts = [];
let assignedSubtasks = [];

function init() {
    getNewDate();
}

//* function to get all values from all inputfields and to push it in an JSON, and then in an array
function addTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('calendar').value;
    let task = {
        'title': title,
        'description': description,
        'assignedContact': assignedContacts,
        'date': date,
        'prio': assignedPrio,
        'category': assignedCategory,
        'categoryColor': assignedCategoryColor,
        'subtasks': assignedSubtasks,
    }
    allTasks.push(task);
    saveTask();

}
//* saves the tasks to the server
async function saveTask() {
    await setItem("allTasks", JSON.stringify(allTasks));
}
//* gets the date of today, so the user cannot chose previous dates
function getNewDate() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('calendar').setAttribute('min', today);
}
//* function to check which prio is clicked
function addPrio(clickedTab) {
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
            contactList.innerHTML += renderContactHTML(contact, i);
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

    const categoryInput = document.getElementById('categoryInput');
    const selectedCategoryElement = document.getElementById(`category${i}`);

    const selectedCategory = selectedCategoryElement.innerText;
    categoryInput.value = selectedCategory;
    const selectedColor = selectedCategoryElement.querySelector("circle").getAttribute("fill");
    categoryInput.style.backgroundColor = selectedColor;

    assignedCategory = selectedCategory;
    assignedCategoryColor = selectedColor;
    hideCategoryList();
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
    if (chosenContact.style.backgroundColor !== 'lightgrey') {
        chosenContact.style.backgroundColor = 'lightgrey';
        let assignedContact = chosenContact.innerText;
        assignedContacts.push(assignedContact);
    } else if (chosenContact.style.backgroundColor === 'lightgrey') {
        chosenContact.style.backgroundColor = 'white';
        let assignedContact = chosenContact.innerText;
        let index = assignedContacts.indexOf(assignedContact);
        if (index > -1) {
            assignedContacts.splice(index, 1);
        }
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
    assignedSubtasks.push(newSubtaskValue)
    subtaskContent.innerHTML += `<div class="option">${newSubtaskValue}</div>`;
    newSubtask.value = '';
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
//** function to get a colorCode */
function getColors() {
    for (i = 0; i < 10; i++) {
        let color = getRandomColor();
        colors.push(color);
    }
}
function renderSVG(taskColor) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <circle cx="10" cy="10.5" r="9" fill="${taskColor}" stroke="white" stroke-width="2"></circle>
    </svg>`
}

function renderCategoryHTML(taskCategory, taskColor, i) {
    return `<div class="option">
            <div id="category${i}" onclick="chooseCategory(${i})">${taskCategory} ${renderSVG(taskColor)}
            </div>
            </div>`;
}
function renderContactHTML(contact, i) {
    return `<div id="contact${i}" class="option" onclick="addContactToTask(${i})"> 
    ${contact}
    </div>`
}
