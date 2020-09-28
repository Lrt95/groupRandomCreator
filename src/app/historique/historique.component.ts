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
  private historic: Historic;
  private tabHistoric: Historic[] = [];
  private emptyHistoric: boolean;

  constructor(
              private dataStorage: DataStorageService) {
  }


  ngOnInit() {
    this.dataStorage.getHistoric().subscribe(response => {
      if (response === null || response === undefined) {
        this.emptyHistoric = true;
      } else {
        this.emptyHistoric = false;
        this.historic = response;
        Object.entries(this.historic).map((historic: Historic[]) => {
          console.log(historic[1]);
          this.tabHistoric.push(historic[1]);
        });
        this.show = true;
      }
    });
  }
}
