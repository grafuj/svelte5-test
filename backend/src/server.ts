import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./graphql/schema";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;
console.log("port: ", port);
const server = new ApolloServer({
  schema,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(port) },
    context: async ({ req }: any) => {
      return { headers: req.headers };
    },
  });

  console.log(`🚀 Server ready at ${url}`);
})();
