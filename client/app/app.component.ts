import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SampleService } from "./services/sample.service";
import { ShoppingListComponent } from "./shared/shopping-list/shopping-list.component";
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import {solveTSP} from "./utils/tsp";

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
    const adjacencyMatrix: number[][] = [
      [0, 1, 2, 0],
      [1, 0, 0, 3],
      [2, 0, 0, 4],
      [0, 3, 4, 0]
    ];

    const result: number[] = solveTSP(adjacencyMatrix);
    console.log(result);
  }
}
