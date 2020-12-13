import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-events-root',
  templateUrl: './events-root.component.html',
  styles: []
})
export class EventsRootComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    console.log('EVENTS ROOT');
  }

}
