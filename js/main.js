import TodoList from "./TodoList.js";
import TodoListService from "./TodoListService.js";

const todoService = new TodoListService();
/* ---------------------- // 1: adding a new task ---------------------- */
let addTask = () => {
    let text = document.querySelector("#newTask").value;
    let isChecked = false;
    if (text.length <= 0) {
        alert("Input empty!");
        return 0;
    }
    let date = currDate.innerHTML.split(" ")[1];
    let newTask = new TodoList(date, text, isChecked);

    // save task to API
    todoService.addTask(newTask);
    getTask();
    alert("New task!");
    location.reload();
}
document.querySelector("#addItem").onclick = addTask;

// load tasks from API to display to UI
let getTask = () => {
    todoService.getTodoList()
    .then((result) => {
        showTask(result.data);
        showDoneTask(result.data);
    })
    .catch((error) => {
        console.log(error);
    });
}
getTask();

let showTask = (data) => {
    let content = "";
    data.map((task) => {
       let { id, text, isChecked } = task;
       if (isChecked == false) {
            content += `
                <li>
                    <form>
                        <input class="myCheckBox" type="checkbox" name="${id}" onclick="completeTask(${id})">
                        <label for="${id}"> ${text}</label>
                        <i onclick="deleteTask(${id})" class="fa-solid fa-trash"></i>
                    </form>
                </li>
            `;
            document.querySelector("#todo").innerHTML = content;    
        }
    });   
}

/* ------------------ // 2: check when a task is done ------------------ */

let completeTask = (id) => {
    todoService.getTaskDetail(id)
    .then((result) => {
        let { id, date, text, isChecked} = result.data;

        // when a task is done, isChecked turn true
        isChecked = true;
        var updatedTask = new TodoList (date, text, isChecked);

        // update new isChecked value to API
        todoService.updateTaskDetail(id, updatedTask);

        getTask();
        alert("Task done.");
        location.reload();
    })
    .catch((error) => {
        console.log(error);
    });
}
window.completeTask = completeTask;


let showDoneTask = (data) => {
    let content = "";
    data.map((task) => {
       let { id, text, isChecked } = task;
       if (isChecked == true) {
        content += ` 
            <li>
                <form>
                    <input class="myCheckBox" type="checkbox" name="${id}" disabled checked>
                    <label id="checkedText" for="${id}"> ${text}</label>
                    <i onclick="deleteTask(${id})" class="fa-solid fa-trash"></i>
                </form>
            </li>
        `;
       } 
    });
    document.querySelector("#completed").innerHTML = content;
}

/* --------------------------- // 3: delete a task -------------------------- */

let deleteTask = (id) => {
    todoService.getTaskDetail(id)
    .then((result) => {
        let { id } = result.data;
        todoService.deleteTask(id);
        getTask();
        alert("Task deleted!");
        location.reload();
    })
    .catch((error) => {
        console.log(error);
    });
}
window.deleteTask = deleteTask;

/* ------------------------- // 4: Sorting Asc, Des ------------------------- */

let compareStringsMain = () => {
    todoService.getTodoList()
    .then((result) => {
        
        // store API to tasks array
        let tasks = result.data;

        // sorting text field alphabetically
        let sortedArray = tasks.sort((a, b) => {
            return compareStrings(a.text, b.text);
        });

        // add event listener when sort button is clicked
        let sortAZ = document.querySelector("#two");
        sortAZ.addEventListener("click", () => {
            showTask(sortedArray);
        });
        
        let sortZA = document.querySelector("#three");
        sortZA.addEventListener("click", () => {
            showTask(sortedArray.reverse());
        });
    })
    .catch((error) => {
        // fail to load API content
        console.log(error);
    });

    // func to compare string in array
    let compareStrings = (a, b) => {
        // convert all string to lower case
        a = a.toLowerCase();
        b = b.toLowerCase();
      
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
}
compareStringsMain();

// Display current date to UI
let currentDate = () => {
    let date = new Date();
    let current_date = "0"+date.getDate() +"-"+ "0"+(date.getMonth()+1) +"-"+ date.getFullYear();
    document.querySelector("#currDate").innerHTML = "Date: " + current_date;
}
currentDate();