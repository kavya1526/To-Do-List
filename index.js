

const cards = document.querySelector('.cards');
const newList = document.querySelector('.fa-plus');
const newTask = document.getElementsByClassName('newTask');
// const edit = document.querySelectorAll('.fa-edit');
const trash = document.getElementsByClassName('fa-trash');
const lis = document.getElementsByClassName('lis');
const delList = document.getElementsByClassName('deleteList');
const tasks = document.getElementsByTagName('span');
const cardsR = document.getElementsByClassName('card');


// EVENT LISTENERS
cards.addEventListener('click', doit);
newList.addEventListener('click', addNewList);


// FUNCTIONS
// 1. Populate the DOM using the storage - HARSH (Done)
window.onload = (e) => {

    let data = JSON.parse(localStorage.getItem("storage"));

    let htmlStr = '';

    for (key in data) {

        let str = `<div class="card">
                <div class="cardTitle">
                    <h2>${key}</h2>
                </div>
                <div class="tasks">
                    <ul>`;

        let arr = data[key];
        arr.forEach(item => {
            str += `<li class="lis">
                            <span data-key=${key} class=${item.done && 'done'}>${item.text}
                                <i class="fas fa-edit" data-key=${key}></i>
                                <i class="fas fa-trash" data-key=${key}></i>
                            </span>
                        </li>`
        })

        str += `</ul>
                    <button class="newTask" data-key=${key}>Add Task</button>
                    <button class="deleteList" data-key=${key}>Delete List</button>
                </div>
            </div>`;

        htmlStr += str;
    }

    cards.innerHTML += htmlStr;
};

// 2. Add new list - JINAL
function addNewList() {
    const userTitle = prompt('Enter the title of your new list');

    let HTMLstr = ` <div class="card">
                    <div class="cardTitle">
                        <h2>${userTitle}</h2>
                    </div>
                    <div class="tasks">
                        <ul>
                            
                        </ul>
                        <button class="newTask" data-key=${userTitle}>Add Task</button>
                        <button class="deleteList" data-key=${userTitle}>Delete List</button>
                    </div>`

    cards.innerHTML += HTMLstr;

    let data = JSON.parse(localStorage.getItem("storage")) || {};

    data[userTitle] = [];

    localStorage.setItem("storage", JSON.stringify(data));
}


// 6. Strike through a task(mark as done) - KAVYA
// 7. Update a task - DHAIRYA


// 
function doit(e) {
    // 3. Add new task to a list - KAUSHAL
    if (e.target.className === 'newTask') {

        const usertask = prompt("enter the task");
        const list = e.target.dataset.key;

        // adding the li to the list
        const htmlStr = `<li class="lis">
                            <span data-key=${list}>${usertask}
                                <i class="fas fa-edit"data-key=${list}></i>
                                <i class="fas fa-trash"data-key=${list}></i>
                            </span>
                        </li>`;

        e.target.previousElementSibling.innerHTML += htmlStr;


        // setting the task to localstorage
        var data = JSON.parse(localStorage.getItem('storage'));

        let arr = data[list];

        arr = [...arr, { text: usertask, done: false }];

        data[list] = arr;

        localStorage.setItem('storage', JSON.stringify(data));

    }
    else if (e.target.classList[1] === 'fa-edit') {

        let task = e.target.parentElement;
        let list = e.target.dataset.key;

        let prevTask = e.target.parentElement.innerText.trim();
        let newTask = prompt("enter the task", prevTask);
        task.innerHTML = `${newTask}
                        <i class="fas fa-edit" data-key=${list}></i>
                        <i class="fas fa-trash" data-key=${list}></i>`

        //local

        let data = JSON.parse(localStorage.getItem('storage'));

        let listData = data[list];

        for (let j = 0; j < listData.length; j++) {
            if (listData[j].text == prevTask) {
                listData[j].text = newTask;
                break;
            }
        }

        data[list] = listData;

        localStorage.setItem('storage', JSON.stringify(data));
    }

    // 4. Delete a task from the list - ARPAN
    else if (e.target.classList[1] === 'fa-trash') {
        // changing the DOM - removing the li from the list
        e.target.parentElement.remove();

        // updating the localStorage
        let list = e.target.dataset.key;
        let text = e.target.parentElement.innerText;

        let data = JSON.parse(localStorage.getItem('storage'));

        let arr = data[list];

        newArr = arr.filter(item => item.text != text.trim());

        data[list] = newArr;

        localStorage.setItem('storage', JSON.stringify(data));
    }

    // 5. Delete a list - ISHA
    else if (e.target.classList[0] === 'deleteList') {
        // deleting list from the DOM
        e.target.parentElement.parentElement.remove();

        // updating the localStorage
        let list = e.target.dataset.key;

        let data = JSON.parse(localStorage.getItem("storage"));

        delete data[list];

        localStorage.setItem("storage", JSON.stringify(data));
    }

    else if (e.target.localName === 'span') {
        e.target.classList.toggle('done');
        let text = e.target.innerText.trim();

        // updating local storage
        let list = e.target.dataset.key;
        var data = JSON.parse(localStorage.getItem('storage'));
        let arr = data[list];
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].text === text) {
                arr[j].done = !arr[j].done;
                break;
            }
        }
        localStorage.setItem('storage', JSON.stringify(data));
    }
}