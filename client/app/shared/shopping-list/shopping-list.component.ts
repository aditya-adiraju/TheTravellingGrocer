import {Component, importProvidersFrom, OnInit} from '@angular/core';
import {Item} from "../../constants/Item";
import {ShoppingListManagerService} from "../../services/shopping-list-manager.service";
import {GarbageCollectorComponent} from "../garbage-collector/garbage-collector.component";
import {takeUntil} from "rxjs";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {SearchItemsComponent} from "../search-items/search-items.component";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    NgForOf,
    MatIcon,
    SearchItemsComponent
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent extends GarbageCollectorComponent implements OnInit{
  items: Item[] = []

  constructor(private listManager: ShoppingListManagerService) {
    super();
  }

  closeShoppingWindow(){}

  remove(item:Item){
    this.listManager.removeItem(item.name)
  }

  updateShoppingList(){
    this.listManager.updateShoppingList()
  }

  ngOnInit(): void {
    this.listManager.getUpdatedShoppingList().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((list)=>{
      this.items = list.map((item)=>this.listManager.getItemData(item))
    })
  }
}
