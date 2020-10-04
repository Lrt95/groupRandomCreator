import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';
import {DataStorageService} from '../shared/data-storage.service';
import {Historic} from '../models/historic.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  public show = false;
  private emptyHistoric: boolean;

  constructor(private userService: UserService,
              public groupService: GroupService,
              private dataStorage: DataStorageService) {
  }


  ngOnInit() {
    this.dataStorage.getHistoric().subscribe((response: Historic[]) => {
      if (response === null || response === undefined) {
        this.emptyHistoric = true;
      } else {
        this.emptyHistoric = false;
        this.groupService.oldGroups = Object.values(response).pop().groups;
        this.show = true;
      }
    });
  }
}
