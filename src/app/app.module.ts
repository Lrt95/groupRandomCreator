import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { GroupComponent } from './group/group.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from '@angular/forms';
import {AlertComponent} from './shared/Alert/alert.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FooterComponent} from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HistoriqueComponent } from './historique/historique.component';
import { CreateGroupComponent } from './create-group/create-group.component';




@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    GroupComponent,
    LoadingSpinnerComponent,
    AuthComponent,
    AlertComponent,
    FooterComponent,
    HistoriqueComponent,
    CreateGroupComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MDBBootstrapModule.forRoot(),
        BrowserAnimationsModule,
        MatSliderModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule

    ],
  providers: [UsersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
