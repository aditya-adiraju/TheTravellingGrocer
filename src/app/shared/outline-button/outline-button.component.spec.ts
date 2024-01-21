import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlineButtonComponent } from './outline-button.component';

describe('OutlineButtonComponent', () => {
  let component: OutlineButtonComponent;
  let fixture: ComponentFixture<OutlineButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutlineButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutlineButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
