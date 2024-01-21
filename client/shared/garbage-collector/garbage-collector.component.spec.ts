import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageCollectorComponent } from './garbage-collector.component';

describe('GarbageCollectorComponent', () => {
  let component: GarbageCollectorComponent;
  let fixture: ComponentFixture<GarbageCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageCollectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GarbageCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
