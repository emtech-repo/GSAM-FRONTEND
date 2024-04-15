import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingTabComponent } from './meeting-tab.component';

describe('MeetingTabComponent', () => {
  let component: MeetingTabComponent;
  let fixture: ComponentFixture<MeetingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
