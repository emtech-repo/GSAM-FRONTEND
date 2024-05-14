import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAccountLookUpComponent } from './loan-account-look-up.component';

describe('LoanAccountLookUpComponent', () => {
  let component: LoanAccountLookUpComponent;
  let fixture: ComponentFixture<LoanAccountLookUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanAccountLookUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanAccountLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
