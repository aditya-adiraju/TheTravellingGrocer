import { Component } from '@angular/core';
import { OutlineButtonComponent } from '../../shared/outline-button/outline-button.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [OutlineButtonComponent,],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(private router:Router){}
  title = "The Traveling Grocer";
  gotonext(){
    this.router.navigate(["auth"]);
  }
  goToSignIn(){
    console.log("hello world");
    this.router.navigate(["signIn"]);

  }
}
