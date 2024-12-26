import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from "./store/app.reducer"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private store: Store<fromApp.AppState>){}
  rows = 6
  ngOnInit(){
    this.store.select('movies').subscribe((movieState)=> {
      this.rows = movieState.movies.length == 0 ? this.rows : movieState.movies.length * 4 + 1
    })
  }
}
