import { MovieProviders } from './movie-providers.enum';

export interface Movie {
  title: string;
  coverImage: string;
  providers: MovieProviders[];
}
