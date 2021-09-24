export class Wish {
  constructor(name, value, icon, done = false, userId = 1, id) {
    this.name = name;
    this.value = value;
    this.icon = icon;
    this.done = done;
    this.userId = userId;
    this.id = id;
  }
}
