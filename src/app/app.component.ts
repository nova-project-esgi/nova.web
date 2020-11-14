import { Component } from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-home-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nova-web';
  loading: boolean;
  constructor(router: Router) {
    this.loading = false;
    router.events.subscribe(
      (event: any): void => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (event instanceof NavigationEnd) {
          this.loading = false;
        }
      }
    );
  }
}
