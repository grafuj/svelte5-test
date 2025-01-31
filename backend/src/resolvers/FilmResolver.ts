import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Film } from '../entities/Film';
import { getRepository } from 'typeorm';

@Resolver(Film)
export class FilmResolver {
  @Query(() => [Film])
  async films(): Promise<Film[]> {
    return getRepository(Film).find();
  }

  @Mutation(() => Film)
  async addFilm(
    @Arg('name') name: string,
    @Arg('releaseDate') releaseDate: string,
    @Arg('imdbUrl') imdbUrl: string,
    @Arg('genre') genre: string
  ): Promise<Film> {
    const film = new Film();
    film.name = name;
    film.releaseDate = releaseDate;
    film.imdbUrl = imdbUrl;
    film.genre = genre;
    return getRepository(Film).save(film);
  }
}