import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { ScreenService } from '../../shared/screen.service';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrl: './movie.component.scss',
    standalone: false
})
export class MovieComponent implements OnInit{
  constructor(private screenService: ScreenService){}
  @Input() movie: Movie | undefined;
  smallWindowSize = false
  ngOnInit(){
    this.screenService.isBelowSm().subscribe((isBelowSm)=> {
      console.log(isBelowSm)
      this.smallWindowSize = isBelowSm.matches ? true : false;
    })
  }
}
