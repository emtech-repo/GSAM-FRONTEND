import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCaseComponent } from './modify-case.component';

describe('ModifyCaseComponent', () => {
  let component: ModifyCaseComponent;
  let fixture: ComponentFixture<ModifyCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyCaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
