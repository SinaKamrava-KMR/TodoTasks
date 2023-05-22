import { Catch } from "./Catch.js";
import { HttpClient } from "./HttpClient.js";

export class Database{
  
  httpClient = null;
  localCatch =null
  constructor(url) {
    this.httpClient = new HttpClient(url);
    this.localCatch = new Catch();
  }


  async getTasks() {
    
    try {
      let result = {
        catch: this.localCatch.getAll(),
        server:this.httpClient.getAllData(),
      }
      
      return await result;

    } catch (error) {
      throw new Error(error);
    }

  }


  addTasks(tasks) {
    this.localCatch.addTasks(tasks)
  }


  async add(task) {

    try {
      this.localCatch.add({...task})
      return await this.httpClient.inserData(task);
    } catch (err) {
      throw new Error(err);
    }
  

  }

  async remove(task) {

    try {
      return {
        catch: this.localCatch.remove(task.id),
        server:await this.httpClient.deleteTask(task)
      }

    } catch (err) {
      throw new Error(err);
    }


    
  }

  async update(task) {

    try {
     this.localCatch.update(task) 
     return await this.httpClient.updateTask(task);

    } catch (err) {
      throw new Error(err);
    }

  }


}