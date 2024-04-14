import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTrackingComponent } from './case-tracking.component';

describe('CaseTrackingComponent', () => {
  let component: CaseTrackingComponent;
  let fixture: ComponentFixture<CaseTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
