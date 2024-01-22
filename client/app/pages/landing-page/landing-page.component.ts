import { Component } from '@angular/core';
import { OutlineButtonComponent } from '../../shared/outline-button/outline-button.component';
import { LoginButtonComponent } from 'client/app/shared/login-button/login-button.component';
import { Router } from '@angular/router';
import { LoginButtonComponent } from 'client/app/shared/login-button/login-button.component';
import { LogoutButtonComponent } from 'client/app/shared/logout-button/logout-button.component';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [OutlineButtonComponent, LoginButtonComponent, LogoutButtonComponent],
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
  goToMap(){
    this.router.navigate(["map"]);

  }
}
