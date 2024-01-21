import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-outline-button',
  standalone: true,
  imports: [],
  templateUrl: './outline-button.component.html',
  styleUrl: './outline-button.component.css'
})
export class OutlineButtonComponent {
    @Input({required:true}) buttonText = '';
    
}
