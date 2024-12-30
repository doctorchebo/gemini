import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Movie } from './movie.model';
@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrl: './movie-list.component.scss',
    standalone: false
})
export class MovieListComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  moviesSub!: Subscription;
  movies: Movie[] = [
  ];

  loading = false;
  ngOnInit() {
    this.moviesSub = this.store.select('movies').subscribe((moviesState) => {
      this.movies = moviesState.movies;
      this.loading = moviesState.loading;
    });
  }

  ngOnDestroy() {
    if (this.moviesSub) {
      this.moviesSub.unsubscribe();
    }
  }
}
