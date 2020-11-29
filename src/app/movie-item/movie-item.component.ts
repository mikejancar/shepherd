import { Component, Input } from '@angular/core';

import { Movie } from '../models';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent {
  @Input() movie: Movie;
}
