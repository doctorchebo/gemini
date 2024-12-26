import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as HomeActions from '../home/store/home.actions';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  homeSub!: Subscription;
  isDarkMode = false;
  ngOnInit() {
    this.homeSub = this.store.select('home').subscribe((homeState) => {
      this.isDarkMode = homeState.isDarkMode;
    });
  }
  onToggleDarkMode() {
    this.store.dispatch(new HomeActions.SetDarkMode(!this.isDarkMode));
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  }

  ngOnDestroy() {
    if (this.homeSub) {
      this.homeSub.unsubscribe();
    }
  }
}
