import {Injectable} from '@angular/core';
import {Historic} from '../models/historic.model';

@Injectable({providedIn: 'root'})
export class HistoricService {
  public historic: Historic;
}
