import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiMovie, Movie, MovieProviders } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMovies(provider: MovieProviders, token?: string): Observable<Movie[]> {
    return this.http
      .get(`${this.apiUrl}/movies/${provider}?token=${token}`)
      .pipe(
        map((resp: ApiMovie[]) =>
          resp.map((apiMovie) => ({
            title: this.cleanTitle(apiMovie.title),
            coverImage: this.fixImageUrl(apiMovie.coverImage, provider),
            providers: [provider],
          }))
        )
      );
  }

  private cleanTitle(title: string): string {
    return title.replace(/\s\(.*\)/g, '');
  }

  private fixImageUrl(original: string, provider: MovieProviders): string {
    if (provider === MovieProviders.MoviesAnywhere) {
      return `https:${original}.jpg`;
    }
    return original;
  }
}
