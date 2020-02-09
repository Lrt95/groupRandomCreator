import {Injectable} from '@angular/core';
import {User} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {

  public users: User[] = []
  public usersNew: User[] = []
  public usersAbsent: User[] = [];
  public usersPresent: User[] = [];

}
