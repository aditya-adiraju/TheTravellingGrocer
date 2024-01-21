import { Injectable } from '@angular/core';
import {Item} from "../constants/Item";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListManagerService {
  private updatedShoppingListSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  private accessibleShoppingListSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  private LOCAL_STORAGE_KEY_UPDATED = 'updated-shopping-list';
  private LOCAL_STORAGE_KEY_ACCESSIBLE = 'accessible-shopping-list';

  public addItem(item:string){
    if(item.length) this.updatedShoppingListSubject.next([...this.updatedShoppingListSubject.value, item])
    this.updateLocalStorage()
  }

  public removeItem(item:string){
    this.updatedShoppingListSubject.next(
      [...this.updatedShoppingListSubject.value.filter((i:string)=> i != item)]
    )
    this.updateLocalStorage()
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
    this.updateLocalStorage()

  }

  public getUpdatedShoppingList(){
    return this.updatedShoppingListSubject.asObservable()
  }

  public getAccessibleShoppingList(){
    return this.accessibleShoppingListSubject.asObservable();
  }

  private updateLocalStorage(){
    localStorage.setItem(this.LOCAL_STORAGE_KEY_ACCESSIBLE, JSON.stringify(this.accessibleShoppingListSubject.value))
    localStorage.setItem(this.LOCAL_STORAGE_KEY_UPDATED, JSON.stringify(this.updatedShoppingListSubject.value))
  }

  private buildFromLocalStorage(){
    const access = localStorage.getItem(this.LOCAL_STORAGE_KEY_ACCESSIBLE);
    const update = localStorage.getItem(this.LOCAL_STORAGE_KEY_UPDATED);

    let accessArray:string[] = [];
    let updateArray:string[] = [];

    if(access) accessArray = JSON.parse(access);
    if(update) updateArray = JSON.parse(update);

    this.accessibleShoppingListSubject.next(accessArray)
    this.updatedShoppingListSubject.next(updateArray)
  }

  constructor() {
    this.buildFromLocalStorage()
  }
}
