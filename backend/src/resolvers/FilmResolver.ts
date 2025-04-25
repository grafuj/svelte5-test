import "reflect-metadata";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Film } from "../entities/Film";
import { AppDataSource } from "../data-source";

@Resolver(Film)
export class FilmResolver {
  @Query(() => [Film])
  async films(): Promise<Film[]> {
    return AppDataSource.getRepository(Film).find();
  }

  @Mutation(() => Film)
  async addFilm(
    @Arg("name") name: string,
    @Arg("releaseDate") releaseDate: string,
    @Arg("imdbUrl") imdbUrl: string,
    @Arg("genre") genre: string
  ): Promise<Film> {
    const filmRepository = AppDataSource.getRepository(Film);
    const film = filmRepository.create({ name, releaseDate, imdbUrl, genre });
    return filmRepository.save(film);
  }
}
