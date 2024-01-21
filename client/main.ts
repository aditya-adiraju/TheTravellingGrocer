import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {importProvidersFrom} from "@angular/core";
import {SampleService} from "./app/services/sample.service";
import {AuthenticationPageComponent} from "./app/pages/authentication-page/authentication-page.component";
import {EditShoppingListPageComponent} from "./app/pages/edit-shopping-list-page/edit-shopping-list-page.component";
import {LandingPageComponent} from "./app/pages/landing-page/landing-page.component";
import {CommonModule} from "@angular/common";
import { provideAnimations } from '@angular/platform-browser/animations';
import { SigninPageComponent } from './app/pages/signin-page/signin-page.component';
import { MapComponent } from './app/pages/map/map.component';
import { LocationComponent } from './app/pages/location/location.component';
import { ShoppingComponent } from './app/pages/shopping/shopping.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'auth', component: AuthenticationPageComponent },
  { path: 'edit-shopping', component: EditShoppingListPageComponent },
  { path: 'signIn',component: SigninPageComponent},
  { path:'map', component: MapComponent},
  { path:'location',component:LocationComponent},
  { path:'shopping',component:ShoppingComponent},

];

bootstrapApplication(AppComponent, {
  providers: [
    {
        provide: 'photoUrl',
        useValue: 'https://picsum.photos',
    },
    { provide: SampleService, useClass: SampleService },
    importProvidersFrom(RouterModule.forRoot([...routes])),
    importProvidersFrom(HttpClientModule, BrowserModule, CommonModule, ),
    provideAnimations()
],
}).catch(err => console.error(err));
