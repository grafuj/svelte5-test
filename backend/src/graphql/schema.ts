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

import { Review, Film, User } from "types";

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
      resolve: () => getUsers(),
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: () => getFilms(),
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve: () => getReviews(),
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
      resolve: async (_parent, args) =>
        addUser(args.username, args.email, args.password),
    },
    addFilm: {
      type: FilmType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        releaseDate: { type: new GraphQLNonNull(GraphQLString) },
        imdbUrl: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args) =>
        addFilm(args.name, args.releaseDate, args.imdbUrl, args.genre),
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
      resolve: async (_parent, args) => addReview(args),
    },
  }),
});

// Export the schema
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
