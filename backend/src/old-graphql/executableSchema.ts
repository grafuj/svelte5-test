import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

// Define your type definitions (schema)
const typeDefs = `
  type User {
    id: String!
    username: String!
    email: String!
    reviews: [Review]
  }

  type Film {
    id: String!
    name: String!
    releaseDate: String!
    imdbUrl: String!
    genre: String!
    reviews: [Review]
  }

  type Review {
    id: String!
    engagement: String
    engagementScore: Float!
    acting: String
    actingScore: Float!
    plotConsistency: String
    plotConsistencyScore: Float!
    sceneChoice: String
    sceneChoiceScore: Float!
    dialogue: String
    dialogueScore: Float!
    characterDesires: String
    characterDesiresScore: Float!
    theme: String
    themeScore: Float!
    suitability: String
    suitabilityScore: Float!
    overallScore: Float!
    user: User
    film: Film
  }

  type Query {
    users: [User]
    films: [Film]
    reviews: [Review]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addFilm(name: String!, releaseDate: String!, imdbUrl: String!, genre: String!): Film
    addReview(
      filmId: String!
      userId: String!
      engagement: String
      engagementScore: Float!
      acting: String
      actingScore: Float!
      plotConsistency: String
      plotConsistencyScore: Float!
      sceneChoice: String
      sceneChoiceScore: Float!
      dialogue: String
      dialogueScore: Float!
      characterDesires: String
      characterDesiresScore: Float!
      theme: String
      themeScore: Float!
      suitability: String
      suitabilityScore: Float!
     
`;
