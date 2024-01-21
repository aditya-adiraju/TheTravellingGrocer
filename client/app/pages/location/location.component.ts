import { Component } from '@angular/core';
import { TextFieldComponent } from 'client/app/shared/text-field/text-field.component';
import { OutlineButtonComponent } from 'client/app/shared/outline-button/outline-button.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-location',
  standalone: true,
  imports: [TextFieldComponent,OutlineButtonComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  constructor(private router:Router){}
  done = "Done";
  goToShopping(){
    this.router.navigate(["shopping"]);

  }
}
