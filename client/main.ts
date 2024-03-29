import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { importProvidersFrom, Injectable} from '@angular/core';
import { SampleService } from './app/services/sample.service';
import { AuthenticationPageComponent } from './app/pages/authentication-page/authentication-page.component';
import { EditShoppingListPageComponent } from './app/pages/edit-shopping-list-page/edit-shopping-list-page.component';
import { LandingPageComponent } from './app/pages/landing-page/landing-page.component';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SigninPageComponent } from './app/pages/signin-page/signin-page.component';
import { MapComponent } from './app/pages/map/map.component';
import { LocationComponent } from './app/pages/location/location.component';
import { ShoppingComponent } from './app/pages/shopping/shopping.component';
import { Observable } from 'rxjs';
import { AuthGuard } from '@auth0/auth0-angular';
import { DashboardComponent } from './app/pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'auth', component: AuthenticationPageComponent },
  { path: 'edit-shopping', component: EditShoppingListPageComponent },
  { path: 'signIn', component: SigninPageComponent },
  { path: 'map', component: MapComponent },
  { path: 'location', component: LocationComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@Injectable({
  providedIn: 'root',
})

export class DataService {
  private apiUrl = 'http://localhost:3000/api/data'; // Change this to be more dynamic

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllItems`);
  }

  addItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addItem`, item);
  }

  deleteItem(polygonName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/deleteItem`, {polygonName});
  }

  getAllFilteredItems(q: string) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/data/getAllFilteredItems', JSON.stringify({query: q}), {
      headers: headers
    })
  }

  getOptimalRoute(arr: number[][]) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    const result = this.http.post('http://localhost:3000/api/data/getOptimalRoute', JSON.stringify({array: arr}), {
      headers: headers
    })

    return result;
  }
}

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
