import { Component } from '@angular/core';
import {ShoppingListComponent} from "../../shared/shopping-list/shopping-list.component";

@Component({
  selector: 'app-edit-shopping-list-page',
  standalone: true,
  imports: [
    ShoppingListComponent
  ],
  templateUrl: './edit-shopping-list-page.component.html',
  styleUrl: './edit-shopping-list-page.component.css'
})
export class EditShoppingListPageComponent {

}
