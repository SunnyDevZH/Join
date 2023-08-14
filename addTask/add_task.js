let allTasks = [];
let taskCategories = ['Marketing', 'User Stories', 'Technical Task'];
let isClicked = false;
let colors = [];
let assignedPrio = [];
let assignedCategory;

//* function to get all values from all inputfields and to push it in an JSON, and then in an array
//function addTask() {
    //let title = document.getElementById('title').value;
    //let description = document.getElementById('description').value;}


//* function to check which prio is clicked
function addPrio(clickedTab) {
    let priority;
    let image;
    if (clickedTab === 'urgent') {
        priority = 'URGENT';
        image = '../icons/priority_urgent.svg';
    } else if (clickedTab === 'medium') {
        priority = 'MEDIUM';
        image = '../icons/priority_medium.svg';
    } else if (clickedTab === 'low') {
        priority = 'LOW';
        image = '../icons/priority_low.svg';
    }
    assignedPrio.push(priority, image);
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
}
//**funtion to renderCategories onclick */
function renderCategories() {
    getColors();
    let contentList = document.getElementById('contentCategories');
    if (isClicked == false) {
        contentList.classList.remove('d-none');
        for (i = 0; i < taskCategories.length; i++) {
            let taskCategory = taskCategories[i];
            let color = colors[i];
            contentList.innerHTML += renderCategoryHTML(taskCategory, color, i);
        }
        isClicked = true;
    }
    else {
        contentList.classList.add('d-none');
        contentList.innerHTML = '';
        isClicked = false;
    }
}
//** function to getRandomColor for the Categories */
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


function renderCategoryHTML(taskCategory, color, i) {
    return `<div class="option">
            <div id="category${i}" onclick="chooseCategory(${i})">${taskCategory} 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <circle cx="10" cy="10.5" r="9" fill="${color}" stroke="white" stroke-width="2"></circle>
            </svg>
            </div>
            </div>`;
}
function chooseCategory(i) {
    
    const categoryInput = document.getElementById("categoryInput");
    const selectedCategoryElement = document.getElementById(`category${i}`);

    const selectedCategory = selectedCategoryElement.innerHTML;
    categoryInput.value = selectedCategory;

    assignedCategory = selectedCategory;
}