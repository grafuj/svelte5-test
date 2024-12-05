import { Review, User, Film } from "types";

import { getReviews, getUsers, getFilms } from "db/pg";

export const resolvers = {
  User: {
    reviews: (parent: User) => getReviews({ userId: parent.id }),
  },
  Film: {
    reviews: (parent: Film) => getReviews({ filmId: parent.id }),
  },
  Review: {
    user: (parent: Review) => getUsers({ id: parent.userId }),
    film: (parent: Review) => getFilms({ id: parent.filmId }),
  },
};
