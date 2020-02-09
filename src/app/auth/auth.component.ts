import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  constructor(private authService: AuthService, private router: Router) {}
  isLoading = false;
  error = null;
  authObs: Observable<AuthResponseData>

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    this.authObs = this.authService.login(email, password);


    this.authObs.subscribe(resData => {
      this.isLoading = false;
      this.authService.btnSelectGroup = false;
      this.router.navigate(['./groups'])
      console.log(resData);
    },  errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
      console.log(errorMessage);
    });
    form.reset();
  }
}
