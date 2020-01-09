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
    new User('Alyssia Prevote', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Antony Correia', 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-1/p100x100/66658111_10217851026740184_2823897424676782080_n.jpg?_nc_cat=105&_nc_oc=AQmLshMClxdC5N4C6LbGolwSvWpBX4FhVzJViCIJH_8-xnZmrYqDzQH735m9TY5du6E&_nc_ht=scontent-cdg2-1.xx&oh=481004cb7d1777135422d26577fbd643&oe=5E40C942'),
    new User('Brian LeCarpentier', 'https://media.licdn.com/dms/image/C4D03AQHa9d9iuPKrpg/profile-displayphoto-shrink_200_200/0?e=1580947200&v=beta&t=tpcevJzMcvn-ADwMRDwTOG7xi4mbkziqkCxq-6oHvNk'),
    new User('Correntin Vallois', 'https://media.licdn.com/dms/image/C5603AQEprXY3-7NhUw/profile-displayphoto-shrink_200_200/0?e=1583971200&v=beta&t=N6DhkKWHjg2toPdelXWRUiJ-nLDd64_drFd9q9gUO0U'),
    new User('Eddy Marquand', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Emerick Chalet', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Erwan Spenette', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Ethiene Facquet', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Florent Debuchy', 'https://avatars1.githubusercontent.com/u/40041389?s=400&u=d6ea1a41b887ccbfd353dc68849422b564aeea25&v=4'),
    new User('Francesco Hartmann', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Gwenael Marchetti', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Hugo Monnerie', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Houssam Laghzil', 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-0/p370x247/82173047_2217430175023203_4065910994977685504_o.jpg?_nc_cat=109&_nc_ohc=Ig8EuQWc-kUAX9rhKuk&_nc_ht=scontent-cdg2-1.xx&_nc_tp=1&oh=f0e81900b4f32fcf93617a53239e7fae&oe=5E96C5C1'),
    new User('Ilias Guechy', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Juan Herrada', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Jonathan Debailleux', 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/39746432_2138392376401242_8477264805118345216_n.jpg?_nc_cat=111&_nc_ohc=lzd-o_OJKs8AQnF9jLYHQC7aeRKE7L0yNo5OGefqAI679Bc-BDwUVbxeA&_nc_ht=scontent-cdg2-1.xx&oh=29f2f59956ffed1a834bb880801c3870&oe=5E9DDD2D'),
    new User('Laurent Sem', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Lucas Provost', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Marie Tchydemian', 'https://i.pinimg.com/280x280_RS/e0/e5/5b/e0e55b54d918335abcfa048e474c0158.jpg'),
    new User('Marion Meurant', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Marine Bijon', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Maxence Lavenu', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Roman Clavier', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    new User('Sarah Hayat', 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/44398802_10212477408122178_6168756601193758720_n.jpg?_nc_cat=107&_nc_ohc=PzDfU31IVKoAQnDo15WdGcEiGDtnoIMaHSG1vRLDfrGKmCQmutkhcrz8Q&_nc_ht=scontent-cdg2-1.xx&oh=8adc76e257a54911070cbad4d92567d7&oe=5EA86463'),
    new User('Guillaume Pinheiro', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
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
