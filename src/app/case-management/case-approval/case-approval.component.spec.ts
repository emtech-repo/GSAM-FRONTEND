import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseApprovalComponent } from './case-approval.component';

describe('CaseApprovalComponent', () => {
  let component: CaseApprovalComponent;
  let fixture: ComponentFixture<CaseApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
