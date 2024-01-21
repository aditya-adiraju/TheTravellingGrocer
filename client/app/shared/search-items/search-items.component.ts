import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ShoppingListManagerService} from "../../services/shopping-list-manager.service";
import {ItemSuggestionsService} from "../../services/item-suggestions.service";
import {GarbageCollectorComponent} from "../garbage-collector/garbage-collector.component";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-search-items',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './search-items.component.html',
  styleUrl: './search-items.component.css'
})
export class SearchItemsComponent extends GarbageCollectorComponent implements OnInit{
  searchTerm: string = "";
  filteredItems: string[] = ["Bob", "Jimmy", "Pearl", "Davies", "Edgar"];
  showSuggestions: boolean = false;

  constructor(
    private listManager: ShoppingListManagerService,
    private suggestions: ItemSuggestionsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.suggestions.getItemSuggestions().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((suggestions)=>this.filteredItems = suggestions)
  }

  onInputChange(){
    if(this.searchTerm.length) this.showSuggestions = true;
    else this.showSuggestions = false;

    this.suggestions.updateItemSuggestions(this.searchTerm)
  }

  selectItem(item:string){
    this.searchTerm = "";
    this.showSuggestions = false;

    //Add item to shopping list
    this.listManager.addItem(item);
  }
}
