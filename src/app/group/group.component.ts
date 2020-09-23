import {Component, OnInit} from '@angular/core';
import {Group} from '../models/group.model';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {HistoricService} from '../services/historic.service';
import {Historic} from '../models/historic.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  public show = false;
  public membersPerGroup = 4;
  private alreadyGrouped: boolean;
  private historic: Historic;
  private emptyHistoric: boolean;

  constructor(private userService: UserService,
              public groupService: GroupService,
              public historicService: HistoricService,
              private dataStorage: DataStorageService,
              private authService: AuthService) {
  }


  ngOnInit() {
    this.dataStorage.getUsersNew().subscribe(response => {
        this.userService.usersNew = response;
        if (this.userService.usersPresent.length === 0) {
          this.userService.usersPresent = this.userService.usersNew;
        }
      }
    );
    // this.dataStorage.storeUserNew().subscribe();
    this.dataStorage.getGroup().subscribe(response => {
      this.groupService.oldGroups = response;
      this.show = true;
    });
    this.dataStorage.getHistoric().subscribe(response => {
      if (response === null || response === undefined) {
        this.emptyHistoric = true;
      } else {
        this.emptyHistoric = false;
        this.historic = response;
      }
      console.log(this.historic);
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
      this.dataStorage.storeGroupHistoric().subscribe();
      this.dataStorage.getGroup().subscribe(responseOldGroup => {
        this.groupService.oldGroups = responseOldGroup;
        this.authService.btnSelectGroup = false;
        this.show = true;
        this.dataStorage.getHistoric().subscribe(response => {
          this.emptyHistoric = false;
          this.historic = response;
          console.log(this.historic);
        });
      });
    });
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


  private checkAlreadyGrouped(numberOfGroups: number, historicGroups: Historic) {
    this.shuffleGroups(numberOfGroups);
    if (!this.emptyHistoric){
      console.log(historicGroups);
      Object.values(historicGroups).map((historicGroup, index) => {
        console.log('Group historic:' + (index + 1));
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
              console.log('Ensemble');
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
    console.log(this.groupService.groups);
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
      this.groupService.groups[numberOfGroups - groupIndex].member.push(this.groupService.groups[numberOfGroups].member.pop());
    } while (this.groupService.groups[numberOfGroups].member.length !== 0);
    this.groupService.groups.pop();
  }

  onReset() {
    this.dataStorage.getUsers();
    this.userService.usersPresent = this.userService.users;
  }
}
