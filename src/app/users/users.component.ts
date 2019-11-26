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
    new User('Adrian Duveau', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Alyssia PH', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Antony Correia', 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-1/p100x100/66658111_10217851026740184_2823897424676782080_n.jpg?_nc_cat=105&_nc_oc=AQmLshMClxdC5N4C6LbGolwSvWpBX4FhVzJViCIJH_8-xnZmrYqDzQH735m9TY5du6E&_nc_ht=scontent-cdg2-1.xx&oh=481004cb7d1777135422d26577fbd643&oe=5E40C942'),
    new User('Marine Bijon', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Brian LeCarpentier', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Emerick Chalet', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Correntin Vallois', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Jonathan Debailleux', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Dylan', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Eddy Marquand', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Florent', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Francesco', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Gwenael', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Hugo', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Laurent', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Lucas Provost', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Marie', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Marion', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Maxence Lavenu', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Roxane Clavier', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Sarah Hayat', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Juan', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Erwan', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Billy', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Ilias', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Lionel', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),

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
    numberOfGroups = this.users.length / 4;
    numberOfGroups > 1 ? numberOfGroups = Math.floor(numberOfGroups) : numberOfGroups = Math.round(numberOfGroups)
    this.getGroups(numberOfGroups);
    this.groupeSelect = true;
    }

  randomEtudiant(users) {
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
  getGroups(numberOfGroups: number) {
    this.groups = [];
    this.RandomUsers = this.randomEtudiant(this.users);
    let selectGroup = 0;
    for (let groupName = 1 ; groupName <= numberOfGroups + 1  ; groupName++) {
      this.groups.push(new Group(groupName, '', []));
      this.groups[selectGroup].member = this.RandomUsers.splice(0, 4);
      selectGroup++;
    }
    if (this.groups[numberOfGroups].member.length  <= 2 &&  this.groups[numberOfGroups].member.length > 0) {
      this.getRegroup(this.groups , numberOfGroups);
    } else if ( this.groups[numberOfGroups].member.length === 0) {
      this.groups.pop();
    }
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