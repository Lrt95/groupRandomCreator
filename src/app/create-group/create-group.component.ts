import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {DataStorageService} from '../shared/data-storage.service';
import {shuffleArray, setBgColor} from '../utils/functions';
import {WeekModel} from '../models/week.model';
import {GroupModel} from '../models/group.model';
import {UserModel} from '../models/user.model';
import {CodingClasseModel} from '../models/coding-classe-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  public show = false;
  public codingClassModels: CodingClasseModel[] = [];
  public formGroup: FormGroup;
  public studentArray: [string, FormControl][] = [];
  public indexStudent: number;
  public setBgColor = setBgColor;

  constructor(private dataStorage: DataStorageService, public authService: AuthService) {}

  private get classe(): FormGroup {
    return this.formGroup.get('classe') as FormGroup;
  }

  private get week(): FormGroup {
    return this.formGroup.get('week') as FormGroup;
  }

  private get student(): FormGroup {
    return this.formGroup.get('student') as FormGroup;
  }

  ngOnInit() {
    this.getCodingClasses();
    this.formGroup = new FormGroup({
      classe: new FormControl(null, [Validators.required]),
      week: new FormControl(1, [Validators.min(1)]),
      student: new FormGroup({ 0: this.getStudent() })
    });
    this.indexStudent = 0;
    this.studentArray.push([
      this.studentArray.toString(),
      this.getForm(this.indexStudent.toString(), 'student'),
    ]);
  }

  private getForm(key: string, form: string): FormControl {
    return this.formGroup.get(form).get(key) as FormControl;
  }

  public onClickAddStudent(): void {
    this.indexStudent++;
    this.student.addControl(
      this.indexStudent.toString(),
      this.getStudent()
    );
    this.studentArray.push([
      this.indexStudent.toString(),
      this.getForm(this.indexStudent.toString(), 'student'),
    ]);
  }

  public onClickDeleteStudent(index: number): void {
    this.student.removeControl(
      this.studentArray[index][0].toString()
    );
    this.studentArray.splice(index, 1);
  }

  private getStudent(): FormControl {
    return new FormControl(null, [Validators.required]);
  }

  public onSubmit(form: any): void {
    if (Object.values(form).length >= 3) {
      const students: UserModel[] = [];
      Object.values(form.student).forEach((student: string) => {
        students.push({alreadyGroupWith: [], name: student});
      });
      this.createCodingClass(form.classe, students, form.week);
    }
  }

  private createCodingClass(name: string, students: UserModel[], week: number) {
    this.codingClassModels.push({name, student: students, weeks: this.createWeeks(week, students), week});
    console.log(this.codingClassModels);
  }

  private createWeeks(weekNumbers: number, users: UserModel[]) {
    const weeks: WeekModel[] = [];
    for (let x = 1; x <= weekNumbers; x++) {
        weeks.push({group: this.createGroupsTest(4, [], users), name: 'Semaine ' + x});
    }
    return weeks;
  }

  private createGroupsTest(groupNumbers: number, groups: GroupModel[], users: UserModel[]): GroupModel[] {
    const usersGroup: UserModel[] = [...users];
    const usersTemp: UserModel[] = [];
    const countGroupNumber = 0;
    this.addGroupToGroup(usersGroup, usersTemp, users, countGroupNumber, groupNumbers, groups);
    this.deleteIncompleteGroup(groups, groupNumbers);
    this.addUserToAlreadyGroup(groups, users);
    return groups;
  }

  private addGroupToGroup(
    usersGroup: UserModel[],
    usersTemp: UserModel[],
    users: UserModel[],
    countGroupNumber: number,
    groupNumbers: number,
    groups: GroupModel[]) {
    while (usersGroup.length > 0) {
      shuffleArray(usersGroup);
      if (!this.checkOccurrence(users, usersTemp)) {
        usersTemp.push(usersGroup.pop());
        countGroupNumber++;
        if (countGroupNumber === groupNumbers || (usersTemp.length >= 1 && users.length === 0)) {
          groups.push({name: 'Groupe ' + groups.length, users: usersTemp});
          usersTemp = [];
          countGroupNumber = 0;
        }
      }
    }
  }

  private deleteIncompleteGroup(groups: GroupModel[], groupNumbers: number) {
    if (groups[groups.length - 1].users.length < groupNumbers) {
      groups[groups.length - 2].users =
        groups[groups.length - 2].users.concat(groups[groups.length - 1].users);
      groups.pop();
    }
  }

  private addUserToAlreadyGroup(groups: GroupModel[], users: UserModel[]) {
    groups.forEach((group, indexGroups) => {
      group.users.forEach((user) => {
        groups[indexGroups].users.forEach(userAdd => {
          if (user !== userAdd) {
            users.find(name => name.name === user.name).alreadyGroupWith.push(userAdd.name);
          }
        });
      });
    });
  }

  private checkOccurrence(users: UserModel[], usersTemps: UserModel[]): boolean {
    let occurrence = 0;
    if (usersTemps.length > 0) {
       usersTemps.forEach(userTemp => {
         if (users.find(user => user.alreadyGroupWith.includes(userTemp.name))) {
           occurrence++;
         }
      });
    }
    return occurrence > 3;
  }

  public getCodingClasses(): void {
    this.show = true;
    this.dataStorage.getCodingClasses().subscribe((result: CodingClasseModel[]) => {
      console.log(result);
      this.show = false;
      if (result) {
        this.codingClassModels = result;
      } else {
        this.codingClassModels = [];
      }
    }, error => {
      this.show = false;
      console.log(error);
    });
  }

  public onSave(): void {
    this.show = true;
    this.dataStorage.putCodingClasses(this.codingClassModels).subscribe(result => {
      this.show = false;
      console.log(result);
    }, error => {
      this.show = false;
      console.log(error);
    });
  }

  public onDelete(): void {
    this.show = true;
    this.dataStorage.deleteCodingClasses().subscribe(result => {
      this.show = false;
      if (result) {
        this.codingClassModels = result;
      } else {
        this.codingClassModels = [];
      }
      console.log(result);
    }, error => {
      this.show = false;
      console.log(error);
    });
  }

  public onDeleteCodingClasse(index): void {
    this.show = true;
    this.codingClassModels.splice(index, 1);
    this.dataStorage.putCodingClasses(this.codingClassModels).subscribe(result => {
      this.show = false;
      if (result) {
        this.codingClassModels = result;
      } else {
        this.codingClassModels = [];
      }
      console.log(result);
    }, error => {
      this.show = false;
      console.log(error);
    });
  }

  onValueChange(event: any, indexClasse: number, indexWeek: number) {
    this.codingClassModels[indexClasse].weeks[indexWeek].name = event.target.value;
    console.log(this.codingClassModels[indexClasse].weeks[indexWeek].name);
  }
}
