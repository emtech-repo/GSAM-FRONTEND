import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesStatusComponent } from './cases-status.component';

describe('CasesStatusComponent', () => {
  let component: CasesStatusComponent;
  let fixture: ComponentFixture<CasesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CasesStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
