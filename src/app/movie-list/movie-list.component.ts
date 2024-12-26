import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Movie } from './movie.model';
import * as MovieListActions from "./store/movie-list.actions"
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  moviesSub!: Subscription;
  movies: Movie[] = [
    {
      "name": "Saving Private Ryan",
      "genre": "War",
      "year": 1998,
      "director": "Steven Spielberg",
      "cast": [
        "Tom Hanks",
        "Matt Damon",
        "Tom Sizemore",
        "Edward Burns"
      ],
      "synopsis": "A harrowing and unforgettable depiction of the horrors of war, *Saving Private Ryan* plunges you into the heart of the D-Day invasion, as a team of American soldiers undertakes a perilous mission to rescue a paratrooper's younger brother.  Witness the brutal realities of combat, from the sheer terror of the initial assault to the agonizing aftermath, in a masterpiece of cinematic storytelling. Prepare to be emotionally gripped by this epic and unflinching portrayal of war's devastating cost.",
      "rating": 4.5
    },
    {
      "name": "Dunkirk",
      "genre": "War",
      "year": 2017,
      "director": "Christopher Nolan",
      "cast": [
        "Fionn Whitehead",
        "Tom Hardy",
        "Kenneth Branagh"
      ],
      "synopsis": "Experience the sheer nerve-wracking desperation of the Dunkirk evacuation! Witness the harrowing struggle of Allied soldiers trapped on the beaches of France as they face the relentless enemy forces. A stunning cinematic experience that captures the sheer scale of the evacuation in a truly breathtaking way.  Watch as hope and heroism intertwine in this powerfully moving and visually captivating film.",
      "rating": 4.2
    },
    {
      "name": "The Pianist",
      "genre": "War",
      "year": 2002,
      "director": "Roman Polanski",
      "cast": [
        "Adrien Brody",
        "Thomas Kretschmann",
        "Frank Finlay"
      ],
      "synopsis": "Dive into the harrowing struggle of a Polish Jewish man as he navigates the treacherous landscape of the Warsaw Ghetto during World War II.  Witness his unwavering courage in the face of unimaginable suffering and the profound human spirit that never gives up. This unforgettable film will stay with you long after the credits roll.",
      "rating": 4.1
    },
    {
      "name": "Band of Brothers",
      "genre": "War",
      "year": 2001,
      "director": "various",
      "cast": [
        "Damian Lewis",
        "Scott Grimes",
        "Ron Livingston"
      ],
      "synopsis": "Experience the incredible bravery, profound losses and powerful bond between a group of United States Army paratroopers as they participate in various crucial WWII engagements. *Band of Brothers* is a meticulously researched historical drama that masterfully intertwines the personal stories of these brave men. Witness the immense sacrifices they made, the battles they endured, and the unbreakable camaraderie that developed amongst them.  An absolutely essential watch for any fan of war films or WWII history!",
      "rating": 4.4
    },
    {
      "name": "Schindler's List",
      "genre": "War",
      "year": 1993,
      "director": "Steven Spielberg",
      "cast": [
        "Liam Neeson",
        "Ralph Fiennes",
        "Ben Kingsley"
      ],
      "synopsis": "A gripping and unforgettable story of Oskar Schindler, a German industrialist, and his unexpected role in saving the lives of approximately 1,200 Polish-Jewish refugees during the Holocaust. This powerful film captures the atrocities and immense courage during one of the most harrowing periods in human history. You will be moved and shaken to your core by this incredibly moving masterpiece.",
      "rating": 4.6
    }
  ];

  loading = false;
  ngOnInit() {
    this.moviesSub = this.store.select('movies').subscribe((moviesState) => {
      console.log(moviesState);
      // this.movies = moviesState.movies;
      this.loading = moviesState.loading;
    });
  }

  ngOnDestroy() {
    if (this.moviesSub) {
      this.moviesSub.unsubscribe();
    }
  }
}
