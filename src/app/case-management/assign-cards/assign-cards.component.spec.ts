import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCardsComponent } from './assign-cards.component';

describe('AssignCardsComponent', () => {
  let component: AssignCardsComponent;
  let fixture: ComponentFixture<AssignCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
