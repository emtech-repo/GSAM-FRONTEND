import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTabComponent } from './contract-tab.component';

describe('ContractTabComponent', () => {
  let component: ContractTabComponent;
  let fixture: ComponentFixture<ContractTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
