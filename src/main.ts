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
import {ShoppingListComponent} from "./app/shared/shopping-list/shopping-list.component";
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'auth', component: AuthenticationPageComponent },
  { path: 'edit-shopping', component: EditShoppingListPageComponent },
  { path:'**', component: LandingPageComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    {
        provide: 'photoUrl',
        useValue: 'https://picsum.photos',
    },
    { provide: SampleService, useClass: SampleService },
    importProvidersFrom(RouterModule.forRoot([...routes])),
    importProvidersFrom(HttpClientModule, BrowserModule, CommonModule),
    provideAnimations()
],
}).catch(err => console.error(err));
