import { Component } from '@angular/core';
import { TextFieldComponent } from 'client/app/shared/text-field/text-field.component';
import { OutlineButtonComponent } from 'client/app/shared/outline-button/outline-button.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [TextFieldComponent,OutlineButtonComponent],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css'
})
export class SigninPageComponent {
  constructor(private router:Router){}
  buttonText = "Go";
  username = "UserName";
  password = "Password";
  goToLocation(){
    console.log("Hello");
    this.router.navigate(["location"]);
  }
}
