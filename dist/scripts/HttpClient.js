export class HttpClient {
  baseUrl = "";
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllDate() {
    try {
      const response = await fetch(`${this.baseUrl}tasks`);
      if (!response.ok) throw new Error("can not get data from database");
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(
        `something went wrong 😵‍💫 can not get all tasks message :${error}`
      );
    }
  }

  async inserData(todo) {
    try {
      const response = await fetch(`${this.baseUrl}tasks`, {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "createdAt": todo.createdAt,
          'endAt': todo.endAt,
          "title": todo.title,
          "description": todo.description,
          "status": todo.status,
          }),
      });
      if (!response.ok) throw new Error("can not insert data to database");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }


  async updateTask(todo) {
    try {
      const response = await fetch(`${this.baseUrl}tasks/${todo.id}`, {
        method: "PUT",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "createdAt": todo.createdAt,
          'endAt': todo.endAt,
          "title": todo.title,
          "description": todo.description,
          "status": todo.status,
          }),
      });
      if (!response.ok) throw new Error("can not update data to database");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTask(todo) {
    try {
      const response = await fetch(`${this.baseUrl}tasks/${todo.id}`,
        {
        method: "DELETE",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        
      });
      if (!response.ok) throw new Error("can not Delete data to database");
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
