const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListener();

function loadEventListener() {
    //DOM event listener
    document.addEventListener('DOMContentLoaded', getTasks)
    //Event for adding tasks
    form.addEventListener('submit', addTask);
    //Event to remove tasks
    taskList.addEventListener('click', removeTask);
    //Clear all tasks
    clearBtn.addEventListener('click', clearAll);
    //Filter tasks
    filter.addEventListener('keyup', filterTask);
}

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
    
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
    
        li.appendChild(link);
        taskList.appendChild(li);
    })

}

//Call-back to loadEventListener
function addTask(e) {

    if (taskInput.value === '') {
        alert('Add a task');
    }

    //Creation of a LI that is appended to the task list
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    //console.log(li);

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        //Remove from LS
        removeFromLocalStorage(e.target.parentElement.parentElement.textContent);
        //console.log(e.target.parentElement.parentElement.textContent);
    }
    //console.log(e.target.parentElement);
}

function removeFromLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(current, index) {
        if(current === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAll() {
    //slower
    //taskList.innerHTML = '';

    //faster
    while(taskList.firstChild) {
        taskList.firstChild.remove();
        removeAllFromLs();
    }
}

function removeAllFromLs() {
    localStorage.clear();
}

function filterTask(e) {

    const text = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('.collection-item');

    listItems.forEach(function(task) {
        item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}