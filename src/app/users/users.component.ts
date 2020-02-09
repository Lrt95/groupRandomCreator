import {Component, OnInit} from '@angular/core';
import { User } from '../models/user.model';
import {UserService} from '../services/user.service';
import {DataStorageService} from '../shared/data-storage.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService,
              private dataService: DataStorageService) {
    if (this.userService.usersAbsent.length === 0) {
      this.userService.usersPresent = this.userService.usersNew;
    }
  }

  ngOnInit() {
    console.log(this.userService.usersPresent);
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
