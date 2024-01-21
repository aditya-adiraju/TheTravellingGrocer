import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InternalMarker } from '@mappedin/mappedin-js/renderer/internal';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.css'
})
export class TextFieldComponent {
  @Output()InnerText:EventEmitter<string> = new EventEmitter<string>();
  @Input() label = '';
  dogwater(){
  this.InnerText.emit("word");  

  }
}
