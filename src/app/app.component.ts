import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MovieListService } from './movie-list/movie-list.service';
import { ScreenService } from './shared/screen.service';
import * as fromApp from './store/app.reducer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromApp.AppState>,
    private movieListService: MovieListService,
    private screenService: ScreenService
  ) {}
  movieSub!: Subscription;
  rows = 21;
  isMobileView = false;

  ngOnInit() {
    this.screenService.isBelowLg().subscribe((isBelowLg) => {
      this.isMobileView = isBelowLg.matches;
    });

    this.movieSub = this.store.select('movies').subscribe((movieState) => {
      if (movieState.movies.length > 0) {
        this.rows = movieState.movies.length * 4 + 1;
      }
    });

    this.movieListService.searched.subscribe((searched) => {
      if (searched) {
        this.rows = 6;
      }
    });
  }

  ngOnDestroy() {
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }
  }
}
