import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdocumentComponent } from './searchdocument.component';

describe('SearchdocumentComponent', () => {
  let component: SearchdocumentComponent;
  let fixture: ComponentFixture<SearchdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchdocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
