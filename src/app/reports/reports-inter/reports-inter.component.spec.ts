import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInterComponent } from './reports-inter.component';

describe('ReportsInterComponent', () => {
  let component: ReportsInterComponent;
  let fixture: ComponentFixture<ReportsInterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsInterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportsInterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
