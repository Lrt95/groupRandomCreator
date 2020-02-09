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



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    GroupComponent,
    HeaderComponent,
    LoadingSpinnerComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [UsersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
