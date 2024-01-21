import { Component } from '@angular/core';
import { AuthComponent } from '../../shared/auth/auth.component';
@Component({
  selector: 'app-authentication-page',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.css'
})
export class AuthenticationPageComponent {

}
