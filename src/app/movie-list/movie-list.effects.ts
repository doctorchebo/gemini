import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import * as MovieListActions from '../movie-list/store/movie-list.actions';
import { MovieCompleteResponse, MovieRequest } from './movie-requests.type';
import { Movie } from './movie.model';
import { MovieListService } from './movie-list.service';
@Injectable()
export class MovieListEffects {
  constructor(private http: HttpClient, private actions$: Actions, private movieListService: MovieListService) {}

  fetchMovies = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieListActions.FETCH_MOVIES),
      switchMap((movieData: MovieListActions.FetchMovies) => {
        const { quantity, genre, characteristic, minYear, maxYear } =
          movieData.movieRequest;
        const movieRequest: MovieRequest = {
          contents: [
            {
              parts: [
                {
                  text: `Recommend ${quantity} movies with the following criteria: genre: ${genre}, year: from ${minYear} to ${maxYear}, characteristics: ${characteristic}. Give back the response in json format with the following data if available: name: string, genge: string, year: number, director: string, cast: string[], synopsis: string, rating: number (from 1 to 5. To determine the rating calculate the average rating from both rotten tomatoes and imdb. Return a single rating number). Be very enthusiastic about the synopsis. Keep it short, but remember that your goal is to make the movies as appealing as possible. Remember to only provide only ${quantity} recomendations. Your text response should not be inside any array, you should return the recommendations in an unnamed array. Either you return 1 recommendation or many, you must always return the recommendations in an array.`,
                },
              ],
            },
          ],
          generation_config: {
            max_output_tokens: environment.max_output_tokens,
            temperature: environment.temperature,
          },
        };
        return this.http
          .post<MovieCompleteResponse>(
            `${environment.baseUrl}/${environment.version}/models/${environment.model}:generateContent`,
            movieRequest,
            {
              params: new HttpParams().set('key', environment.googleApiKey),
            }
          )
          .pipe(
            map((movieResponse: MovieCompleteResponse) => {
              const jsonData =
                movieResponse.candidates[0].content.parts[0].text.replace(
                  /```json\n?|```/g,
                  ''
                );
              let movies: Movie[] = JSON.parse(jsonData);
              this.movieListService.finishSearching();
              return new MovieListActions.SetMovies(movies);
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                new MovieListActions.FetchFailed(errorResponse.message)
              );
            })
          );
      })
    );
  });
}
