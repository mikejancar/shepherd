import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Movie, MovieProviders } from '../models';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieList$: BehaviorSubject<Movie[]> = new BehaviorSubject([]);
  filters: string[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    const moviesAnywhereToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFmNjlhYmZiLTlkMTMtNGI2MC05ZTg2LWMzYjU1N2U5Y2JjOCJ9.eyJzdWIiOiI0YjdiOTA2Zi1mNWUyLTQxYzEtOTU1ZS00YmRhNzRiZDJiODQiLCJhdWQiOlsiRE1BIiwic2VudHJ5Il0sInN1Yl90eXBlIjoiQ09SRV9JRCIsInByb2ZpbGVfaWQiOiI3NjgyY2Q3Yy03NmYxLTQ4ODYtOThiMi02MzU0YzgwMTIwYWEiLCJzY29wZSI6WyJtYS1wcm9kdWN0aW9uIl0sImlzcyI6Imh0dHBzOi8vc2VudHJ5Lm1vdmllc2FueXdoZXJlLmNvbS9pZG0iLCJleHAiOjE2MDY3MDAwNDUsImVtYWlsIjoibWlrZWphbmNhckBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W10sImp0aSI6ImJhOWQ4NDI1LWZmNTgtNGQ4ZC1iNzhmLTVmNjNkYWYzMzU5MiIsImNsaWVudF9pZCI6IlNUVURJTy1ESVNORVlNT1ZJRVNBTllXSEVSRS5XRUItUFJPRCJ9.h5iO7FBG5kDOdiaLCatGEPQIaIl398MefKxVkgg30I86-kwv5sF0ZREsU8_pgSMpJVbcKHNwrykvvSgw8_BzWHWZLesPFOjv4nolEAXmZwbjrFasv1B0whv6AWPm4jQ6dsPAGh53_2USuuP8PgtgNebgmAeu7Sy5PbK_gDRw5kVTp43-HBG5tqw7m15PrACRHRsCEdHyh1HGNW_gSLGZpXDfLZ1K2p2IqzvWHe1GvpMCFgHYQA0Vnv1Fa6kouegvh_WzlomchIM1muWkS0-ro2YeX1hEAE-GUixX3QbBnciMh5zdGtrcaSyFle5BoGjOr4327NDkIMXYtx1qhk6RNA';
    combineLatest(
      [this.moviesService.getMovies(MovieProviders.Amazon),
      this.moviesService.getMovies(MovieProviders.MoviesAnywhere, moviesAnywhereToken)]).pipe(
        map(([amazon, moviesAnywhere]: [Movie[], Movie[]]) => {
          let movies = [...amazon];
          movies = this.mergeMovies(movies, moviesAnywhere);
          this.movieList$.next(movies);
        }),
        take(1)
      ).subscribe();

    Object.values(MovieProviders).map(val => {
      this.filters.push(val);
      this.filters.push(`${val} only`);
    });
  }

  filterMovies(filter: string): void {
    const moviesAnywhereToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFmNjlhYmZiLTlkMTMtNGI2MC05ZTg2LWMzYjU1N2U5Y2JjOCJ9.eyJzdWIiOiI0YjdiOTA2Zi1mNWUyLTQxYzEtOTU1ZS00YmRhNzRiZDJiODQiLCJhdWQiOlsiRE1BIiwic2VudHJ5Il0sInN1Yl90eXBlIjoiQ09SRV9JRCIsInByb2ZpbGVfaWQiOiI3NjgyY2Q3Yy03NmYxLTQ4ODYtOThiMi02MzU0YzgwMTIwYWEiLCJzY29wZSI6WyJtYS1wcm9kdWN0aW9uIl0sImlzcyI6Imh0dHBzOi8vc2VudHJ5Lm1vdmllc2FueXdoZXJlLmNvbS9pZG0iLCJleHAiOjE2MDY3MDAwNDUsImVtYWlsIjoibWlrZWphbmNhckBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W10sImp0aSI6ImJhOWQ4NDI1LWZmNTgtNGQ4ZC1iNzhmLTVmNjNkYWYzMzU5MiIsImNsaWVudF9pZCI6IlNUVURJTy1ESVNORVlNT1ZJRVNBTllXSEVSRS5XRUItUFJPRCJ9.h5iO7FBG5kDOdiaLCatGEPQIaIl398MefKxVkgg30I86-kwv5sF0ZREsU8_pgSMpJVbcKHNwrykvvSgw8_BzWHWZLesPFOjv4nolEAXmZwbjrFasv1B0whv6AWPm4jQ6dsPAGh53_2USuuP8PgtgNebgmAeu7Sy5PbK_gDRw5kVTp43-HBG5tqw7m15PrACRHRsCEdHyh1HGNW_gSLGZpXDfLZ1K2p2IqzvWHe1GvpMCFgHYQA0Vnv1Fa6kouegvh_WzlomchIM1muWkS0-ro2YeX1hEAE-GUixX3QbBnciMh5zdGtrcaSyFle5BoGjOr4327NDkIMXYtx1qhk6RNA';
    combineLatest(
      [this.moviesService.getMovies(MovieProviders.Amazon),
      this.moviesService.getMovies(MovieProviders.MoviesAnywhere, moviesAnywhereToken)]).pipe(
        map(([amazon, moviesAnywhere]: [Movie[], Movie[]]) => {
          let movies = [...amazon];
          movies = this.mergeMovies(movies, moviesAnywhere);
          movies = movies.filter(movie => {
            if (filter.includes('only')) {
              return movie.providers.every(prov => prov === filter.replace(' only', ''));
            }
            return movie.providers.some(prov => prov === filter);
          });
          this.movieList$.next(movies);
        }),
        take(1)
      ).subscribe();

  }

  private mergeMovies(currentList: Movie[], updates: Movie[]): Movie[] {
    const updatedList = [...currentList];

    updates.forEach(movie => {
      const existingMovie = updatedList.find(currMovie => currMovie.title.toLowerCase() === movie.title.toLowerCase());
      if (existingMovie) {
        existingMovie.providers.push(...movie.providers);
      } else {
        updatedList.push(movie);
      }
    });
    return updatedList;
  }
}
