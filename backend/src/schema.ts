import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { FilmResolver } from './resolvers/FilmResolver';
import { ReviewResolver } from './resolvers/ReviewResolver';

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, FilmResolver, ReviewResolver],
  });