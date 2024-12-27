import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as MovieListActions from '../movie-list/store/movie-list.actions';
import * as fromApp from '../store/app.reducer';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomeComponent implements OnInit {
  constructor(public store: Store<fromApp.AppState>) {}
  movieForm!: FormGroup;
  ngOnInit() {
    this.movieForm = new FormGroup({
      quantity: new FormControl(3),
      genre: new FormControl('Comedy'),
      minYear: new FormControl(2010),
      maxYear: new FormControl(new Date().getFullYear()),
      characteristic: new FormControl('It has a plot twist'),
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
}
