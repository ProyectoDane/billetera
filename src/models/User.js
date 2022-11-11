export class User {
  surveyDone;
  tourDone;
  constructor(name = '', photo = '', id = 1) {
    this.name = name;
    this.photo = photo;
    this.id = id;
  }
}
