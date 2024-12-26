import { ActionReducerMap } from '@ngrx/store';
import * as fromMovieList from '../movie-list/store/movie-list.reducer';
import * as fromHome from "../home/store/home.reducer"
export interface AppState {
  movies: fromMovieList.State;
  home: fromHome.State
}
export const appReducer: ActionReducerMap<AppState, any> = {
  movies: fromMovieList.movieListReducer,
  home: fromHome.homeReducer
};
