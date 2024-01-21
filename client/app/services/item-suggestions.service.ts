import {Injectable, OnInit} from '@angular/core';
import {DataService} from "../../main";
import {BehaviorSubject, Observable, takeUntil} from "rxjs";
import {Item} from "../constants/Item";
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemSuggestionsService{
  private itemSuggestions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private items: Item[] = [];
  constructor(private database: DataService) {
    database.getAllItems().subscribe((items)=>{
      this.items = items
      console.log(items, "SUGGESTION SERVICE")
    });
  }

  //Get an observable with items matching the most recent query
  getItemSuggestions(){
    return this.itemSuggestions.asObservable();
  }

  //update the suggestions when query changes
  updateItemSuggestions(query:string){
    this.database.getAllFilteredItems(query).subscribe((val:any)=>this.itemSuggestions.next(val.map((item:any)=>item.name)))
  }
}
