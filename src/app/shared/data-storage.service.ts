import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
import {Group} from '../models/group.model';
import {GroupService} from '../services/group.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private userService: UserService,
              private  groupService: GroupService) {
  }

  getUsers() {
    this.http.get<User[]>('https://pifogroup-7b34b.firebaseio.com/users.json').subscribe(response => {
       this.userService.users = response;
    }
  );
  }

  storeGroup() {
    const groups = this.groupService.groups;
    this.http.put('https://pifogroup-7b34b.firebaseio.com/groups.json',
      groups).subscribe(response => {
        console.log(response);
    });
  }

  getGroup() {
    this.http.get<Group[]>('https://pifogroup-7b34b.firebaseio.com/groups.json').subscribe( response => {
      this.groupService.oldGroups = response;
    });
  }
}
