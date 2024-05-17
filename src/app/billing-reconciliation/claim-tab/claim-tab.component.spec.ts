import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimTabComponent } from './claim-tab.component';

describe('ClaimTabComponent', () => {
  let component: ClaimTabComponent;
  let fixture: ComponentFixture<ClaimTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClaimTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
