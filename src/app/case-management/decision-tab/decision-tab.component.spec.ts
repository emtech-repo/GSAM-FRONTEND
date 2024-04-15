import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionTabComponent } from './decision-tab.component';

describe('DecisionTabComponent', () => {
  let component: DecisionTabComponent;
  let fixture: ComponentFixture<DecisionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecisionTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecisionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
