import { Review, User, Film, ReviewFilter } from "types";

import {
  getUsers,
  getFilms,
  getReviews,
  addUser,
  addFilm,
  addReview,
} from "db/pg";

export const resolvers = {
  Query: {
    // Root queries for users, films, and reviews
    users: async (): Promise<User[]> => getUsers(),
    films: async (): Promise<Film[]> => getFilms(),
    reviews: async (_parent: any, args: ReviewFilter): Promise<Review[]> =>
      getReviews({ userId: args.userId, filmId: args.filmId }), // Fetch all reviews (no filter)
  },
  Mutation: {
    // Add a new user
    addUser: async (
      _parent: any,
      args: { username: string; email: string }
    ): Promise<User> => {
      const { username, email } = args;
      return await addUser(username, email);
    },

    // Add a new film
    addFilm: async (
      _parent: any,
      args: {
        name: string;
        releaseDate: string;
        imdbUrl: string;
        genre: string;
      }
    ): Promise<Film> => {
      const { name, releaseDate, imdbUrl, genre } = args;
      return await addFilm(name, releaseDate, imdbUrl, genre);
    },

    // Add a new review
    addReview: async (_parent: any, args: Review): Promise<Review> => {
      return await addReview(args);
    },
  },

  User: {
    // Resolver for 'reviews' field of User
    reviews: (parent: User): Promise<Review[]> =>
      getReviews({ userId: parent.id }),
  },
  Film: {
    // Resolver for 'reviews' field of Film
    reviews: (parent: Film): Promise<Review[]> =>
      getReviews({ filmId: parent.id }),
  },
  Review: {
    // Resolver for 'user' field of Review
    user: (parent: Review): Promise<User[]> => getUsers({ id: parent.userId }),

    // Resolver for 'film' field of Review
    film: (parent: Review): Promise<Film[]> => getFilms({ id: parent.filmId }),
  },
};
