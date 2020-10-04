import { Component, OnInit } from '@angular/core';
import {Historic} from '../models/historic.model';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  public show = false;
  public historics: Historic[];
  private emptyHistoric: boolean;

  constructor(
              private dataStorage: DataStorageService) {
  }


  ngOnInit() {
    this.dataStorage.getHistoric().subscribe((response: Historic[]) => {
      if (response === null || response === undefined) {
        this.emptyHistoric = true;
      } else {
        this.emptyHistoric = false;
        this.historics = Object.values(response);
        this.show = true;
      }
    });
  }
}
