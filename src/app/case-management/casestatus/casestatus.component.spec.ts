import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasestatusComponent } from './casestatus.component';

describe('CasestatusComponent', () => {
  let component: CasestatusComponent;
  let fixture: ComponentFixture<CasestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CasestatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
