import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsEventComponent } from './events-event.component';

describe('EventsEventComponent', () => {
  let component: EventsEventComponent;
  let fixture: ComponentFixture<EventsEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
