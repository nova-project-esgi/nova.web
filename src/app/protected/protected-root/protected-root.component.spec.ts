import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProtectedRootComponent} from './protected-root.component';

describe('ProtectedRootComponent', () => {
  let component: ProtectedRootComponent;
  let fixture: ComponentFixture<ProtectedRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectedRootComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
