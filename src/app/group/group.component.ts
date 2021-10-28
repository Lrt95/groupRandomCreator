import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {CodingClasseModel} from '../models/coding-classe-model';
import { setBgColor } from '../utils/functions';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  public show = false;
  public codingClassModels: CodingClasseModel[] = [];
  public setBgColor = setBgColor;

  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    this.show = true;
    this.dataStorage.getCodingClasses().subscribe(result => {
      this.show = false;
      this.codingClassModels = result;
      console.log(result);
    }, error => {
      console.log(error);
    });

  }
}
