import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { GroupComponent } from './group/group.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from '@angular/forms';
import {AlertComponent} from './shared/Alert/alert.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    GroupComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    AuthComponent,
    AlertComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [UsersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
