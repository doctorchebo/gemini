import { Action } from '@ngrx/store';
import { MovieRequestData } from '../movie-requests.type';
import { Movie } from '../movie.model';

export const SET_MOVIES = '[Movie List] Set Movies';
export const FETCH_MOVIES = '[Movie List] Fetch Movies';
export const FETCH_FAILED = '[Movie List] Fetch Failed';

export class SetMovies implements Action {
  readonly type = SET_MOVIES;
  constructor(public payload: Movie[]) {}
}

export class FetchMovies implements Action {
  readonly type = FETCH_MOVIES;
  constructor(public movieRequest: MovieRequestData) {}
}
export class FetchFailed implements Action {
  readonly type = FETCH_FAILED;
  constructor(public payload: string) {}
}

export type MovieListActions = SetMovies | FetchMovies | FetchFailed;
