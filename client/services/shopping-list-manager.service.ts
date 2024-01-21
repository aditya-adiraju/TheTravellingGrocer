import { Injectable } from '@angular/core';
import {Item} from "../constants/Item";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListManagerService {
  private updatedShoppingListSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  private accessibleShoppingListSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

  public addItem(item:string){
    if(item.length) this.updatedShoppingListSubject.next([...this.updatedShoppingListSubject.value, item])
  }

  public removeItem(item:string){
    this.updatedShoppingListSubject.next(
      [...this.updatedShoppingListSubject.value.filter((i:string)=> i != item)]
    )
  }

  getItemData(item:string):Item{
    return {
      name: item,
      description: "description of this item",
      price: 5,
      polygonName: "polygon"
    }
  }

  public updateShoppingList(){
    this.accessibleShoppingListSubject.next(this.updatedShoppingListSubject.value);
  }

  public getUpdatedShoppingList(){
    return this.updatedShoppingListSubject.asObservable()
  }

  public getAccessibleShoppingList(){
    return this.accessibleShoppingListSubject.asObservable();
  }
  constructor() { }
}
