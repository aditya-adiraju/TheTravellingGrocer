import { Component } from '@angular/core';
import { OutlineButtonComponent } from '../../shared/outline-button/outline-button.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [OutlineButtonComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  title = "The Traveling Grocer";
  gotonext(){
    console.log("Hello world");

  }
}
