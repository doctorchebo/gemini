import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from './store/app.reducer';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  movieSub!: Subscription;
  rows = 6;
  ngOnInit() {
    this.movieSub = this.store.select('movies').subscribe((movieState) => {
      // this.rows =
      //   movieState.movies.length == 0
      //     ? this.rows
      //     : movieState.movies.length * 5 + 1;

      this.rows = 5 * 4 + 1;
    });
  }

  ngOnDestroy() {
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }
  }
}
