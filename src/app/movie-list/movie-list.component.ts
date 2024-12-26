import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Movie } from './movie.model';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  moviesSub!: Subscription;
  movies: Movie[] = [
    // {
    //   name: 'When Harry Met Sally...',
    //   genre: 'Romance',
    //   year: 1989,
    //   director: 'Rob Reiner',
    //   cast: ['Billy Crystal', 'Meg Ryan', 'Carrie Fisher'],
    //   synopsis:
    //     'A classic tale of friendship and love that explores the complex dynamics of relationships between men and women, culminating in a heartwarming and hilarious journey of self-discovery. This charming movie about two lifelong friends exploring the intricacies of love is absolutely delightful, a must-watch for anyone who enjoys quirky and romantic comedies. Get ready for witty banter, endearing moments, and a captivating exploration of the human heart.',
    //   rating: 4.2,
    // },
    // {
    //   name: "You've Got Mail",
    //   genre: 'Romance',
    //   year: 1998,
    //   director: 'Nora Ephron',
    //   cast: ['Tom Hanks', 'Meg Ryan', 'Greg Kinnear'],
    //   synopsis:
    //     'Prepare for a whirlwind romance between two strangers who connect via online interactions, leading to an unexpected and touching journey of love and friendship. An incredibly charming and amusing movie! Experience the hilarious misunderstandings, the sweet moments of connection, and a truly heartwarming story of love in the digital age.',
    //   rating: 3.9,
    // },
    // {
    //   name: 'Sleepless in Seattle',
    //   genre: 'Romance',
    //   year: 1993,
    //   director: 'Nora Ephron',
    //   cast: ['Tom Hanks', 'Meg Ryan', 'Ross Malinger'],
    //   synopsis:
    //     "Experience a captivating love story, where a widower's heartfelt search for a companion resonates across the country, leading to an unexpected meeting and a blossoming romance. You will be completely charmed by this movie's touching message and captivating narrative. Enjoy a rollercoaster of emotions as you follow the heartwarming tale of a love that spans distances and transcends time.",
    //   rating: 4.0,
    // },
    // {
    //   name: 'Notting Hill',
    //   genre: 'Romance',
    //   year: 1999,
    //   director: 'Roger Michell',
    //   cast: ['Hugh Grant', 'Julia Roberts', 'Rhys Ifans'],
    //   synopsis:
    //     'Dive into a heartwarming tale of a bookstore owner in London who finds himself unexpectedly swept up in a whirlwind romance with a renowned Hollywood actress. Experience the infectious energy, witty banter, and beautiful chemistry between the lead characters. This movie is a must-watch for anyone who appreciates genuine romance and heartwarming stories of finding love in the most unexpected places. Get ready to be captivated by this movie!',
    //   rating: 3.8,
    // },
  ];

  loading = false;
  ngOnInit() {
    this.moviesSub = this.store.select('movies').subscribe((moviesState) => {
      console.log(moviesState);
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
