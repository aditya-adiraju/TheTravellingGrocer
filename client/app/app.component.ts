import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SampleService } from "./services/sample.service";
import { ShoppingListComponent } from "./shared/shopping-list/shopping-list.component";
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ShoppingListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TheTravellingGrocer';
  constructor() {
  }
}
