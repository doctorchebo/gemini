import { ActionReducerMap } from '@ngrx/store';
import * as fromMovieList from '../movie-list/store/movie-list.reducer';
export interface AppState {
  movies: fromMovieList.State;
}
export const appReducer: ActionReducerMap<AppState, any> = {
  movies: fromMovieList.movieListReducer,
};
