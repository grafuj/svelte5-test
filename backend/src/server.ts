import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql/schema'; // Import the GraphQL schema
import { generateCity } from './generateCity'; // City generation logic

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // JSON parsing

// Apollo Server setup
const server = new ApolloServer({
  schema,
});

// Apply Apollo GraphQL middleware
server.applyMiddleware({ app });

// Main route for city generation (you can add your generateCity logic here)
app.post('/generateCity', (req, res) => {
  const cityData = generateCity(req.body);  // Your city generation logic
  res.json(cityData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`GraphQL endpoint available at http://localhost:${port}/graphql`);
});
