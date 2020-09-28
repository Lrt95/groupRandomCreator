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
  private historic: Historic;
  private emptyHistoric: boolean;

  constructor(private userService: UserService,
              public groupService: GroupService,
              public historicService: HistoricService,
              private dataStorage: DataStorageService,
              public authService: AuthService) {
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
}
