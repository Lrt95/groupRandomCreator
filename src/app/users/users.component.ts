import {Component, Injectable, OnInit} from '@angular/core';
import { User } from '../user.model';
import {DeleteUserGroupComponent} from '../delete-user-group/delete-user-group.component';
import { Group } from  '../group.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private users: User[] = [
    new User('Test 1', ''),
    new User('Test 2', ''),
    new User('Test 3', ''),
    new User('Test 4', ''),
    new User('Test 5', ''),
    new User('Test 6', ''),
    new User('Test 7', ''),
    new User('Test 8', ''),
    new User('Test 9', ''),
    new User('Test 10', ''),
  ];
  private delUsers: User[] = [];

  private groups: Group[] = [];

  constructor() { }

  ngOnInit() {
  }

  onUser(i: number) {
    this.getDelUser(this.users[i]);
    this.users.splice(i, 1);
  }

  getDelUser(delUsers: User) {
    this.delUsers.push(delUsers);
  }

  onDelUser(n: number) {
    this.getUser(this.delUsers[n]);
    this.delUsers.splice(n, 1);
  }

  getUser(users: User) {
    this.users.push(users);
  }

  onGroup(){
    let numberOfGroups: number;
    console.log(this.users.length);
    this.users.length % 4 === 0 ? numberOfGroups = this.users.length/4 : numberOfGroups = Math.floor(this.users.length/4);
    this.getGroups(numberOfGroups)
    }

  getGroups(numberOfGroups: number) {
    ;
  }
}
