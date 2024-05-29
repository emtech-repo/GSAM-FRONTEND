import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestructureFormComponent } from './restructure-form.component';

describe('RestructureFormComponent', () => {
  let component: RestructureFormComponent;
  let fixture: ComponentFixture<RestructureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestructureFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestructureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
