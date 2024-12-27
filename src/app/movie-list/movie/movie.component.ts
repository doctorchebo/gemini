import { Component, Input } from '@angular/core';
import { Movie } from '../movie.model';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrl: './movie.component.scss',
    standalone: false
})
export class MovieComponent {
  @Input() movie!: Movie;
}
