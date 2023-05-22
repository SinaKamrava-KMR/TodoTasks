import { HttpClient } from "./HttpClient.js";
import { Todo } from "./Todo.js";


const tasksWraper = document.getElementById('tasks');
const doingWraper = document.getElementById('doing');
const doneWraper = document.getElementById('done');
const taskTitle = document.getElementById('taskTitle');
const taskDate = document.getElementById('taskDate');
const submit = document.getElementById('submit');
const taskDescription = document.getElementById('descriptionTask');


const todos = [];


const httpClient = new HttpClient(
  "https://6464fb5e9c09d77a62e01d7a.mockapi.io/todo/"
);

getTodos();

submit.addEventListener("click", () => {
  const title = taskTitle.value;
  const date = taskDate.value;
  const desc = taskDescription.value;
  const newTask = new Todo({
    title: title,
    createdAt: date,
    description: desc,
  });

  httpClient.inserData(newTask).then(res => {
    taskTitle.value = '';
    taskDate.value = '';
    taskDescription.value = '';
    console.log(res);
    todos = [];
    getTodos();
  }).catch(error => {
    console.log(error);
  });


});

function getTodos() {
 
  httpClient
  .getAllDate()
  .then((response) => {
    generateTodo(response)
    insertDataToCurrentWrapper(todos);
  })
  .catch((error) => {
    console.log(error);
  });
}

function generateTodo(list) {
    
    list.forEach(obj => {
      todos.push(new Todo(obj))
    });
  
  console.log(todos);
}

function generateCard(todo) {
  return `<div class="card" data-id=${todo.id}>
      <span onclick="deleteTask(this)"  class="text-lg cursor-pointer text-red-600 absolute right-1 top-1"><i class="bi bi-x"></i></span>
      <p id="card__title" class="font-bold text-slate-700">${todo.title}</p>
      <p id="card__description" class="text-xs line-clamp-2 my-1 text-slate-600 text-ellipsis	">${todo.description}</p>
      <p class="text-slate-500 my-2 text-sm">start : <span id="card__date-start">${todo.createdAt}</span></p>
      <p class="text-slate-500 mb-2 text-sm">end : <span id="card__date-end">${todo.endAt}</span></p>

      <div class="flex  justify-between">
          <span id="card__state-prev" onclick="movePrevState(this)"   class="cursor-pointer px-2 py-1 text-slate-900 bg-sky-200 rounded-md">
            <i class="bi bi-dash"></i>
          </span>
          <span  class="cursor-pointer px-2 py-1 text-slate-900 bg-sky-200 rounded-md">
            <i class="bi bi-info-circle"></i>
          </span>
          <span id="card__state-next" onclick="moveNextState(this)"  class="cursor-pointer px-2 py-1 text-slate-900 bg-sky-200 rounded-md">
            <i class="bi bi-check2"></i>
          </span>
      </div>
    </div>`
  
}

window.deleteTask=(e)=> {
  let id = getCardId(e);
  let task = getTaskById(id);

  httpClient.deleteTask(task).then(res => {

    if (!removeTaskFromTodoList(task.id)) return;

    insertDataToCurrentWrapper(todos);

  }).catch(error => {
    console.log(error);
  })
}

window.movePrevState=(e)=> {
  let id = getCardId(e);
  let task = getTaskById(id);
  task.prevState();
  httpClient.updateTask(task).then(res => {
    insertDataToCurrentWrapper(todos);
  }).catch(error => {
    console.log(error);
  })
  

}

window.moveNextState=(e)=> {
  let id = getCardId(e);
  let task = getTaskById(id);
  task.nextState();
  httpClient.updateTask(task).then(res => {
    insertDataToCurrentWrapper(todos);
  }).catch(error => {
    console.log(error);
  })
 

}

function getCardId(card) {
  let todoId = card.closest('.card').dataset?.id;
  return todoId;
}

function insertDataToCurrentWrapper(todoList) {
  tasksWraper.innerHTML = '';
  doingWraper.innerHTML = '';
  doneWraper.innerHTML = '';

  todoList.forEach(todo => {
    switch (todo.status) {
      case 0:
        tasksWraper.innerHTML += generateCard(todo);
        break;
      case 1:
        doingWraper.innerHTML += generateCard(todo);
        break;
      case 2:
        doneWraper.innerHTML += generateCard(todo);
        break;
    }
  })
}

function getTaskById(id) {
  let task;
  todos.forEach(todo => {
    if (todo.id == id) {
      task = todo;
      return;
    }
  });

  return task;
}

function removeTaskFromTodoList(id) {
  if (!getTaskById(id)) return false;

  todos.forEach(todo => {
    if (todo.id == id) {
      let index = todos.indexOf(todo);
      todos.splice(index, 1);
      return;
    }
  });

  return true;
}




