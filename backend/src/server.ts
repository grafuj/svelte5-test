import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer, StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import { createSchema } from "./schema";
import { AppDataSource } from "./data-source";

async function bootstrap() {
  try {
    // Initialize the DataSource
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    // Build the GraphQL schema
    const schema = await createSchema();

    // Start the Apollo Server
    const server = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }: StandaloneServerContextFunctionArgument) => ({ token: req.headers.token }),
      listen: { port: 4000 },
    });

    console.log(`Server is running at ${url}`);
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
}

bootstrap();
