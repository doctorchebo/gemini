import { TestBed } from "@angular/core/testing"
import { Movie } from "../movie.model"
import { FetchFailed, FetchMovies, SetMovies } from "./movie-list.actions"
import { movieListReducer } from "./movie-list.reducer"
import { FetchBackend } from "@angular/common/http"
import { MovieRequestData } from "../movie-requests.type"

describe('MovieReducer', ()=> {
    it('should add movies when setMovies action is triggered', ()=> {
        const initialState = {loading: false, movies: [], error: null}
        const movies: Movie[] = [{
            "name": "Dunkirk",
            "genre": "War",
            "year": 2017,
            "director": "Christopher Nolan",
            "cast": [
              "Fionn Whitehead",
              "Tom Hardy",
              "Kenneth Branagh"
            ],
            "synopsis": "Experience the sheer nerve-wracking desperation of the Dunkirk evacuation! Witness the harrowing struggle of Allied soldiers trapped on the beaches of France as they face the relentless enemy forces. A stunning cinematic experience that captures the sheer scale of the evacuation in a truly breathtaking way.  Watch as hope and heroism intertwine in this powerfully moving and visually captivating film.",
            "rating": 4.2
          },
          {
            "name": "The Pianist",
            "genre": "War",
            "year": 2002,
            "director": "Roman Polanski",
            "cast": [
              "Adrien Brody",
              "Thomas Kretschmann",
              "Frank Finlay"
            ],
            "synopsis": "Dive into the harrowing struggle of a Polish Jewish man as he navigates the treacherous landscape of the Warsaw Ghetto during World War II.  Witness his unwavering courage in the face of unimaginable suffering and the profound human spirit that never gives up. This unforgettable film will stay with you long after the credits roll.",
            "rating": 4.1
          },]

        const action = new SetMovies(movies);
        const result = movieListReducer(initialState, action);

        expect(result.movies).toEqual(movies);
        expect(result.loading).toEqual(false);
    })

    it('should return error when fetchFail action triggers', ()=> {
        const initialState = {loading: false, movies: [], error: null}
        const error = "Fetch has failed"
        const action = new FetchFailed(error)
        const result = movieListReducer(initialState, action);

        expect(result.error).toEqual(error);
        expect(result.loading).toBeFalse();
    })

    it('should set loading to true then fetchMovies action is triggered',()=> {
        const initialState = {loading: false, movies: [], error: null};
        const movieRequest: MovieRequestData = {
            characteristic: "has a plot twist",
            genre:'horror',
            maxYear: '2024',
            minYear: '2010',
            quantity: 2
        }
        const action = new FetchMovies(movieRequest);
        const result = movieListReducer(initialState, action);

        expect(result.loading).toBeTrue();
    })
})