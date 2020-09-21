
export class User {
  public id: number;
  public name: string;
  public imagePath: string;
  public alreadyGrouped: Array<string>;

  constructor(id: number, name: string, image: string,  alreadyGrouped: []  = []) {
    this.id = id;
    this.name = name;
    this.imagePath = image;
    this.alreadyGrouped = alreadyGrouped;
  }
}
