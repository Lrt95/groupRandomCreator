import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GroupComponent} from './group/group.component';
import {UsersComponent} from './users/users.component';

const appRoutes: Routes = [
  {path: 'groups', component: GroupComponent},
  {path: 'user', component: UsersComponent},
  {path: '', redirectTo: 'groups', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
