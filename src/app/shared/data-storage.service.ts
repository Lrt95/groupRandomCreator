import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
import {Group} from '../models/group.model';
import {GroupService} from '../services/group.service';
import {HistoricService} from '../services/historic.service';
import {Historic} from '../models/historic.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private userService: UserService,
              private groupService: GroupService,
              private historicService: HistoricService) {
  }

  getUsers() {
    this.http.get<User[]>('https://pifogroup-7b34b.firebaseio.com/users.json').subscribe(response => {
       this.userService.users = response;
    }
  );
  }

  getUsersNew() {
    return this.http.get<User[]>('https://pifogroup-7b34b.firebaseio.com/users-new.json');
  }

  storeUserNew() {
    const users = this.userService.usersNew;
    return this.http.put<User[]>('https://pifogroup-7b34b.firebaseio.com/users-new.json', users);
  }

  storeGroup() {
    const groups = this.groupService.groups;
    return this.http.put<Group[]>('https://pifogroup-7b34b.firebaseio.com/groups.json',
      groups);
  }

  storeGroupHistoric(){
    const historic = this.historicService.historic;
    return this.http.post<Historic>('https://pifogroup-7b34b.firebaseio.com/historic.json', historic);
  }

  getHistoric() {
    return this.http.get<Historic[]>('https://pifogroup-7b34b.firebaseio.com/historic.json');
  }

  getGroup() {
    return this.http.get<Group[]>('https://pifogroup-7b34b.firebaseio.com/groups.json');
  }
}
