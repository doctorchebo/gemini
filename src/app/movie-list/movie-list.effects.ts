import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import * as MovieListActions from '../movie-list/store/movie-list.actions';
import { MovieRequest, MovieResponse } from './movie-requests.type';
import { Movie } from './movie.model';
import { Injectable } from '@angular/core';
@Injectable()
export class MovieListEffects {
  constructor(private http: HttpClient, private $actions: Actions) {}

//   fetchMovies = createEffect(() => {
//     return this.$actions.pipe(
//       ofType(MovieListActions.FETCH_MOVIES),
//       switchMap((actionData: MovieListActions.FetchMovies) => {
//         const { quantity, genre, characteristic, year } =
//           actionData.movieRequest;
//         const movieRequest: MovieRequest = {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `recommend 5 movies with the following criteria: ${quantity}, genre: ${genre}, year: ${year}, characteristics: ${characteristic}. Give back the response in json format with the following data if available: name: string, genge: string, cast: string[], synopsis: string, rating: number (based on average rating from 1 to 5 rotten tomatoes and imdb), imageUrl. each movie should have a url to an image of the movie poster in the response. provide urls that do work (not from wikipedia). Be very enthusiastic about the synopsis. Keep it short, but remember that your goal is to make the movies as appealing as possible. If you are not provided a quantoty, return 5 movies.`,
//                 },
//               ],
//             },
//           ],
//           generation_config: {
//             max_output_tokens: environment.max_output_tokens,
//             temperature: environment.temperature,
//           },
//         };
//         return this.http
//           .post<MovieResponse>(
//             `${environment.baseUrl}/${environment.version}/models/${environment.model}:generateContent`,
//             movieRequest
//           )
//           .pipe(
//             map((movieResponse: MovieResponse) => {
//               console.log(movieResponse);
//               const movies: Movie[] = JSON.parse(
//                 movieResponse.candidates[0].content.parts[0].text
//               );
//               console.log(movies);
//               return new MovieListActions.SetMovies(movies);
//             })
//           );
//       })
//     );
//   });
}
