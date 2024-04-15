import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisonApprovalComponent } from './decison-approval.component';

describe('DecisonApprovalComponent', () => {
  let component: DecisonApprovalComponent;
  let fixture: ComponentFixture<DecisonApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecisonApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecisonApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
