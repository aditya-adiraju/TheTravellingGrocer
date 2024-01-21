import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShoppingListPageComponent } from './edit-shopping-list-page.component';

describe('EditShoppingListPageComponent', () => {
  let component: EditShoppingListPageComponent;
  let fixture: ComponentFixture<EditShoppingListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditShoppingListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditShoppingListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
