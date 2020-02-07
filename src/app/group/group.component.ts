import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../models/group.model';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  private RandomUsers: User[];
  groupSelect = true;
  tabUser = [];
  neverTogether = false;

  constructor(private userService: UserService,
              private groupService: GroupService,
              private dataStorage: DataStorageService) {
    this.dataStorage.getUsersNew();
    this.dataStorage.getGroup();
  }

  ngOnInit() {
    console.log(this.userService.usersPresent);
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
    this.userService.usersNew = [];
    this.RandomUsers = this.getRandomUser(this.userService.usersPresent);
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
    this.getIdGroup();
    if (!this.neverTogether) {
      this.setIdGroup();
      this.dataStorage.storeGroup();
    } else {
      this.onGroup();
    }
  }

   getRandomUser(users) {
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

  getIdGroup() {
    this.tabUser = [];
    for (let numberGroup = 0; numberGroup <= this.groupService.groups.length - 1; numberGroup++) {
      for (let nbMember = 0; nbMember <= this.groupService.groups[numberGroup].member.length - 1; nbMember++) {
        this.tabUser.push(this.groupService.groups[numberGroup].member[nbMember].id);
      }
      console.log("First :" + this.tabUser);
      let count = 1;
      do {
        let indices = [];
        let élément = count;
        let idx = this.tabUser.indexOf(élément);
        while (idx != -1) {
          indices.push(idx);
          idx = this.tabUser.indexOf(élément, idx + 1);
          console.log("indice" + indices);
        }
        if (indices.length >= 2){
          console.log(">2" + this.tabUser);
          this.neverTogether = true;
          console.log(this.neverTogether);
          return;
        } else if (this.neverTogether) {
          this.neverTogether = false;
        }
        if (this.neverTogether) {
          break;
        }
        count++;
      } while (count !== this.groupService.groups[numberGroup].member.length);
      this.tabUser = [];
    }
  }

  setIdGroup() {
    for (let numberGroup = 0; numberGroup <= this.groupService.groups.length - 1; numberGroup++) {
      for (let nbMember = 0; nbMember <= this.groupService.groups[numberGroup].member.length - 1; nbMember++) {
        this.groupService.groups[numberGroup].member[nbMember].id = numberGroup + 1;
        this.userService.usersNew.push(this.groupService.groups[numberGroup].member[nbMember]);
      }
    }
    for( let nbMember = 0; nbMember <= this.userService.usersAbsent.length - 1; nbMember++) {
      this.userService.usersAbsent[nbMember].id = 10;
      this.userService.usersNew.push(this.userService.usersAbsent[nbMember]);
    }
    console.log("set group : " + this.userService.usersNew);
    this.dataStorage.storeUsersNew();
  }

  onReset(){
    this.dataStorage.getUsers();
    this.userService.usersPresent = this.userService.users;
  }
  onClearGroup() {
    this.groupService.clearGroup();
    this.groupSelect = false;
  }

}
