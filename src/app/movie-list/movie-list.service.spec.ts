import { TestBed } from '@angular/core/testing';

import { MovieListService } from './movie-list.service';

describe('MovieListService', () => {
  let service: MovieListService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MovieListService] });
    service = TestBed.inject(MovieListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for the searched subject after calling searchMovies', (done: DoneFn) => {
    service.searchMovies();
    service.searched.subscribe((searched) => {
      expect(searched).toBeTrue();
      done();
    });
  });

  it('should return false for the searched subject after calling finishSearching', (done: DoneFn)=> {
    service.finishSearching();
    service.searched.subscribe((searched)=> {
      expect(searched).toBeFalse();
      done();
    })
  })
});
