import {Component, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-garbage-collector',
  standalone: true,
  imports: [],
  templateUrl: './garbage-collector.component.html',
  styleUrl: './garbage-collector.component.css'
})
export class GarbageCollectorComponent implements OnDestroy{
  protected unsubscribe: Subject<void> = new Subject<void>()
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
