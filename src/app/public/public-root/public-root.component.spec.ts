import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicRootComponent} from './public-root.component';

describe('RootComponent', () => {
  let component: PublicRootComponent;
  let fixture: ComponentFixture<PublicRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicRootComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
