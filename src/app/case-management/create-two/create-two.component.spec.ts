import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTwoComponent } from './create-two.component';

describe('CreateTwoComponent', () => {
  let component: CreateTwoComponent;
  let fixture: ComponentFixture<CreateTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
