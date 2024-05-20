import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveClaimComponent } from './approve-claim.component';

describe('ApproveClaimComponent', () => {
  let component: ApproveClaimComponent;
  let fixture: ComponentFixture<ApproveClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveClaimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
