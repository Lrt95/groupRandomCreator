import {UserModel} from './user.model';
import {WeekModel} from './week.model';

export interface CodingClasseModel {
  name: string;
  student: UserModel[];
  weeks?: WeekModel[];
  week: number;
}
