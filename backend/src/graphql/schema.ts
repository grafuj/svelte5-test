import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
} from "graphql";
import {
  getUsers,
  addUser,
  getFilms,
  addFilm,
  getReviews,
  addReview,
} from "../db/pg";
import { resolvers } from "./resolvers";

import { Review, Film, User, ReviewFilter } from "types";

// Define User type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: (): Record<string, any> => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve: (parent: User) => getReviews({ userId: parent.id }),
    },
  }),
});

// Define Film type
const FilmType = new GraphQLObjectType({
  name: "Film",
  fields: (): Record<string, any> => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    releaseDate: { type: new GraphQLNonNull(GraphQLString) },
    imdbUrl: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve: (parent: User) => getReviews({ filmId: parent.id }),
    },
  }),
});

// Define Review type
const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: (): Record<string, any> => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    engagement: { type: GraphQLString },
    engagementScore: { type: new GraphQLNonNull(GraphQLFloat) },
    acting: { type: GraphQLString },
    actingScore: { type: new GraphQLNonNull(GraphQLFloat) },
    plotConsistency: { type: GraphQLString },
    plotConsistencyScore: { type: new GraphQLNonNull(GraphQLFloat) },
    sceneChoice: { type: GraphQLString },
    sceneChoiceScore: { type: new GraphQLNonNull(GraphQLFloat) },
    dialogue: { type: GraphQLString },
    dialogueScore: { type: new GraphQLNonNull(GraphQLFloat) },
    characterDesires: { type: GraphQLString },
    characterDesiresScore: { type: new GraphQLNonNull(GraphQLFloat) },
    theme: { type: GraphQLString },
    themeScore: { type: new GraphQLNonNull(GraphQLFloat) },
    suitability: { type: GraphQLString },
    suitabilityScore: { type: new GraphQLNonNull(GraphQLFloat) },
    overallScore: { type: new GraphQLNonNull(GraphQLFloat) },
    user: {
      type: UserType,
      resolve: (parent: Review) => getUsers({ id: parent.userId }),
    },
    film: {
      type: FilmType,
      resolve: (parent: Review) => getFilms({ id: parent.filmId }),
    },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: (): Record<string, any> => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: resolvers.Query.users,
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: resolvers.Query.films,
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      args: {
        userId: { type: GraphQLString },
        filmId: { type: GraphQLString },
      },
      resolve: resolvers.Query.reviews,
    },
  }),
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: (): Record<string, any> => ({
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: resolvers.Mutation.addUser,
    },
    addFilm: {
      type: FilmType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        releaseDate: { type: new GraphQLNonNull(GraphQLString) },
        imdbUrl: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: resolvers.Mutation.addFilm,
    },
    addReview: {
      type: ReviewType,
      args: {
        filmId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        engagement: { type: GraphQLString },
        engagementScore: { type: new GraphQLNonNull(GraphQLFloat) },
        acting: { type: GraphQLString },
        actingScore: { type: new GraphQLNonNull(GraphQLFloat) },
        plotConsistency: { type: GraphQLString },
        plotConsistencyScore: { type: new GraphQLNonNull(GraphQLFloat) },
        sceneChoice: { type: GraphQLString },
        sceneChoiceScore: { type: new GraphQLNonNull(GraphQLFloat) },
        dialogue: { type: GraphQLString },
        dialogueScore: { type: new GraphQLNonNull(GraphQLFloat) },
        characterDesires: { type: GraphQLString },
        characterDesiresScore: { type: new GraphQLNonNull(GraphQLFloat) },
        theme: { type: GraphQLString },
        themeScore: { type: new GraphQLNonNull(GraphQLFloat) },
        suitability: { type: GraphQLString },
        suitabilityScore: { type: new GraphQLNonNull(GraphQLFloat) },
        overallScore: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: resolvers.Mutation.addReview,
    },
  }),
});

// Export the schema
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
