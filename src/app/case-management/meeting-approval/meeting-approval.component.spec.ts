import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingApprovalComponent } from './meeting-approval.component';

describe('MeetingApprovalComponent', () => {
  let component: MeetingApprovalComponent;
  let fixture: ComponentFixture<MeetingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
