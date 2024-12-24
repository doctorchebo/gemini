import { Movie } from '../movie.model';
import * as MovieListActions from './movie-list.actions';
export interface State {
  movies: Movie[];
}

const initialState: State = {
  movies: [],
};
export function movieListReducer(
  state = initialState,
  action: MovieListActions.MovieListActions
) {
  switch (action.type) {
    case MovieListActions.FETCH_MOVIES:
      return {
        ...state,
      };
    case MovieListActions.SET_MOVIES:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
}
