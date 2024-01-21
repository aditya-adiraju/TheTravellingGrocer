import { TestBed } from '@angular/core/testing';

import { ShoppingListManagerService } from './shopping-list-manager.service';

describe('RouteManagerService', () => {
  let service: ShoppingListManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
