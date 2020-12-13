import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsRootComponent} from './events-root.component';

describe('EventsRootComponent', () => {
  let component: EventsRootComponent;
  let fixture: ComponentFixture<EventsRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsRootComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
