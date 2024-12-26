import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as MovieListActions from '../movie-list/store/movie-list.actions';
import * as fromApp from '../store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent implements OnInit, OnDestroy {
  constructor(public store: Store<fromApp.AppState>) {}
  movieForm!: FormGroup;
  loading = false;
  moviesSub!: Subscription;
  ngOnInit() {
    this.movieForm = new FormGroup({
      quantity: new FormControl(3),
      genre: new FormControl('Comedy'),
      minYear: new FormControl(2010),
      maxYear: new FormControl(new Date().getFullYear()),
      characteristic: new FormControl('It has a plot twist'),
    });

    this.moviesSub = this.store.select('movies').subscribe((moviesState) => {
      this.loading = moviesState.loading;
    });
  }
  genres: string[] = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film Noir',
    'History',
    'Horror',
    'Musical',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Sports',
    'Thriller',
    'War',
    'Western',
  ];
  minYear = 1900;
  maxYear = new Date().getFullYear();
  minQty = 1;
  maxQty = 5;
  year = 2024;
  quantity = 3;

  onSubmit() {
    console.log(this.movieForm.value);
    this.store.dispatch(new MovieListActions.FetchMovies(this.movieForm.value));
  }

  ngOnDestroy() {
      if(this.moviesSub){
        this.moviesSub.unsubscribe();
      }
  }
}
