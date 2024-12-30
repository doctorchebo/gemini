import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor() { }

  searched = new Subject<boolean>;

  searchMovies(){
    this.searched.next(true);
  }

  finishSearching(){
    this.searched.next(false);
  }
}

