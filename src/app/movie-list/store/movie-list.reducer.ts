import { Movie } from '../movie.model';
import * as MovieListActions from './movie-list.actions';
export interface State {
  movies: Movie[];
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  movies: [],
  error: null,
  loading: false,
};
export function movieListReducer(
  state = initialState,
  action: MovieListActions.MovieListActions
) {
  switch (action.type) {
    case MovieListActions.FETCH_MOVIES:
      return {
        ...state,
        loading: true,
      };
    case MovieListActions.SET_MOVIES:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case MovieListActions.FETCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
}
