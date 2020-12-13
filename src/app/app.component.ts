import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectConnectedUser} from './core/state/user/user.selectors';
import {authenticateRememberedUser} from './core/state/user/user.actions';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {DimensionsDirective} from './shared/directives/dimensions.directive';

@Component({
  selector: 'app-home-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(NavbarComponent)
  navBar: NavbarComponent;

  @ViewChild(DimensionsDirective)
  containerDimensions: DimensionsDirective;


  title = 'nova-web';
  loading: boolean;

  constructor(router: Router, private store: Store) {
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

  ngOnInit(): void {
    this.store.select(selectConnectedUser).subscribe(user => {
      if (!user) {
        this.store.dispatch(authenticateRememberedUser());
      }
      console.log(user);
    });
  }

}
