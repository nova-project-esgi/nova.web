import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRootComponent } from './home-root.component';

describe('RootComponent', () => {
  let component: HomeRootComponent;
  let fixture: ComponentFixture<HomeRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
