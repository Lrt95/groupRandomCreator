import {Injectable} from '@angular/core';
import {Group} from '../models/group.model';

@Injectable({providedIn: 'root'})
export class GroupService {
  public groups: Group[] = [];
  public oldGroups: Group[] = [];
}
