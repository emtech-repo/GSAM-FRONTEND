import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPopupComponent } from './assign-popup.component';

describe('AssignPopupComponent', () => {
  let component: AssignPopupComponent;
  let fixture: ComponentFixture<AssignPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
