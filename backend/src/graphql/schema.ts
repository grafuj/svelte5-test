import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
} from 'graphql';
import { getUsers, addUser, getFilms, addFilm, getReviews, addReview } from '../db/pg';

// Define User type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: (): Record<string, any> => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve: (parent) => getReviews({ userId: parent.id }),
    },
  }),
});

// Define Film type
const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: (): Record<string, any> => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    releaseDate: { type: GraphQLNonNull(GraphQLString) },
    imdbUrl: { type: GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLNonNull(GraphQLString) },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve: (parent) => getReviews({ filmId: parent.id }),
    },
  }),
});

// Define Review type
const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: (): Record<string, any> => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    engagement: { type: GraphQLString },
    engagementScore: { type: GraphQLNonNull(GraphQLFloat) },
    acting: { type: GraphQLString },
    actingScore: { type: GraphQLNonNull(GraphQLFloat) },
    plotConsistency: { type: GraphQLString },
    plotConsistencyScore: { type: GraphQLNonNull(GraphQLFloat) },
    sceneChoice: { type: GraphQLString },
    sceneChoiceScore: { type: GraphQLNonNull(GraphQLFloat) },
    dialogue: { type: GraphQLString },
    dialogueScore: { type: GraphQLNonNull(GraphQLFloat) },
    characterDesires: { type: GraphQLString },
    characterDesiresScore: { type: GraphQLNonNull(GraphQLFloat) },
    theme: { type: GraphQLString },
    themeScore: { type: GraphQLNonNull(GraphQLFloat) },
    suitability: { type: GraphQLString },
    suitabilityScore: { type: GraphQLNonNull(GraphQLFloat) },
    overallScore: { type: GraphQLNonNull(GraphQLFloat) },
    user: {
      type: UserType,
      resolve: (parent) => getUsers({ id: parent.userId }),
    },
    film: {
      type: FilmType,
      resolve: (parent) => getFilms({ id: parent.filmId }),
    },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
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
  name: 'Mutation',
  fields: (): Record<string, any> => ({
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args) => addUser(args.username, args.email, args.password),
    },
    addFilm: {
      type: FilmType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        releaseDate: { type: GraphQLNonNull(GraphQLString) },
        imdbUrl: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_parent, args) => addFilm(args.name, args.releaseDate, args.imdbUrl, args.genre),
    },
    addReview: {
      type: ReviewType,
      args: {
        filmId: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLString) },
        engagement: { type: GraphQLString },
        engagementScore: { type: GraphQLNonNull(GraphQLFloat) },
        acting: { type: GraphQLString },
        actingScore: { type: GraphQLNonNull(GraphQLFloat) },
        plotConsistency: { type: GraphQLString },
        plotConsistencyScore: { type: GraphQLNonNull(GraphQLFloat) },
        sceneChoice: { type: GraphQLString },
        sceneChoiceScore: { type: GraphQLNonNull(GraphQLFloat) },
        dialogue: { type: GraphQLString },
        dialogueScore: { type: GraphQLNonNull(GraphQLFloat) },
        characterDesires: { type: GraphQLString },
        characterDesiresScore: { type: GraphQLNonNull(GraphQLFloat) },
        theme: { type: GraphQLString },
        themeScore: { type: GraphQLNonNull(GraphQLFloat) },
        suitability: { type: GraphQLString },
        suitabilityScore: { type: GraphQLNonNull(GraphQLFloat) },
        overallScore: { type: GraphQLNonNull(GraphQLFloat) },
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
