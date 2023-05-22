
export class Catch{
  store = '';
  todoList = [];
  constructor() {
     this.store = localStorage.getItem("todos") || "[]";
     this.todoList = JSON.parse(this.store);

  }


  getAll() {
    
    return this.todoList;
  }

  add(todo) {
    this.todoList.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.todoList));
  }

  addTasks(tasks) {
    this.todoList = JSON.parse(JSON.stringify(tasks)); 
    localStorage.setItem("todos", JSON.stringify(this.todoList));
  }

  remove(id) {
    this.todoList.forEach((todo,index )=> {
      if (todo.id == id) {
        this.todoList.splice(index, 1);
        return;
      }
    });
    localStorage.setItem("todos", JSON.stringify(this.todoList));
  }

  update(todo) {

    this.todoList.map(task => {
      return task.id == todo.id ? {...todo} : task;
    })

    localStorage.setItem("todos", JSON.stringify(this.todoList));
  }



}