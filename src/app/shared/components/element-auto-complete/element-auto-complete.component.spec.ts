import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ElementAutoCompleteComponent} from './element-auto-complete.component';

describe('ElementAutoCompleteComponent', () => {
  let component: ElementAutoCompleteComponent;
  let fixture: ComponentFixture<ElementAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementAutoCompleteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
