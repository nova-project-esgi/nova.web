import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterRootComponent} from './register-root.component';

describe('RegisterRootComponent', () => {
  let component: RegisterRootComponent;
  let fixture: ComponentFixture<RegisterRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterRootComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
