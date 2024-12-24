import { Action } from '@ngrx/store';
import { MovieRequest, MovieRequestData } from '../movie-requests.type';
import { Movie } from '../movie.model';

export const SET_MOVIES = '[Movie List] Set Movies';
export const FETCH_MOVIES = '[Movie List] Fetch Movies';

export class SetMovies implements Action {
  readonly type = SET_MOVIES;
  constructor(public movies: Movie[]) {}
}

export class FetchMovies implements Action {
  readonly type = FETCH_MOVIES;
  constructor(public movieRequest: MovieRequestData) {}
}

export type MovieListActions = SetMovies | FetchMovies;
