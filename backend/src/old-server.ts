import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { schema } from "./graphql/old-schema";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

async function startServer() {
  const app = express();

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  // Apply CORS middleware
  app.use(
    "/graphql",
    cors({
      origin: "http://localhost:5173", // Allow requests from this origin
      credentials: true, // Allow credentials (if needed)
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ headers: req.headers }),
    })
  );

  // Start the server
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});