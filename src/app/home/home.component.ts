import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  movieForm!: FormGroup;
  ngOnInit() {
    this.movieForm = new FormGroup({
      quantity: new FormControl(10),
      genre: new FormControl('Comedy'),
      year: new FormControl(2024),
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
  maxQty = 10;
  year = 2024;
  quantity = 5;

  onSubmit() {}
}
