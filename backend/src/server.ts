import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { createSchema } from './schema';

async function bootstrap() {
  // Create a TypeORM connection
  await createConnection();

  // Build the GraphQL schema
  const schema = await createSchema();

  // Start the Apollo Server
  const server = new ApolloServer({ schema });
  const { url } = await server.listen(4000);
  console.log(`Server is running at ${url}`);
}

bootstrap();