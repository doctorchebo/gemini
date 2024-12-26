import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as HomeActions from '../home/store/home.actions';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}
  isDarkMode = false;
  ngOnInit() {
    this.store.select('home').subscribe((homeState) => {
      this.isDarkMode = homeState.isDarkMode;
      console.log('isDarkMode', this.isDarkMode);
    });
  }
  onToggleDarkMode() {
    this.store.dispatch(new HomeActions.SetDarkMode(!this.isDarkMode));
  }
}
