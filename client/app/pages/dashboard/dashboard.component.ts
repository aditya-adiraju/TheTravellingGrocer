import { Component } from '@angular/core';
import { GarbageCollectorComponent } from 'client/app/shared/garbage-collector/garbage-collector.component';
import { DataService } from 'client/main';
import { takeUntil } from 'rxjs';
import { NgForOf } from "@angular/common";
import Item from 'server/models/item';
import { deleteItemFromDb } from 'server/services/itemService';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent extends GarbageCollectorComponent {
  items: Item[] = []
  constructor(private database:DataService) {
    super();
    database.getAllItems().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(
      (values) => {
        console.log("Got all items!")
        this.items = values;
      }
    );
  }
  deleteItem(polygonName:string) {
    // deleteItemFromDb(polygonName);
    console.log("deleted item");
  }
}
