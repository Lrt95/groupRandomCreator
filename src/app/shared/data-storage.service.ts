import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CodingClasseModel} from '../models/coding-classe-model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient) {}

  getCodingClasses(): Observable<CodingClasseModel[]> {
    return this.http.get<CodingClasseModel[]>('https://pifogroup-7b34b.firebaseio.com/coding-classes.json');
  }

  putCodingClasses(codingClasses: CodingClasseModel[]): Observable<CodingClasseModel[]> {
    return this.http.put<CodingClasseModel[]>('https://pifogroup-7b34b.firebaseio.com/coding-classes.json',
      codingClasses);
  }

  deleteCodingClasses(): Observable<CodingClasseModel[]> {
    return this.http.delete<CodingClasseModel[]>('https://pifogroup-7b34b.firebaseio.com/coding-classes.json');
  }
}
