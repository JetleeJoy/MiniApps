
toDoArray = []
// flag to update the to do item
editKeyPressIndex = null;

// function to load any to do items from session storage on page load itself
window.addEventListener("load", () => {
    if (JSON.parse(sessionStorage.getItem('to-do')) == null) {
        toDoArray = [];
    } else {
        toDoArray = JSON.parse(sessionStorage.getItem('to-do'));
    }
    generateItems();
});

// function to generate all todo items
const generateItems = () => {
    var html = ``;
    var styleString;
    if (toDoArray != null && toDoArray.length != 0) {
        toDoArray.map((item) => {
            if (item.status) {
                styleString = 'line-through';
            } else {
                styleString = 'none';
            }
            html += `
                    <div class="wrapper-to-do">
                        <div class="to-do-item child"
                            id="${toDoArray.indexOf(item)} 
                            onclick="return toggleDO(${toDoArray.indexOf(item)})"
                            style = "text-decoration : ${styleString}"
                            oncontextmenu="return removeToDo(${toDoArray.indexOf(item)})">${item.task}
                        </div>
                        <div class="child">
                            <button class="todo-editBtn" id="to-do-editBtn" onclick="editToDo(${toDoArray.indexOf(item)})"><i class="fa-solid fa-pen-to-square"></i></button>
                        </div>
                    <div>
                  `;
        })
    } else {
        html = `<div class="to-do-item" style="color:yellow;">- No Items To-DO -</div>`;
    }
    console.log(html);
    document.getElementById('to-do-list').innerHTML = html;
}

// function to toggle TODO
const toggleDO = (index) => {
    if (toDoArray[index].status) {
        toDoArray[index].status = false;
        document.getElementById(`${index}`).style.textDecoration = "none";
    } else {
        toDoArray[index].status = true;
        document.getElementById(`${index}`).style.textDecoration = "line-through";
    }
    sessionStorage.setItem('to-do', JSON.stringify(toDoArray));
}

// function to remove a TODO
const removeToDo = (index) => {

    if(editKeyPressIndex != null){
        document.getElementById('to-do-inputfield').value = '';
        editKeyPressIndex = null;
    }

    toDoArray.splice(index, 1);
    sessionStorage.setItem('to-do', JSON.stringify(toDoArray));
    generateItems();
    return false;
}


// function to add a todo item from input
const addToDO = () => {
    const toDoItem = document.getElementById('to-do-inputfield');
    if (toDoItem.value == '') {
        return null;
    } else {
        if(editKeyPressIndex != null){
            toDoArray[editKeyPressIndex].task = toDoItem.value;
            toDoArray[editKeyPressIndex].status = false;
            editKeyPressIndex = null;
        }else{
            toDoArray.unshift(
                {
                    task: toDoItem.value,
                    status: false
                }
            )
        }
        toDoItem.value = '';
        sessionStorage.setItem('to-do', JSON.stringify(toDoArray));
    }
    generateItems();
}

// function to edit a to do item
const editToDo = (index) => {
    const toDoItem = document.getElementById('to-do-inputfield');
    toDoItem.value = toDoArray[index].task;
    // setting up an index flag to notify the add function 
    editKeyPressIndex = index;
}


const addToDoBtn = document.getElementById('addToDO');
addToDoBtn.addEventListener('click', () => {
    addToDO();
});

const toDoField = document.getElementById('to-do-inputfield');
toDoField.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        addToDO();
    }
});