import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalInterfaceComponent } from './approval-interface.component';

describe('ApprovalInterfaceComponent', () => {
  let component: ApprovalInterfaceComponent;
  let fixture: ComponentFixture<ApprovalInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
