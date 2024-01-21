import { TestBed } from '@angular/core/testing';

import { ItemSuggestionsService } from './item-suggestions.service';

describe('ItemSuggestionsService', () => {
  let service: ItemSuggestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemSuggestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
