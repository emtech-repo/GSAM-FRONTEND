import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestructureComponent } from './restructure.component';

describe('RestructureComponent', () => {
  let component: RestructureComponent;
  let fixture: ComponentFixture<RestructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestructureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
