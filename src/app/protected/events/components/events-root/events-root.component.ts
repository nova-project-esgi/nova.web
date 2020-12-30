import {Component, OnInit} from '@angular/core';


import {Store} from '@ngrx/store';

@Component({
  selector: 'app-events-root',
  templateUrl: './events-root.component.html',
  styles: []
})
export class EventsRootComponent implements OnInit {



  ngOnInit(): void {
    console.log('EVENTS ROOT');
  }

}
