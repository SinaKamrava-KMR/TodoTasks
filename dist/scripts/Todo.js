export class Todo {
  id = 0;
  title = "";
  description = "";
  status = 0;
  createdAt = "";
  endAt = "";

  constructor({
    id = 0,
    title = "",
    description = "",
    status = 0,
    createdAt = "",
    endAt = "unfinished yet",
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.endAt = endAt;
  }



  get id() {
    return this.id;
  }

  nextState() {
    if (this.status >= 2) return;
    if (this.status == 1) this.setEndDate();

    this.status++;
  }

  prevState() {
    if (this.status <= 0) return;
    this.endAt = "unfinished yet";
    this.status--;
  }

  setEndDate() {
    const date = new Date();
    this.endAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  get title() {
    return this.title;
  }
  set title(text) {
    this.title = text;
  }

  get description() {
    return this.description;
  }
  set description(text) {
    this.description = text;
  }

  get status() {
    return this.status;
  }
  set status(status) {
    this.status = status;
  }

  get createdAt() {
    return this.createdAt;
  }

  get endAt() {
    return this.endAt;
  }
}
