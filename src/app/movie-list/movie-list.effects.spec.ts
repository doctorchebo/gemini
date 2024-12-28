import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AppModule } from '../app.module';
import { MovieListEffects } from './movie-list.effects';
import { MovieCompleteResponse, MovieRequestData } from './movie-requests.type';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import * as MovieListActions from './store/movie-list.actions'
describe('MovieListEffects', () => {
  let actions$ = new Observable<Action>();
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let effects: MovieListEffects;
  const initialState = { loading: false, movies: [], error: null };
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
        provideMockActions(() => actions$),
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    effects = TestBed.inject(MovieListEffects);
  });

  it('should load movies on success', () => {
    const action = new MovieListActions.FetchMovies(movieRequest);
    const outcome = new MovieListActions.SetMovies(movies);

    actions$ = hot('-a', { a: action });

    httpClientSpy.post.and.returnValue(cold('-b', { b: movieResponse }));

    const expected = cold('--b', { b: outcome });

    expect(effects.fetchMovies).toBeObservable(expected);
  });

  it('should return FetchFailed action when http request fails', () => {
    const action = new MovieListActions.FetchMovies(movieRequest);
    const outcome = new MovieListActions.FetchFailed('Fetch Failed')
    actions$ = hot('-a', {a: action})

    httpClientSpy.post.and.returnValue(cold('-#', {}, {message: 'Fetch Failed'}));

    const expected = cold('--b', {b: outcome})

    expect(effects.fetchMovies).toBeObservable(expected)

  })
});

const movies = [
  {
    name: 'The Nice Guys',
    genre: 'Comedy',
    year: 2016,
    director: 'Shane Black',
    cast: ['Ryan Gosling', 'Russell Crowe', 'Amy Adams'],
    synopsis:
      'A hilariously inept but surprisingly endearing duo of 1970s Los Angeles private investigators must navigate a series of bizarre murders and uncover a shocking conspiracy. Prepare for a wild ride as they stumble through a world of shady characters, quirky encounters, and an unexpected twist that will leave you gasping for air. This buddy cop flick is a delightful mix of detective work, witty dialogue, and unexpected turns! Get ready for a laugh riot!',
    rating: 4.0,
  },
  {
    name: 'Palm Springs',
    genre: 'Comedy',
    year: 2020,
    director: 'Max Barbakow',
    cast: ['Andy Samberg', 'Cristin Milioti'],
    synopsis:
      "Two strangers, stuck in a time loop at a wedding, must navigate the awkward complexities of their repetitive days and unearth a hilarious plot twist that will blow your mind! This quirky romantic comedy takes you on a comedic roller coaster filled with unexpected revelations. Get ready for a laugh-out-loud experience that's both hilarious and heartwarming.",
    rating: 4.2,
  },
  {
    name: 'Everything Everywhere All at Once',
    genre: 'Comedy',
    year: 2022,
    director: 'Daniel Kwan, Daniel Scheinert',
    cast: ['Michelle Yeoh', 'Ke Huy Quan', 'Stephanie Hsu'],
    synopsis:
      'Prepare to be blown away by this mind-bending comedy!  A stressed-out Chinese American immigrant struggles with family problems and a looming tax audit when her life is turned upside down by a multiverse-hopping adventure. This hilarious and heartwarming movie takes you on an epic journey through countless realities and unexpected twists that will keep you on the edge of your seat. Get ready for a visually stunning and emotionally resonant experience that’s completely unforgettable!',
    rating: 4.5,
  },
];

const movieResponse: MovieCompleteResponse = {
  candidates: [
    {
      content: {
        parts: [
          {
            text: '```json\n[\n  {\n    "name": "The Nice Guys",\n    "genre": "Comedy",\n    "year": 2016,\n    "director": "Shane Black",\n    "cast": [\n      "Ryan Gosling",\n      "Russell Crowe",\n      "Amy Adams"\n    ],\n    "synopsis": "A hilariously inept but surprisingly endearing duo of 1970s Los Angeles private investigators must navigate a series of bizarre murders and uncover a shocking conspiracy. Prepare for a wild ride as they stumble through a world of shady characters, quirky encounters, and an unexpected twist that will leave you gasping for air. This buddy cop flick is a delightful mix of detective work, witty dialogue, and unexpected turns! Get ready for a laugh riot!",\n    "rating": 4.0\n  },\n  {\n    "name": "Palm Springs",\n    "genre": "Comedy",\n    "year": 2020,\n    "director": "Max Barbakow",\n    "cast": [\n      "Andy Samberg",\n      "Cristin Milioti"\n    ],\n    "synopsis": "Two strangers, stuck in a time loop at a wedding, must navigate the awkward complexities of their repetitive days and unearth a hilarious plot twist that will blow your mind! This quirky romantic comedy takes you on a comedic roller coaster filled with unexpected revelations. Get ready for a laugh-out-loud experience that\'s both hilarious and heartwarming.",\n    "rating": 4.2\n  },\n  {\n    "name": "Everything Everywhere All at Once",\n    "genre": "Comedy",\n    "year": 2022,\n    "director": "Daniel Kwan, Daniel Scheinert",\n    "cast": [\n      "Michelle Yeoh",\n      "Ke Huy Quan",\n      "Stephanie Hsu"\n    ],\n    "synopsis": "Prepare to be blown away by this mind-bending comedy!  A stressed-out Chinese American immigrant struggles with family problems and a looming tax audit when her life is turned upside down by a multiverse-hopping adventure. This hilarious and heartwarming movie takes you on an epic journey through countless realities and unexpected twists that will keep you on the edge of your seat. Get ready for a visually stunning and emotionally resonant experience that’s completely unforgettable!",\n    "rating": 4.5\n  }\n]\n```',
          },
        ],
        role: 'model',
      },
      finishReason: 'STOP',
      index: 0,
      safetyRatings: [
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          probability: 'NEGLIGIBLE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          probability: 'NEGLIGIBLE',
        },
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          probability: 'NEGLIGIBLE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          probability: 'NEGLIGIBLE',
        },
      ],
    },
  ],
  usageMetadata: {
    promptTokenCount: 162,
    candidatesTokenCount: 517,
    totalTokenCount: 679,
  },
  modelVersion: 'gemini-1.5-flash-8b-exp-0827',
};
