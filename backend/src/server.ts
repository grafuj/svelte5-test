import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql/schema'; // Import the GraphQL schema
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Apollo Server setup
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    // Include any additional context (e.g., authentication, user info)
    return {
      headers: req.headers,
    };
  },
});

// Start the Apollo Server and apply middleware
(async () => {
  await server.start();
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
    console.log(`GraphQL endpoint at http://localhost:${port}${server.graphqlPath}`);
  });
})();