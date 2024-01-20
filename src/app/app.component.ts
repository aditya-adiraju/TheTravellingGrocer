import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SampleService} from "./services/sample.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TheTravellingGrocer';
  constructor(public sample: SampleService) {
    // sample.sampleAPICall().pipe().subscribe(()=>console.log("YAY"))
  }
}
