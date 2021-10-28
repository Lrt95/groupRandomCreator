import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GroupComponent} from './group/group.component';
import {AuthComponent} from './auth/auth.component';
import {CreateGroupComponent} from './create-group/create-group.component';

const appRoutes: Routes = [
  {path: 'groups', component: GroupComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'create-group', component: CreateGroupComponent},
  {path: '', redirectTo: 'groups', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
