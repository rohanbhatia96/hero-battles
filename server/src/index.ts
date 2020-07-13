import './env';
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import {HelloResolver} from './resolvers/HelloResolver';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`GraphQL server started on http://localhost:${process.env.PORT}/graphql`);
  });
};

main();
