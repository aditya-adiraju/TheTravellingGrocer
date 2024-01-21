import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {importProvidersFrom} from "@angular/core";
import {SampleService} from "./app/services/sample.service";
import {AuthenticationPageComponent} from "./app/pages/authentication-page/authentication-page.component";
import {EditShoppingListPageComponent} from "./app/pages/edit-shopping-list-page/edit-shopping-list-page.component";
import {LandingPageComponent} from "./app/pages/landing-page/landing-page.component";
import { SigninPageComponent } from './app/pages/signin-page/signin-page.component';
import { MapComponent } from './app/pages/map/map.component';


const routes: Routes = [
  { path: 'auth', component: AuthenticationPageComponent },
  { path: 'edit-shopping', component: EditShoppingListPageComponent },
  { path:'**', component: LandingPageComponent},
  { path: 'signIn',component: SigninPageComponent},
  // create a path to signup page
  { path:'**', component: MapComponent}

];

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: 'photoUrl',
      useValue: 'https://picsum.photos',
    },
    {provide: SampleService, useClass: SampleService },
    importProvidersFrom(RouterModule.forRoot([...routes])),
    importProvidersFrom(HttpClientModule)
  ],
}).catch(err => console.error(err));
