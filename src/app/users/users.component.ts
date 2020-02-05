import {Component, OnInit} from '@angular/core';
import { User } from '../models/user.model';
import {UserService} from '../services/user.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.userService.usersPresent.length === 0) {
      this.userService.usersPresent = this.userService.users;
    }
  }

   onUser(i: number) {
    this.getDelUser(this.userService.usersPresent[i]);
    this.userService.usersPresent.splice(i, 1);
  }

   getDelUser(delUsers: User) {
    this.userService.usersAbsent.push(delUsers);
  }

   onDelUser(n: number) {
    this.getUser(this.userService.usersAbsent[n]);
    this.userService.usersAbsent.splice(n, 1);
  }

   getUser(usersPresent: User) {
    this.userService.usersPresent.push(usersPresent);
  }


}
