import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as HomeActions from '../home/store/home.actions';
import * as fromApp from '../store/app.reducer';
import { ThemeService } from '../services/theme.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly themeService = inject(ThemeService)
  constructor(private store: Store<fromApp.AppState>) {}
  homeSub!: Subscription;
  isDarkMode = false;
  ngOnInit() {
    this.homeSub = this.store.select('home').subscribe((homeState) => {
      this.isDarkMode = homeState.isDarkMode;
    });
  }
  onToggleDarkMode() {
    this.themeService.toggleTheme();
  }

  ngOnDestroy() {
    if (this.homeSub) {
      this.homeSub.unsubscribe();
    }
  }
}
