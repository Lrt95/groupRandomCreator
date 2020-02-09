import {Component, Input} from '@angular/core';
import {AuthComponent} from '../../auth/auth.component';

@Component({selector: 'app-alert',
            templateUrl: './alert.component.html',
            styleUrls: ['./alert.component.css']})
export class AlertComponent {
  @Input() message: string;

  constructor(private auth: AuthComponent) {
  }

  onClickClose() {
    this.auth.error = false;
  }
}
