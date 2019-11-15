import {Component, OnInit} from '@angular/core';
import { User } from '../user.model';
import { Group } from '../group.model';

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
    new User('Test 11', ''),
    new User('Test 12', ''),
    new User('Test 13', ''),
    new User('Test 14', ''),
    new User('Test 15', ''),
    new User('Test 16', ''),
    new User('Test 17', ''),
    new User('Test 18', ''),
    new User('Test 19', ''),
    new User('Test 20', ''),
    new User('Test 21', ''),
    new User('Test 22', ''),
    new User('Test 23', ''),
    new User('Test 24', ''),
    new User('Test 25', ''),
    new User('Test 26', ''),
    new User('Test 27', ''),
  ];
  private delUsers: User[] = [];
  private RandomUsers: User[];
  private groups: Group[] = [];
  groupeSelect = false;


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

  onGroup() {
    let numberOfGroups: number;
    this.users.length % 4 === 0 ? numberOfGroups = this.users.length / 4 : numberOfGroups = Math.floor(this.users.length / 4);
    this.getGroups(numberOfGroups);
    this.groupeSelect = true;
    }

  randomEtudiant(array) {
    let rand;
    let index = -1;
    const length = array.length;
    const result = Array(length);
    while (++index < length) {
      rand = Math.floor(Math.random() * (index + 1));
      result[index] = result[rand];
      result[rand] = array[index];
    }
    return result;
  }
  getGroups(numberOfGroups: number) {
    this.groups = [];
    this.RandomUsers = this.randomEtudiant(this.users);
    let selectGroup = 0;
    for (let groupName = 1 ; groupName <= numberOfGroups + 1; groupName++) {
      this.groups.push(new Group(groupName, '', []));
      this.groups[selectGroup].member = this.RandomUsers.splice(0, 4);
      selectGroup++;
    }
    this.groups[numberOfGroups].member.length  <= 2 ? this.getRegroup(this.groups , numberOfGroups) : this.groups = this.groups;
    console.log(this.groups);
  }

  getRegroup(group: Group[], numberOfGroups: number) {
    let groupIndex = 0;
    do {
      groupIndex++;
      this.groups[numberOfGroups - groupIndex].member.push(this.groups[numberOfGroups].member.pop());
    } while (this.groups[numberOfGroups].member.length !== 0);
    this.groups.pop();
  }
}
