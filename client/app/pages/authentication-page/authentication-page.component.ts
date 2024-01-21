import { Component } from '@angular/core';
import { AuthComponent } from '../../shared/auth/auth.component';
import { OutlineButtonComponent } from 'client/app/shared/outline-button/outline-button.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authentication-page',
  standalone: true,
  imports: [AuthComponent,OutlineButtonComponent],
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.css'
})
export class AuthenticationPageComponent {
  constructor(private router:Router){}
}
