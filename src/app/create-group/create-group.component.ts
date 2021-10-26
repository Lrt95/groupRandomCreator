import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Historic} from '../models/historic.model';
import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';
import {HistoricService} from '../services/historic.service';
import {DataStorageService} from '../shared/data-storage.service';
import {Group} from '../models/group.model';
import {User} from '../models/user.model';
import userTestList from '../../assets/user.json';
import {shuffleArray} from '../utils/functions';
import {WeekModel} from '../models/week.model';
import {GroupTestModel} from '../models/group-test.model';
import {UserTestModel} from '../models/user-test.model';
import {ClassModel} from '../models/class.model';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  public show = false;
  public showHistoric = false;
  public membersPerGroup = 4;
  private alreadyGrouped: boolean;
  private historic: Historic[];
  private emptyHistoric: boolean;
  public tabHistoric: Historic[] = [];
  public classes: ClassModel[] = [];
  public formGroup: FormGroup;


  constructor(private userService: UserService,
              public groupService: GroupService,
              public historicService: HistoricService,
              private dataStorage: DataStorageService,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.createClass('toto');
    this.formGroup = new FormGroup({});

    this.dataStorage.getUsersNew().subscribe(response => {
        this.userService.usersNew = response;
        if (this.userService.usersPresent.length === 0) {
          this.userService.usersPresent = this.userService.usersNew;
        }
      }
    );
    this.dataStorage.getGroup().subscribe(response => {
      this.groupService.oldGroups = response;
      this.show = true;
    });
    this.getHistoric();
  }

  private createClass(name: string) {
    const usersList: string[] = shuffleArray(userTestList);
    const users: UserTestModel[] = usersList.map(user => {
      return {alreadyGroupWith: [], name: user};
    });
    this.classes.push({name: 'toto', users, weeks: this.createWeeks(12, users) });
    console.log(this.classes);
  }

  private createWeeks(weekNumbers: number, users: UserTestModel[]) {
    const weeks: WeekModel[] = [];
    for (let x = 1; x <= weekNumbers; x++) {
        weeks.push({group: this.createGroupsTest(4, [], users), name: 'Semaine ' + x});
    }
    return weeks;
  }

  private createGroupsTest(groupNumbers: number, groups: GroupTestModel[], users: UserTestModel[]): GroupTestModel[] {
    const usersGroup: UserTestModel[] = [...users];
    const usersTemp: UserTestModel[] = [];
    const countGroupNumber = 0;
    this.addGroupToGroup(usersGroup, usersTemp, countGroupNumber, groupNumbers, groups);
    this.deleteIncompleteGroup(groups, groupNumbers);
    this.addUserToAlreadyGroup(groups, users);
    return groups;
  }

  private addGroupToGroup(
    users: UserTestModel[],
    usersTemp: UserTestModel[],
    countGroupNumber: number,
    groupNumbers: number,
    groups: GroupTestModel[]) {
    while (users.length > 0) {
      shuffleArray(users);
      if (!this.checkOccurrence(users, usersTemp)) {
        usersTemp.push(users.pop());
        countGroupNumber++;
        if (countGroupNumber === groupNumbers || (usersTemp.length >= 1 && users.length === 0)) {
          groups.push({name: 'Groupe ' + groups.length, users: usersTemp});
          usersTemp = [];
          countGroupNumber = 0;
        }
      }
    }
  }

  private deleteIncompleteGroup(groups: GroupTestModel[], groupNumbers: number) {
    if (groups[groups.length - 1].users.length < groupNumbers) {
      groups[groups.length - 2].users =
        groups[groups.length - 2].users.concat(groups[groups.length - 1].users);
      groups.pop();
    }
  }

  private addUserToAlreadyGroup(groups: GroupTestModel[], users: UserTestModel[]) {
    groups.forEach((group, indexGroups) => {
      group.users.forEach((user) => {
        groups[indexGroups].users.forEach(userAdd => {
          if (user !== userAdd) {
            users.find(name => name.name === user.name).alreadyGroupWith.push(userAdd.name);
          }
        });
      });
    });
  }

  private checkOccurrence(users: UserTestModel[], usersTemps: UserTestModel[]): boolean {
    let occurrence = 0;
    if (usersTemps.length > 0) {
       usersTemps.forEach(userTemps => {
         if (users.find(user => user.alreadyGroupWith.includes(userTemps.name))) {
           occurrence++;
         }
      });
    }
    return occurrence > 3;
  }

  private getHistoric() {
    this.dataStorage.getHistoric().subscribe(response => {
        if (response === null || response === undefined) {
          this.emptyHistoric = true;
          this.showHistoric = true;
        } else {
          this.emptyHistoric = false;
          this.historic = response;
          this.tabHistoric = Object.values(response);
          this.showHistoric = true;
        }
      },
      error => {
        console.log(error);
        this.showHistoric = true;
      });
  }

  onGroup() {
    let numberOfGroups: number;
    numberOfGroups = this.userService.usersPresent.length / this.membersPerGroup;
    numberOfGroups > 1 ? numberOfGroups = Math.floor(numberOfGroups) : numberOfGroups = Math.round(numberOfGroups);
    this.getGroups(numberOfGroups);
    this.authService.btnSelectGroup = true;
  }

  getGroups(numberOfGroups: number) {
    this.groupService.groups = [];
    this.userService.usersNew = [];
    this.createGroups(numberOfGroups);
    this.dataStorage.storeGroup().subscribe(() => {
      this.show = false;
      this.historicService.historic = new Historic(new Date(), this.groupService.groups);
      this.dataStorage.getGroup().subscribe(responseOldGroup => {
        this.groupService.oldGroups = responseOldGroup;
        this.authService.btnSelectGroup = false;
        this.show = true;
      });
    });
  }

  onValid() {
    this.dataStorage.storeGroupHistoric().subscribe(() => {
      this.getHistoric();
      }
    );
  }

  private createGroups(numberOfGroups: number) {
    do {
      this.alreadyGrouped = true;
      this.checkAlreadyGrouped(numberOfGroups, this.historic);
    } while (!this.alreadyGrouped);
    this.groupService.groups.map((group: Group) => {
      group.member.map((member: User) => {
        member.id = group.groupName;
      });
    });
  }


  private checkAlreadyGrouped(numberOfGroups: number, historicGroups: Historic[]) {
    this.shuffleGroups(numberOfGroups);
    if (!this.emptyHistoric){
      Object.values(historicGroups).map((historicGroup, index) => {
        historicGroup.groups.map((groupHistoric: Group) => {
          const tabGroupHistoric = [];
          groupHistoric.member.map((memberHistoric: User) => {
            tabGroupHistoric.push(memberHistoric.name);
          });
          this.groupService.groups.map((group: Group) => {
            const tabGroup = [];
            group.member.map((member: User) => {
              tabGroup.push(member.name);
            });
            tabGroup.sort();
            tabGroupHistoric.sort();
            if (JSON.stringify(tabGroup) === JSON.stringify(tabGroupHistoric)) {
              this.alreadyGrouped = false;
            }
          });
        });
      });
    } else {
      this.alreadyGrouped = true;
    }
  }

  private shuffleGroups(numberOfGroups: number) {
    let selectGroup = 0;
    const randomUsers: User[] = this.getRandomUser(this.userService.usersPresent);
    for (let groupName = 1; groupName <= numberOfGroups + 1; groupName++) {
      this.groupService.groups.push(new Group(groupName, '', []));
      this.groupService.groups[selectGroup].member = randomUsers.splice(0, this.membersPerGroup);
      selectGroup++;
    }
    if (this.groupService.groups[numberOfGroups].member.length <= 2 && this.groupService.groups[numberOfGroups].member.length > 0) {
      this.getRegroup(this.groupService.groups, numberOfGroups);
    } else if (this.groupService.groups[numberOfGroups].member.length === 0) {
      this.groupService.groups.pop();
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
      this.groupService.groups[numberOfGroups].member.push(this.groupService.groups[numberOfGroups - groupIndex].member.pop());
    } while (this.groupService.groups[numberOfGroups].member.length < 3);
  }

  onReset() {
    this.dataStorage.getUsers();
    this.userService.usersPresent = this.userService.users;
  }
}
