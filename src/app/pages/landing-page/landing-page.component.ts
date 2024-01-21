import { Component } from '@angular/core';
import { OutlineButtonComponent } from '../../shared/outline-button/outline-button.component';
import { HeroComponent } from '../../shared/hero/hero.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [OutlineButtonComponent,HeroComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(private router:Router){}
  title = "The Traveling Grocer";
  gotonext(){
    this.router.navigate(["auth"]);
  }
}
