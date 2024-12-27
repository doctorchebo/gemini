import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { MovieListEffects } from './movie-list.effects';
import { MovieRequestData } from './movie-requests.type';
import {
  FetchFailed,
  FetchMovies,
  SetMovies,
} from './store/movie-list.actions';
describe('MovieListEffects', () => {
  let store: MockStore;
  let effects: MovieListEffects;
  const initialState = { loading: false, movies: [], error: null };
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const movieRequest: MovieRequestData = {
    characteristic: 'has a plot twist',
    genre: 'horror',
    maxYear: '2024',
    minYear: '2010',
    quantity: 2,
  };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    store = TestBed.inject(MockStore);
    effects = TestBed.inject(MovieListEffects);
  });

  it('should load movies on success', () => {
    const movies = [
      {
        name: 'Dunkirk',
        genre: 'War',
        year: 2017,
        director: 'Christopher Nolan',
        cast: ['Fionn Whitehead', 'Tom Hardy', 'Kenneth Branagh'],
        synopsis:
          'Experience the sheer nerve-wracking desperation of the Dunkirk evacuation! Witness the harrowing struggle of Allied soldiers trapped on the beaches of France as they face the relentless enemy forces. A stunning cinematic experience that captures the sheer scale of the evacuation in a truly breathtaking way.  Watch as hope and heroism intertwine in this powerfully moving and visually captivating film.',
        rating: 4.2,
      },
      {
        name: 'The Pianist',
        genre: 'War',
        year: 2002,
        director: 'Roman Polanski',
        cast: ['Adrien Brody', 'Thomas Kretschmann', 'Frank Finlay'],
        synopsis:
          'Dive into the harrowing struggle of a Polish Jewish man as he navigates the treacherous landscape of the Warsaw Ghetto during World War II.  Witness his unwavering courage in the face of unimaginable suffering and the profound human spirit that never gives up. This unforgettable film will stay with you long after the credits roll.',
        rating: 4.1,
      },
    ];
    const action = new FetchMovies(movieRequest);
    const outcome = new SetMovies(movies);

    httpClientSpy.post.and.returnValue(of(outcome));

    store.dispatch(action);

    effects.fetchMovies.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
    });
  });

  it('should dispatch FetchFailed action if API called fails', () => {
    const action = new FetchMovies(movieRequest);
    const outcome = new FetchFailed('Fetch Failed');

    httpClientSpy.post.and.returnValue(of(new Error('Fetch Failed')));

    store.dispatch(action);
    effects.fetchMovies.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
    });
  });
});
