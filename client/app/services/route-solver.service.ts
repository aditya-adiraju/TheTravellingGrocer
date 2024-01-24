import { Injectable } from '@angular/core';
import { DataService } from '../../main';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteSolverService {
  private routeSolver: BehaviorSubject<number[]> = new BehaviorSubject<
    number[]
  >([]);

  constructor(private database: DataService) {}

  // Get an observable with items matching the most recent query
  getSolvedRoute() {
    return this.routeSolver.asObservable();
  }

  // Update the suggestions when query changes
  updateSolvedRoute(coordinates: number[][]) {
    this.database.getOptimalRoute(coordinates).subscribe((val: any) => {
      this.routeSolver.next(val);
      console.log(val, 'VAL');
    });
  }
}
