import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { GroupComponent } from './group/group.component';
import { HeaderComponent } from './header/header.component';
import { DeleteUserGroupComponent } from './delete-user-group/delete-user-group.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    GroupComponent,
    HeaderComponent,
    DeleteUserGroupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DeleteUserGroupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
