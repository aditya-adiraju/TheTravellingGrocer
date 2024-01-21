import {Component, OnInit} from '@angular/core';
import { OutlineButtonComponent } from '../../shared/outline-button/outline-button.component';
import { Router } from '@angular/router';
import {AuthService} from "@auth0/auth0-angular";
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [OutlineButtonComponent,],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  constructor(
    private router:Router,
    public auth:AuthService
  ){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(
      (isAuthed)=>console.log("User authentications status is: ", isAuthed)
    )
    }
  title = "The Traveling Grocer";

  login(){
    this.router.navigate(['signIn'])
  }
}
