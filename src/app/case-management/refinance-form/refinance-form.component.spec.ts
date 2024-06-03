import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefinanceFormComponent } from './refinance-form.component';

describe('RefinanceFormComponent', () => {
  let component: RefinanceFormComponent;
  let fixture: ComponentFixture<RefinanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefinanceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefinanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
