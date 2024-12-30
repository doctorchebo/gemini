import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor() { }

  searched = new BehaviorSubject<boolean>(false);

  searchMovies(){
    this.searched.next(true);
  }

  finishSearching(){
    this.searched.next(false);
  }
}

