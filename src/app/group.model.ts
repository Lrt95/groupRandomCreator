import { User } from './user.model';

export class Group {
  public groupName: number;
  public member: User;
  public imagePath: string;

  constructor(groupName: number, image: string, member: User) {
    this.groupName = groupName;
    this.imagePath = image;
    this.member = member;
  }
}
