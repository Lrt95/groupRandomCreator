import { Component, OnInit } from '@angular/core';
import {Group} from '../models/group.model';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {


  private RandomUsers: User[];
  groupSelect = false;

  constructor(private userService: UserService,
              private groupService: GroupService) { }

  ngOnInit() {
    if (this.groupService.groups.length !== 0) {
      this.groupSelect = true;
    }
    this.userService.usersPresent = this.userService.users;
  }

   onGroup() {
    let numberOfGroups: number;
    numberOfGroups = this.userService.usersPresent.length / 4;
    numberOfGroups > 1 ? numberOfGroups = Math.floor(numberOfGroups) : numberOfGroups = Math.round(numberOfGroups);
    this.getGroups(numberOfGroups);
    this.groupSelect = true;
  }

   getGroups(numberOfGroups: number) {
    this.groupService.groups = [];
    this.RandomUsers = this.randomUser(this.userService.usersPresent);
    let selectGroup = 0;
    for (let groupName = 1 ; groupName <= numberOfGroups + 1  ; groupName++) {
      this.groupService.groups.push(new Group(groupName, '', []));
      this.groupService.groups[selectGroup].member = this.RandomUsers.splice(0, 4);
      selectGroup++;
    }
    if (this.groupService.groups[numberOfGroups].member.length  <= 2 &&  this.groupService.groups[numberOfGroups].member.length > 0) {
      this.getRegroup(this.groupService.groups , numberOfGroups);
    } else if ( this.groupService.groups[numberOfGroups].member.length === 0) {
      this.groupService.groups.pop();
    }
  }

   randomUser(users) {
    let rand;
    let index = -1;
    const length = users.length;
    const result = Array(length);
    while (++index < length) {
      rand = Math.floor(Math.random() * (index + 1));
      result[index] = result[rand];
      result[rand] = users[index];
    }
    return result;
  }


   getRegroup(group: Group[], numberOfGroups: number) {
    let groupIndex = 0;
    do {
      groupIndex++;
      this.groupService.groups[numberOfGroups - groupIndex].member.push(this.groupService.groups[numberOfGroups].member.pop());
    } while (this.groupService.groups[numberOfGroups].member.length !== 0);
    this.groupService.groups.pop();
  }

  onClearGroup() {
    this.groupService.clearGroup();
    this.groupSelect = false;
  }
}
