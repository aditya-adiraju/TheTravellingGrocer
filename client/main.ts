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
import {AuthModule} from "@auth0/auth0-angular";
import {AuthGuard} from "@auth0/auth0-angular";

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'auth',
    component: AuthenticationPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signIn',
    component: SigninPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'map',
    component: MapComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: EditShoppingListPageComponent,
    canActivate: [AuthGuard]
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    AuthGuard,
    {
        provide: 'photoUrl',
        useValue: 'https://picsum.photos',
    },
    { provide: SampleService, useClass: SampleService },
    importProvidersFrom(RouterModule.forRoot([...routes])),
    importProvidersFrom(
      HttpClientModule,
      BrowserModule,
      CommonModule,
    ),
    importProvidersFrom(
      AuthModule.forRoot({
      domain: 'dev-xgzzro0vp02f000y.us.auth0.com',
      clientId:'162Wa8ARJsbSB2UXaP94Cjoga9BVSDtF',
      authorizationParams: {
        redirect_uri:window.location.origin,
      }
    })),
    provideAnimations()
],
}).catch(err => console.error(err));
