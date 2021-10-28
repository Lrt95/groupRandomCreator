import {UserModel} from './user.model';

export interface GroupModel {
  name: string;
  users: UserModel[];
}
