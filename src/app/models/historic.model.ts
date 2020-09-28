import { Group } from './group.model';

export class Historic {
  public date: Date;
  public groups: Group[];

  constructor(date: Date, groups: Group[]) {
    this.date = date;
    this.groups = groups;
  }
}
