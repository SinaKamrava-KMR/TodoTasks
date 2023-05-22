
import { Database } from "./Database.js";
import { Todo } from "./Todo.js";

const tasksWraper = document.getElementById("tasks");
const doingWraper = document.getElementById("doing");
const doneWraper = document.getElementById("done");
const taskTitle = document.getElementById("taskTitle");
const taskDate = document.getElementById("taskDate");
const submit = document.getElementById("submit");
const taskDescription = document.getElementById("descriptionTask");
const loadingElm = document.getElementById("animation-container");

const todos = [];
const database = new Database(
  "https://6464fb5e9c09d77a62e01d7a.mockapi.io/todo/"
);
initAnimation();

start();


submit.addEventListener("click", () => {
  const title = taskTitle.value;
  const date = taskDate.value;
  const desc = taskDescription.value;
  const newTask = new Todo({
    title: title,
    createdAt: date,
    description: desc,
  });

  database
    .add(newTask)
    .then((res) => {
      taskTitle.value = "";
      taskDate.value = "";
      taskDescription.value = "";
      start();
    })
    .catch((error) => {
      console.log(error);
    });
});

function start() {
  loadingAnimation(true);
  database
  .getTasks()
  .then((response) => {
    handelData(response);
    loadingAnimation(false);
  })
  .catch((error) => {
    console.log(error);
  });

}

async function handelData(response) {

  generateTodo(response.catch);
  insertDataToCurrentWrapper(todos);
  console.log(`localStorage :`);
  console.log(response.catch);

  const serverData = await response.server;

  generateTodo(serverData);
  insertDataToCurrentWrapper(todos);
  database.addTasks(todos);

  console.log(`Server :`);
  console.log(serverData);
}

function generateTodo(list) {
  todos.splice(0, todos.length);
  list.forEach((obj) => {
    todos.push(new Todo(obj));
  });

  // console.log(todos);
}

function generateCard(todo) {
  return `<div class="card" data-id=${todo.id}>
      <span onclick="deleteTask(this)"  class="text-lg cursor-pointer text-red-600 absolute right-1 top-1"><i class="bi bi-x"></i></span>
      <p id="card__title" class="line-clamp-1 text-ellipsis font-bold text-slate-700">${todo.title}</p>
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
    </div>`;
}

window.deleteTask = (e) => {
  let id = getCardId(e);
  let task = getTaskById(id);
  loadingAnimation(true);
  database
    .remove(task)
    .then((res) => {
      if (!removeTaskFromTodoList(task.id)) return;
      insertDataToCurrentWrapper(todos);
      console.log(res);
      loadingAnimation(false);
    })
    .catch((error) => {
      console.log(error);
    });
};

window.movePrevState = (e) => {
  let id = getCardId(e);
  let task = getTaskById(id);
  task.prevState();
  loadingAnimation(true);
  database
    .update(task)
    .then(() => {
      insertDataToCurrentWrapper(todos);
      loadingAnimation(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.moveNextState = (e) => {
  let id = getCardId(e);
  let task = getTaskById(id);
  task.nextState();
  loadingAnimation(true);
  database
  .update(task)
    .then(() => {
      loadingAnimation(false);
    insertDataToCurrentWrapper(todos);
  })
  .catch((err) => {
    console.log(err);
  });
 
};

function getCardId(card) {
  let todoId = card.closest(".card").dataset?.id;
  return todoId;
}

function insertDataToCurrentWrapper(todoList) {
  tasksWraper.innerHTML = "";
  doingWraper.innerHTML = "";
  doneWraper.innerHTML = "";

  todoList.forEach((todo) => {
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
  });
}

function getTaskById(id) {
  let task;
  todos.forEach((todo) => {
    if (todo.id == id) {
      task = todo;
      return;
    }
  });

  return task;
}

function removeTaskFromTodoList(id) {
  if (!getTaskById(id)) return false;

  todos.forEach((todo, index) => {
    if (todo.id == id) {
      todos.splice(index, 1);
      return;
    }
  });

  return true;
}



function loadingAnimation(isProgressing) {
  if (!isProgressing) {
   
   loadingElm.classList.add("invisible")
  } else {
   loadingElm.classList.remove("invisible")
  }
}

function initAnimation() {
  let animation = bodymovin.loadAnimation({

    container: document.getElementById('animation-wrapper'),
    
    path: './animation/loading.json',
    
    renderer: 'svg',
    
    loop: true,
    
    autoplay: true,
    
    name: "Demo Animation",
    
    });        
}