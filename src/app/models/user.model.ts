
export class User {
  public id: number;
  public name: string;
  public imagePath: string;

  constructor(id: number, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.imagePath = image;
  }
}
