import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInterComponent } from './contract-inter.component';

describe('ContractInterComponent', () => {
  let component: ContractInterComponent;
  let fixture: ComponentFixture<ContractInterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractInterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractInterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
