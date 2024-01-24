import { TestBed } from '@angular/core/testing';

import { RouteSolverService } from './route-solver.service';

describe('RouterSolverService', () => {
  let service: RouteSolverService
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
